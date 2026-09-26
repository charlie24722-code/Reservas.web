# Estela · Reservas.web

Página web de reservas de viaje, autocontenida. **Estela** es una aerolínea ficticia creada para este demo, inspirado en la experiencia de sitios como avianca.com y pensado para presentarse a estudiantes universitarios.

> Todo es simulado: vuelos, precios, estados de vuelo y pago. No se realizan cobros ni se envían datos a ningún servidor.

## Cómo abrirla

Es un solo archivo: abre `index.html` en cualquier navegador (doble clic). No requiere instalación ni internet, salvo para cargar las tipografías.

## Qué se puede demostrar (guion sugerido, ~5 min)

1. **Portada**: tablero de salidas animado (tipo aeropuerto). Tocar una fila rellena el destino.
2. **Buscar**: el buscador es una frase — *"Quiero volar de [San Salvador] a [Bogotá]…"*. Cambiar el destino escribiendo "mad", agregar un niño en *Pasajeros* y usar el código `BIENVENIDO10`.
3. **Resultados**: barra de 7 días con el precio más bajo por fecha, ordenar/filtrar, abrir *Ver tarifas* y comparar Básica / Clásica / Flex.
4. **Pasajeros**: mostrar la validación (dejar campos vacíos y pulsar *Continuar*).
5. **Extras**: elegir asiento en el mapa, agregar maleta y seguro; el resumen se recalcula en vivo.
6. **Pago**: tres opciones (tarjeta vía pasarela, cuotas, apartar 24 h). Se simula la conexión con la pasarela.
7. **Confirmación**: código de reserva tipo aerolínea, compartir por WhatsApp e imprimir.
8. **Mis viajes / Check-in**: buscar la reserva con el código y el apellido.

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
- **Fotos**: se buscan primero en `assets/` (`bogota.jpg`, `cancun.jpg`, `miami.jpg`, `madrid.jpg`, `cabina.jpg`) y, si no existen, se cargan desde los enlaces de Stitch. Para que no dependan de Stitch, descárgalas y súbelas a `assets/` con esos nombres. Si una foto falla, se muestra un fondo de color.
- **Logo provisional**: SVG circular con una estela. Para reemplazarlo, buscar el comentario `LOGO` en `index.html` (header, footer).
- Todos los colores están como variables CSS al inicio de `index.html` (`:root`).
- Adaptada a celular (probada a 375 px), navegación por teclado y contraste AA.

## Investigación de respaldo

Ver [`docs/investigacion.md`](docs/investigacion.md): cómo lo hacen las aerolíneas de la región y qué haría falta para llevarlo a producción.
