export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  category: string | null
  price_unit: number
  price_dozen: number
  stock: number
  image_url: string | null
  is_active: boolean
  colors: string[]
  sizes: string[]
  created_at: string
  updated_at: string
}
