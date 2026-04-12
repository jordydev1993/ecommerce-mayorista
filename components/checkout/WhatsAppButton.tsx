'use client'

import { MessageCircle } from 'lucide-react'
import { buildWhatsAppMessage, buildWhatsAppLink } from '@/lib/whatsapp'
import type { CreateOrderPayload } from '@/types/order'

interface Props {
  order: CreateOrderPayload
}

const PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? ''

export function WhatsAppButton({ order }: Props) {
  const message = buildWhatsAppMessage(order)
  const link = buildWhatsAppLink(PHONE, message)
  const phoneConfigured = PHONE.length > 0

  return (
    <div className="flex flex-col gap-3 w-full">
      {phoneConfigured ? (
        <a href={link} target="_blank" rel="noopener noreferrer" className="w-full">
          <button className="flex w-full items-center justify-center gap-2 rounded-md bg-[#25D366] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#20b858] active:bg-[#1da54e]">
            <MessageCircle className="size-4" />
            Enviar pedido por WhatsApp
          </button>
        </a>
      ) : (
        <p className="rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-700 text-center">
          Contactá al vendedor para coordinar tu pedido.
        </p>
      )}

      <details className="w-full text-left">
        <summary className="cursor-pointer text-xs text-muted-foreground hover:text-foreground transition-colors select-none">
          Ver mensaje que se enviará
        </summary>
        <pre className="mt-2 whitespace-pre-wrap rounded-lg border border-border bg-muted/40 p-4 text-xs text-foreground leading-relaxed">
          {message}
        </pre>
      </details>
    </div>
  )
}
