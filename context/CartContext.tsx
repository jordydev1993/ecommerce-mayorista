'use client'

import { createContext, useContext, useReducer, useMemo, useEffect } from 'react'
import { getBreakdown } from '@/lib/pricing'
import type { CartItem, CartItemPriced, CartState } from '@/types/cart'
import type { Product } from '@/types/product'

const CART_STORAGE_KEY = 'cart_items'

function loadFromStorage(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY)
    return raw ? (JSON.parse(raw) as CartItem[]) : []
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
  | { type: 'ADD_ITEM'; product: Product }
  | { type: 'INCREASE'; productId: string }
  | { type: 'DECREASE'; productId: string }
  | { type: 'SET_QUANTITY'; productId: string; quantity: number }
  | { type: 'REMOVE'; productId: string }
  | { type: 'CLEAR' }
  | { type: 'RESTORE'; items: CartItem[] }

// ------------------------------------------------------------
// Reducer — solo maneja cantidad, pricing se deriva en useMemo
// ------------------------------------------------------------
function cartReducer(items: CartItem[], action: Action): CartItem[] {
  switch (action.type) {
    case 'ADD_ITEM': {
      const exists = items.find((i) => i.product.id === action.product.id)
      if (exists) {
        return items.map((i) =>
          i.product.id === action.product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }
      return [...items, { product: action.product, quantity: 1 }]
    }

    case 'INCREASE':
      return items.map((i) =>
        i.product.id === action.productId
          ? { ...i, quantity: i.quantity + 1 }
          : i
      )

    case 'DECREASE':
      return items
        .map((i) =>
          i.product.id === action.productId
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
        .filter((i) => i.quantity > 0)

    case 'SET_QUANTITY':
      if (action.quantity <= 0) {
        return items.filter((i) => i.product.id !== action.productId)
      }
      return items.map((i) =>
        i.product.id === action.productId
          ? { ...i, quantity: action.quantity }
          : i
      )

    case 'REMOVE':
      return items.filter((i) => i.product.id !== action.productId)

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
  addItem: (product: Product) => void
  increase: (productId: string) => void
  decrease: (productId: string) => void
  setQuantity: (productId: string, quantity: number) => void
  remove: (productId: string) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

// ------------------------------------------------------------
// Provider
// ------------------------------------------------------------
export function CartProvider({ children }: { children: React.ReactNode }) {
  // Siempre inicia con [] — evita mismatch de hidratación SSR vs cliente
  const [items, dispatch] = useReducer(cartReducer, [])

  // Cargar desde localStorage solo después de montar en el cliente
  useEffect(() => {
    const stored = loadFromStorage()
    if (stored.length > 0) dispatch({ type: 'RESTORE', items: stored })
  }, [])

  // Persistir cada vez que cambian los items
  useEffect(() => {
    saveToStorage(items)
  }, [items])

  // Toda la aritmética de pricing se recalcula aquí cada vez que cambian los items.
  // getBreakdown es pura — no tiene side effects ni dependencias externas.
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
    addItem: (product) => dispatch({ type: 'ADD_ITEM', product }),
    increase: (productId) => dispatch({ type: 'INCREASE', productId }),
    decrease: (productId) => dispatch({ type: 'DECREASE', productId }),
    setQuantity: (productId, quantity) => dispatch({ type: 'SET_QUANTITY', productId, quantity }),
    remove: (productId) => dispatch({ type: 'REMOVE', productId }),
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
