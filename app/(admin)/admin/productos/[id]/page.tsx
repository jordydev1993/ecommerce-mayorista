import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { ProductForm } from '@/components/admin/ProductForm'
import { getProductById } from '@/lib/admin/products'

interface Props {
  params: Promise<{ id: string }>
}

export const revalidate = 0

export default async function EditarProductoPage({ params }: Props) {
  const { id } = await params
  const product = await getProductById(id)

  if (!product) notFound()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/productos" className="text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="size-5" />
        </Link>
        <h1 className="text-2xl font-bold text-foreground">Editar: {product.name}</h1>
      </div>
      <ProductForm product={product} />
    </div>
  )
}
