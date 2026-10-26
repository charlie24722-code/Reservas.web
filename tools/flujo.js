// Prueba funcional de punta a punta: recorre la reserva completa como un usuario real.
// Búsqueda SAL → MAD (ida y vuelta, BIENVENIDO10) → tarifas → pasajeros (con validación)
// → asiento, maleta y seguro → pago (con validación de términos) → confirmación
// → Mis viajes → Panel de la aerolínea. Se ejecuta en escritorio (1280 px) y celular (375 px).
// Uso: node tools/flujo.js [--headed]   (requiere Playwright con Chromium instalado)
const path = require("path");
const { chromium } = require("playwright");

const URL = "file://" + path.resolve(__dirname, "..", "index.html");
const money = s => Number(String(s).replace(/[^\d.]/g, ""));

async function run(browser, width) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
  const errors = [], checks = [];
  page.on("pageerror", e => errors.push(e.message));
  const ok = (cond, label) => { checks.push([!!cond, label]); if (!cond) throw new Error(label); };
  const visible = sel => page.locator(sel).isVisible();

  try {
    await page.goto(URL);
    await page.evaluate(() => localStorage.removeItem("estela-bookings"));
    await page.reload();

    // 1. Búsqueda clásica
    await page.locator("#buscar").scrollIntoViewIfNeeded();
    await page.click("#in-to");
    await page.fill("#in-to", "mad");
    await page.keyboard.press("Enter");
    ok(await page.inputValue("#in-to") === "Madrid", "Autocompletar: 'mad' selecciona Madrid");
    await page.fill("#in-promo", "bienvenido10");
    ok((await page.textContent("#promo-msg")).includes("✓"), "Código BIENVENIDO10 aceptado");
    await page.click("#panel-book button[type=submit]");
    ok(await visible("#view-flow"), "Buscar vuelos abre el flujo de reserva");

    // 2. Vuelos: ida y regreso
    for (const leg of ["ida", "regreso"]) {
      await page.locator(".flight [data-open]").first().click();
      await page.locator('[data-fare="classic"]').first().click();
      ok(true, `Tarifa Clásica elegida (${leg})`);
    }
    ok(await page.locator("#pax-form").count() === 1, "Tras el regreso pasa a Pasajeros");

    // 3. Pasajeros: primero vacío para probar la validación
    await page.click("#pax-form button[type=submit]");
    ok(await page.getAttribute("#first-0", "aria-invalid") === "true", "Validación: nombre vacío marcado");
    ok(await page.locator("#pax-form").count() === 1, "Validación: no avanza con campos vacíos");
    await page.fill("#first-0", "Ana");
    await page.fill("#last-0", "Prueba");
    await page.fill("#doc-0", "A1234567");
    await page.fill("#email", "ana@correo.com");
    await page.fill("#phone", "70001234");
    await page.click("#pax-form button[type=submit]");
    ok(await page.locator(".plane").count() === 1, "Pasajeros válidos pasa a Asientos y extras");

    // 4. Extras: el total debe subir con cada uno
    const total = async () => money(await page.textContent("#mt-amount"));
    const t0 = await total();
    await page.locator("[data-seat]:not([disabled])").nth(20).click();
    ok(await page.locator(".seat.mine").count() === 1, "Asiento asignado al pasajero");
    await page.click('#bags button[aria-label="Agregar maleta"]');
    ok(await page.textContent("#bags output") === "1", "Maleta agregada");
    await page.click("#ins");
    ok(await page.getAttribute("#ins", "aria-checked") === "true", "Seguro activado");
    ok(await total() > t0, `El total se recalcula con los extras (${t0} → ${await total()})`);
    await page.click("#next");

    // 5. Pago: sin aceptar términos no debe avanzar
    await page.click("#pay-btn");
    ok(await visible("#pay-err"), "Validación: exige aceptar términos");
    await page.check("#terms");
    await page.click("#pay-btn");
    await page.waitForSelector("#view-done:not([hidden])", { timeout: 5000 });

    // 6. Confirmación
    const code = (await page.textContent("#pnr-text")).trim();
    ok(/^[A-Z0-9]{6}$/.test(code), `Código de reserva de 6 caracteres (${code})`);
    ok((await page.textContent("#done-main")).includes("Descuento"), "El descuento BIENVENIDO10 aparece en el pago");
    const saved = await page.evaluate(() => JSON.parse(localStorage.getItem("estela-bookings") || "[]"));
    ok(saved[0]?.code === code, "La reserva se guarda en el navegador");

    // 7. Mis viajes: buscar por código y apellido
    await page.evaluate(() => document.querySelector('[data-go="trips"]').click());
    await page.fill("#tv-code", code.toLowerCase());
    await page.fill("#tv-last", "prueba");
    await page.click("#trips-form button[type=submit]");
    ok(!(await page.textContent("#trips-out")).includes("Sin resultados"), "Mis viajes encuentra la reserva");

    // 8. Panel de la aerolínea
    await page.evaluate(() => document.querySelector('[data-go="admin"]').click());
    ok(await visible("#view-admin"), "Panel de la aerolínea abre");
    ok((await page.textContent("#ops-kpis")).trim().length > 0, "Panel muestra indicadores");

    // 9. Sin desborde horizontal
    ok(!(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)), "Sin scroll horizontal");
  } catch (e) {
    if (!checks.length || checks[checks.length - 1][0]) checks.push([false, e.message.split("\n")[0]]);
    await page.screenshot({ path: path.resolve(__dirname, `fallo-${width}.png`), fullPage: true }).catch(() => {});
  }
  if (errors.length) checks.push([false, "Errores JS: " + errors.join(" | ")]);
  await page.close();
  return checks;
}

(async () => {
  const browser = await chromium.launch({ headless: !process.argv.includes("--headed") });
  let failed = 0;
  for (const width of [1280, 375]) {
    console.log(`\n── ${width === 375 ? "Celular" : "Escritorio"} (${width} px)`);
    for (const [pass, label] of await run(browser, width)) {
      console.log(`${pass ? "✓" : "✗"} ${label}`);
      if (!pass) failed++;
    }
  }
  await browser.close();
  console.log(failed ? `\n${failed} verificación(es) fallaron. Captura en tools/fallo-*.png` : "\nFlujo completo OK");
  process.exit(failed ? 1 : 0);
})();
