# Estela · Reservas.web

Página web de reservas de viaje, autocontenida. **Estela** es una aerolínea ficticia creada para este demo, inspirado en la experiencia de sitios como avianca.com y pensado para presentarse a estudiantes universitarios.

> Todo es simulado: vuelos, precios, estados de vuelo y pago. No se realizan cobros ni se envían datos a ningún servidor.

## Cómo abrirla

Es un solo archivo: abre `index.html` en cualquier navegador (doble clic). No requiere instalación ni internet, salvo para cargar las tipografías.

## Qué se puede demostrar (guion sugerido, ~5 min)

1. **Portada: globo 3D por presupuesto.** Al abrir, el globo gira hasta América y se dibujan las rutas desde San Salvador; los aviones vuelan las rutas que caben en el presupuesto. La frase *"Tengo [$400] y [4 días] en [noviembre]. ¿A dónde voy?"* controla el globo: al mover el presupuesto se encienden los destinos que alcanzan. Filtrar por Playa / Ciudad / Montaña / Cultura, girar el globo arrastrando, acercar con +/−, tocar una ciudad y pulsar *Ver vuelos*. Los precios salen del mismo motor que el flujo (ida y vuelta, tarifa Básica, impuestos incluidos).
2. **Búsqueda clásica**: más abajo, *"¿Ya sabes a dónde vas?"* con el buscador en forma de frase. Escribir "mad" en el destino, agregar un niño y usar el código `BIENVENIDO10`. El tablero de salidas marca en el mapa el vuelo que toques.
3. **Resultados**: barra de 7 días con el precio más bajo por fecha, ordenar/filtrar, abrir *Ver tarifas* y comparar Básica / Clásica / Flex.
4. **Pasajeros**: mostrar la validación (dejar campos vacíos y pulsar *Continuar*).
5. **Extras**: elegir asiento en el mapa, agregar maleta y seguro; el resumen se recalcula en vivo.
6. **Pago**: tres opciones (tarjeta vía pasarela, cuotas, apartar 24 h). Se simula la conexión con la pasarela.
7. **Confirmación**: código de reserva tipo aerolínea, compartir por WhatsApp e imprimir.
8. **Mis viajes / Check-in**: buscar la reserva con el código y el apellido.
9. **Ficha de destino**: tocar una tarjeta de *Caben en tu presupuesto* abre la ficha con clima aproximado, qué hacer y el calendario de precios del mes (el día más barato marcado con ★).
10. **Pase de abordar 3D**: en la confirmación, *Voltear pase* muestra el reverso con el código QR; *Apple/Google Wallet* anima el pase hacia la billetera (simulado).
11. **Panel de la aerolínea** (menú del avatar o *Panel*): indicadores del día, ocupación por vuelo, ingresos por tarifa y manifiesto de pasajeros con búsqueda. Las reservas hechas en el navegador aparecen marcadas como *web*.

En viajes de ida y vuelta, al elegir la tarifa de ida la página pasa al **regreso** (la banda muestra el destino → SAL y el indicador *✓ Ida lista → 2 · Regreso*).

## Diseño: "serenidad editorial" (base Stitch + piezas propias)

| Token | Color | Uso |
|---|---|---|
| `--primary` | `#06080a` | Negro: títulos, botones oscuros, pase de abordar |
| `--gold` | `#775a19` | Dorado: botones principales y acentos |
| `--gold-soft` | `#fed488` | Fondos dorados suaves |
| `--sage` | `#0e241b` | Verde salvia: confirmaciones y fila de emergencia |
| `--surface` | `#faf9f6` | Fondo general |

- Tipografías: Newsreader (títulos y cifras), Plus Jakarta Sans (texto), JetBrains Mono (tablero de salidas).
- Base visual generada con Stitch; se conservan el tablero de salidas *split-flap* y el buscador en forma de frase.
- **Fotos**: se buscan en `assets/` con estos nombres: `bogota.jpg`, `cancun.jpg`, `miami.jpg`, `madrid.jpg`, `sanjose.jpg`, `panama.jpg`, `lima.jpg`, `mexico.jpg`, `nuevayork.jpg`, `cartagena.jpg`, `guatemala.jpg`, `losangeles.jpg`, `santiago.jpg`, `barcelona.jpg`, `quito.jpg`, `saopaulo.jpg` y `cabina.jpg`. Si falta alguna, la tarjeta muestra el código del aeropuerto sobre un fondo de color. Tamaño recomendado: 1600 px de ancho, JPG. Créditos (Pexels): Quito, Diego F. Parra; São Paulo, Luiz Silva.
- **Globo**: dibujado en `<canvas>` sin librerías. Los continentes salen de una máscara de tierra real de 1° (paquete `global-land-mask`), incrustada en el HTML (~11 KB). Rutas en arco (círculo máximo), aviones con estela y estrellas. Con *reducir movimiento* activado, el globo queda quieto y sin aviones.
- **Animación en el flujo**: avión en la ruta del encabezado, en cada vuelo (al pasar el mouse), en la pantalla de pago, despegue en la confirmación y en el pase de abordar.
- **Logo**: los archivos maestros están en `assets/` (`estela-logo.png` para fondos claros, `estela-dark.png` para fondos oscuros, `estela-favicon.png`, `estela-symbol.png`, `estela-horizontal*.png`). La página usa copias ligeras: `web-logo.png` (header y footer), `web-logo-dark.png` (pase de abordar) y `web-favicon.png`.
- Todos los colores están como variables CSS al inicio de `index.html` (`:root`).
- Adaptada a celular (probada a 375 px), navegación por teclado y contraste AA.

## Documentos de la aerolínea (demo)

Enlazados desde el pie de página y desde el paso de pago:
[Política de equipaje](docs/politica-de-equipaje.md) · [Cambios y reembolsos](docs/cambios-y-reembolsos.md) · [Términos de compra en línea](docs/terminos-de-compra-en-linea.md) · [Aviso de privacidad](docs/aviso-de-privacidad.md)

## Investigación de respaldo

Ver [`docs/investigacion.md`](docs/investigacion.md): cómo lo hacen las aerolíneas de la región y qué haría falta para llevarlo a producción.
