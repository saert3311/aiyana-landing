# Changelog

Todos los cambios relevantes de este proyecto se documentan en este archivo siguiendo el formato [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/).

## [1.0.0] - 2026-11-23

### Added
- Landing page estática para **Espai Aiyana Eventos Alfafar** construida con Astro 5 y Tailwind CSS v4 ([src/pages/index.astro](src/pages/index.astro), [src/layouts/Layout.astro](src/layouts/Layout.astro)).
- Catálogo de datos reales extraídos de `@espai.aiyana_eventos` y Google Maps en [src/data/venue.ts](src/data/venue.ts), incluyendo dirección en Alfafar, teléfono `667 43 96 23`, accesibilidad verificada, reseñas (`5,0` estrellas y `17` opiniones) y esquema JSON-LD `EventVenue`.
- Galería optimizada en WebP mediante `sharp` a partir de 8 fotografías reales del salón en `src/assets/images/`.
- Cabecera fija adaptable al scroll y menú móvil accesible ([src/components/Header.astro](src/components/Header.astro), [src/components/BrandMark.astro](src/components/BrandMark.astro)).
- Selector interactivo accesible de formatos de celebración (`Cumpleaños y sorpresas`, `Baby showers y familia`, `Talleres y pop-ups`, `Catas y veladas`) en [src/components/EventShowcase.astro](src/components/EventShowcase.astro).
- Acordeón nativo de preguntas frecuentes (`<details>`) y constructor de consulta para WhatsApp con validación diferida `:user-invalid` y respaldo `WeakMap` ([src/components/BookingForm.astro](src/components/BookingForm.astro), [src/lib/whatsapp.ts](src/lib/whatsapp.ts)).
- Suite automatizada de verificación de lógica y HTML/CSS compilado en [tests/verify.test.mjs](tests/verify.test.mjs).
- Documentación de repositorio y arquitectura: [README.md](README.md), [AGENTS.md](AGENTS.md), `.gitignore` y registros ADR (`docs/decisions/ADR-001` a `ADR-003`).
