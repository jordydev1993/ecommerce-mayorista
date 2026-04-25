import { supabaseAdmin } from '@/lib/supabase-admin'
import { ProductTable } from '@/components/admin/ProductTable'
import type { Product } from '@/types/product'

export const revalidate = 0

export default async function ProductosPage() {
  const { data, error } = await supabaseAdmin
    .from('products')
    .select('*')
    .order('name')

  const products: Product[] = error ? [] : (data ?? [])

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-black tracking-tighter text-foreground">Productos</h1>
      <ProductTable initialProducts={products} />
    </div>
  )
}
