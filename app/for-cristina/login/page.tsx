'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/for-cristina')
    } else {
      setError('Wrong password. Try again!')
      setLoading(false)
    }
  }

  return (
    <div className="wrap">
      <div className="hero">
        <div className="hero-badge" aria-hidden="true">🌸</div>
        <h1 style={{ fontStyle: 'italic' }}>This is just for you</h1>
        <p className="hero-eyebrow">Enter your secret password to read your messages</p>
      </div>

      <div className="card" style={{ maxWidth: 400, margin: '0 auto' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoFocus
            style={{
              padding: '12px 16px',
              border: '1.5px solid var(--border-md)',
              borderRadius: 10,
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              background: 'var(--surface)',
              color: 'var(--brown)',
              outline: 'none',
            }}
          />
          {error && <p className="err">{error}</p>}
          <button className="btn" type="submit" disabled={loading}>
            {loading ? 'Checking…' : 'Open my messages →'}
          </button>
        </form>
      </div>

      <p className="note">Made with love for Cristina&apos;s 40th 🌸</p>
    </div>
  )
}
