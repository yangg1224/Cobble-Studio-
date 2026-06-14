import puppeteer from 'puppeteer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.goto('http://localhost:3001', { waitUntil: 'networkidle2', timeout: 30000 });
const el = await page.$('footer');
const out = path.join(__dirname, 'temporary screenshots', `footer-after-mobile.png`);
await el.screenshot({ path: out });
await browser.close();
console.log('saved', out);
