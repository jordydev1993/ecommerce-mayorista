'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Pencil, Trash2, Eye, EyeOff, Plus } from 'lucide-react'
import { toggleProductActive, deleteProduct } from '@/lib/admin/products'
import type { Product } from '@/types/product'

interface Props {
  initialProducts: Product[]
}

function formatPrice(value: number): string {
  return value.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })
}

export function ProductTable({ initialProducts }: Props) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [loadingId, setLoadingId] = useState<string | null>(null)

  async function handleToggle(product: Product) {
    setLoadingId(product.id)
    try {
      await toggleProductActive(product.id, !product.is_active)
      setProducts((prev) =>
        prev.map((p) => p.id === product.id ? { ...p, is_active: !p.is_active } : p)
      )
    } finally {
      setLoadingId(null)
    }
  }

  async function handleDelete(product: Product) {
    if (!confirm(`¿Eliminar "${product.name}"? Esta acción no se puede deshacer.`)) return
    setLoadingId(product.id)
    try {
      await deleteProduct(product.id)
      setProducts((prev) => prev.filter((p) => p.id !== product.id))
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{products.length} productos</p>
        <Link
          href="/admin/productos/nuevo"
          className="inline-flex items-center gap-1.5 rounded-xl bg-foreground text-background px-4 py-2 text-sm font-medium hover:bg-foreground/85 transition-colors"
        >
          <Plus className="size-4" />
          Nuevo producto
        </Link>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted/40">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Producto</th>
              <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">P. Unitario</th>
              <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">P. Docena</th>
              <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Stock</th>
              <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">Estado</th>
              <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card">
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">
                  No hay productos. <Link href="/admin/productos/nuevo" className="underline hover:text-foreground transition-colors">Crear el primero</Link>.
                </td>
              </tr>
            )}
            {products.map((product) => {
              const busy = loadingId === product.id
              return (
                <tr key={product.id} className={busy ? 'opacity-50 pointer-events-none' : ''}>
                  {/* Nombre + imagen */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-muted">
                        {product.image_url
                          ? <Image src={product.image_url} alt={product.name} fill className="object-cover" />
                          : <div className="flex h-full items-center justify-center text-[10px] text-muted-foreground">IMG</div>
                        }
                      </div>
                      <div>
                        <p className="font-medium text-foreground leading-snug">{product.name}</p>
                        {product.category && (
                          <p className="text-xs text-muted-foreground">{product.category}</p>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-right tabular-nums">{formatPrice(product.price_unit)}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{formatPrice(product.price_dozen)}</td>

                  {/* Stock con alerta */}
                  <td className="px-4 py-3 text-right tabular-nums">
                    <span className={product.stock === 0 ? 'text-destructive font-medium' : product.stock <= 5 ? 'text-amber-600 font-medium' : ''}>
                      {product.stock}
                    </span>
                  </td>

                  {/* Estado activo/inactivo */}
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${product.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-muted text-muted-foreground'}`}>
                      {product.is_active ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>

                  {/* Acciones */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/productos/${product.id}`}
                        title="Editar"
                        className="size-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                      >
                        <Pencil className="size-3.5" />
                      </Link>
                      <button
                        title={product.is_active ? 'Desactivar' : 'Activar'}
                        onClick={() => handleToggle(product)}
                        className="size-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                      >
                        {product.is_active ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                      </button>
                      <button
                        title="Eliminar"
                        onClick={() => handleDelete(product)}
                        className="size-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-destructive transition-colors"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
