export interface CheckoutFormData {
  customer_name: string
  customer_phone: string
  customer_address: string
  notes: string
}

export interface CheckoutFormErrors {
  customer_name?: string
  customer_phone?: string
}

export function validateCheckoutForm(data: CheckoutFormData): CheckoutFormErrors {
  const errors: CheckoutFormErrors = {}

  if (!data.customer_name.trim()) {
    errors.customer_name = 'El nombre es obligatorio.'
  }

  if (!data.customer_phone.trim()) {
    errors.customer_phone = 'El teléfono es obligatorio.'
  } else if (!/^[\d\s\+\-\(\)]{7,20}$/.test(data.customer_phone.trim())) {
    errors.customer_phone = 'Ingresá un teléfono válido.'
  }

  return errors
}

export function hasErrors(errors: CheckoutFormErrors): boolean {
  return Object.keys(errors).length > 0
}
