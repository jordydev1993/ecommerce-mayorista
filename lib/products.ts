import { supabase } from '@/lib/supabase'
import type { Product } from '@/types/product'

export async function getActiveProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('name')

  if (error) throw new Error(error.message)
  return data ?? []
}
