import { test, expect } from "@playwright/test";
import { assertBodyWithScreenshot } from "./utils";

const TEST_CASES = [
  // primitive values
  "example string",
  3232323,
  true,
  false,
  null,

  // deeply nested object
  { deeply: { nested: { object: { with: { lots: { of: "values" } } } } } },

  // object with lots of keys on the first level
  {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
    i: 9,
    j: 10,
    k: 11,
    l: 12,
    m: 13,
    n: 14,
    o: 15,
    p: 16,
    q: 17,
    r: 18,
    s: 19,
    t: 20,
    u: 21,
    v: 22,
    w: 23,
    x: 24,
    y: 25,
    z: 26,
  },

  // object with very long key names
  {
    "this is a very long key name that should be truncated": "value",
    "another very long key name that should be truncated": "value",
    "yet another very long key name that should be truncated": "value",
  },
];

test.describe.serial("Rendering", () => {
  let testCaseIndex = 0;
  for (const testCase of TEST_CASES) {
    test(`Case ${testCaseIndex}`, async ({ page }) => {
      await page.goto("/");

      // create a <pretty-json> element with the testCase as its inner text
      await page.evaluate((testCase) => {
        const prettyJson = document.createElement("pretty-json");
        prettyJson.textContent = JSON.stringify(testCase);
        document.body.appendChild(prettyJson);
      }, testCase);

      await assertBodyWithScreenshot({
        page,
        name: `test-case-${testCaseIndex}.png`,
      });

      await page.evaluate(() => {
        // clean up the <pretty-json> element
        document.body.innerHTML = "";
      });
    });

    testCaseIndex++;
  }
});
