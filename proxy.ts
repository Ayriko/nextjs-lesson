import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

/**
 * getToken() lit et décode le cookie "next-auth.session-token" sans BDD.
 * Il vérifie juste la signature JWT avec NEXTAUTH_SECRET.
 * Le token contient ce qu'on a mis dans encode() (id, email, role...).
 *
 * getServerSession() est interdit ici : le proxy tourne sur l'Edge runtime
 * qui n'a pas accès à Node.js (donc pas Prisma, pas de BDD).
 */

export async function proxy(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  if (token?.role === 'admin') {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
  matcher: '/admin/:path*',
}
