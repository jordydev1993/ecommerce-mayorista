import type { CreateOrderPayload, CreateOrderItemPayload } from '@/types/order'

// ============================================================
// whatsapp.ts — Construcción del mensaje y link de WhatsApp
// Funciones puras: sin estado, sin side effects.
// ============================================================

function formatPrice(value: number): string {
  return value.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  })
}

function formatItem(item: CreateOrderItemPayload): string {
  const lines: string[] = []

  const variantParts = [item.color, item.size ? `Talle ${item.size}` : ''].filter(Boolean)
  const variantLabel = variantParts.length > 0 ? ` (${variantParts.join(' · ')})` : ''
  lines.push(`▸ ${item.product_name}${variantLabel}`)
  lines.push(`  Cantidad: ${item.quantity} unidades`)

  if (item.dozens_applied > 0) {
    lines.push(
      `  ${item.dozens_applied} docena${item.dozens_applied > 1 ? 's' : ''} × ${formatPrice(item.dozen_price)}`
    )
  }

  if (item.remaining_units > 0) {
    lines.push(
      `  ${item.remaining_units} unidad${item.remaining_units > 1 ? 'es' : ''} × ${formatPrice(item.unit_price)}`
    )
  }

  lines.push(`  Subtotal: ${formatPrice(item.line_total)}`)

  return lines.join('\n')
}

/**
 * Construye el mensaje de texto del pedido para enviar por WhatsApp.
 * El formato está optimizado para ser leído por el vendedor que prepara el pedido.
 *
 * @example
 * buildWhatsAppMessage(order)
 * // *Nuevo pedido*
 * // ...
 */
export function buildWhatsAppMessage(order: CreateOrderPayload): string {
  const sections: string[] = []

  // Encabezado
  sections.push('*🛒 Nuevo pedido*')

  // Datos del cliente
  const clientLines = [
    '📋 *Datos del cliente*',
    `Nombre: ${order.customer_name}`,
    `Teléfono: ${order.customer_phone}`,
  ]
  if (order.customer_address) {
    clientLines.push(`Dirección: ${order.customer_address}`)
  }
  if (order.notes) {
    clientLines.push(`Observaciones: ${order.notes}`)
  }
  sections.push(clientLines.join('\n'))

  // Detalle de productos
  sections.push('📦 *Productos*')
  sections.push(order.items.map(formatItem).join('\n\n'))

  // Total
  sections.push(`💰 *Total: ${formatPrice(order.total)}*`)

  return sections.join('\n\n')
}

/**
 * Genera el link de WhatsApp con el mensaje pre-cargado.
 * Usa wa.me para compatibilidad con mobile y desktop.
 *
 * @param phone - Número del vendedor con código de país, sin espacios ni símbolos.
 *                Ej: "5491112345678" (Argentina: 54 + 9 + área + número)
 * @param message - Texto construido con buildWhatsAppMessage()
 */
export function buildWhatsAppLink(phone: string, message: string): string {
  const cleanPhone = phone.replace(/\D/g, '')
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`
}
