'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { ShoppingCart, Plus, Minus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { calculateLineTotal } from '@/lib/pricing'
import type { Product } from '@/types/product'

interface Props {
  product: Product
  onAddToCart: (product: Product, quantity: number) => void
}

function formatPrice(value: number): string {
  return value.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })
}

export function ProductCard({ product, onAddToCart }: Props) {
  const [quantity, setQuantity] = useState(1)
  const [inputValue, setInputValue] = useState('1')
  const isFocused = useRef(false)

  const decrease = () => {
    const next = Math.max(1, quantity - 1)
    setQuantity(next)
    if (!isFocused.current) setInputValue(String(next))
  }
  const increase = () => {
    const next = quantity + 1
    setQuantity(next)
    if (!isFocused.current) setInputValue(String(next))
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    if (/^\d*$/.test(val)) setInputValue(val)
  }

  function commitValue() {
    isFocused.current = false
    const parsed = parseInt(inputValue, 10)
    if (!isNaN(parsed) && parsed >= 1) {
      setQuantity(parsed)
    } else {
      setInputValue(String(quantity))
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') e.currentTarget.blur()
  }

  const lineTotal = calculateLineTotal(quantity, product.price_unit, product.price_dozen)
  const showDozenPrice = quantity >= 12

  return (
    <div className="flex flex-col rounded-xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Imagen */}
      <div className="relative aspect-square bg-muted">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
            Sin imagen
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-3 p-4 flex-1">
        {product.category && (
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {product.category}
          </span>
        )}

        <h2 className="font-semibold text-base leading-snug text-foreground">
          {product.name}
        </h2>

        {/* Precios */}
        <div className="flex flex-col gap-1">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-muted-foreground">Precio unitario</span>
            <span className="font-medium text-foreground">{formatPrice(product.price_unit)}</span>
          </div>
          <div className="flex items-baseline justify-between rounded-md bg-primary/5 px-2 py-1">
            <span className="text-xs font-medium text-primary">Por docena (×12)</span>
            <span className="font-bold text-primary">{formatPrice(product.price_dozen)}</span>
          </div>
        </div>

        {/* Selector de cantidad */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Cantidad</span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon-sm" onClick={decrease} disabled={quantity <= 1}>
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
            <Button variant="outline" size="icon-sm" onClick={increase}>
              <Plus className="size-3" />
            </Button>
          </div>
        </div>

        {/* Total dinámico */}
        <div className="flex items-baseline justify-between rounded-md bg-muted/60 px-2 py-1.5">
          <span className="text-xs text-muted-foreground">
            {showDozenPrice ? 'Total (con descuento)' : 'Total'}
          </span>
          <span className="font-bold text-foreground">{formatPrice(lineTotal)}</span>
        </div>

        {/* Stock bajo */}
        {product.stock <= 5 && product.stock > 0 && (
          <p className="text-xs text-amber-600 font-medium">
            Últimas {product.stock} unidades
          </p>
        )}

        {/* Botón */}
        <Button
          className="mt-auto w-full gap-2"
          onClick={() => onAddToCart(product, quantity)}
          disabled={product.stock === 0}
        >
          <ShoppingCart className="size-4" />
          {product.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
        </Button>
      </div>
    </div>
  )
}
