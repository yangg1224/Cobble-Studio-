import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1400, height: 900 });
await page.goto('http://localhost:3001', { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 2000));
// Scroll to the products section
await page.evaluate(() => window.scrollBy(0, 700));
await new Promise(r => setTimeout(r, 1000));
await page.screenshot({ path: './temporary screenshots/products-fix.png' });
await browser.close();
