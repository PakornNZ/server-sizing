import assert from "node:assert/strict"
import test from "node:test"
import parser from "../scripts/context-parser.cjs"

test("parses context suffixes as token counts", () => {
    assert.equal(parser.parseContext("4.1k"), 4100)
    assert.equal(parser.parseContext("32.8k"), 32800)
    assert.equal(parser.parseContext("1M"), 1000000)
    assert.equal(parser.parseContext("256k"), 256000)
    assert.equal(parser.parseContext("-"), null)
})
