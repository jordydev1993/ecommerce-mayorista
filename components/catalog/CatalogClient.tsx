'use client'

import { useState, useMemo } from 'react'
import { Search, X } from 'lucide-react'
import { ProductGrid } from './ProductGrid'
import type { Product } from '@/types/product'

interface Props {
  products: Product[]
  initialCategory?: string
  initialSearch?: string
}

export function CatalogClient({ products, initialCategory, initialSearch }: Props) {
  const [activeCategory, setActiveCategory] = useState<string | null>(initialCategory ?? null)
  const [search, setSearch] = useState(initialSearch ?? '')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const categories = useMemo(() => {
    const cats = products.map(p => p.category).filter(Boolean) as string[]
    return Array.from(new Set(cats)).sort()
  }, [products])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    const min = parseFloat(minPrice)
    const max = parseFloat(maxPrice)
    return products.filter(p => {
      const matchCat = !activeCategory || p.category === activeCategory
      const matchSearch = !q || p.name.toLowerCase().includes(q)
      const matchMin = isNaN(min) || p.price_unit >= min
      const matchMax = isNaN(max) || p.price_unit <= max
      return matchCat && matchSearch && matchMin && matchMax
    })
  }, [products, activeCategory, search, minPrice, maxPrice])

  const hasFilters = !!activeCategory || search.trim() !== '' || minPrice !== '' || maxPrice !== ''

  function clearFilters() {
    setActiveCategory(null)
    setSearch('')
    setMinPrice('')
    setMaxPrice('')
  }

  const activePillClass = 'text-black font-bold shadow-sm'
  const inactivePillClass = 'bg-white/70 backdrop-blur-xl border border-white/30 text-foreground hover:bg-white'

  return (
    <div className="flex flex-col gap-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar productos..."
          className="h-11 w-full rounded-2xl bg-white/60 backdrop-blur-xl border border-white/30 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:bg-white/80 focus:border-white/60"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Limpiar búsqueda"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* Categorías + limpiar filtros */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`rounded-full px-4 py-1.5 text-sm transition-all duration-200 ${activeCategory === null ? activePillClass : inactivePillClass}`}
            style={activeCategory === null ? { backgroundColor: 'var(--lime)' } : undefined}
          >
            Todos
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-sm transition-all duration-200 ${activeCategory === cat ? activePillClass : inactivePillClass}`}
              style={activeCategory === cat ? { backgroundColor: 'var(--lime)' } : undefined}
            >
              {cat}
            </button>
          ))}
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm bg-white/70 backdrop-blur-xl border border-white/30 text-muted-foreground hover:bg-white hover:text-foreground transition-all duration-200"
            >
              <X className="size-3.5" />
              Limpiar filtros
            </button>
          )}
        </div>
      )}

      {/* Rango de precio */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm text-muted-foreground">Precio:</span>
        <input
          type="number"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
          placeholder="Mínimo"
          min={0}
          className="h-9 w-36 rounded-xl bg-white/60 backdrop-blur-xl border border-white/30 px-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:bg-white/80 focus:border-white/60"
        />
        <span className="text-sm text-muted-foreground">—</span>
        <input
          type="number"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
          placeholder="Máximo"
          min={0}
          className="h-9 w-36 rounded-xl bg-white/60 backdrop-blur-xl border border-white/30 px-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:bg-white/80 focus:border-white/60"
        />
      </div>

      {/* Resultado */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-muted-foreground">No se encontraron productos con esos filtros.</p>
          <button
            onClick={clearFilters}
            className="mt-3 text-sm underline text-muted-foreground hover:text-foreground transition-colors"
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        <ProductGrid products={filtered} />
      )}
    </div>
  )
}
