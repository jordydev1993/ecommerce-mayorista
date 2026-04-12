'use client'

import Link from 'next/link'
import { CartIcon } from '@/components/cart/CartIcon'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-bold text-foreground hover:text-primary transition-colors">
          Mayorista
        </Link>
        <CartIcon />
      </div>
    </header>
  )
}
