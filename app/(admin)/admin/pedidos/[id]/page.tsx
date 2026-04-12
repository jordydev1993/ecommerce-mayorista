import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { supabaseAdmin } from '@/lib/supabase-admin'
import type { Order, OrderItem, OrderStatus } from '@/types/order'

interface Props {
  params: Promise<{ id: string }>
}

export const revalidate = 0

const STATUS_LABEL: Record<OrderStatus, string> = {
  pending: 'Pendiente',
  confirmed: 'Confirmado',
  cancelled: 'Cancelado',
}

const STATUS_STYLE: Record<OrderStatus, string> = {
  pending: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-muted text-muted-foreground',
}

function formatPrice(v: number) {
  return v.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-AR', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

export default async function DetallePedidoPage({ params }: Props) {
  const { id } = await params

  const [{ data: order, error: orderError }, { data: items }] = await Promise.all([
    supabaseAdmin.from('orders').select('*').eq('id', id).single(),
    supabaseAdmin.from('order_items').select('*').eq('order_id', id),
  ])

  if (orderError || !order) notFound()

  const typedOrder = order as Order
  const typedItems = (items ?? []) as OrderItem[]

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Link href="/admin/pedidos" className="text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="size-5" />
        </Link>
        <h1 className="text-2xl font-bold text-foreground">Pedido</h1>
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLE[typedOrder.status]}`}>
          {STATUS_LABEL[typedOrder.status]}
        </span>
      </div>

      <section className="rounded-xl border border-border bg-card p-5 flex flex-col gap-2 text-sm">
        <h2 className="font-semibold text-foreground mb-1">Cliente</h2>
        <Row label="Nombre" value={typedOrder.customer_name} />
        <Row label="Teléfono" value={typedOrder.customer_phone} />
        {typedOrder.customer_address && <Row label="Dirección" value={typedOrder.customer_address} />}
        {typedOrder.notes && <Row label="Observaciones" value={typedOrder.notes} />}
        <Row label="Fecha" value={formatDate(typedOrder.created_at)} />
      </section>

      <section className="rounded-xl border border-border bg-card p-5 flex flex-col gap-3 text-sm">
        <h2 className="font-semibold text-foreground">Productos</h2>
        {typedItems.map((item) => (
          <div key={item.id} className="flex flex-col gap-0.5 border-b border-border pb-3 last:border-0 last:pb-0">
            <div className="flex justify-between font-medium text-foreground">
              <span>{item.product_name}</span>
              <span className="tabular-nums">{formatPrice(item.line_total)}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {item.quantity} unidades
              {item.dozens_applied > 0 && ` · ${item.dozens_applied} docena${item.dozens_applied > 1 ? 's' : ''} × ${formatPrice(item.dozen_price)}`}
              {item.remaining_units > 0 && ` · ${item.remaining_units} suelta${item.remaining_units > 1 ? 's' : ''} × ${formatPrice(item.unit_price)}`}
            </p>
          </div>
        ))}
      </section>

      <div className="flex justify-between rounded-xl border border-border bg-card px-5 py-4 font-bold text-base text-foreground">
        <span>Total</span>
        <span className="tabular-nums">{formatPrice(typedOrder.total)}</span>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <span className="w-28 shrink-0 text-muted-foreground">{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  )
}
