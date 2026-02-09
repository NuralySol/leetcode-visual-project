import test from "node:test";
import assert from "node:assert/strict";
import * as dfd from "danfojs-node";

test("danfojs-node creates a DataFrame", () => {
  const df = new dfd.DataFrame({
    name: ["Alice", "Bob"],
    score: [90, 85],
  });

  assert.equal(df.shape[0], 2);
  assert.equal(df.shape[1], 2);
});

