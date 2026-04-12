import { CartProvider } from '@/context/CartContext'
import { Header } from '@/components/store/Header'

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Header />
      {children}
    </CartProvider>
  )
}
