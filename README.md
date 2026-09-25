# Reservas.web

Página web de reservas de viaje, autocontenida. Prototipo de demostración inspirado en la experiencia de sitios de aerolíneas (tipo avianca.com), pensado para presentarse a estudiantes universitarios.

> Todo es simulado: vuelos, precios, estados de vuelo y pago. No se realizan cobros ni se envían datos a ningún servidor.

## Cómo abrirla

Es un solo archivo: abre `index.html` en cualquier navegador (doble clic). No requiere instalación ni internet, salvo para cargar las tipografías.

## Qué se puede demostrar (guion sugerido, ~5 min)

1. **Portada**: buscador con pestañas (Reservar, Check-in, Mis viajes, Estado de vuelo). Al cambiar origen/destino, la ruta animada del encabezado se actualiza.
2. **Buscar**: escribir "mad" en *Hacia* (autocompletado), agregar un niño en *Pasajeros*, usar el código `BIENVENIDO10`.
3. **Resultados**: barra de 7 días con el precio más bajo por fecha, ordenar/filtrar, abrir *Ver tarifas* y comparar Básica / Clásica / Flex.
4. **Pasajeros**: mostrar la validación (dejar campos vacíos y pulsar *Continuar*).
5. **Extras**: elegir asiento en el mapa, agregar maleta y seguro; el resumen se recalcula en vivo.
6. **Pago**: tres opciones (tarjeta vía pasarela, cuotas, apartar 24 h). Se simula la conexión con la pasarela.
7. **Confirmación**: código de reserva tipo aerolínea, compartir por WhatsApp e imprimir.
8. **Mis viajes / Check-in**: buscar la reserva con el código y el apellido.

## Diseño

- Paleta y tipografías tomadas de las *brand guidelines* usadas en el proyecto: `#141413`, `#faf9f5`, `#d97757`, `#6a9bcc`, `#788c5d`; títulos en Poppins, texto en Lora.
- Todos los colores están como variables CSS al inicio de `index.html` (`:root`), para cambiar de marca en un solo lugar.
- Adaptada a celular, con navegación por teclado y contraste AA en textos.

## Investigación de respaldo

Ver [`docs/investigacion.md`](docs/investigacion.md): cómo lo hacen las aerolíneas de la región y qué haría falta para llevarlo a producción.
