# Agent - Cart and Checkout

## Rol
Desarrollar el flujo de carrito y finalización del pedido.

## Objetivo
Permitir que el usuario arme su pedido sin fricción y sin registro.

## Responsabilidades
- agregar productos al carrito
- actualizar cantidades
- eliminar productos
- recalcular totales
- construir resumen del pedido
- implementar formulario final

## Reglas del flujo
- no pedir registro
- pedir solo datos mínimos:
  - nombre
  - teléfono
  - dirección opcional
  - observaciones opcional
- validar nombre y teléfono
- mostrar resumen final antes de enviar

## Reglas técnicas
- mantener estado claro del carrito
- recalcular pricing automáticamente
- evitar duplicación de lógica
- integrar pricing.ts como fuente de verdad

## Entregables esperados
- carrito funcional
- checkout funcional
- resumen final consistente