'use client'

import { ProductCard } from './ProductCard'
import { useCart } from '@/hooks/useCart'
import type { Product } from '@/types/product'

interface Props {
  products: Product[]
}

export function ProductGrid({ products }: Props) {
  const { addItem } = useCart()

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-muted-foreground text-lg">No hay productos disponibles.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={addItem}
        />
      ))}
    </div>
  )
}
