import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true, args: ['--no-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto('http://localhost:3001/products/birch-kuksa-no-01', { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise(r => setTimeout(r, 3000));

const fullH = await page.evaluate(() => document.body.scrollHeight);
console.log('fullHeight:', fullH);

// Top half: main product section
await page.screenshot({ path: '/Users/yang/Downloads/Cobble-Studio-/temporary screenshots/top-section.png', clip: { x: 0, y: 0, width: 1440, height: 900 } });

// Related products strip
await page.screenshot({ path: '/Users/yang/Downloads/Cobble-Studio-/temporary screenshots/related-strip.png', clip: { x: 0, y: 780, width: 1440, height: 900 } });

await browser.close();
