'use client'

import Image from 'next/image'
import { useCart } from '@/hooks/useCart'

function formatPrice(value: number): string {
  return value.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })
}

export function OrderSummary() {
  const { itemsPriced, totalItems, totalPrice, totalSavings } = useCart()

  return (
    <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl p-5 flex flex-col gap-4">
      <h2 className="font-black tracking-tighter text-base text-foreground">Resumen del pedido</h2>

      {/* Items */}
      <ul className="flex flex-col gap-4">
        {itemsPriced.map((item) => {
          const { product, quantity, breakdown } = item
          return (
            <li key={product.id} className="flex items-start gap-3">
              <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                {product.image_url ? (
                  <Image src={product.image_url} alt={product.name} fill className="object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-[9px] text-muted-foreground">IMG</div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-2">
                  <p className="font-medium text-sm text-foreground leading-snug truncate">{product.name}</p>
                  <p className="text-sm font-bold text-foreground tabular-nums shrink-0">{formatPrice(breakdown.lineTotal)}</p>
                </div>
                <div className="mt-0.5 text-xs text-muted-foreground space-y-0.5">
                  {breakdown.dozensApplied > 0 && (
                    <p>{breakdown.dozensApplied} docena{breakdown.dozensApplied > 1 ? 's' : ''} × {formatPrice(product.price_dozen)}</p>
                  )}
                  {breakdown.remainingUnits > 0 && (
                    <p>{breakdown.remainingUnits} unidad{breakdown.remainingUnits > 1 ? 'es' : ''} × {formatPrice(product.price_unit)}</p>
                  )}
                  {breakdown.dozensApplied === 0 && breakdown.remainingUnits === 0 && (
                    <p>{quantity} × {formatPrice(product.price_unit)}</p>
                  )}
                  {breakdown.savings > 0 && (
                    <p className="text-emerald-600">Ahorrás {formatPrice(breakdown.savings)}</p>
                  )}
                </div>
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
        <div className="flex justify-between font-black text-base text-foreground pt-1">
          <span>Total</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
      </div>
    </div>
  )
}
