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
    <Link href="/carrito" className="relative flex items-center gap-1.5 text-foreground hover:text-primary transition-colors">
      <ShoppingCart className="size-5" />
      {mounted && totalItems > 0 && (
        <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </Link>
  )
}
