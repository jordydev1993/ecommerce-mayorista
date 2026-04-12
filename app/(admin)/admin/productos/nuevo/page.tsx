import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { ProductForm } from '@/components/admin/ProductForm'

export default function NuevoProductoPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/productos" className="text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="size-5" />
        </Link>
        <h1 className="text-2xl font-bold text-foreground">Nuevo producto</h1>
      </div>
      <ProductForm />
    </div>
  )
}
