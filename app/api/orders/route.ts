import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin as adminClient } from '@/lib/supabase-admin'
import type { CreateOrderPayload } from '@/types/order'

export async function POST(req: NextRequest) {
  let payload: CreateOrderPayload

  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: 'Payload inválido.' }, { status: 400 })
  }

  if (!payload.customer_name?.trim()) {
    return NextResponse.json({ error: 'El nombre es obligatorio.' }, { status: 422 })
  }
  if (!payload.customer_phone?.trim()) {
    return NextResponse.json({ error: 'El teléfono es obligatorio.' }, { status: 422 })
  }
  if (!Array.isArray(payload.items) || payload.items.length === 0) {
    return NextResponse.json({ error: 'El pedido no tiene productos.' }, { status: 422 })
  }

  // 1. Insertar order
  const { data: order, error: orderError } = await adminClient
    .from('orders')
    .insert({
      customer_name: payload.customer_name.trim(),
      customer_phone: payload.customer_phone.trim(),
      customer_address: payload.customer_address ?? null,
      notes: payload.notes ?? null,
      subtotal: payload.subtotal,
      total: payload.total,
      status: 'pending',
    })
    .select('id')
    .single()

  if (orderError || !order) {
    console.error('[orders] insert error:', JSON.stringify(orderError))
    return NextResponse.json({ error: 'No se pudo guardar el pedido.', detail: orderError?.message }, { status: 500 })
  }

  // 2. Insertar order_items con snapshot completo de pricing
  const itemsToInsert = payload.items.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    product_name: item.product_name,
    quantity: item.quantity,
    unit_price: item.unit_price,
    dozen_price: item.dozen_price,
    dozens_applied: item.dozens_applied,
    remaining_units: item.remaining_units,
    line_total: item.line_total,
  }))

  const { error: itemsError } = await adminClient
    .from('order_items')
    .insert(itemsToInsert)

  if (itemsError) {
    console.error('[order_items] insert error:', JSON.stringify(itemsError))
    await adminClient.from('orders').delete().eq('id', order.id)
    return NextResponse.json({ error: 'No se pudieron guardar los productos del pedido.', detail: itemsError.message }, { status: 500 })
  }

  return NextResponse.json({ orderId: order.id }, { status: 201 })
}
