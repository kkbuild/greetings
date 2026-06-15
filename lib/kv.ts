import { kv } from '@vercel/kv'

export interface Message {
  id: string
  from: string
  text: string
  createdAt: number
}

export async function saveMessage(from: string, text: string): Promise<Message> {
  const message: Message = {
    id: crypto.randomUUID(),
    from,
    text,
    createdAt: Date.now(),
  }
  await kv.set(`messages:${message.id}`, message)
  await kv.rpush('message-ids', message.id)
  return message
}

export async function getMessages(): Promise<Message[]> {
  const ids = await kv.lrange<string>('message-ids', 0, -1)
  if (!ids.length) return []
  const messages = await Promise.all(
    ids.map(id => kv.get<Message>(`messages:${id}`))
  )
  return messages.filter((m): m is Message => m !== null)
}
