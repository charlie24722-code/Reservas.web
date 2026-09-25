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

## Diseño: "señalética de aeropuerto"

| Token | Color | Uso |
|---|---|---|
| `--sign` | `#FFC629` | Amarillo señalética: botones y acentos |
| `--night` | `#0E1526` | Azul noche: texto y fondos oscuros |
| `--sky` | `#2B54D6` | Azul cielo: enlaces y tarifa Flex |
| `--floor` | `#F3F1EC` | Piso de terminal: fondo general |

- Tipografías: Bricolage Grotesque (títulos), Hanken Grotesk (texto), JetBrains Mono (códigos, horas y precios).
- Elementos propios: tablero de salidas *split-flap*, buscador en forma de frase, ofertas como etiquetas de equipaje, progreso como ruta de vuelo y pase de abordar con sello y QR.
- Todos los colores están como variables CSS al inicio de `index.html` (`:root`), para cambiar de marca en un solo lugar.
- **Logo provisional**: SVG de una estela. Para reemplazarlo, buscar el comentario `LOGO` en `index.html` (header, footer y `ICON.logo` en el script).
- Adaptada a celular (probada a 375 px), navegación por teclado y contraste AA.

## Investigación de respaldo

Ver [`docs/investigacion.md`](docs/investigacion.md): cómo lo hacen las aerolíneas de la región y qué haría falta para llevarlo a producción.
