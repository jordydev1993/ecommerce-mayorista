import Link from 'next/link'
import { Package, ShoppingBag } from 'lucide-react'

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-black tracking-tighter text-foreground">Dashboard</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link
          href="/admin/productos"
          className="flex items-center gap-4 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-foreground/20"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-foreground">
            <Package className="size-6" />
          </div>
          <div>
            <p className="font-bold text-foreground">Productos</p>
            <p className="text-sm text-muted-foreground">Gestionar catálogo y stock</p>
          </div>
        </Link>

        <Link
          href="/admin/pedidos"
          className="flex items-center gap-4 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-foreground/20"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-foreground">
            <ShoppingBag className="size-6" />
          </div>
          <div>
            <p className="font-bold text-foreground">Pedidos</p>
            <p className="text-sm text-muted-foreground">Ver y gestionar pedidos</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
