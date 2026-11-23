# ADR-003: Uso de fotografías reales del local optimizadas en local

## Status
Accepted

## Date
2026-11-23

## Context
Para captar clientes de un salón físico de celebraciones en Alfafar, mostrar la sala real (su barra de azulejo verde esmeralda, la cocina office, el rincón de palillería con LED cálido, las mesas vestidas y los montajes reales de cumpleaños o catas) genera mucha más confianza que renders genéricos. Además, durante el desarrollo inicial el generador automático de imágenes devolvió indisponibilidad temporal (`503`).

## Decision
Incorporar 8 fotografías reales, limpias y verificadas del propio perfil `@espai.aiyana_eventos` y su ficha pública de Google Maps dentro de `src/assets/images/`, procesándolas en tiempo de build mediante `<Image />` de `astro:assets` y `sharp` hacia variantes WebP responsivas (`23` archivos optimizados en `dist/_astro/`).

## Alternatives Considered

### Enlazar directamente URLs CDN de Instagram o Google Maps
- **Pros:** Sin ficheros binarios en el repositorio.
- **Contras:** Las URLs firmadas de Instagram expiran con el tiempo, rompen las imágenes en producción y exponen al sitio a bloqueos CORS o cambios de terceros.
- **Rejected:** Riesgo seguro de imágenes rotas en producción.

### Imágenes generadas por IA o bancos stock genéricos
- **Pros:** Composiciones controladas.
- **Contras:** No muestran el local real de Carrer Julio Colomer 18 y desinforman al visitante sobre dimensiones, acabados y equipamiento auténtico.
- **Rejected:** Menor credibilidad comercial y dependencia de servicio externo indisponible durante la creación.

## Consequences
- **Positivas:** Autenticidad total del espacio mostrado, cero enlaces rotos externos y dimensiones intrínsecas automáticas en cada `<img>` para evitar `CLS` (Cumulative Layout Shift).
- **Trade-offs y detalles de encuadre:**
  - Los 8 archivos originales añaden alrededor de `5,3 MiB` al repositorio fuente (`src/assets/images/`).
  - La fotografía `isabel-buffet.jpg` contiene asistentes parciales en el extremo izquierdo, por lo que `src/pages/index.astro` aplica `aspect-[10/9]` junto con `object-cover object-right` para centrar el encuadre exclusivamente en el buffet y el mural de hojas.
  - Se excluyó deliberadamente una foto antigua de Google Maps donde la barra aún aparecía sin el revestimiento cerámico verde esmeralda actual para mantener coherencia visual con el estado vigente del local.
