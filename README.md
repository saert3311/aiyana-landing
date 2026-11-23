# Espai Aiyana Eventos Alfafar

Landing page estática de captación para **Espai Aiyana**, salón privado de celebraciones y eventos en Alfafar (Valencia). Construida con **Astro 5**, **Tailwind CSS v4** y primitivas nativas de la plataforma web para lograr carga instantánea, accesibilidad estricta y conversión directa hacia reservas por WhatsApp y teléfono (`667 43 96 23`).

## Requisitos previos y arranque rápido

- **Node.js** `>= 22` (verificado en `v24.21.0`)
- **pnpm** (`>= 10`; el archivo `package.json` incluye `pnpm.onlyBuiltDependencies` para `esbuild` y `sharp`)

```sh
git clone <url-del-repositorio>
cd aiyana-landing
pnpm install
pnpm dev
```

El servidor de desarrollo quedará disponible en `http://localhost:4321/`.

## Comandos

| Comando | Descripción |
|---|---|
| `pnpm dev` | Inicia el servidor de desarrollo local de Astro |
| `pnpm build` | Compila el sitio estático en `dist/` y optimiza imágenes WebP con `sharp` |
| `pnpm preview` | Sirve en local la compilación de producción (`dist/`) |
| `pnpm test` | Ejecuta la suite nativa `node --test tests/verify.test.mjs` sobre helpers y `dist/index.html` |

## Estructura del proyecto

```text
.
├── docs/decisions/        # Architecture Decision Records (ADR-001 a ADR-003)
├── public/                # Activos estáticos servidos sin procesar (favicon.svg)
├── src/
│   ├── assets/images/     # 8 fotografías reales del local optimizadas en build
│   ├── components/        # Cabecera, selector de eventos, formulario WhatsApp y marca
│   ├── data/venue.ts      # Fuente única de verdad con datos verificados del salón
│   ├── layouts/           # Documento base HTML, fuentes y esquema JSON-LD EventVenue
│   ├── lib/whatsapp.ts    # Lógica pura de formato de fecha y enlace wa.me
│   ├── pages/index.astro  # Composición completa de la landing page
│   └── styles/global.css  # Tokens Tailwind v4, animaciones por scroll y acordeón nativo
├── tests/verify.test.mjs  # Pruebas unitarias y verificación del HTML/CSS compilado
├── AGENTS.md              # Guía operativa y reglas estrictas para agentes y mantenedores
└── CHANGELOG.md           # Registro de versiones y cambios publicados
```

## Arquitectura y decisiones de diseño

El proyecto prioriza cero dependencias de UI en tiempo de ejecución: no utiliza React, librerías de animación en JS ni packs de iconos externos. Toda la identidad visual parte de los materiales reales del local (azulejo cerámico verde esmeralda `#154B43`, porcelana luminosa `#FAFBF9`, eucalipto suave `#EFF4F2`, madera clara y acento loto `#E8B4BC`) combinados con `Bricolage Grotesque` y `Outfit`.

Consulta los registros de decisión arquitectónica para conocer el contexto y las alternativas evaluadas:

- [ADR-001: Arquitectura estática en Astro 5 sin framework de UI en cliente](docs/decisions/ADR-001-astro-static-zero-framework-js.md)
- [ADR-002: Constructor de consulta a WhatsApp en lugar de backend propio](docs/decisions/ADR-002-whatsapp-inquiry-builder-no-backend.md)
- [ADR-003: Uso de fotografías reales del local optimizadas en local](docs/decisions/ADR-003-real-venue-photography-local-assets.md)

## Actualización de textos o fotografías

1. **Datos del local, reseñas, formatos y preguntas frecuentes:** edita exclusivamente [src/data/venue.ts](src/data/venue.ts). Evita añadir horarios, aforos o tarifas salvo confirmación directa de la propiedad.
2. **Fotografías del salón:** añade o sustituye archivos en [src/assets/images/](src/assets/images/) e impórtalos de forma estática en [src/data/venue.ts](src/data/venue.ts) para que `astro:assets` genere variantes WebP con dimensiones explícitas.
3. **Verificación obligatoria antes de publicar:**

```sh
pnpm build && pnpm test
```

## Despliegue y contribución

Al ser un sitio estático puro sin variables de entorno ni backend, puedes desplegar el directorio generado `dist/` directamente en Cloudflare Pages, Netlify, Vercel o GitHub Pages usando `pnpm build` como comando de compilación.

Antes de abrir un Pull Request:
- Consulta [AGENTS.md](AGENTS.md) para respetar la disciplina tipográfica, accesibilidad y reglas de copia.
- Ejecuta `pnpm build && pnpm test` y confirma que todas las pruebas en [tests/verify.test.mjs](tests/verify.test.mjs) pasan.
- Registra los cambios visibles en [CHANGELOG.md](CHANGELOG.md) y crea un nuevo ADR en `docs/decisions/` si modificas decisiones estructurales.
