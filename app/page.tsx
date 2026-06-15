'use client'

import { useState } from 'react'

function spawnConfetti() {
  if (typeof document === 'undefined') return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const colors = ['#e8956d', '#c4724a', '#f0d9c0', '#b07840', '#6b3f1a']
  for (let i = 0; i < 55; i++) {
    const el = document.createElement('div')
    el.className = 'confetti'
    el.style.left = `${Math.random() * 100}vw`
    el.style.background = colors[i % colors.length]
    el.style.animationDuration = `${1.6 + Math.random() * 1.4}s`
    el.style.animationDelay = `${Math.random() * 0.3}s`
    document.body.appendChild(el)
    setTimeout(() => el.remove(), 3200)
  }
}

export default function Home() {
  const [from, setFrom] = useState('')
  const [text, setText] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit() {
    if (!from.trim() || !text.trim()) {
      setError('Please add your name and a message.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from, text }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong.')
      setSent(true)
      spawnConfetti()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong — please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="wrap">
      <div className="hero">
        <div className="hero-badge" aria-hidden="true">🌸</div>
        <p className="hero-eyebrow">A birthday message for</p>
        <h1>Cristina</h1>
        <p>She&apos;ll try to guess who you are — leave her something fun! 🌷</p>
      </div>

      {sent ? (
        <div className="card sent">
          <div className="big" aria-hidden="true">🎉</div>
          <h3>Sent!</h3>
          <p>Your message is in Cristina&apos;s birthday box — she&apos;ll never know it was you (until she guesses).</p>
          <button
            className="btn"
            style={{ maxWidth: 220, margin: '20px auto 0' }}
            onClick={() => { setFrom(''); setText(''); setSent(false) }}
          >
            Write another
          </button>
        </div>
      ) : (
        <div className="card">
          <label htmlFor="from">
            Your name{' '}
            <span className="label-note">(Cristina will try to guess it!)</span>
          </label>
          <input
            id="from"
            name="from"
            value={from}
            onChange={e => setFrom(e.target.value)}
            placeholder="e.g. Maria, Juan..."
            maxLength={60}
          />

          <label htmlFor="message">Your message to Cristina</label>
          <textarea
            id="message"
            name="message"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Write something fun, sweet, or an inside joke..."
            maxLength={2000}
          />

          {error && <div className="err" role="alert">{error}</div>}

          <button className="btn" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Sending…' : 'Send anonymously ♡'}
          </button>
        </div>
      )}

      <p className="note">Made with love for Cristina&apos;s 40th 🌸</p>
    </div>
  )
}
