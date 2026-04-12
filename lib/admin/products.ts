import { supabase } from '@/lib/supabase'
import type { Product } from '@/types/product'

export interface ProductFormData {
  name: string
  slug: string
  description: string
  category: string
  price_unit: number
  price_dozen: number
  stock: number
  image_url: string
  is_active: boolean
}

// ------------------------------------------------------------
// Queries
// ------------------------------------------------------------

export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('name')

  if (error) throw new Error(error.message)
  return data ?? []
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return null
  return data
}

export async function createProduct(formData: ProductFormData): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .insert({
      name: formData.name.trim(),
      slug: formData.slug.trim(),
      description: formData.description.trim() || null,
      category: formData.category.trim() || null,
      price_unit: formData.price_unit,
      price_dozen: formData.price_dozen,
      stock: formData.stock,
      image_url: formData.image_url.trim() || null,
      is_active: formData.is_active,
    })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function updateProduct(id: string, formData: Partial<ProductFormData>): Promise<void> {
  const { error } = await supabase
    .from('products')
    .update({
      ...(formData.name !== undefined && { name: formData.name.trim() }),
      ...(formData.slug !== undefined && { slug: formData.slug.trim() }),
      ...(formData.description !== undefined && { description: formData.description.trim() || null }),
      ...(formData.category !== undefined && { category: formData.category.trim() || null }),
      ...(formData.price_unit !== undefined && { price_unit: formData.price_unit }),
      ...(formData.price_dozen !== undefined && { price_dozen: formData.price_dozen }),
      ...(formData.stock !== undefined && { stock: formData.stock }),
      ...(formData.image_url !== undefined && { image_url: formData.image_url.trim() || null }),
      ...(formData.is_active !== undefined && { is_active: formData.is_active }),
    })
    .eq('id', id)

  if (error) throw new Error(error.message)
}

export async function toggleProductActive(id: string, is_active: boolean): Promise<void> {
  const { error } = await supabase
    .from('products')
    .update({ is_active })
    .eq('id', id)

  if (error) throw new Error(error.message)
}

export async function deleteProduct(id: string): Promise<void> {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  if (error) throw new Error(error.message)
}

// ------------------------------------------------------------
// Storage — subida de imagen al bucket product-images
// ------------------------------------------------------------

export async function uploadProductImage(file: File): Promise<string> {
  const parts = file.name.split('.')
  const ext = parts.length > 1 ? parts.pop() : 'jpg'
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const { error } = await supabase.storage
    .from('product-images')
    .upload(filename, file, { upsert: false })

  if (error) throw new Error(error.message)

  const { data } = supabase.storage
    .from('product-images')
    .getPublicUrl(filename)

  return data.publicUrl
}

// ------------------------------------------------------------
// Helper: generar slug desde el nombre
// ------------------------------------------------------------
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}
