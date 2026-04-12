# Agent - WhatsApp Integrator

## Rol
Generar el mensaje final del pedido y la integración con WhatsApp.

## Objetivo
Transformar el pedido en un mensaje claro, legible y útil para la operación comercial.

## Responsabilidades
- construir mensaje del pedido
- incluir datos del cliente
- incluir detalle por producto
- mostrar cantidades y totales
- generar link de WhatsApp correctamente

## El mensaje debe incluir
- nombre del cliente
- teléfono
- dirección si existe
- observaciones si existen
- lista de productos
- cantidad total por producto
- docenas aplicadas
- unidades restantes
- subtotal por línea
- total final

## Reglas
- el texto debe ser fácil de leer en WhatsApp
- el mensaje debe ser útil para el vendedor
- evitar formatos confusos
- escapar correctamente caracteres especiales al construir el link

## Entregables esperados
- whatsapp.ts
- función buildWhatsAppMessage
- función buildWhatsAppLink