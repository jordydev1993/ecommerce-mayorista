import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (!pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  // Supabase v2 guarda la sesión en sb-<ref>-auth-token (puede estar fragmentada en chunks)
  const hasSession = req.cookies.getAll().some(
    (c) => c.name.includes('auth-token') && c.value.length > 0
  )

  if (!hasSession) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
