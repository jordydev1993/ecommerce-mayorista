'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Plus, Minus } from 'lucide-react'
import { calculateLineTotal, getDozenNudge } from '@/lib/pricing'
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
  const hasDozen = quantity >= 12
  const { toComplete, savingsPerDozen, showNudge } = getDozenNudge(quantity, product.price_unit, product.price_dozen)

  return (
    <div className="group flex flex-col bg-white/70 backdrop-blur-xl rounded-3xl border border-white/30 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 overflow-hidden">
      {/* Imagen */}
      <Link href={`/productos/${product.slug}`} className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 block overflow-hidden">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground/40 text-sm">
            Sin imagen
          </div>
        )}

        {product.category && (
          <span
            className="absolute top-2.5 left-2.5 rounded-full px-2.5 py-1 text-[11px] font-bold text-black"
            style={{ backgroundColor: 'var(--lime)' }}
          >
            {product.category}
          </span>
        )}

        {product.stock === 0 && (
          <span className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm text-sm font-semibold text-foreground">
            Sin stock
          </span>
        )}
      </Link>

      {/* Info */}
      <div className="flex flex-col gap-3 p-4 flex-1">
        <Link href={`/productos/${product.slug}`}>
          <h2 className="font-semibold text-sm leading-snug text-foreground hover:underline underline-offset-2">
            {product.name}
          </h2>
        </Link>

        {/* Precios */}
        <div className="flex items-baseline justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] text-muted-foreground">Unitario</span>
            <span className="text-sm font-medium text-foreground">{formatPrice(product.price_unit)}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[11px] text-muted-foreground">×12 docena</span>
            <span className="text-sm font-bold text-foreground">{formatPrice(product.price_dozen)}</span>
          </div>
        </div>

        {/* Stock bajo */}
        {product.stock <= 5 && product.stock > 0 && (
          <span className="inline-flex w-fit rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-medium text-amber-700">
            Últimas {product.stock} unidades
          </span>
        )}

        {/* Selector de cantidad */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Cantidad</span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={decrease}
              disabled={quantity <= 1}
              className="size-8 rounded-full bg-white/80 backdrop-blur-xl border border-white/30 flex items-center justify-center text-foreground hover:bg-white hover:scale-110 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
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
              onClick={increase}
              className="size-8 rounded-full bg-white/80 backdrop-blur-xl border border-white/30 flex items-center justify-center text-foreground hover:bg-white hover:scale-110 active:scale-95 transition-all duration-200"
              aria-label="Aumentar"
            >
              <Plus className="size-3" />
            </button>
          </div>
        </div>

        {hasDozen ? (
          <p
            className="text-[11px] font-bold text-right rounded-full px-2 py-0.5 w-fit ml-auto"
            style={{ backgroundColor: 'color-mix(in srgb, var(--lime) 20%, transparent)', color: '#1d1d1f' }}
          >
            Precio docena aplicado
          </p>
        ) : showNudge ? (
          <p className="text-[11px] text-muted-foreground text-right">
            +{toComplete} para docena · ahorrás {formatPrice(savingsPerDozen)}
          </p>
        ) : null}

        {/* Botón con total integrado */}
        <button
          className="mt-auto w-full rounded-2xl py-2.5 text-sm font-bold flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
          style={product.stock !== 0 ? {
            backgroundColor: 'var(--lime)',
            color: '#000000',
            boxShadow: '0 4px 15px 0 color-mix(in srgb, var(--lime) 30%, transparent)'
          } : { backgroundColor: '#ececf0', color: '#86868b' }}
          onClick={() => onAddToCart(product, quantity)}
          disabled={product.stock === 0}
        >
          <ShoppingCart className="size-3.5" />
          {product.stock === 0 ? 'Sin stock' : `Agregar · ${formatPrice(lineTotal)}`}
        </button>
      </div>
    </div>
  )
}
