export interface BookingInquiryInput {
  nombre: string;
  contacto: string;
  tipoEvento: string;
  fecha: string;
  invitados?: string;
  modalidad: 'solo-sala' | 'con-organizacion';
  notas?: string;
}

export const WHATSAPP_PHONE = '34667439623';

function normalizeField(value: string | undefined, maxLength = 200): string {
  return (value ?? '').replace(/\s+/g, ' ').trim().slice(0, maxLength);
}

/**
 * Convierte una fecha ISO (`YYYY-MM-DD`) al formato español `DD/MM/YYYY`.
 *
 * @param isoDate - Fecha de entrada procedente del campo `<input type="date">`.
 * @returns Fecha formateada en `DD/MM/YYYY` o el texto normalizado si no coincide el patrón ISO.
 */
export function formatSpanishDate(isoDate: string): string {
  const cleaned = normalizeField(isoDate, 20);
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(cleaned);
  if (!match) return cleaned;
  return `${match[3]}/${match[2]}/${match[1]}`;
}

/**
 * Genera el texto plano de consulta dirigido a Isabel para vista previa y WhatsApp.
 * Omite los campos opcionales vacíos para mantener el mensaje limpio y legible.
 *
 * @param input - Datos validados del formulario de disponibilidad.
 * @returns Resumen multilínea listo para mostrar en pantalla o codificar en URL.
 */
export function formatInquirySummary(input: BookingInquiryInput): string {
  const nombre = normalizeField(input.nombre, 80);
  const contacto = normalizeField(input.contacto, 80);
  const tipoEvento = normalizeField(input.tipoEvento, 80);
  const fecha = formatSpanishDate(input.fecha);
  const invitados = normalizeField(input.invitados, 12);
  const notas = normalizeField(input.notas, 400);
  const modalidadTexto =
    input.modalidad === 'con-organizacion'
      ? 'Alquiler de sala con ayuda en catering o decoración'
      : 'Solo alquiler de sala privada';

  const lines = [
    'Hola Isabel, me gustaría consultar disponibilidad en Espai Aiyana.',
    `Nombre: ${nombre}`,
    `Contacto: ${contacto}`,
    `Tipo de evento: ${tipoEvento}`,
    `Fecha aproximada: ${fecha}`,
  ];

  if (invitados) {
    lines.push(`Invitados aproximados: ${invitados}`);
  }

  lines.push(`Servicio: ${modalidadTexto}`);

  if (notas) {
    lines.push(`Detalles adicionales: ${notas}`);
  }

  return lines.join('\n');
}

/**
 * Construye la URL directa `wa.me` con la consulta pre-rellenada para Espai Aiyana.
 *
 * @param input - Datos validados del formulario de reserva.
 * @returns URL HTTPS lista para abrir la conversación en WhatsApp.
 */
export function buildWhatsAppInquiryUrl(input: BookingInquiryInput): string {
  const message = formatInquirySummary(input);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
