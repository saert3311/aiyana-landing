# AGENTS.md

Guía operativa para agentes de código y mantenedores de **Espai Aiyana Eventos Alfafar**. Resume las fuentes de verdad, convenciones estrictas de diseño y trampas conocidas del proyecto para no re-decidir ni romper garantías ya verificadas.

## 1. Fuente única de verdad y regla de veracidad

Toda la información comercial del salón vive en [src/data/venue.ts](src/data/venue.ts):

- **Nombre:** Espai Aiyana (`Espai Aiyana Eventos Alfafar`), gestionado por **Isabel**.
- **Dirección:** `Carrer Julio Colomer, 18, bajo izquierda, 46910 Alfafar, Valencia`.
- **Teléfono / WhatsApp:** `667 43 96 23` (`+34667439623`).
- **Redes y ficha:** Instagram `@espai.aiyana_eventos` y ficha verificada de Google Maps (`5,0` estrellas sobre `17 reseñas`).
- **Accesibilidad verificada:** Entrada a pie de calle y dos baños adaptados para personas en silla de ruedas.

**Regla crítica de negocio:** Nunca inventes horarios de apertura, metros cuadrados, aforo máximo ni precios de alquiler de sala en texto visible, metadatos o esquema JSON-LD a menos que la propietaria los aporte explícitamente. Todas las consultas de disponibilidad y presupuesto se canalizan vía [src/lib/whatsapp.ts](src/lib/whatsapp.ts) hacia WhatsApp o teléfono directo.

## 2. Stack, comandos y política de dependencias

- **Framework:** Astro 5 (`output: "static"`) + Tailwind CSS v4 (`@tailwindcss/vite`) + `sharp`.
- **Cero frameworks UI en cliente:** No instales React, Vue, Framer Motion ni paquetes de iconos externos salvo necesidad justificada mediante un nuevo ADR.
- **Comandos estándar:**
  - `pnpm install` (requiere mantener `"pnpm": { "onlyBuiltDependencies": ["esbuild", "sharp"] }` en [package.json](package.json))
  - `pnpm dev` (servidor local en `http://localhost:4321`)
  - `pnpm build` (compila `dist/` y optimiza variantes WebP)
  - `pnpm test` (ejecuta `node --test tests/verify.test.mjs` sobre lógica y artefacto compilado `dist/index.html`)

## 3. Convenciones de diseño y copia (verificadas automáticamente)

Los tokens globales residen en [src/styles/global.css](src/styles/global.css):

- **Paleta:** Porcelana `#FAFBF9` (`porcelain`), eucalipto suave `#EFF4F2` (`mist`), verde esmeralda del local `#154B43` (`emerald-brand`), tinta `#141D1B` (`ink`) y rosa loto `#E8B4BC` (`lotus`, reservado únicamente al emblema SVG de [src/components/BrandMark.astro](src/components/BrandMark.astro)). Prohibidos el morado/violeta y el negro puro `#000000`.
- **Tipografía:** Exclusivamente `Bricolage Grotesque` (títulos) y `Outfit` (cuerpo e interfaz), con `tabular-nums` para cifras (nunca añadas una tercera fuente monoespaciada). Debajo del hero, respeta los 3 tamaños de cuerpo (`--text-heading`, `--text-body` a `17px`, `--text-sm` a `14px`) y evita textos menores de `13px`.
- **Higiene de estructura y texto:**
  - Cero emojis en HTML, TS, CSS o atributos `alt`.
  - Cero rayas tipográficas (`—`) ni semirrayas espaciadas (` – `).
  - Cero encabezados (`<h1>`–`<h6>`) dentro de `<summary>`.
  - Cero `transition: all` / `transition-all`; declara siempre las propiedades animadas explícitas y respeta `prefers-reduced-motion: reduce`.
  - Exactamente un `<h1>` por página y máximo un CTA primario por sección de contenido.
  - Evita etiquetas *eyebrow* sobre `<h1>`/`<h2>`, chips o cápsulas decorativas no interactivas, rejillas de 3 tarjetas iguales en fila y `h-screen` en el hero (usa `min-h-[100svh]`).

## 4. Patrones web modernos y gotchas documentados

- **Prioridad de imágenes (`optimize-image-priority`):** Solo la imagen LCP del hero en [src/pages/index.astro](src/pages/index.astro) lleva `priority` (`fetchpriority="high"`, sin `loading="lazy"`). Las imágenes visibles bajo el pliegue usan `loading="lazy"` sin `fetchpriority="low"`, y `fetchpriority="low"` queda reservado para las pestañas ocultas iniciales de [src/components/EventShowcase.astro](src/components/EventShowcase.astro).
- **Cabecera fija en scroll (`shrinking-header-on-scroll`):** En [src/styles/global.css](src/styles/global.css), `animation-timeline` y `animation-range` deben declararse **después** de la propiedad abreviada `animation` para no reiniciar la línea temporal. Mantén `scroll-padding-top: 84px` en `html` y conserva el respaldo por scroll en [src/components/Header.astro](src/components/Header.astro) para navegadores sin soporte o usuarios con reducción de movimiento.
- **Revelado progresivo (`scroll-entry-exit-effects`):** Mantén `@supports ((animation-timeline: view()) and (animation-range: entry))` dentro de `@media (prefers-reduced-motion: no-preference)`. Nunca dejes elementos ocultos por defecto con `opacity: 0` fuera de ese bloque.
- **Acordeón nativo (`accordion`):** Usa elementos `<details>` independientes (sin atributo `name` exclusivo) y `contain: layout` junto a `interpolate-size: allow-keywords` en `::details-content`.
- **Validación de formulario (`validate-input-after-interaction`):** En [src/components/BookingForm.astro](src/components/BookingForm.astro), las pistas van **encima** de cada campo, `aria-describedby` nunca apunta a `.error-msg` en el HTML inicial (solo mientras `:user-invalid` está activo), una única región `.visually-hidden` con `aria-live="polite"` anuncia errores y existe respaldo `WeakMap` si `:user-invalid` no está soportado.
- **Gotchas visuales comprobados:**
  - Mantén `isolate` en el contenedor del `<iframe>` de Google Maps en [src/pages/index.astro](src/pages/index.astro) para evitar artefactos de composición en Chromium bajo el encabezado translúcido.
  - Mantén `aspect-[10/9]` y `object-right` en `isabel-buffet.jpg` para recortar a los asistentes parciales del borde izquierdo.

## 5. Verificación mínima tras cualquier cambio

Ejecuta siempre ambos comandos después de editar código, estilos o datos, y comprueba visualmente en móvil (`390px`) y escritorio si cambias layout:

```sh
pnpm build && pnpm test
```

## 6. Índice de ADRs

- [ADR-001: Arquitectura estática en Astro 5 sin framework de UI en cliente](docs/decisions/ADR-001-astro-static-zero-framework-js.md)
- [ADR-002: Constructor de consulta a WhatsApp en lugar de backend propio](docs/decisions/ADR-002-whatsapp-inquiry-builder-no-backend.md)
- [ADR-003: Uso de fotografías reales del local optimizadas en local](docs/decisions/ADR-003-real-venue-photography-local-assets.md)
