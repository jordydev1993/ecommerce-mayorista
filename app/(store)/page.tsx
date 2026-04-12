import { getActiveProducts } from '@/lib/products'
import { ProductGrid } from '@/components/catalog/ProductGrid'

export const revalidate = 60 // revalida cada 60 segundos

export default async function CatalogPage() {
  const products = await getActiveProducts()

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Catálogo</h1>
        <p className="mt-1 text-muted-foreground">
          Comprá por docena y ahorrá en cada producto.
        </p>
      </div>

      <ProductGrid products={products} />
    </main>
  )
}
