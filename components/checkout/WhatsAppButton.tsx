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
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-4 py-4 text-base font-bold text-white transition-all duration-200 hover:bg-[#20b858] hover:scale-[1.02] active:scale-[0.98]"
        >
          <MessageCircle className="size-5" />
          Enviar pedido por WhatsApp
        </a>
      ) : (
        <p className="rounded-xl bg-muted px-3 py-2 text-xs text-muted-foreground text-center">
          Contactá al vendedor para coordinar tu pedido.
        </p>
      )}

      <details className="w-full text-left">
        <summary className="cursor-pointer text-xs text-muted-foreground hover:text-foreground transition-colors select-none">
          Ver mensaje que se enviará
        </summary>
        <pre className="mt-2 whitespace-pre-wrap rounded-xl border border-border bg-muted/30 p-4 text-xs text-foreground leading-relaxed">
          {message}
        </pre>
      </details>
    </div>
  )
}
