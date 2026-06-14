import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
  args: ['--no-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto('http://localhost:3001/products/birch-kuksa-no-01', { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise(r => setTimeout(r, 3000));
await page.screenshot({ path: '/Users/yang/Downloads/Cobble-Studio-/temporary screenshots/full-page-v2.png', fullPage: true });

// Bottom section only
const fullHeight = await page.evaluate(() => document.body.scrollHeight);
await page.screenshot({ 
  path: '/Users/yang/Downloads/Cobble-Studio-/temporary screenshots/bottom-related.png',
  clip: { x: 0, y: fullHeight - 800, width: 1440, height: 800 }
});

await browser.close();
console.log('fullHeight:', fullHeight);
