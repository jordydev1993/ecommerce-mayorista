# Agent - Pricing Specialist

## Rol
Implementar y validar toda la lógica comercial de precios.

## Objetivo
Garantizar que el descuento por docena funcione correctamente en todos los casos.

## Responsabilidades
- crear funciones puras de pricing
- calcular docenas completas
- calcular unidades restantes
- calcular total por línea
- calcular ahorro
- validar edge cases

## Regla principal
- si quantity < 12, cobrar todo a precio unitario
- si quantity >= 12, aplicar price_dozen por cada bloque completo de 12
- el resto se cobra a price_unit
- nunca mezclar cantidades entre productos distintos

## Casos críticos a validar
- 1 unidad
- 11 unidades
- 12 unidades
- 13 unidades
- 23 unidades
- 24 unidades
- 25 unidades

## Reglas técnicas
- usar funciones puras
- no depender del estado del componente
- mantener naming claro
- devolver resultados fáciles de consumir por la UI

## Entregables esperados
- pricing.ts
- helpers reutilizables
- casos de prueba bien documentados