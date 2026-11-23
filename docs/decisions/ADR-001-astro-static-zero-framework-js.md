# ADR-001: Arquitectura estática en Astro 5 sin framework de UI en cliente

## Status
Accepted

## Date
2026-11-23

## Context
Espai Aiyana Eventos Alfafar necesita una landing page rápida orientada a conversión local (reservas por WhatsApp y teléfono) para celebraciones privadas en Alfafar, Valencia. El sitio tiene interactividad acotada: menú móvil, pestañas de formatos de celebración, acordeón de preguntas frecuentes, encabezado adaptable al scroll y constructor de consulta para WhatsApp. No requiere autenticación, paneles de administración ni estado compartido complejo.

## Decision
Construir la landing page como sitio 100% estático (`output: "static"`) con **Astro 5**, **Tailwind CSS v4** mediante `@tailwindcss/vite`, **HTML semántico**, **CSS moderno** (`animation-timeline`, `:user-invalid`, `<details>`) y **TypeScript mínimo en cliente** sin frameworks de UI en runtime ni librerías externas de iconos o animación.

## Alternatives Considered

### Next.js o SPA con React + Framer Motion
- **Pros:** Ecosistema amplio de componentes y transiciones declarativas en JS.
- **Contras:** Envía decenas de kilobytes de runtime JavaScript innecesarios para una landing informativa, obliga a hidratar secciones estáticas y añade complejidad de mantenimiento y dependencias.
- **Rejected:** Penaliza la velocidad inicial sin aportar valor real frente a primitivas nativas de plataforma.

### Astro con islas de React para pestañas y formulario
- **Pros:** Estado reactivo familiar en los dos bloques interactivos.
- **Contras:** Introduce dependencias extra (`@astrojs/react`, `react`, `react-dom`) para lógica que ocupa menos de ~2 kB comprimidos en TypeScript nativo del navegador.
- **Rejected:** La arquitectura sin runtime de framework cumple el requisito de velocidad con mínimo código propio.

## Consequences
- **Positivas:** El HTML se genera completo en compilación, el script de cliente queda reducido al mínimo (alrededor de 2 kB gzip para el formulario y scripts ligeros en cabecera/pestañas) y el despliegue funciona en cualquier hosting estático sin servidor Node en producción.
- **Trade-offs técnicos:**
  - Los navegadores sin soporte completo de `animation-timeline` o `:user-invalid`, o usuarios con `prefers-reduced-motion: reduce`, dependen de respaldos ligeros explícitos en `Header.astro` y `BookingForm.astro` (seguimiento con `WeakMap`).
  - Con `pnpm` v10, el proyecto debe declarar `"pnpm": { "onlyBuiltDependencies": ["esbuild", "sharp"] }` en `package.json` y mantener `sharp` como dependencia directa para que `astro:assets` compile los binarios nativos de procesamiento WebP.
