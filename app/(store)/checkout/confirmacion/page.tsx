'use client'

import { Suspense } from 'react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { WhatsAppButton } from '@/components/checkout/WhatsAppButton'
import type { CreateOrderPayload } from '@/types/order'

function ConfirmacionContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')

  const [order, setOrder] = useState<CreateOrderPayload | null>(null)

  useEffect(() => {
    const raw = sessionStorage.getItem('last_order')
    if (raw) {
      try {
        setOrder(JSON.parse(raw) as CreateOrderPayload)
        sessionStorage.removeItem('last_order')
      } catch {
        // si el JSON está corrupto, simplemente no mostramos el detalle
      }
    }
  }, [])

  if (!orderId) {
    return (
      <main className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="text-muted-foreground">No se encontró el pedido.</p>
        <Link href="/" className="mt-4 inline-block text-sm text-primary underline">
          Volver al catálogo
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto w-full max-w-lg px-4 py-14 sm:px-6">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <ShoppingBag className="size-8" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-foreground">¡Pedido registrado!</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Tu pedido fue guardado. Enviáselo al vendedor por WhatsApp para coordinarlo.
          </p>
        </div>

        {order && <WhatsAppButton order={order} />}

        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Volver al catálogo
        </Link>
      </div>
    </main>
  )
}

export default function ConfirmacionPage() {
  return (
    <Suspense>
      <ConfirmacionContent />
    </Suspense>
  )
}
