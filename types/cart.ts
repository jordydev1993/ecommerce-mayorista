import type { Product } from './product'
import type { PricingBreakdown } from '@/lib/pricing'

export interface CartItem {
  product: Product
  quantity: number
}

// CartItem enriquecido con el desglose de pricing — para uso en la UI
export interface CartItemPriced extends CartItem {
  breakdown: PricingBreakdown
}

export interface CartState {
  items: CartItem[]
  itemsPriced: CartItemPriced[]
  totalItems: number
  totalPrice: number
  totalSavings: number
}
