import puppeteer from 'puppeteer';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const url = process.argv[2] || 'http://localhost:3001';
const label = process.argv[3] || 'dropdown';

const outDir = path.join(__dirname, 'temporary screenshots');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
let n = 1;
while (fs.existsSync(path.join(outDir, `screenshot-${n}-${label}.png`))) n++;
const outFile = path.join(outDir, `screenshot-${n}-${label}.png`);

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

// Hover the "Shop" nav trigger to open the mega-menu
const shop = await page.evaluateHandle(() => {
  const links = [...document.querySelectorAll('nav a')];
  const el = links.find(a => /shop/i.test(a.textContent || ''));
  return el ? el.parentElement : null;
});
if (shop) {
  const box = await shop.asElement().boundingBox();
  if (box) await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
}
// wait for the 240ms open animation + image scale settle
await new Promise(r => setTimeout(r, 700));

// Capture just the header area where the menu lives
await page.screenshot({ path: outFile, clip: { x: 0, y: 0, width: 1440, height: 560 } });
await browser.close();
console.log(`Screenshot saved: ${outFile}`);
