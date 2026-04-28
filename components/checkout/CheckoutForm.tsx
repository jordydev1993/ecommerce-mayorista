'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/hooks/useCart'
import {
  validateCheckoutForm,
  hasErrors,
  type CheckoutFormData,
  type CheckoutFormErrors,
} from '@/lib/validations'
import type { CreateOrderPayload } from '@/types/order'

const EMPTY_FORM: CheckoutFormData = {
  customer_name: '',
  customer_phone: '',
  customer_address: '',
  notes: '',
}

export function CheckoutForm() {
  const router = useRouter()
  const { itemsPriced, totalPrice, clear } = useCart()

  const [form, setForm] = useState<CheckoutFormData>(EMPTY_FORM)
  const [errors, setErrors] = useState<CheckoutFormErrors>({})
  const [serverError, setServerError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    // Limpiar error del campo al escribir
    if (errors[name as keyof CheckoutFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const validation = validateCheckoutForm(form)
    if (hasErrors(validation)) {
      setErrors(validation)
      return
    }

    if (itemsPriced.length === 0) return

    setServerError(null)
    setSubmitting(true)

    const payload: CreateOrderPayload = {
      customer_name: form.customer_name.trim(),
      customer_phone: form.customer_phone.trim(),
      customer_address: form.customer_address.trim() || null,
      notes: form.notes.trim() || null,
      subtotal: totalPrice,
      total: totalPrice,
      items: itemsPriced.map((i) => ({
        product_id: i.product.id,
        product_name: i.product.name,
        quantity: i.quantity,
        unit_price: i.product.price_unit,
        dozen_price: i.product.price_dozen,
        dozens_applied: i.breakdown.dozensApplied,
        remaining_units: i.breakdown.remainingUnits,
        line_total: i.breakdown.lineTotal,
        color: i.color,
        size: i.size,
      })),
    }

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error('Error al guardar el pedido.')

      const { orderId } = await res.json()
      // Guardar el pedido en sessionStorage para mostrarlo en la confirmación
      // (el anon user no puede leer orders de Supabase por RLS)
      sessionStorage.setItem('last_order', JSON.stringify(payload))
      clear()
      router.push(`/checkout/confirmacion?orderId=${orderId}`)
    } catch {
      setServerError('Hubo un error al enviar el pedido. Intentá de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* Nombre */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="customer_name" className="text-sm font-medium text-foreground">
          Nombre <span className="text-destructive">*</span>
        </label>
        <input
          id="customer_name"
          name="customer_name"
          type="text"
          value={form.customer_name}
          onChange={handleChange}
          placeholder="Tu nombre completo"
          autoComplete="name"
          aria-invalid={!!errors.customer_name}
          className="h-11 w-full rounded-xl border border-white/30 bg-white/60 backdrop-blur-sm px-3 text-sm outline-none transition focus:border-white/60 focus:bg-white/80 aria-[invalid=true]:border-destructive"
        />
        {errors.customer_name && (
          <p className="text-xs text-destructive">{errors.customer_name}</p>
        )}
      </div>

      {/* Teléfono */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="customer_phone" className="text-sm font-medium text-foreground">
          Teléfono <span className="text-destructive">*</span>
        </label>
        <input
          id="customer_phone"
          name="customer_phone"
          type="tel"
          value={form.customer_phone}
          onChange={handleChange}
          placeholder="Ej: 11 1234-5678"
          autoComplete="tel"
          aria-invalid={!!errors.customer_phone}
          className="h-11 w-full rounded-xl border border-white/30 bg-white/60 backdrop-blur-sm px-3 text-sm outline-none transition focus:border-white/60 focus:bg-white/80 aria-[invalid=true]:border-destructive"
        />
        {errors.customer_phone && (
          <p className="text-xs text-destructive">{errors.customer_phone}</p>
        )}
      </div>

      {/* Dirección */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="customer_address" className="text-sm font-medium text-foreground">
          Dirección <span className="text-muted-foreground text-xs font-normal">(opcional)</span>
        </label>
        <input
          id="customer_address"
          name="customer_address"
          type="text"
          value={form.customer_address}
          onChange={handleChange}
          placeholder="Calle, número, localidad"
          autoComplete="street-address"
          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30"
        />
      </div>

      {/* Observaciones */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="notes" className="text-sm font-medium text-foreground">
          Observaciones <span className="text-muted-foreground text-xs font-normal">(opcional)</span>
        </label>
        <textarea
          id="notes"
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Indicaciones especiales para el pedido..."
          rows={3}
          className="w-full rounded-xl border border-white/30 bg-white/60 backdrop-blur-sm px-3 py-2 text-sm outline-none transition focus:border-white/60 focus:bg-white/80 resize-none"
        />
      </div>

      {serverError && (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting || itemsPriced.length === 0}
        className="w-full rounded-2xl py-4 text-base font-bold hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
        style={{ backgroundColor: 'var(--lime)', color: '#000000', boxShadow: '0 8px 25px 0 color-mix(in srgb, var(--lime) 30%, transparent)' }}
      >
        {submitting ? 'Enviando pedido...' : 'Confirmar pedido'}
      </button>
    </form>
  )
}
