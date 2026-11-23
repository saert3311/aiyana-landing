import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { buildWhatsAppInquiryUrl, formatSpanishDate, formatInquirySummary } from '../src/lib/whatsapp.ts';

test('formatSpanishDate converts ISO YYYY-MM-DD to DD/MM/YYYY', () => {
  assert.equal(formatSpanishDate('2026-12-19'), '19/12/2026');
});

test('buildWhatsAppInquiryUrl encodes Spanish details cleanly for Isabel', () => {
  const url = buildWhatsAppInquiryUrl({
    nombre: 'María García',
    contacto: '611 222 333',
    tipoEvento: 'Cumpleaños o fiesta sorpresa',
    fecha: '2026-12-19',
    invitados: '35',
    modalidad: 'con-organizacion',
    notas: 'Queremos tarta y globos por la tarde.',
  });

  assert.ok(url.startsWith('https://wa.me/34667439623?text='));
  const decoded = decodeURIComponent(url.split('?text=')[1]);
  assert.match(decoded, /Nombre: María García/);
  assert.match(decoded, /Fecha aproximada: 19\/12\/2026/);
  assert.match(decoded, /Invitados aproximados: 35/);
  assert.match(decoded, /ayuda en catering o decoración/);
  assert.doesNotMatch(decoded, /[—]/);
});

test('formatInquirySummary omits optional fields when blank', () => {
  const summary = formatInquirySummary({
    nombre: 'Carlos',
    contacto: 'carlos@ejemplo.es',
    tipoEvento: 'Baby shower, bautizo o comunión',
    fecha: '2027-02-14',
    modalidad: 'solo-sala',
  });

  assert.doesNotMatch(summary, /Invitados aproximados/);
  assert.doesNotMatch(summary, /Detalles adicionales/);
  assert.match(summary, /Solo alquiler de sala privada/);
});

test('built dist/index.html meets content, SEO, accessibility, and design hygiene constraints', () => {
  const htmlPath = path.resolve('dist/index.html');
  assert.ok(fs.existsSync(htmlPath), 'dist/index.html must exist');
  const html = fs.readFileSync(htmlPath, 'utf8');

  assert.match(html, /<html[^>]+lang="es"/);
  const h1Matches = html.match(/<h1\b/g) || [];
  assert.equal(h1Matches.length, 1, 'Expected exactly one <h1>');

  assert.match(html, /EventVenue/);
  assert.match(html, /667 43 96 23/);
  assert.match(html, /Carrer Julio Colomer, 18/);
  assert.match(html, /@espai\.aiyana_eventos/);
  assert.match(html, /5,0/);
  assert.match(html, /17/);

  const heroImgMatch = html.match(/<img[^>]*alt="Barra de azulejo verde esmeralda[^"]*"[^>]*>/);
  assert.ok(heroImgMatch, 'Hero image tag must exist');
  assert.match(heroImgMatch[0], /fetchpriority="high"/);
  assert.doesNotMatch(heroImgMatch[0], /loading="lazy"/);

  const summaries = html.match(/<summary\b[^>]*>[\s\S]*?<\/summary>/gi) || [];
  assert.equal(summaries.length, 5, 'Expected 5 FAQ <summary> elements');
  for (const summary of summaries) {
    assert.doesNotMatch(summary, /<h[1-6]\b/i, 'No headings inside <summary>');
  }
  assert.doesNotMatch(html, /\p{Extended_Pictographic}/u, 'Zero emojis allowed');
  assert.doesNotMatch(html, /—/, 'Zero em-dashes allowed');
  assert.doesNotMatch(html, / – /, 'Zero spaced en-dashes allowed');

  const astroDir = path.resolve('dist/_astro');
  const cssFiles = fs.readdirSync(astroDir).filter((file) => file.endsWith('.css'));
  assert.ok(cssFiles.length >= 1, 'Expected bundled CSS files');
  for (const cssFile of cssFiles) {
    const css = fs.readFileSync(path.join(astroDir, cssFile), 'utf8');
    assert.doesNotMatch(css, /transition\s*:\s*all\b/i, 'Must not emit transition: all');
  }
});
