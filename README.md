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
- **Fotos**: se buscan en `assets/` con estos nombres: `bogota.jpg`, `cancun.jpg`, `miami.jpg`, `madrid.jpg`, `sanjose.jpg`, `panama.jpg`, `lima.jpg`, `mexico.jpg`, `nuevayork.jpg`, `cartagena.jpg`, `guatemala.jpg`, `losangeles.jpg`, `santiago.jpg`, `barcelona.jpg`, `quito.jpg`, `saopaulo.jpg` y `cabina.jpg`. Destinos agregados en todo el mundo: `toronto.jpg`, `chicago.jpg`, `sanfrancisco.jpg`, `lasvegas.jpg`, `orlando.jpg`, `lahabana.jpg`, `puntacana.jpg`, `roatan.jpg`, `medellin.jpg`, `buenosaires.jpg`, `riodejaneiro.jpg`, `cusco.jpg`, `paris.jpg`, `londres.jpg`, `roma.jpg`, `amsterdam.jpg`, `lisboa.jpg`, `estambul.jpg`, `elcairo.jpg`, `marrakech.jpg`, `ciudaddelcabo.jpg`, `dubai.jpg`, `tokio.jpg`, `seul.jpg`, `bangkok.jpg` y `sidney.jpg`. Si falta alguna, la tarjeta muestra el código del aeropuerto sobre un fondo de color. Tamaño recomendado: 1600 px de ancho, JPG. Créditos (Pexels): Quito, Diego F. Parra; São Paulo, Luiz Silva.
- **Destinos**: 42 en América, Europa, África, Medio Oriente, Asia y Oceanía, todos desde San Salvador. Las escalas son realistas: Europa y África por Madrid, Miami, Houston o Nueva York; Asia y Oceanía por Los Ángeles o Houston. El presupuesto llega a $3,000.
- **Globo**: dibujado en `<canvas>` sin librerías. Los continentes salen de una máscara de tierra real de 1° (paquete `global-land-mask`), incrustada en el HTML (~11 KB). Rutas en arco (círculo máximo), aviones con estela y estrellas. Con *reducir movimiento* activado, el globo queda quieto y sin aviones.
- **Animación en el flujo**: avión en la ruta del encabezado, en cada vuelo (al pasar el mouse), en la pantalla de pago, despegue en la confirmación y en el pase de abordar.
- **Logo**: los archivos maestros están en `assets/` (`estela-logo.png` para fondos claros, `estela-dark.png` para fondos oscuros, `estela-favicon.png`, `estela-symbol.png`, `estela-horizontal*.png`). La página usa copias ligeras: `web-logo.png` (header y footer), `web-logo-dark.png` (pase de abordar) y `web-favicon.png`.
- Todos los colores están como variables CSS al inicio de `index.html` (`:root`).
- Adaptada a celular (probada a 375 px), navegación por teclado y contraste AA.

## Créditos de fotografías

Fotos de [Pexels](https://www.pexels.com/license/) (licencia de uso gratuito), recortadas a 1600 × 1200.

- Quito: foto de Diego F. Parra ([enlace](https://www.pexels.com/photo/aerial-panorama-of-quito-cityscape-18589172/))
- São Paulo: foto de Luiz Silva ([enlace](https://www.pexels.com/photo/golden-hour-cityscape-of-sao-paulo-avenue-32756086/))
- Toronto: foto de Héctor Berganza ([enlace](https://www.pexels.com/photo/cn-tower-and-toronto-cityscape-at-sunset-25696388/))
- Chicago: foto de Jim ([enlace](https://www.pexels.com/photo/chicago-skyline-overlooking-lake-michigan-daytime-29240338/))
- San Francisco: foto de Mo Eid ([enlace](https://www.pexels.com/photo/golden-gate-bridge-at-sunset-18876975/))
- Las Vegas: foto de Stephen Leonardi ([enlace](https://www.pexels.com/photo/las-vegas-illuminated-at-dusk-18041018/))
- Orlando: foto de M-DESIGNZ LLC ([enlace](https://www.pexels.com/photo/city-view-over-the-lake-7453854/))
- La Habana: foto de Mehmet Turgut Kirkgoz ([enlace](https://www.pexels.com/photo/cars-on-the-street-11722788/))
- Punta Cana: foto de Diego ([enlace](https://www.pexels.com/photo/people-on-the-beach-10956539/))
- Roatán: foto de Hugo Rodríguez ([enlace](https://www.pexels.com/photo/resort-aerial-view-1630334/))
- Medellín: foto de Santiago Molina ([enlace](https://www.pexels.com/photo/high-rise-buildings-in-a-city-near-mountain-range-13782895/))
- Buenos Aires: foto de Aldo Bordoni ([enlace](https://www.pexels.com/photo/colorful-buildings-in-la-boca-buenos-aires-36997589/))
- Río de Janeiro: foto de Joao Ricardo Januzzi ([enlace](https://www.pexels.com/photo/sugarloaf-mountain-on-the-coast-in-rio-de-janeiro-brazil-9229102/))
- Cusco: foto de Amelia Cui ([enlace](https://www.pexels.com/photo/machu-picchu-in-peru-14038161/))
- París: foto de Seweryno Seweryn ([enlace](https://www.pexels.com/photo/the-eiffel-tower-is-seen-at-sunset-in-paris-28215960/))
- Londres: foto de el perfil Pixabay ([enlace](https://www.pexels.com/photo/london-cityscape-460672/))
- Roma: foto de Görkem Özdemir ([enlace](https://www.pexels.com/photo/the-colosseum-rome-italy-15562413/))
- Ámsterdam: foto de Saksham Vikram ([enlace](https://www.pexels.com/photo/traditional-amsterdam-canal-houses-at-sunset-32467330/))
- Lisboa: foto de Emre Bilgiç ([enlace](https://www.pexels.com/photo/scenic-view-of-lisbon-s-alfama-district-at-sunset-36289626/))
- Estambul: foto de Osman Özavcı ([enlace](https://www.pexels.com/photo/view-of-the-blue-mosque-from-across-the-bosphorus-strait-istanbul-turkey-18398447/))
- El Cairo: foto de Matheus De Moraes Gugelmim ([enlace](https://www.pexels.com/photo/gyza-pyramids-at-sunset-20284254/))
- Marrakech: foto de Tony Zohari ([enlace](https://www.pexels.com/photo/vibrant-evening-at-jemaa-el-fnaa-marrakesh-35891424/))
- Ciudad del Cabo: foto de Wade Whitear ([enlace](https://www.pexels.com/photo/aerial-view-of-city-near-mountains-4752436/))
- Dubái: foto de Abid Ali ([enlace](https://www.pexels.com/photo/stunning-dubai-skyline-at-sunset-35664163/))
- Tokio: foto de Andrey Grushnikov ([enlace](https://www.pexels.com/photo/treasure-house-gate-and-five-storied-pagoda-in-senso-ji-buddhist-temple-21759449/))
- Seúl: foto de Jan Tang ([enlace](https://www.pexels.com/photo/seoul-cityscape-at-dusk-with-namsan-tower-35838395/))
- Bangkok: foto de Olivier Darny ([enlace](https://www.pexels.com/photo/wat-arun-temple-in-bangkok-17746130/))
- Sídney: foto de Ben Mack ([enlace](https://www.pexels.com/photo/stylish-modern-building-and-arch-bridge-crossing-harbor-against-cloudy-sundown-sky-5707602/))

## Documentos de la aerolínea (demo)

Enlazados desde el pie de página y desde el paso de pago:
[Política de equipaje](docs/politica-de-equipaje.md) · [Cambios y reembolsos](docs/cambios-y-reembolsos.md) · [Términos de compra en línea](docs/terminos-de-compra-en-linea.md) · [Aviso de privacidad](docs/aviso-de-privacidad.md)

## Investigación de respaldo

Ver [`docs/investigacion.md`](docs/investigacion.md): cómo lo hacen las aerolíneas de la región y qué haría falta para llevarlo a producción.
