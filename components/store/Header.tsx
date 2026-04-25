'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Menu, X, ShoppingCart } from 'lucide-react'
import { CartIcon } from '@/components/cart/CartIcon'

interface Props {
  categories: string[]
}

function HeaderContent({ categories }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('category')

  const activeLinkClass = 'rounded-full px-3 py-1 text-sm font-bold text-black'
  const inactiveLinkClass = 'rounded-full px-3 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors'

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/30 shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity shrink-0">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[var(--lime)] to-[var(--blue)] flex items-center justify-center shrink-0">
            <span className="text-black font-black text-sm">M</span>
          </div>
          <span className="text-lg font-black tracking-tighter text-foreground">Mayorista</span>
        </Link>

        {/* Desktop nav — categorías */}
        {categories.length > 0 && (
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className={!activeCategory ? activeLinkClass : inactiveLinkClass}
              style={!activeCategory ? { backgroundColor: 'var(--lime)' } : undefined}
            >
              Todos
            </Link>
            {categories.map(cat => (
              <Link
                key={cat}
                href={`/?category=${encodeURIComponent(cat)}`}
                className={activeCategory === cat ? activeLinkClass : inactiveLinkClass}
                style={activeCategory === cat ? { backgroundColor: 'var(--lime)' } : undefined}
              >
                {cat}
              </Link>
            ))}
          </nav>
        )}

        {/* Derecha: carrito + hamburger mobile */}
        <div className="flex items-center gap-2">
          <CartIcon />
          {categories.length > 0 && (
            <button
              onClick={() => setMobileOpen(v => !v)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/30 text-foreground hover:bg-white transition-all"
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="md:hidden bg-white/80 backdrop-blur-xl border-t border-white/30 shadow-lg px-4 py-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Categorías</p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className={`rounded-full px-4 py-1.5 text-sm transition-all ${!activeCategory ? 'font-bold text-black' : 'bg-white/70 border border-white/30 text-foreground'}`}
              style={!activeCategory ? { backgroundColor: 'var(--lime)' } : undefined}
            >
              Todos
            </Link>
            {categories.map(cat => (
              <Link
                key={cat}
                href={`/?category=${encodeURIComponent(cat)}`}
                onClick={() => setMobileOpen(false)}
                className={`rounded-full px-4 py-1.5 text-sm transition-all ${activeCategory === cat ? 'font-bold text-black' : 'bg-white/70 border border-white/30 text-foreground'}`}
                style={activeCategory === cat ? { backgroundColor: 'var(--lime)' } : undefined}
              >
                {cat}
              </Link>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-white/30">
            <Link
              href="/carrito"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ShoppingCart className="size-4" />
              Ver carrito
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

function HeaderShell() {
  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/30 shadow-sm h-16" />
  )
}

export function Header({ categories }: Props) {
  return (
    <Suspense fallback={<HeaderShell />}>
      <HeaderContent categories={categories} />
    </Suspense>
  )
}
