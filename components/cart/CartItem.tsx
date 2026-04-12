'use client'

import { useState, useEffect, useRef } from 'react'
import { Trash2, Plus, Minus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/useCart'
import type { CartItemPriced } from '@/types/cart'

interface Props {
  item: CartItemPriced
}

function formatPrice(value: number): string {
  return value.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })
}

export function CartItem({ item }: Props) {
  const { increase, decrease, setQuantity, remove } = useCart()
  const { product, quantity, breakdown } = item
  const { dozensApplied, remainingUnits, lineTotal, savings } = breakdown

  const [inputValue, setInputValue] = useState(String(quantity))
  const isFocused = useRef(false)

  // Sincroniza cuando la cantidad cambia por +/- (solo si el input no está enfocado)
  useEffect(() => {
    if (!isFocused.current) {
      setInputValue(String(quantity))
    }
  }, [quantity])

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    if (/^\d*$/.test(val)) setInputValue(val)
  }

  function commitValue() {
    isFocused.current = false
    const parsed = parseInt(inputValue, 10)
    if (!isNaN(parsed) && parsed > 0) {
      setQuantity(product.id, parsed)
    } else {
      setInputValue(String(quantity))
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.currentTarget.blur()
    }
  }

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border bg-card p-4">
      {/* Nombre y eliminar */}
      <div className="flex items-start justify-between gap-2">
        <p className="font-medium text-foreground leading-snug">{product.name}</p>
        <button
          onClick={() => remove(product.id)}
          className="shrink-0 text-muted-foreground hover:text-destructive transition-colors"
          aria-label="Eliminar producto"
        >
          <Trash2 className="size-4" />
        </button>
      </div>

      {/* Desglose de pricing */}
      <div className="text-xs text-muted-foreground space-y-0.5">
        {dozensApplied > 0 && (
          <p>
            {dozensApplied} docena{dozensApplied > 1 ? 's' : ''} × {formatPrice(product.price_dozen)}
          </p>
        )}
        {remainingUnits > 0 && (
          <p>
            {remainingUnits} unidad{remainingUnits > 1 ? 'es' : ''} × {formatPrice(product.price_unit)}
          </p>
        )}
        {savings > 0 && (
          <p className="text-emerald-600 font-medium">
            Ahorrás {formatPrice(savings)} comprando por docena
          </p>
        )}
      </div>

      {/* Controles de cantidad + subtotal */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => decrease(product.id)}
            aria-label="Disminuir cantidad"
          >
            <Minus className="size-3" />
          </Button>
          <input
            type="text"
            inputMode="numeric"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => { isFocused.current = true }}
            onBlur={commitValue}
            onKeyDown={handleKeyDown}
            className="w-12 rounded-md border border-input bg-background text-center text-sm font-semibold tabular-nums h-8 outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
            aria-label="Cantidad"
          />
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => increase(product.id)}
            aria-label="Aumentar cantidad"
          >
            <Plus className="size-3" />
          </Button>
        </div>
        <span className="font-bold text-foreground">{formatPrice(lineTotal)}</span>
      </div>
    </div>
  )
}
