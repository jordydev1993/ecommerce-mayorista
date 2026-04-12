'use client'

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CartSummary } from '@/components/cart/CartSummary'
import { useCart } from '@/hooks/useCart'

export default function CarritoPage() {
  const { totalItems } = useCart()

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold text-foreground">Tu carrito</h1>

      <CartSummary />

      {totalItems > 0 && (
        <div className="mt-6 flex flex-col gap-3">
          <Link href="/checkout">
            <Button className="w-full">Finalizar pedido</Button>
          </Link>
          <Link href="/" className="text-center text-sm text-muted-foreground hover:text-foreground transition-colors">
            Seguir comprando
          </Link>
        </div>
      )}

      {totalItems === 0 && (
        <div className="mt-8 flex flex-col items-center gap-4 text-center">
          <ShoppingCart className="size-12 text-muted-foreground/40" />
          <Link href="/">
            <Button variant="outline">Ver catálogo</Button>
          </Link>
        </div>
      )}
    </main>
  )
}
