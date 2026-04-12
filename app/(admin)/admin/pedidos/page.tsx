import { supabaseAdmin } from '@/lib/supabase-admin'
import { OrderTable } from '@/components/admin/OrderTable'
import type { Order } from '@/types/order'

export const revalidate = 0

export default async function PedidosPage() {
  const { data, error } = await supabaseAdmin
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  const orders: Order[] = error ? [] : (data ?? [])

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-foreground">Pedidos</h1>
      <OrderTable initialOrders={orders} />
    </div>
  )
}
