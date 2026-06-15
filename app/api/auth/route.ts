import { NextRequest, NextResponse } from 'next/server'

const COOKIE = 'cristina_auth'
const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 60 * 24 * 30,
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const expected = process.env.CRISTINA_PASSWORD

  if (!expected || !body || body.password !== expected) {
    return NextResponse.json({ error: 'Wrong password.' }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE, expected, COOKIE_OPTS)
  return res
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.delete(COOKIE)
  return res
}
