import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
  args: ['--no-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto('http://localhost:3001/admin/orders/preview', { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise(r => setTimeout(r, 2000));
const outPath = '/Users/yang/Downloads/Cobble-Studio-/temporary screenshots/admin-final.png';
await page.screenshot({ path: outPath, fullPage: true });
await browser.close();
console.log('Saved:', outPath);
