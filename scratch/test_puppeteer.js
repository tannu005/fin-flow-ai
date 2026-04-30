const puppeteer = require('puppeteer');

(async () => {
  console.log("Launching browser...");
  try {
    const browser = await puppeteer.launch({ 
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    console.log("Browser launched!");
    const page = await browser.newPage();
    console.log("Navigating...");
    await page.goto('https://example.com');
    console.log("Title:", await page.title());
    await browser.close();
    console.log("Done!");
  } catch (e) {
    console.error("Puppeteer failed:", e.message);
  }
})();
