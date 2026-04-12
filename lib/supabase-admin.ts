import { createClient } from '@supabase/supabase-js'

// Cliente con service role — solo para uso en el servidor (Server Components, Route Handlers)
// Bypasea RLS. Nunca importar desde componentes cliente.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
