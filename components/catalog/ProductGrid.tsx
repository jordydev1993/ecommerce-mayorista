'use client'

import { ProductCard } from './ProductCard'
import { useCart } from '@/hooks/useCart'
import type { Product } from '@/types/product'

interface Props {
  products: Product[]
}

export function ProductGrid({ products }: Props) {
  const { addItem, increase } = useCart()

  function handleAddToCart(product: Product, quantity: number) {
    addItem(product)
    // addItem agrega 1 — sumamos las unidades extra si quantity > 1
    for (let i = 1; i < quantity; i++) {
      increase(product.id)
    }
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-muted-foreground text-lg">No hay productos disponibles.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  )
}
