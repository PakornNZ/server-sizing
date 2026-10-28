// Run after npm run build. PLAYWRIGHT_MODULE may point to an external Playwright installation.
// Only a temporary database copy is written. The source catalog remains untouched.
import assert from "node:assert/strict"
import { mkdtemp, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { DatabaseSync, backup } from "node:sqlite"
import { spawn } from "node:child_process"
import { setTimeout as delay } from "node:timers/promises"

const { chromium } = await import(process.argv[2] || process.env.PLAYWRIGHT_MODULE || "playwright")
const root = fileURLToPath(new URL("../", import.meta.url))
const temporary = await mkdtemp(path.join(tmpdir(), "opencode", "sizing-smoke-"))
const source = new DatabaseSync(path.join(root, "data", "model_dashboard.sqlite"), { readOnly: true })
const database = path.join(temporary, "test.sqlite")
await backup(source, database)
source.close()
const legacy = new DatabaseSync(database)
legacy.exec("INSERT INTO LlmPickModelHistory (name, modelName, modelProvider, modelParametersB, useCase, contextTokens, quant, concurrent, hardwareType, status, recommendationText) VALUES ('Legacy test fixture', 'Synthetic', 'Test', 70, 'chat', 4000, 'q4', 1, 'standard', 'Recommended', 'Old arithmetic, not current evidence')")
legacy.close()
const base = "http://127.0.0.1:3007"
const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", "3007"], {
    cwd: root,
    env: { ...process.env, DATABASE_URL: `file:${database.replaceAll("\\", "/")}` },
    stdio: ["ignore", "pipe", "pipe"],
})
let output = "", browser
server.stdout.on("data", (data) => { output += data })
server.stderr.on("data", (data) => { output += data })
try {
    let ready = false
    for (let i = 0; i < 60; i++) {
        if (server.exitCode !== null) throw new Error(`Server exited: ${output}`)
        // Never send test writes to an unrelated server already occupying this port.
        try { ready = output.includes("Ready") && (await fetch(`${base}/api/catalog`)).ok } catch { /* Wait for local startup. */ }
        if (ready) break
        await delay(500)
    }
    assert.ok(ready, "local test server started")
    browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || "msedge", headless: true })
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } })
    const page = await context.newPage()
    const errors = []
    page.on("pageerror", (error) => errors.push(error.message))
    const fixture = { model: "Synthetic GQA fixture", modelType: "llm", provider: "Test only", parametersB: 70, totalParameters: 70_000_000_000, modelId: "synthetic", revision: "test-only", architecture: "decoder_gqa", numHiddenLayers: 80, numAttentionHeads: 64, numKeyValueHeads: 8, headDim: 128, maxContextTokens: 32000, metadataSource: "https://example.com/synthetic-fixture", verifiedAt: "2026-09-06" }
    const created = await context.request.post(`${base}/api/admin/models`, { data: fixture })
    assert.equal(created.status(), 200)
    const model = await created.json()
    for (const data of [{ numKeyValueHeads: 7 }, { totalParameters: -1 }, { architecture: "guessed" }, { verifiedAt: "2026-02-30" }, { metadataSource: "https://" }]) {
        assert.equal((await context.request.patch(`${base}/api/admin/models/${model.id}`, { data })).status(), 400)
    }
    assert.equal((await context.request.patch(`${base}/api/admin/models/${model.id}`, { data: { headDim: null } })).status(), 200)
    assert.equal((await context.request.patch(`${base}/api/admin/models/${model.id}`, { data: { headDim: 128 } })).status(), 200)
    const realCatalog = await (await context.request.get(`${base}/api/catalog`)).json()
    assert.ok(!("dgxCapacities" in realCatalog), "unverified buckets excluded from live catalog")
    const catalog = { ...realCatalog, models: [model, { ...model, id: model.id + 1, model: "Missing architecture fixture", architecture: null }], gpus: [{ id: "fixture-80", name: "Synthetic 80GB", vendor: "Test", vramGb: 80 }, { id: "fixture-24", name: "Synthetic 24GB", vendor: "Test", vramGb: 24 }] }
    await page.route("**/api/catalog", (route) => route.fulfill({ json: catalog }))
    await page.goto(base)
    await page.getByRole("heading", { name: "LLM Hardware Sizer" }).waitFor()
    const choose = async (label, option) => {
        const field = page.locator(".field").filter({ has: page.locator("label", { hasText: new RegExp(`^${label}$`) }) })
        await field.locator(".custom-select-button").click()
        await field.getByRole("button", { name: option, exact: true }).click()
    }
    await choose("Weight Precision", "INT4")
    await page.getByLabel("Input Tokens", { exact: true }).fill("7000")
    await page.getByLabel("Max Output Tokens", { exact: true }).fill("1000")
    await page.getByLabel("Concurrent Sequences", { exact: true }).fill("2")
    await page.getByText("Memory Fit (Estimated)", { exact: true }).first().waitFor()
    assert.ok((await page.locator(".sizer-legend-item").filter({ hasText: "KV Cache:" }).innerText()).includes("5.2 GB"))
    await page.getByLabel("Host RAM (GB)", { exact: true }).fill("777")
    await choose("GPU Model", "Synthetic 24GB (24 GB)")
    assert.equal(await page.getByLabel("Host RAM (GB)", { exact: true }).inputValue(), "777")
    await choose("GPU Model", "Synthetic 80GB (80 GB)")
    page.on("dialog", (dialog) => dialog.accept("Synthetic smoke snapshot"))
    const saved = []
    page.on("request", (request) => { if (request.method() === "POST" && request.url().includes("/api/history/")) saved.push(request.postDataJSON()) })
    const save = async () => {
        const response = page.waitForResponse((res) => res.request().method() === "POST" && res.url().includes("/api/history/"))
        await page.getByRole("button", { name: "Save Sizing Snapshot" }).click()
        assert.equal((await response).status(), 200)
    }
    await save()
    await page.getByRole("button", { name: "Size by Server", exact: true }).click()
    await page.getByLabel("Min Parameters (B)", { exact: true }).fill("80")
    assert.equal(await page.locator("tbody tr").count(), 0)
    await page.getByLabel("Min Parameters (B)", { exact: true }).fill("")
    await choose("Provider", "Test only")
    assert.equal(await page.locator("tbody tr").count(), 2)
    await choose("Parameter Preset", "20-40B")
    assert.equal(await page.locator("tbody tr").count(), 0)
    await choose("Parameter Preset", "All Sizes")
    await page.getByLabel("Search Model", { exact: true }).fill("Synthetic GQA")
    await save()
    assert.deepEqual(JSON.parse(saved[0].calculationSnapshot).calculations[0].result, JSON.parse(saved[1].calculationSnapshot).calculations[0].result, "UI cross-mode snapshots agree")
    await page.getByLabel("Search Model", { exact: true }).fill("Missing")
    assert.equal(await page.locator("tbody tr").count(), 1)
    assert.equal(await page.locator("tbody td:nth-child(5) .table-chip").innerText(), "Unknown")
    await page.getByLabel("Search Model", { exact: true }).fill("")
    await page.getByRole("button", { name: "DGX Spark", exact: true }).click()
    assert.ok((await page.locator("tbody tr").first().innerText()).includes("Fits (Estimated)"))
    await page.getByRole("button", { name: /2x DGX Spark/ }).click()
    assert.ok((await page.locator("tbody td:nth-child(5) .table-chip").allTextContents()).every((value) => value === "Unknown"))
    await page.getByRole("button", { name: /1x DGX Spark/ }).click()
    await save()
    const spark = JSON.parse(saved[2].calculationSnapshot).calculations[0].result
    assert.equal(spark.breakdown.usableBudget, 100_000_000_000)
    assert.equal(spark.supportedConcurrent, null)
    assert.equal(spark.performanceStatus, "not_benchmarked")
    const invalidHistory = structuredClone(saved[0])
    const snapshot = JSON.parse(invalidHistory.calculationSnapshot)
    snapshot.calculations[0].result.memoryStatus = "does_not_fit"
    invalidHistory.calculationSnapshot = JSON.stringify(snapshot)
    assert.equal((await context.request.post(`${base}/api/history/llm-pick-model`, { data: invalidHistory })).status(), 400)
    await page.getByRole("button", { name: "History", exact: true }).click()
    await page.getByText("v2 snapshot", { exact: true }).first().waitFor()
    await page.getByText("Legacy (old calculation)", { exact: true }).first().waitFor()
    await page.keyboard.press("Escape")
    // Reload closes the drawer regardless of its keyboard implementation.
    for (const width of [1440, 390]) {
        await page.setViewportSize({ width, height: 900 })
        await page.goto(base)
        await page.getByRole("heading", { name: "LLM Hardware Sizer" }).waitFor()
        for (const mode of ["Size by Model", "Size by Server", "DGX Spark"]) {
            await page.getByRole("button", { name: mode, exact: true }).click()
            assert.ok(await page.getByRole("button", { name: "Save Sizing Snapshot" }).isVisible())
            assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `${mode} fits ${width}px viewport`)
        }
    }
    assert.deepEqual(errors, [])
    console.log("PASS: isolated API metadata/history validation; UI mode parity, missing metadata, DGX budgets, filters, manual RAM, history and desktop/mobile layout.")
} finally {
    await browser?.close()
    server.kill()
    if (server.exitCode === null) await new Promise((resolve) => server.once("exit", resolve))
    await rm(temporary, { recursive: true, force: true })
}
