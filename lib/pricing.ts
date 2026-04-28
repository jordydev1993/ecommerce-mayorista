// ============================================================
// pricing.ts — Fuente de verdad de la lógica comercial
// Todas las funciones son puras: sin estado, sin side effects.
// El cálculo se aplica POR PRODUCTO — nunca mezclando cantidades
// entre productos distintos.
// ============================================================

/**
 * Devuelve la cantidad de docenas completas para una cantidad dada.
 *
 * @example
 * getDozens(11) // 0
 * getDozens(12) // 1
 * getDozens(25) // 2
 */
export function getDozens(quantity: number): number {
  return Math.floor(quantity / 12)
}

/**
 * Devuelve las unidades restantes después de agrupar en docenas.
 * Estas unidades se cobran a precio unitario.
 *
 * @example
 * getRemainder(11) // 11
 * getRemainder(12) // 0
 * getRemainder(25) // 1
 */
export function getRemainder(quantity: number): number {
  return quantity % 12
}

/**
 * Calcula el total de una línea del carrito.
 *
 * Fórmula:
 *   total = getDozens(quantity) * priceDozen + getRemainder(quantity) * priceUnit
 *
 * @example
 * calculateLineTotal(1,  100, 1000) //   100  (1 unidad a $100)
 * calculateLineTotal(11, 100, 1000) //  1100  (11 unidades a $100)
 * calculateLineTotal(12, 100, 1000) //  1000  (1 docena a $1000)
 * calculateLineTotal(13, 100, 1000) //  1100  (1 docena $1000 + 1 unidad $100)
 * calculateLineTotal(24, 100, 1000) //  2000  (2 docenas a $1000)
 * calculateLineTotal(25, 100, 1000) //  2100  (2 docenas $2000 + 1 unidad $100)
 */
export function calculateLineTotal(
  quantity: number,
  priceUnit: number,
  priceDozen: number
): number {
  const dozens = getDozens(quantity)
  const remainder = getRemainder(quantity)
  return dozens * priceDozen + remainder * priceUnit
}

/**
 * Calcula el ahorro respecto a pagar todo a precio unitario.
 * Útil para mostrar el beneficio de comprar por docena en la UI.
 *
 * @example
 * calculateSavings(12, 100, 1000) //  200  (precio lista $1200 − precio docena $1000)
 * calculateSavings(24, 100, 1000) //  400  (precio lista $2400 − precio docena $2000)
 * calculateSavings(11, 100, 1000) //    0  (sin docenas completas, sin ahorro)
 */
export function calculateSavings(
  quantity: number,
  priceUnit: number,
  priceDozen: number
): number {
  const fullPrice = quantity * priceUnit
  const actualPrice = calculateLineTotal(quantity, priceUnit, priceDozen)
  return fullPrice - actualPrice
}

/**
 * Calcula si conviene mostrar un nudge al usuario para completar una docena.
 * Solo aplica cuando quantity < 12 y comprar por docena tiene ahorro real.
 */
export function getDozenNudge(
  quantity: number,
  priceUnit: number,
  priceDozen: number
): { toComplete: number; savingsPerDozen: number; showNudge: boolean } {
  const savingsPerDozen = priceUnit * 12 - priceDozen
  const showNudge = quantity < 12 && savingsPerDozen > 0
  return {
    toComplete: 12 - getRemainder(quantity),
    savingsPerDozen,
    showNudge,
  }
}

// ============================================================
// Tipos de retorno para consumo desde la UI y order_items
// ============================================================

export interface PricingBreakdown {
  quantity: number
  dozensApplied: number
  remainingUnits: number
  lineTotal: number
  savings: number
}

/**
 * Devuelve el desglose completo del cálculo de una línea.
 * Usar este objeto para poblar order_items en Supabase.
 *
 * @example
 * getBreakdown(13, 100, 1000)
 * // {
 * //   quantity: 13,
 * //   dozensApplied: 1,
 * //   remainingUnits: 1,
 * //   lineTotal: 1100,
 * //   savings: 200
 * // }
 */
export function getBreakdown(
  quantity: number,
  priceUnit: number,
  priceDozen: number
): PricingBreakdown {
  return {
    quantity,
    dozensApplied: getDozens(quantity),
    remainingUnits: getRemainder(quantity),
    lineTotal: calculateLineTotal(quantity, priceUnit, priceDozen),
    savings: calculateSavings(quantity, priceUnit, priceDozen),
  }
}
