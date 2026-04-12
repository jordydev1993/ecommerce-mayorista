import { useCartContext } from '@/context/CartContext'

/**
 * Hook público del carrito.
 * Usar este hook en todos los componentes — nunca importar CartContext directamente.
 *
 * @example
 * const { items, totalItems, totalPrice, addItem, increase, decrease, remove, clear } = useCart()
 */
export function useCart() {
  return useCartContext()
}
