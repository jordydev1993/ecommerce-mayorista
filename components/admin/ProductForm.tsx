'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Upload, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  createProduct,
  updateProduct,
  uploadProductImage,
  generateSlug,
  type ProductFormData,
} from '@/lib/admin/products'
import type { Product } from '@/types/product'

interface Props {
  product?: Product // si viene, es edición; si no, es alta
}

function toFormData(p: Product): ProductFormData {
  return {
    name: p.name,
    slug: p.slug,
    description: p.description ?? '',
    category: p.category ?? '',
    price_unit: p.price_unit,
    price_dozen: p.price_dozen,
    stock: p.stock,
    image_url: p.image_url ?? '',
    is_active: p.is_active,
  }
}

const EMPTY: ProductFormData = {
  name: '',
  slug: '',
  description: '',
  category: '',
  price_unit: 0,
  price_dozen: 0,
  stock: 0,
  image_url: '',
  is_active: true,
}

interface FieldError {
  name?: string
  slug?: string
  price_unit?: string
  price_dozen?: string
  stock?: string
}

function validate(data: ProductFormData): FieldError {
  const e: FieldError = {}
  if (!data.name.trim()) e.name = 'El nombre es obligatorio.'
  if (!data.slug.trim()) e.slug = 'El slug es obligatorio.'
  if (data.price_unit <= 0) e.price_unit = 'El precio unitario debe ser mayor a 0.'
  if (data.price_dozen <= 0) e.price_dozen = 'El precio por docena debe ser mayor a 0.'
  if (data.price_dozen > data.price_unit * 12)
    e.price_dozen = 'El precio por docena no puede superar el precio unitario × 12.'
  if (data.stock < 0) e.stock = 'El stock no puede ser negativo.'
  return e
}

export function ProductForm({ product }: Props) {
  const router = useRouter()
  const isEdit = !!product
  const fileRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState<ProductFormData>(product ? toFormData(product) : EMPTY)
  const [errors, setErrors] = useState<FieldError>({})
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setForm((prev) => {
      const updated = {
        ...prev,
        [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
      }
      // Auto-generar slug al escribir el nombre (solo en alta)
      if (name === 'name' && !isEdit) {
        updated.slug = generateSlug(value)
      }
      return updated
    })

    if (errors[name as keyof FieldError]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const url = await uploadProductImage(file)
      setForm((prev) => ({ ...prev, image_url: url }))
    } catch {
      setServerError('No se pudo subir la imagen. Intentá de nuevo.')
    } finally {
      setUploading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setServerError(null)

    const fieldErrors = validate(form)
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      return
    }

    setSaving(true)
    try {
      if (isEdit) {
        await updateProduct(product.id, form)
      } else {
        await createProduct(form)
      }
      router.push('/admin/productos')
      router.refresh()
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Error al guardar el producto.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6 max-w-2xl">

      {/* Nombre */}
      <Field label="Nombre" required error={errors.name}>
        <input name="name" type="text" value={form.name} onChange={handleChange}
          placeholder="Remera blanca talle M"
          className={inputCls(!!errors.name)} />
      </Field>

      {/* Slug */}
      <Field label="Slug (URL)" required error={errors.slug}
        hint="Se genera automáticamente. Solo letras, números y guiones.">
        <input name="slug" type="text" value={form.slug} onChange={handleChange}
          placeholder="remera-blanca-talle-m"
          className={inputCls(!!errors.slug)} />
      </Field>

      {/* Descripción */}
      <Field label="Descripción">
        <textarea name="description" value={form.description} onChange={handleChange}
          rows={3} placeholder="Descripción del producto..."
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30 resize-none" />
      </Field>

      {/* Categoría */}
      <Field label="Categoría">
        <input name="category" type="text" value={form.category} onChange={handleChange}
          placeholder="Ropa, Calzado, Accesorios..."
          className={inputCls(false)} />
      </Field>

      {/* Precios */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Precio unitario" required error={errors.price_unit}>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
            <input name="price_unit" type="number" min={0} step={1} value={form.price_unit || ''}
              onChange={handleChange} placeholder="0"
              className={`${inputCls(!!errors.price_unit)} pl-7`} />
          </div>
        </Field>

        <Field label="Precio por docena (×12)" required error={errors.price_dozen}>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
            <input name="price_dozen" type="number" min={0} step={1} value={form.price_dozen || ''}
              onChange={handleChange} placeholder="0"
              className={`${inputCls(!!errors.price_dozen)} pl-7`} />
          </div>
        </Field>
      </div>

      {/* Stock */}
      <Field label="Stock" required error={errors.stock}>
        <input name="stock" type="number" min={0} step={1} value={form.stock}
          onChange={handleChange} placeholder="0"
          className={inputCls(!!errors.stock)} />
      </Field>

      {/* Imagen */}
      <Field label="Imagen del producto">
        <div className="flex items-start gap-4">
          {form.image_url && (
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
              <Image src={form.image_url} alt="Preview" fill className="object-cover" />
            </div>
          )}
          <div className="flex flex-col gap-2">
            <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload}
              className="hidden" />
            <Button type="button" variant="outline" size="sm"
              onClick={() => fileRef.current?.click()} disabled={uploading}>
              {uploading
                ? <><Loader2 className="size-4 animate-spin" /> Subiendo...</>
                : <><Upload className="size-4" /> Subir imagen</>}
            </Button>
            {form.image_url && (
              <button type="button" onClick={() => setForm((p) => ({ ...p, image_url: '' }))}
                className="text-xs text-destructive hover:underline text-left">
                Quitar imagen
              </button>
            )}
          </div>
        </div>
      </Field>

      {/* Activo */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input name="is_active" type="checkbox" checked={form.is_active} onChange={handleChange}
          className="h-4 w-4 rounded border-input accent-primary" />
        <span className="text-sm font-medium text-foreground">Producto activo (visible en el catálogo)</span>
      </label>

      {serverError && (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive">
          {serverError}
        </p>
      )}

      <div className="flex gap-3">
        <Button type="submit" disabled={saving || uploading}>
          {saving ? <><Loader2 className="size-4 animate-spin" /> Guardando...</> : isEdit ? 'Guardar cambios' : 'Crear producto'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push('/admin/productos')}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}

// ------------------------------------------------------------
// Helpers de UI
// ------------------------------------------------------------

function inputCls(invalid: boolean) {
  return `h-10 w-full rounded-md border bg-background px-3 text-sm outline-none transition focus:ring-2 focus:ring-ring/30 ${invalid ? 'border-destructive focus:border-destructive' : 'border-input focus:border-ring'}`
}

function Field({
  label, required, error, hint, children,
}: {
  label: string
  required?: boolean
  error?: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="ml-1 text-destructive">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
