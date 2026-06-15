jest.mock('@vercel/kv', () => ({
  kv: {
    set: jest.fn(),
    get: jest.fn(),
    rpush: jest.fn(),
    lrange: jest.fn(),
  },
}))

import { kv } from '@vercel/kv'
import { saveMessage, getMessages } from '@/lib/kv'

const mockKv = kv as jest.Mocked<typeof kv>

beforeEach(() => jest.clearAllMocks())

describe('saveMessage', () => {
  it('stores the message and pushes its id', async () => {
    mockKv.set.mockResolvedValue('OK')
    mockKv.rpush.mockResolvedValue(1)

    const msg = await saveMessage('Maria', 'Happy birthday!')

    expect(msg.from).toBe('Maria')
    expect(msg.text).toBe('Happy birthday!')
    expect(typeof msg.id).toBe('string')
    expect(typeof msg.createdAt).toBe('number')
    expect(mockKv.set).toHaveBeenCalledWith(`messages:${msg.id}`, msg)
    expect(mockKv.rpush).toHaveBeenCalledWith('message-ids', msg.id)
  })
})

describe('getMessages', () => {
  it('returns messages in submission order', async () => {
    const stored = [
      { id: '1', from: 'Ana', text: 'Hello', createdAt: 1000 },
      { id: '2', from: 'Leo', text: 'Hi', createdAt: 2000 },
    ]
    mockKv.lrange.mockResolvedValue(['1', '2'])
    mockKv.get.mockImplementation((key: string) => {
      const id = key.replace('messages:', '')
      return Promise.resolve(stored.find(m => m.id === id) ?? null)
    })

    const result = await getMessages()
    expect(result).toHaveLength(2)
    expect(result[0].from).toBe('Ana')
    expect(result[1].from).toBe('Leo')
  })

  it('returns empty array when no messages exist', async () => {
    mockKv.lrange.mockResolvedValue([])
    const result = await getMessages()
    expect(result).toEqual([])
  })

  it('filters out null entries from missing KV keys', async () => {
    const stored = { id: '1', from: 'Ana', text: 'Hello', createdAt: 1000 }
    mockKv.lrange.mockResolvedValue(['1', '2'])
    mockKv.get.mockImplementation((key: string) =>
      key === 'messages:1' ? Promise.resolve(stored) : Promise.resolve(null)
    )

    const result = await getMessages()
    expect(result).toHaveLength(1)
    expect(result[0].from).toBe('Ana')
  })
})
