// Writes docs/img/terra-cognita.png at 1400x900 from headless Chromium.
// Playwright is loaded from a sibling project rather than installed here: this repo has no
// dependencies, and a screenshot tool is not a reason to give it one. Point PLAYWRIGHT_DIR
// somewhere else if yours lives elsewhere.
import { pathToFileURL, fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { homedir } from "node:os";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pw = process.env.PLAYWRIGHT_DIR || join(homedir(), "Code/shosai/node_modules/playwright");
const { chromium } = await import(pathToFileURL(join(pw, "index.mjs")).href);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
await page.goto(pathToFileURL(join(root, "index.html")).href);
await page.waitForTimeout(3200); // d3 loads, then the intro draws the coast over ~2.6s
await page.locator(".instrument").scrollIntoViewIfNeeded();
await page.waitForTimeout(600); // let the line boil settle on a frame
await page.screenshot({ path: join(root, "docs/img/terra-cognita.png") });
await browser.close();
console.log("docs/img/terra-cognita.png");
