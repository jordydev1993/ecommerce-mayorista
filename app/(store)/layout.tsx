import { CartProvider } from '@/context/CartContext'
import { Header } from '@/components/store/Header'
import { getCategories } from '@/lib/products'

export default async function StoreLayout({ children }: { children: React.ReactNode }) {
  const categories = await getCategories()

  return (
    <CartProvider>
      <div className="min-h-screen bg-gradient-to-br from-[#f5f5f7] via-[#e8e8ea] to-[#f5f5f7]">
        <Header categories={categories} />
        {children}
      </div>
    </CartProvider>
  )
}
