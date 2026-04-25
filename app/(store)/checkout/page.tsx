import { CheckoutForm } from '@/components/checkout/CheckoutForm'
import { OrderSummary } from '@/components/checkout/OrderSummary'

export default function CheckoutPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-black tracking-tighter text-foreground">
        Finalizar pedido
      </h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Formulario */}
        <section>
          <h2 className="mb-4 text-lg font-bold tracking-tight text-foreground">Tus datos</h2>
          <CheckoutForm />
        </section>

        {/* Resumen */}
        <section>
          <h2 className="mb-4 text-lg font-bold tracking-tight text-foreground">Tu pedido</h2>
          <OrderSummary />
        </section>
      </div>
    </main>
  )
}
