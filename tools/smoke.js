// Prueba rápida: abre index.html a 375 px y 1280 px, falla si hay errores JS o scroll horizontal.
// Uso: node tools/smoke.js   (requiere Playwright con Chromium instalado)
const path = require("path");
const { chromium } = require("playwright");

(async () => {
  const url = "file://" + path.resolve(__dirname, "..", "index.html");
  const browser = await chromium.launch();
  const errors = [];
  let overflow = false;
  for (const width of [375, 1280]) {
    const page = await browser.newPage({ viewport: { width, height: 800 } });
    page.on("pageerror", e => errors.push(`${width}px: ${e.message}`));
    await page.goto(url);
    await page.waitForTimeout(1500);
    const sx = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
    console.log(`${width}px scroll horizontal: ${sx}`);
    overflow ||= sx;
  }
  await browser.close();
  console.log(errors.length ? errors.join("\n") : "sin errores JS");
  process.exit(errors.length || overflow ? 1 : 0);
})();
