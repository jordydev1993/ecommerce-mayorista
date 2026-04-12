import { supabase } from '@/lib/supabase'
import type { Order, OrderItem, OrderStatus } from '@/types/order'

export async function getAllOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data ?? []
}

export async function getOrderWithItems(
  id: string
): Promise<{ order: Order; items: OrderItem[] } | null> {
  const [{ data: order, error: orderError }, { data: items, error: itemsError }] =
    await Promise.all([
      supabase.from('orders').select('*').eq('id', id).single(),
      supabase.from('order_items').select('*').eq('order_id', id),
    ])

  if (orderError || !order) return null
  if (itemsError) throw new Error(itemsError.message)

  return { order, items: items ?? [] }
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<void> {
  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', id)

  if (error) throw new Error(error.message)
}
