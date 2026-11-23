# ADR-002: Constructor de consulta a WhatsApp en lugar de backend propio

## Status
Accepted

## Date
2026-11-23

## Context
En la operativa actual de Espai Aiyana (`@espai.aiyana_eventos` y ficha de Google Maps), las reservas, horarios a medida y presupuestos de sala o catering se atienden personalmente con Isabel por WhatsApp (`667 43 96 23`), teléfono o mensaje directo. No existen tarifas cerradas por franja publicadas ni sistema de reserva automática en línea.

## Decision
Implementar en `src/components/BookingForm.astro` y `src/lib/whatsapp.ts` un formulario con validación nativa diferida (`:user-invalid` + región `aria-live="polite"`) que construye un resumen legible y un enlace directo `https://wa.me/34667439623?text=...` pre-rellenado para abrir WhatsApp con un clic, manteniendo la llamada telefónica directa (`tel:+34667439623`) como alternativa inmediata.

## Alternatives Considered

### API serverless con envío por correo electrónico (SMTP / Resend)
- **Pros:** Envío transparente sin depender de que el usuario pulse abrir WhatsApp.
- **Contras:** Requiere gestionar claves secretas, protección antispam/CAPTCHA, política de tratamiento de datos personales en servidor y rompe la respuesta inmediata por WhatsApp que ya usa la propietaria.
- **Rejected:** Añade infraestructura y fricción innecesarias para el flujo real del negocio.

### Servicio SaaS de formularios de terceros (Formspree / Tally)
- **Pros:** Sin mantenimiento de backend propio.
- **Contras:** Introduce dependencias externas, límites de envíos gratuitos, latencia de terceros y un canal desconectado del WhatsApp directo de atención.
- **Rejected:** El enlace pre-rellenado a WhatsApp convierte mejor y refleja exactamente cómo atiende Isabel.

## Consequences
- **Positivas:** Cero secretos de API, cero almacenamiento de datos personales en servidor y compatibilidad total con alojamiento estático gratuito.
- **Trade-offs:** No existe registro automático en base de datos ni bloqueo en tiempo real de fechas en calendario; si en el futuro se incorpora agenda en vivo o pasarela de señal, bastará con sustituir el manejador `submit` en `BookingForm.astro` manteniendo intacta la validación accesible.
