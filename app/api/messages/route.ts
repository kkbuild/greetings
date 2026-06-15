import { NextRequest, NextResponse } from 'next/server'
import { saveMessage, getMessages } from '@/lib/kv'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 })

  const from = (body.from ?? '').trim()
  const text = (body.text ?? '').trim()

  if (!from || !text) {
    return NextResponse.json({ error: 'Name and message are required.' }, { status: 400 })
  }
  if (from.length > 60) {
    return NextResponse.json({ error: 'Name must be 60 characters or less.' }, { status: 400 })
  }
  if (text.length > 2000) {
    return NextResponse.json({ error: 'Message must be 2000 characters or less.' }, { status: 400 })
  }

  await saveMessage(from, text)
  return NextResponse.json({ ok: true })
}

export async function GET() {
  const messages = await getMessages()
  return NextResponse.json({ messages })
}
