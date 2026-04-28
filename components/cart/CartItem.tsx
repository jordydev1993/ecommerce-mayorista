'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { X, Plus, Minus } from 'lucide-react'
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
    if (e.key === 'Enter') e.currentTarget.blur()
  }

  return (
    <div className="flex gap-4 bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-sm p-4">
      {/* Thumbnail */}
      <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200">
        {product.image_url && (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="font-semibold text-sm text-foreground leading-snug truncate">{product.name}</p>
          <button
            onClick={() => remove(product.id)}
            className="shrink-0 size-8 rounded-full bg-white/80 border border-white/30 flex items-center justify-center text-muted-foreground hover:bg-red-50 hover:text-destructive hover:scale-110 active:scale-95 transition-all duration-200"
            aria-label="Eliminar producto"
          >
            <X className="size-3.5" />
          </button>
        </div>

        {/* Desglose pricing */}
        <div className="text-xs text-muted-foreground space-y-0.5">
          {dozensApplied > 0 && (
            <p>{dozensApplied} docena{dozensApplied > 1 ? 's' : ''} × {formatPrice(product.price_dozen)}</p>
          )}
          {remainingUnits > 0 && (
            <p>{remainingUnits} unidad{remainingUnits > 1 ? 'es' : ''} × {formatPrice(product.price_unit)}</p>
          )}
          {savings > 0 && (
            <p className="font-medium" style={{ color: 'color-mix(in srgb, var(--lime) 60%, #555)' }}>
              Ahorrás {formatPrice(savings)}
            </p>
          )}
        </div>

        {/* Controles + subtotal */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => decrease(product.id)}
              className="size-8 rounded-full bg-white/80 backdrop-blur-xl border border-white/30 flex items-center justify-center text-foreground hover:bg-white hover:scale-110 active:scale-95 transition-all duration-200"
              aria-label="Disminuir"
            >
              <Minus className="size-3" />
            </button>
            <input
              type="text"
              inputMode="numeric"
              value={inputValue}
              onChange={handleInputChange}
              onFocus={() => { isFocused.current = true }}
              onBlur={commitValue}
              onKeyDown={handleKeyDown}
              className="w-10 rounded-xl border border-white/40 bg-white/60 backdrop-blur-sm text-center text-sm font-semibold tabular-nums h-8 outline-none focus:border-white/60 focus:bg-white/80"
              aria-label="Cantidad"
            />
            <button
              onClick={() => increase(product.id)}
              className="size-8 rounded-full bg-white/80 backdrop-blur-xl border border-white/30 flex items-center justify-center text-foreground hover:bg-white hover:scale-110 active:scale-95 transition-all duration-200"
              aria-label="Aumentar"
            >
              <Plus className="size-3" />
            </button>
          </div>
          <span className="font-bold text-sm text-foreground">{formatPrice(lineTotal)}</span>
        </div>
      </div>
    </div>
  )
}
