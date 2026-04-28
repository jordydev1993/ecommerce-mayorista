'use client'

import { createContext, useContext, useReducer, useMemo, useEffect } from 'react'
import { getBreakdown } from '@/lib/pricing'
import type { CartItem, CartItemPriced, CartState } from '@/types/cart'
import type { Product } from '@/types/product'

const CART_STORAGE_KEY = 'cart_items'

function makeCartKey(productId: string, color?: string, size?: string): string {
  return `${productId}|${color ?? ''}|${size ?? ''}`
}

function loadFromStorage(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY)
    if (!raw) return []
    return (JSON.parse(raw) as CartItem[]).map((i) => ({
      ...i,
      cartKey: i.cartKey ?? i.product.id,
    }))
  } catch {
    return []
  }
}

function saveToStorage(items: CartItem[]): void {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  } catch {
    // localStorage lleno o bloqueado — continuar sin persistencia
  }
}

// ------------------------------------------------------------
// Actions
// ------------------------------------------------------------
type Action =
  | { type: 'ADD_ITEM'; product: Product; color?: string; size?: string }
  | { type: 'INCREASE'; cartKey: string }
  | { type: 'DECREASE'; cartKey: string }
  | { type: 'SET_QUANTITY'; cartKey: string; quantity: number }
  | { type: 'REMOVE'; cartKey: string }
  | { type: 'CLEAR' }
  | { type: 'RESTORE'; items: CartItem[] }

// ------------------------------------------------------------
// Reducer
// ------------------------------------------------------------
function cartReducer(items: CartItem[], action: Action): CartItem[] {
  switch (action.type) {
    case 'ADD_ITEM': {
      const cartKey = makeCartKey(action.product.id, action.color, action.size)
      const exists = items.find((i) => i.cartKey === cartKey)
      if (exists) {
        return items.map((i) =>
          i.cartKey === cartKey ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...items, {
        product: action.product,
        quantity: 1,
        color: action.color,
        size: action.size,
        cartKey,
      }]
    }

    case 'INCREASE':
      return items.map((i) =>
        i.cartKey === action.cartKey ? { ...i, quantity: i.quantity + 1 } : i
      )

    case 'DECREASE':
      return items
        .map((i) =>
          i.cartKey === action.cartKey ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0)

    case 'SET_QUANTITY':
      if (action.quantity <= 0) {
        return items.filter((i) => i.cartKey !== action.cartKey)
      }
      return items.map((i) =>
        i.cartKey === action.cartKey ? { ...i, quantity: action.quantity } : i
      )

    case 'REMOVE':
      return items.filter((i) => i.cartKey !== action.cartKey)

    case 'CLEAR':
      return []

    case 'RESTORE':
      return action.items

    default:
      return items
  }
}

// ------------------------------------------------------------
// Context
// ------------------------------------------------------------
interface CartContextValue extends CartState {
  addItem: (product: Product, color?: string, size?: string) => void
  increase: (cartKey: string) => void
  decrease: (cartKey: string) => void
  setQuantity: (cartKey: string, quantity: number) => void
  remove: (cartKey: string) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

// ------------------------------------------------------------
// Provider
// ------------------------------------------------------------
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, [])

  useEffect(() => {
    const stored = loadFromStorage()
    if (stored.length > 0) dispatch({ type: 'RESTORE', items: stored })
  }, [])

  useEffect(() => {
    saveToStorage(items)
  }, [items])

  const state: CartState = useMemo(() => {
    const itemsPriced: CartItemPriced[] = items.map((i) => ({
      ...i,
      breakdown: getBreakdown(i.quantity, i.product.price_unit, i.product.price_dozen),
    }))

    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
    const totalPrice = itemsPriced.reduce((sum, i) => sum + i.breakdown.lineTotal, 0)
    const totalSavings = itemsPriced.reduce((sum, i) => sum + i.breakdown.savings, 0)

    return { items, itemsPriced, totalItems, totalPrice, totalSavings }
  }, [items])

  const value: CartContextValue = {
    ...state,
    addItem: (product, color, size) => dispatch({ type: 'ADD_ITEM', product, color, size }),
    increase: (cartKey) => dispatch({ type: 'INCREASE', cartKey }),
    decrease: (cartKey) => dispatch({ type: 'DECREASE', cartKey }),
    setQuantity: (cartKey, quantity) => dispatch({ type: 'SET_QUANTITY', cartKey, quantity }),
    remove: (cartKey) => dispatch({ type: 'REMOVE', cartKey }),
    clear: () => dispatch({ type: 'CLEAR' }),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// ------------------------------------------------------------
// Internal hook — solo para uso en useCart.ts
// ------------------------------------------------------------
export function useCartContext(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCartContext debe usarse dentro de <CartProvider>')
  return ctx
}
