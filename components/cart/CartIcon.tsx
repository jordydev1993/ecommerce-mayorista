'use client'

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { useEffect, useState } from 'react'

export function CartIcon() {
  const { totalItems } = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  return (
    <Link
      href="/carrito"
      className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/30 text-foreground hover:bg-white hover:scale-110 active:scale-95 transition-all duration-300"
      aria-label="Carrito"
    >
      <ShoppingCart className="size-5" />
      {mounted && totalItems > 0 && (
        <span
          className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-black"
          style={{ backgroundColor: 'var(--orange)' }}
        >
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </Link>
  )
}
