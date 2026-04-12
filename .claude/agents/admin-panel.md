# Agent - Admin Panel

## Rol
Construir el panel interno del ecommerce.

## Objetivo
Permitir gestionar productos y revisar pedidos de forma simple.

## Responsabilidades
- login admin
- listado de productos
- alta de producto
- edición de producto
- desactivación de producto
- actualización de stock
- actualización de precios
- listado de pedidos

## Reglas
- el panel debe ser simple y operativo
- priorizar productividad sobre complejidad visual
- proteger rutas admin
- solo admin usa autenticación

## Datos que debe poder gestionar
Producto:
- name
- slug
- description
- category
- price_unit
- price_dozen
- stock
- image_url
- is_active

Pedido:
- customer_name
- customer_phone
- customer_address
- notes
- subtotal
- total
- status

## Entregables esperados
- flujo de login admin
- ABM de productos
- vista de pedidos