function parseContext(value) {
  const match = String(value ?? "").trim().toLowerCase().replace(/,/g, "").match(/^(\d+(?:\.\d+)?)\s*([kmb])?$/)
  if (!match) return null
  const multiplier = { k: 1e3, m: 1e6, b: 1e9 }[match[2]] ?? 1
  const parsed = Number(match[1]) * multiplier
  return Number.isFinite(parsed) ? Math.round(parsed) : null
}

module.exports = { parseContext }
