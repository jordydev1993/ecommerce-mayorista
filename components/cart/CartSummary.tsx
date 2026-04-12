'use client'

import { useCart } from '@/hooks/useCart'
import { CartItem } from './CartItem'

function formatPrice(value: number): string {
  return value.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })
}

export function CartSummary() {
  const { itemsPriced, totalItems, totalPrice, totalSavings } = useCart()

  if (itemsPriced.length === 0) {
    return (
      <p className="text-muted-foreground text-sm text-center py-8">
        El carrito está vacío.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Items */}
      <div className="flex flex-col gap-3">
        {itemsPriced.map((item) => (
          <CartItem key={item.product.id} item={item} />
        ))}
      </div>

      {/* Totales */}
      <div className="rounded-lg border border-border bg-muted/40 p-4 flex flex-col gap-2 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Productos ({totalItems} unidades)</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>

        {totalSavings > 0 && (
          <div className="flex justify-between text-emerald-600 font-medium">
            <span>Ahorro por docenas</span>
            <span>− {formatPrice(totalSavings)}</span>
          </div>
        )}

        <div className="border-t border-border pt-2 flex justify-between font-bold text-base text-foreground">
          <span>Total</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
      </div>
    </div>
  )
}
