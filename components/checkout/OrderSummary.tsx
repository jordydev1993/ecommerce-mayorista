'use client'

import { useCart } from '@/hooks/useCart'

function formatPrice(value: number): string {
  return value.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })
}

export function OrderSummary() {
  const { itemsPriced, totalItems, totalPrice, totalSavings } = useCart()

  return (
    <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-4">
      <h2 className="font-semibold text-base text-foreground">Resumen del pedido</h2>

      {/* Items */}
      <ul className="flex flex-col gap-3 text-sm">
        {itemsPriced.map((item) => {
          const { product, quantity, breakdown } = item
          return (
            <li key={product.id} className="flex flex-col gap-0.5">
              <div className="flex justify-between font-medium text-foreground">
                <span>{product.name}</span>
                <span>{formatPrice(breakdown.lineTotal)}</span>
              </div>
              <div className="text-xs text-muted-foreground space-y-0.5 pl-1">
                {breakdown.dozensApplied > 0 && (
                  <p>{breakdown.dozensApplied} docena{breakdown.dozensApplied > 1 ? 's' : ''} × {formatPrice(product.price_dozen)}</p>
                )}
                {breakdown.remainingUnits > 0 && (
                  <p>{breakdown.remainingUnits} unidad{breakdown.remainingUnits > 1 ? 'es' : ''} × {formatPrice(product.price_unit)}</p>
                )}
                {breakdown.savings > 0 && (
                  <p className="text-emerald-600">Ahorrás {formatPrice(breakdown.savings)}</p>
                )}
              </div>
            </li>
          )
        })}
      </ul>

      {/* Totales */}
      <div className="border-t border-border pt-3 flex flex-col gap-1.5 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>{totalItems} unidades</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        {totalSavings > 0 && (
          <div className="flex justify-between text-emerald-600 font-medium">
            <span>Ahorro total por docenas</span>
            <span>− {formatPrice(totalSavings)}</span>
          </div>
        )}
        <div className="flex justify-between font-bold text-base text-foreground pt-1">
          <span>Total</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
      </div>
    </div>
  )
}
