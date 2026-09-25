# Investigación de respaldo (septiembre 2026)

Resumen de dos investigaciones hechas en paralelo para el prototipo. Útil para responder preguntas en la presentación. Los datos marcados con **[verificar]** provienen de fuentes secundarias y deben confirmarse antes de usarlos en un proyecto real.

## 1. Cómo lo hacen las aerolíneas (UX)

| Elemento | Avianca | Copa | LATAM | Volaris |
|---|---|---|---|---|
| Pestañas en portada | Reservar, Check-in, Gestionar reserva, Estado de vuelo | Reservar, Web Check-in, Mis viajes, Estado | Vuelos, Check-in, Mis viajes, Estado | Vuelos, Check-in, Mis viajes |
| Check-in en línea | 48 h antes (24 h con EE. UU./Canadá) | 24 h antes | — | 72 h antes |
| Familias tarifarias | Basic / Light / Classic / Flex / Business | Basic / Classic / Full / Extra | Basic / Light / Full / Premium | Zero / Básica / Plus |
| "Aparta y paga después" | — | PriceLock (3 o 7 días) y retención 24 h | — | Aparta tu vuelo (24 h) |

**Flujo típico:** búsqueda → ida → regreso → tarifa → pasajeros → extras (asientos, equipaje, seguro) → pago → confirmación con código de reserva.

**Buenas prácticas aplicadas en el prototipo** (Baymard Institute, NN/g, W3C):

- El abandono promedio de carritos ronda el **70 %**. Los costos sorpresa y los checkouts largos son de las principales causas, por eso el total con impuestos se muestra siempre.
- Comparar tarifas lado a lado con ✓/✗ reduce la confusión entre familias.
- Sellos de seguridad junto al pago (≈18 % de usuarios los busca antes de pagar).
- Teclado adecuado en móvil (email, teléfono), errores junto al campo.
- Temporizador de precio con opción de extender el tiempo (WCAG 2.2.1).

## 2. Qué haría falta para llevarlo a producción

| Tema | Hallazgo clave |
|---|---|
| Vender vuelos reales | Amadeus Self-Service **cerró en julio 2026**. Kiwi Tequila es solo por invitación. Sabre y Travelport exigen acreditación IATA. **Duffel** es la vía más accesible, pero el margen queda en ~1–3 % y hay que confirmar si acepta empresas salvadoreñas **[verificar]**. |
| Alternativa realista | Usar el mismo modelo de reserva con inventario propio (tours, eventos, transporte), construido en Next.js + Supabase. |
| Pagos en El Salvador | **Wompi** (Banco Agrícola): ~2.85 %, API documentada, cuotas, checkout alojado. N1co como respaldo. Stripe no abre cuentas de comercio en El Salvador. |
| Notificaciones | Correo con Resend (gratis hasta 3,000/mes) y plantillas de WhatsApp Cloud API (~$0.01 por mensaje de utilidad **[verificar]**). |
| Legal | Ley de Protección de Datos Personales (2024), derecho de retracto de 8 días (Ley de Protección al Consumidor), inscripción en el Registro Único de Proveedores de Comercio Electrónico (Defensoría del Consumidor) y PCI-DSS: nunca tocar datos de tarjeta, usar checkout alojado. |
| Costo fijo de un MVP | ~$46–81 al mes (Vercel Pro, Supabase Pro, dominio, correo, WhatsApp) más comisiones de la pasarela **[estimado]**. |

## Fuentes principales

- Avianca, familias tarifarias: https://www.avianca.com/en/avianca-experience/classes-and-fares/fare-types
- Avianca, compra paso a paso: https://www.avianca.com/ec/es/experiencia/comprar-en-avianca/paso-a-paso/
- Copa, clases de tarifa: https://help.copaair.com/hc/en-us/articles/360051189074
- Copa, PriceLock: https://www.copaair.com/es-ec/descubre-copa-airlines/experiencia-digital/pricelock/
- Volaris, Aparta tu vuelo: https://cms.volaris.com/es/informacion-util/servicios-opcionales/aparta-tu-vuelo/
- Baymard, reservas de vuelos: https://baymard.com/research/flight-booking-and-airlines
- NN/g, entrada de fechas: https://www.nngroup.com/articles/date-input/
- W3C, WCAG 2.2.1: https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable
- Cierre de Amadeus Self-Service: https://www.phocuswire.com/amadeus-shut-down-self-service-apis-portal-developers
- Duffel, precios: https://duffel.com/pricing
- Wompi El Salvador: https://www.bancoagricola.com/wompi · https://docs.wompi.sv
- Ley de Protección de Datos Personales: https://www.asamblea.gob.sv/sites/default/files/documents/decretos/7A4FBD85-7E1B-46BE-9408-6FC549E53E00.pdf
- Registro de comercio electrónico: https://www.defensoria.gob.sv/noticias/defensoria-del-consumidor-implementa-registro-unico-de-proveedores-de-bienes-y-servicios-en-comercio-electronico/
- PCI-DSS SAQ A: https://blog.pcisecuritystandards.org/faq-clarifies-new-saq-a-eligibility-criteria-for-e-commerce-merchants
