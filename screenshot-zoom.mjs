import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
  args: ['--no-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto('http://localhost:3001/products/birch-kuksa-no-01', { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise(r => setTimeout(r, 2000));

await page.screenshot({ path: '/Users/yang/Downloads/Cobble-Studio-/temporary screenshots/right-panel-zoom.png', clip: { x: 700, y: 50, width: 700, height: 700 } });
await page.screenshot({ path: '/Users/yang/Downloads/Cobble-Studio-/temporary screenshots/related-zoom.png', clip: { x: 0, y: 2100, width: 1440, height: 600 } });

await browser.close();
console.log('done');
