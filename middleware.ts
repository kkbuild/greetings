import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const password = process.env.CRISTINA_PASSWORD
  const cookie = req.cookies.get('cristina_auth')?.value

  if (!password || cookie !== password) {
    return NextResponse.redirect(new URL('/for-cristina/login', req.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/for-cristina'],
}
