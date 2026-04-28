'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Plus, Minus, ArrowLeft, ChevronDown } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { calculateLineTotal, calculateSavings, getDozenNudge } from '@/lib/pricing'
import type { Product } from '@/types/product'

interface Props {
  product: Product
}

function formatPrice(value: number): string {
  return value.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })
}

export function ProductDetail({ product }: Props) {
  const { addItem, increase } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [inputValue, setInputValue] = useState('1')
  const [descOpen, setDescOpen] = useState(true)
  const [priceOpen, setPriceOpen] = useState(false)
  const [added, setAdded] = useState(false)
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined)
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined)
  const isFocused = useRef(false)

  const decrease = () => {
    const next = Math.max(1, quantity - 1)
    setQuantity(next)
    if (!isFocused.current) setInputValue(String(next))
  }
  const increaseQty = () => {
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

  const needsColor = product.colors.length > 0 && !selectedColor
  const needsSize = product.sizes.length > 0 && !selectedSize

  function handleAddToCart() {
    if (product.stock === 0 || needsColor || needsSize) return
    addItem(product, selectedColor, selectedSize)
    const cartKey = `${product.id}|${selectedColor ?? ''}|${selectedSize ?? ''}`
    for (let i = 1; i < quantity; i++) increase(cartKey)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const lineTotal = calculateLineTotal(quantity, product.price_unit, product.price_dozen)
  const savings = calculateSavings(quantity, product.price_unit, product.price_dozen)
  const hasDozen = quantity >= 12
  const { toComplete, savingsPerDozen, showNudge } = getDozenNudge(quantity, product.price_unit, product.price_dozen)

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
          <ArrowLeft className="size-4" />
          Catálogo
        </Link>
        {product.category && (
          <>
            <span>/</span>
            <span>{product.category}</span>
          </>
        )}
        <span>/</span>
        <span className="text-foreground font-medium truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Imagen */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground/40">
              Sin imagen
            </div>
          )}
          {product.category && (
            <span
              className="absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-bold text-black"
              style={{ backgroundColor: 'var(--lime)' }}
            >
              {product.category}
            </span>
          )}
        </div>

        {/* Panel info — GlassCard */}
        <div className="flex flex-col gap-6 bg-white/70 backdrop-blur-xl rounded-3xl border border-white/30 shadow-lg p-5 sm:p-8">
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-foreground sm:text-4xl">
              {product.name}
            </h1>
            {product.stock <= 5 && product.stock > 0 && (
              <span className="mt-3 inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                Últimas {product.stock} unidades
              </span>
            )}
            {product.stock === 0 && (
              <span className="mt-3 inline-flex rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                Sin stock
              </span>
            )}
          </div>

          {/* Precios */}
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Precio unitario</p>
              <p className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
                {formatPrice(product.price_unit)}
              </p>
            </div>
            <div className="border-l border-white/40 pl-4 sm:pl-6">
              <p className="text-xs text-muted-foreground mb-1">Precio por docena (×12)</p>
              <p className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
                {formatPrice(product.price_dozen)}
              </p>
            </div>
          </div>

          {/* Selector de color */}
          {product.colors.length > 0 && (
            <div className="border-t border-white/40 pt-5 flex flex-col gap-2.5">
              <p className="text-sm font-semibold text-foreground">
                Color
                {needsColor && <span className="ml-2 text-xs font-normal text-muted-foreground">(seleccioná uno)</span>}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(selectedColor === c ? undefined : c)}
                    className={`rounded-full px-3 py-1.5 text-sm font-semibold border transition-all duration-200 hover:scale-105 active:scale-95 ${
                      selectedColor === c
                        ? 'text-black border-transparent'
                        : 'bg-white/60 border-white/40 text-foreground hover:bg-white'
                    }`}
                    style={selectedColor === c ? { backgroundColor: 'var(--lime)' } : undefined}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Selector de talle */}
          {product.sizes.length > 0 && (
            <div className="border-t border-white/40 pt-5 flex flex-col gap-2.5">
              <p className="text-sm font-semibold text-foreground">
                Talle
                {needsSize && <span className="ml-2 text-xs font-normal text-muted-foreground">(seleccioná uno)</span>}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(selectedSize === s ? undefined : s)}
                    className={`rounded-full px-3 py-1.5 text-sm font-semibold border transition-all duration-200 hover:scale-105 active:scale-95 ${
                      selectedSize === s
                        ? 'text-black border-transparent'
                        : 'bg-white/60 border-white/40 text-foreground hover:bg-white'
                    }`}
                    style={selectedSize === s ? { backgroundColor: 'var(--lime)' } : undefined}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Descripción (acordeón) */}
          {product.description && (
            <div className="border-t border-white/40">
              <button
                onClick={() => setDescOpen(v => !v)}
                className="flex w-full items-center justify-between py-4 text-sm font-semibold text-foreground hover:text-muted-foreground transition-colors"
              >
                Descripción
                <ChevronDown className={`size-4 transition-transform ${descOpen ? 'rotate-180' : ''}`} />
              </button>
              {descOpen && (
                <p className="pb-4 text-sm text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              )}
            </div>
          )}

          {/* Info de precios (acordeón) */}
          <div className="border-t border-white/40">
            <button
              onClick={() => setPriceOpen(v => !v)}
              className="flex w-full items-center justify-between py-4 text-sm font-semibold text-foreground hover:text-muted-foreground transition-colors"
            >
              Información de precios
              <ChevronDown className={`size-4 transition-transform ${priceOpen ? 'rotate-180' : ''}`} />
            </button>
            {priceOpen && (
              <div className="pb-4 text-sm text-muted-foreground space-y-1.5 leading-relaxed">
                <p>Unitario: {formatPrice(product.price_unit)} por unidad.</p>
                <p>Docena: {formatPrice(product.price_dozen)} por cada 12 unidades del mismo producto.</p>
                <p>Las unidades restantes (fuera de docenas completas) se cobran a precio unitario.</p>
              </div>
            )}
          </div>

          {/* Selector de cantidad */}
          <div className="border-t border-white/40 pt-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Cantidad</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={decrease}
                  disabled={quantity <= 1}
                  className="size-10 rounded-full bg-white/80 backdrop-blur-xl border border-white/30 flex items-center justify-center text-foreground hover:bg-white hover:scale-110 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                  aria-label="Disminuir"
                >
                  <Minus className="size-4" />
                </button>
                <input
                  type="text"
                  inputMode="numeric"
                  value={inputValue}
                  onChange={handleInputChange}
                  onFocus={() => { isFocused.current = true }}
                  onBlur={commitValue}
                  onKeyDown={handleKeyDown}
                  className="w-14 rounded-xl border border-white/40 bg-white/60 backdrop-blur-sm text-center text-base font-bold tabular-nums h-10 outline-none focus:border-white/60 focus:bg-white/80"
                  aria-label="Cantidad"
                />
                <button
                  onClick={increaseQty}
                  className="size-10 rounded-full bg-white/80 backdrop-blur-xl border border-white/30 flex items-center justify-center text-foreground hover:bg-white hover:scale-110 active:scale-95 transition-all duration-200"
                  aria-label="Aumentar"
                >
                  <Plus className="size-4" />
                </button>
              </div>
            </div>

            {hasDozen ? (
              <p className="text-sm font-bold text-[#1d1d1f]">
                <span
                  className="rounded-full px-3 py-1"
                  style={{ backgroundColor: 'color-mix(in srgb, var(--lime) 25%, transparent)' }}
                >
                  Precio docena aplicado
                  {savings > 0 && ` · Ahorrás ${formatPrice(savings)}`}
                </span>
              </p>
            ) : showNudge ? (
              <p className="text-sm text-muted-foreground">
                Agregá <span className="font-semibold text-foreground">{toComplete} {toComplete === 1 ? 'unidad' : 'unidades'}</span> más y ahorrás{' '}
                <span className="font-semibold text-foreground">{formatPrice(savingsPerDozen)}</span> comprando por docena.
              </p>
            ) : null}

            {/* CTA */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0 || needsColor || needsSize}
              className="w-full rounded-2xl py-4 text-base font-bold flex items-center justify-center gap-2.5 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={product.stock !== 0 && !needsColor && !needsSize ? {
                backgroundColor: 'var(--lime)',
                color: '#000000',
                boxShadow: '0 8px 25px 0 color-mix(in srgb, var(--lime) 35%, transparent)'
              } : { backgroundColor: '#ececf0', color: '#86868b' }}
            >
              <ShoppingCart className="size-5" />
              {product.stock === 0
                ? 'Sin stock'
                : added
                  ? '¡Agregado al carrito!'
                  : `Agregar al carrito · ${formatPrice(lineTotal)}`
              }
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
