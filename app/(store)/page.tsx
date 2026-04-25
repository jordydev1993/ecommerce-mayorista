import { getActiveProducts } from '@/lib/products'
import { CatalogClient } from '@/components/catalog/CatalogClient'

export const revalidate = 60

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>
}) {
  const [products, params] = await Promise.all([getActiveProducts(), searchParams])

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-4xl font-black tracking-tighter text-foreground sm:text-5xl">
          Todo lo que necesitás.
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Comprá por docena y ahorrá en cada producto.
        </p>
      </div>

      <CatalogClient
        products={products}
        initialCategory={params.category}
        initialSearch={params.search}
      />
    </main>
  )
}
