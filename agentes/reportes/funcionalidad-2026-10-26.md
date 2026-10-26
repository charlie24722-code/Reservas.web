# Funcionalidad · todo · 2026-10-26

Primera corrida del subagente Funcionalidad, en modo **revisar** (sin modificar código).

**Veredicto: ⚠️ Funciona con detalles**

La reserva completa funciona en escritorio y celular. No hay errores de JavaScript ni de consola, no hay scroll horizontal y los totales cuadran entre portada, globo, ficha y flujo. No hay hallazgos ALTOS. Hay 5 MEDIOS y 3 BAJOS, casi todos en funciones secundarias.

## Pruebas automáticas

- `smoke.js`: ✓ (375 y 1280 px sin scroll horizontal, sin errores JS)
- `flujo.js`: ✓ 21/21 escritorio · ✓ 21/21 celular

| Área | Estado | Evidencia |
|---|---|---|
| Portada y globo | ✓ | El presupuesto cambia el contador y los destinos encendidos (con $150 se encienden 2, con $400 14, con $3,000 42). Los filtros, el zoom, el arrastre, *Sorpréndeme* y *Ver vuelos* funcionan. En la ficha, el día con ★ coincide con el mínimo. |
| Búsqueda | ✓ | Origen = destino da error. *Solo ida* deja un tramo. Tope de 9 pasajeros y no más infantes que adultos. Un código inválido no descuenta; BIENVENIDO10 sí. Business da ×2.60 exacto. |
| Vuelos | ✓ | "MÁS BAJA", cambio de día, los 3 órdenes, el filtro *Directos* y "✓ Ida lista / Cambiar" funcionan. |
| Pasajeros | ⚠️ | Las validaciones de edad, correo y teléfono funcionan, salvo el caso del cumpleaños (hallazgo 2). |
| Extras | ✓ / ⚠️ | No deja elegir asientos ocupados ni repetidos; los precios de asiento y seguro son correctos. El texto de la maleta no coincide con lo que se cobra (hallazgo 5). |
| Pago | ✓ | Cuotas ≈ total/12. *Apartar 24 h* cobra $10. El temporizador se puede extender. |
| Confirmación | ✓ | Voltear pase con QR, Wallet y WhatsApp funcionan. |
| Mis viajes | ⚠️ | Encuentra la reserva sin importar mayúsculas. No deja pagar una reserva apartada (hallazgo 1). |
| Check-in | ⚠️ | Responde "Aún no disponible", "Check-in abierto" o "Sin resultados" según el caso. Abre check-in a una reserva sin pagar (hallazgo 1). |
| Estado de vuelo | ⚠️ | Con la fecha vacía muestra "Invalid Date" (hallazgo 3). |
| Panel | ✓ | Muestra las reservas web; el buscador y los filtros funcionan; no aparece NaN. |
| Coherencia de precios | ✓ total / ⚠️ etiqueta | En 10 destinos, globo = ficha = total del flujo (±$0.40). Hallazgo 4 sobre las etiquetas. |
| Reducir movimiento | ✓ | El globo queda quieto, sin aviones, cortes ni confeti, y todo sigue funcionando. |
| Teclado | ✓ / ⚠️ | La búsqueda se completa solo con teclado (hallazgo 6). |
| Celular 375 px | ✓ | 18 pantallas o estados sin scroll horizontal. |

## Hallazgos

### 1. [MEDIO] Una reserva apartada no se puede pagar y aun así actúa como pagada

**Cómo reproducirlo:** reserva SAL → BOG con salida mañana, elige *Aparta 24 horas*, busca el código en Mis viajes y luego en Check-in.

**Qué pasa:**
- Mis viajes no ofrece completar el pago, aunque la interfaz lo promete.
- La reserva sin pagar recibe un pase de abordar con QR y el check-in queda abierto.
- El plazo de pago puede quedar después de la salida del vuelo.
- "Total a pagar" no descuenta el depósito de $10.

**Dónde está:** `renderDone()`, `passCard()`, los formularios `#panel-checkin`, `#trips-form` y `#panel-trips`, y `confirmBooking()` (`holdUntil`).

**Propuesta:** si la reserva está apartada, mostrar "Pendiente de pago" con un botón para pagar, ocultar el QR, bloquear el check-in y limitar el plazo a la hora de salida.

### 2. [MEDIO] La validación de edad falla el día del cumpleaños

**Qué pasa:**
- Un infante que cumple 2 años el día del vuelo se acepta, y un niño que cumple 2 años ese día se rechaza.
- Si la fecha de nacimiento es posterior al vuelo, el error dice "Un infante debe ser menor de 2 años", que no corresponde.

**Dónde está:** `savePax()`, que calcula la edad con 365.25 días por año.

**Propuesta:** calcular la edad por año, mes y día, y agregar el error "La fecha de nacimiento no puede ser posterior al vuelo".

### 3. [MEDIO] Estado de vuelo muestra "Invalid Date"

**Cómo reproducirlo:** en Estado de vuelo, escribe `EST 290`, borra la fecha y pulsa *Consultar*.

**Dónde está:** el formulario `#panel-status`.

**Propuesta:** pedir la fecha o usar la de hoy por defecto.

### 4. [MEDIO · lo decide Christian] Los precios de resultados no incluyen impuestos, aunque el sitio dice que sí

**Ejemplo:** BOG marca $324 en el globo, pero en resultados la ida dice "Desde $136" y el regreso "Desde $121" ($257 entre los dos). El total final sí da $323.84.

**Qué pasa:** la barra de 7 días, el "Desde" y el precio de cada tarifa se muestran antes de impuestos. Eso contradice "Tarifa final con impuestos" y "Precio final desde el inicio".

**Propuesta:** mostrar el precio con impuestos en todas partes, o etiquetarlo "+ impuestos".

### 5. [MEDIO · lo decide Christian] La maleta dice "Por trayecto" pero se cobra una sola vez

**Qué pasa:** en un viaje de ida y vuelta, una maleta se cobra $35, no $70.

**Dónde está:** el texto en `renderExtras()` y el cálculo de `totals()`.

**Propuesta:** cobrar por tramo, o cambiar el texto a "para todo el viaje".

### 6. [BAJO] Escape no cierra el selector de pasajeros al llegar al límite con teclado

**Qué pasa:** al llegar a 9 adultos, el botón + se deshabilita, el foco se pierde y Escape deja de funcionar.

**Propuesta:** pasar el foco al botón "Listo".

### 7. [BAJO] "Total $0.00" antes de elegir vuelo

**Qué pasa:** se ve en el resumen y en la barra fija del celular.

**Propuesta:** mostrar "—" hasta que se elija un vuelo.

### 8. [BAJO · lo decide Christian] Texto en inglés "DEPARTURES" en el tablero de salidas

**Propuesta:** quitarlo, o dejarlo si el estilo bilingüe de aeropuerto es intencional.

## No revisado

- Elegir una fecha en el calendario nativo con teclado.
- La página real de WhatsApp (la red del entorno de pruebas la bloquea).
- Copiar al portapapeles: funciona el mensaje alternativo.
- El diálogo de impresión.
- Los gestos táctiles reales.
- El estado "check-in cerrado".
- El contraste AA y la calidad visual de las animaciones.
- Otros navegadores: solo se probó Chromium.
