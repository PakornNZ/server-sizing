const fs = require("fs")
const path = require("path")
const { PrismaClient } = require("@prisma/client")
const { parseContext } = require("./context-parser.cjs")

const prisma = new PrismaClient()
const root = path.resolve(__dirname, "..", "..")

function parseNumber(value) {
  if (!value || value === "-") return null
  const normalized = String(value).replace(/,/g, "").trim()
  const parsed = Number(normalized)
  return Number.isFinite(parsed) ? parsed : null
}

function parseMarkdownModels() {
  const file = fs.readFileSync(path.join(root, "local_models.md"), "utf8")
  return file
    .split(/\r?\n/)
    .filter((line) => line.startsWith("|") && !line.includes("---") && !line.includes("rank |"))
    .map((line) => line.split("|").slice(1, -1).map((cell) => cell.trim()))
    .filter((cells) => cells.length >= 14)
    .map((cells) => ({
      rank: parseNumber(cells[0]),
      model: cells[1],
      modelType: "llm",
      provider: cells[2],
      contextTokens: parseContext(cells[3]),
      parametersB: parseNumber(cells[4]) || 0,
      intelligence: parseNumber(cells[5]),
      coding: parseNumber(cells[6]),
      agentic: parseNumber(cells[7]),
      gpqa: parseNumber(cells[8]),
      hle: parseNumber(cells[9]),
      lcr: parseNumber(cells[10]),
      hfDownloads: parseNumber(cells[11]),
      hfLikes: parseNumber(cells[12]),
      hfUrl: cells[13] || null,
    }))
}

async function main() {
  const existing = await Promise.all([
    prisma.llmModel.count(),
    prisma.gpu.count(),
    prisma.dgxProfile.count(),
    prisma.serverApp.count(),
  ])

  if (existing.some((count) => count > 0)) {
    throw new Error("Database is not empty. Seed stopped to avoid overwriting data.")
  }

  const sizing = JSON.parse(fs.readFileSync(path.join(root, "hardware_sizing_data.json"), "utf8"))
  const models = [
    ...parseMarkdownModels().filter((model) => model.parametersB <= 150),
    { model: "Typhoon OCR 2B", modelType: "ocr", provider: "Typhoon", contextTokens: null, parametersB: 2 },
    { model: "bge-m3", modelType: "embedding", provider: "BAAI", contextTokens: 8192, parametersB: 0.568 },
  ]

  await prisma.llmModel.createMany({ data: models })
  await prisma.gpu.createMany({
    data: sizing.gpuCatalog.map((gpu) => ({
      id: gpu.id,
      vendor: gpu.vendor,
      name: gpu.name,
      className: gpu.class,
      vramGb: gpu.vramGb,
    })),
  })

  for (const [stackCount, profile] of Object.entries(sizing.dgxSparkCalculator.profiles)) {
    const created = await prisma.dgxProfile.create({
      data: {
        stackCount: Number(stackCount),
        label: profile.label,
        unifiedMemoryGb: profile.unifiedMemoryGb,
        usableAiMemoryGb: profile.usableAiMemoryGb,
        maxModelB: profile.maxModelB,
        interconnect: profile.interconnect,
      },
    })
    const matrix = sizing.dgxSparkCalculator.capacityMatrix[stackCount]
    const rows = []
    for (const [modelBucketB, useCases] of Object.entries(matrix)) {
      for (const [useCase, supportedConcurrent] of Object.entries(useCases)) {
        rows.push({
          profileId: created.id,
          modelBucketB: Number(modelBucketB),
          useCase,
          supportedConcurrent,
        })
      }
    }
    await prisma.dgxCapacity.createMany({ data: rows })
  }

  await prisma.serverApp.createMany({
    data: [
      { name: "Nginx Proxy", category: "Proxy", iconName: "nginx", iconBackground: "auto", networkGbps: 1, cpuCores: 1, ramGb: 1, storageGb: 10, note: "Reverse proxy baseline" },
      { name: "PostgreSQL", category: "Database", iconName: "postgresql", iconBackground: "auto", networkGbps: 1, cpuCores: 4, ramGb: 16, storageGb: 200, note: "General production baseline" },
      { name: "Qdrant", category: "Vector DB", iconName: "qdrant", iconBackground: "dark", networkGbps: 1, cpuCores: 4, ramGb: 16, storageGb: 200, note: "Vector search baseline" },
    ],
  })

  console.log(`Seeded ${models.length} models, ${sizing.gpuCatalog.length} GPUs, DGX profiles, and default apps.`)
}

main()
  .finally(async () => prisma.$disconnect())
