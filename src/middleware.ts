import { auth } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(request: NextRequest) {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
    const loginUrl = new URL('/auth/signin', baseUrl)

    const session = await auth() as any

    if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(loginUrl)
    }

    if (!session?.user || session?.user?.role !== 'ADMIN' && session?.user?.role !== 'EDITOR') {
      const to404 = new URL('/404', baseUrl)
      return NextResponse.redirect(to404)
    }
    return NextResponse.next()
  } catch (error) {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
    console.error('Middleware error:', error)
    const to500 = new URL('/500', baseUrl)
    return NextResponse.redirect(to500)
  }
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
