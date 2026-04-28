export type OrderStatus = 'pending' | 'confirmed' | 'cancelled'

export interface Order {
  id: string
  customer_name: string
  customer_phone: string
  customer_address: string | null
  notes: string | null
  subtotal: number
  total: number
  status: OrderStatus
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string | null
  product_name: string
  quantity: number
  unit_price: number
  dozen_price: number
  dozens_applied: number
  remaining_units: number
  line_total: number
  created_at: string
}

// Payload que se envía al crear un pedido
export interface CreateOrderPayload {
  customer_name: string
  customer_phone: string
  customer_address: string | null
  notes: string | null
  subtotal: number
  total: number
  items: CreateOrderItemPayload[]
}

export interface CreateOrderItemPayload {
  product_id: string
  product_name: string
  quantity: number
  unit_price: number
  dozen_price: number
  dozens_applied: number
  remaining_units: number
  line_total: number
  color?: string
  size?: string
}
