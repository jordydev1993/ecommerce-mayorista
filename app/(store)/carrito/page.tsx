'use client'

import Link from 'next/link'
import { ShoppingBag, ArrowLeft } from 'lucide-react'
import { CartItem } from '@/components/cart/CartItem'
import { useCart } from '@/hooks/useCart'

function formatPrice(value: number): string {
  return value.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })
}

export default function CarritoPage() {
  const { itemsPriced, totalItems, totalPrice, totalSavings } = useCart()

  if (totalItems === 0) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/70 backdrop-blur-xl border border-white/30 shadow-lg text-muted-foreground/40">
            <ShoppingBag className="size-10" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter text-foreground">
              Tu carrito está vacío
            </h1>
            <p className="mt-2 text-muted-foreground">
              Agregá productos desde el catálogo.
            </p>
          </div>
          <Link
            href="/"
            className="rounded-2xl px-6 py-3 text-sm font-bold text-black hover:scale-105 active:scale-95 transition-all duration-200"
            style={{ backgroundColor: 'var(--lime)' }}
          >
            Ver catálogo
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center gap-3">
        <Link
          href="/"
          className="rounded-2xl p-2 bg-white/80 backdrop-blur-xl border border-white/30 text-muted-foreground hover:text-foreground hover:bg-white hover:scale-110 active:scale-95 transition-all duration-200"
          aria-label="Volver al catálogo"
        >
          <ArrowLeft className="size-5" />
        </Link>
        <h1 className="text-2xl font-black tracking-tighter text-foreground">
          Tu carrito
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Lista de items */}
        <div className="lg:col-span-2">
          <div className="flex flex-col gap-3">
            {itemsPriced.map((item) => (
              <CartItem key={item.cartKey} item={item} />
            ))}
          </div>
        </div>

        {/* Panel de resumen */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24 bg-white/80 backdrop-blur-xl rounded-3xl border border-white/40 shadow-xl p-4 sm:p-6 flex flex-col gap-5">
            <h2 className="font-black tracking-tighter text-lg text-foreground">
              Resumen del pedido
            </h2>

            <div className="flex flex-col gap-2.5 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>{totalItems} {totalItems === 1 ? 'producto' : 'productos'}</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              {totalSavings > 0 && (
                <div className="flex justify-between font-medium text-emerald-600">
                  <span>Ahorro por docenas</span>
                  <span>− {formatPrice(totalSavings)}</span>
                </div>
              )}
              <div className="border-t border-white/40 pt-3 flex justify-between font-black text-base text-foreground">
                <span>Total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full rounded-2xl py-3 text-sm font-bold text-black text-center hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              style={{
                backgroundColor: 'var(--lime)',
                boxShadow: '0 8px 25px 0 color-mix(in srgb, var(--lime) 30%, transparent)'
              }}
            >
              Finalizar pedido
            </Link>
            <Link
              href="/"
              className="text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
