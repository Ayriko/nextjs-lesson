import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

const AB_COOKIE = 'ab_variant'

export async function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

  // ─── A/B Testing ────────────────────────────────────────────────────────────
  /**
   * Priorité de résolution du variant :
   *  1. ?ab_prefetch=A|B  → force le variant (QA, tests, démo)
   *  2. Cookie existant   → fidélise la session (même variant à chaque visite)
   *  3. Tirage 50/50      → première visite, on assigne aléatoirement
   *
   * Le cookie est posé sur la réponse pour que toutes les requêtes suivantes
   * retrouvent le même variant sans recourir au tirage.
   */
  const forced = searchParams.get('ab_prefetch')
  const existing = request.cookies.get(AB_COOKIE)?.value as 'A' | 'B' | undefined

  let variant: 'A' | 'B'
  if (forced === 'A' || forced === 'B') {
    variant = forced
  } else if (existing === 'A' || existing === 'B') {
    variant = existing
  } else {
    variant = Math.random() < 0.5 ? 'A' : 'B'
  }

  // ─── Protection admin ────────────────────────────────────────────────────────
  if (pathname.startsWith('/admin')) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    })

    if (token?.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // ─── Réponse ────────────────────────────────────────────────────────────────
  const response = NextResponse.next()

  // On ne re-pose le cookie que si absent ou si un prefetch force un changement
  if (!existing || (forced === 'A' || forced === 'B')) {
    response.cookies.set(AB_COOKIE, variant, {
      sameSite: 'lax',
      path: '/',
      maxAge: 30 * 24 * 60 * 60, // 30 jours
    })
  }

  return response
}

export const config = {
  matcher: [
    // Routes admin (protection rôle)
    '/admin/:path*',
    // Toutes les pages front, sauf assets statiques et API
    '/((?!_next/static|_next/image|favicon.ico|api/).*)',
  ],
}
