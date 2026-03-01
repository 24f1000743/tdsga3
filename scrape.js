const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const seeds = [48,49,50,51,52,53,54,55,56,57];
  const BASE_URL = "https://sanand0.github.io/tdsdata/js_table/"; // <-- UPDATE THIS

  let grandTotal = 0;

  for (const seed of seeds) {
    const url = `${BASE_URL}?seed=${seed}`;   // modify if format differs
    console.log(`Visiting: ${url}`);

    await page.goto(url, { waitUntil: 'networkidle' });

    // Wait for table to load
    await page.waitForSelector('table');

    // Extract all numbers inside tables
    const numbers = await page.$$eval('table td', cells =>
      cells
        .map(cell => parseFloat(cell.innerText.replace(/,/g, '').trim()))
        .filter(n => !isNaN(n))
    );

    const sum = numbers.reduce((a, b) => a + b, 0);

    console.log(`Seed ${seed} Sum: ${sum}`);
    grandTotal += sum;
  }

  console.log("=================================");
  console.log(`FINAL TOTAL: ${grandTotal}`);
  console.log("=================================");

  await browser.close();
})();
