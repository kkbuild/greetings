'use client'

import { useEffect, useState } from 'react'
import { buildChoices, calculateScore } from '@/lib/guessing'
import type { Message } from '@/lib/kv'

export default function ForCristina() {
  const [messages, setMessages] = useState<Message[]>([])
  const [index, setIndex] = useState(0)
  const [guesses, setGuesses] = useState<Record<number, string>>({})
  const [revealed, setRevealed] = useState<Record<number, boolean>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/messages')
      .then(r => r.json())
      .then(d => setMessages(d.messages ?? []))
      .catch(() => setError('Could not load messages. Please try again.'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="wrap" style={{ textAlign: 'center', paddingTop: 80 }}>
      <p style={{ color: 'var(--brown-lt)' }}>Loading your messages…</p>
    </div>
  )

  if (error) return (
    <div className="wrap" style={{ textAlign: 'center', paddingTop: 80 }}>
      <p className="err">{error}</p>
    </div>
  )

  if (!messages.length) return (
    <div className="wrap" style={{ textAlign: 'center', paddingTop: 80 }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
      <p style={{ color: 'var(--brown-lt)' }}>No messages yet — check back soon!</p>
    </div>
  )

  const allNames = messages.map(m => m.from)
  const done = index >= messages.length

  if (done) {
    const score = calculateScore(guesses, messages)
    return (
      <div className="wrap">
        <div className="card score-card">
          <div className="big" aria-hidden="true">🎂</div>
          <h2>Happy 40th, Cristina!</h2>
          <p>You received {messages.length} birthday message{messages.length !== 1 ? 's' : ''}.</p>
          <div className="score-num">{score}/{messages.length}</div>
          <p style={{ marginTop: 6 }}>
            {score === messages.length
              ? 'You guessed them all! You really know your people. 🌟'
              : score === 0
              ? 'They really surprised you! 😄'
              : 'Not bad at all! 🎉'}
          </p>
          <button
            className="btn"
            style={{ maxWidth: 220, margin: '24px auto 0' }}
            onClick={() => { setIndex(0); setGuesses({}); setRevealed({}) }}
          >
            Play again
          </button>
        </div>
        <p className="note">Made with love for Cristina&apos;s 40th 🌸</p>
      </div>
    )
  }

  const current = messages[index]
  const choices = buildChoices(current.from, allNames)
  const isRevealed = !!revealed[index]
  const userGuess = guesses[index]

  function handleGuess(name: string) {
    if (isRevealed) return
    setGuesses(g => ({ ...g, [index]: name }))
    setRevealed(r => ({ ...r, [index]: true }))
  }

  function choiceClass(name: string): string {
    if (!isRevealed) return 'guess'
    if (name === current.from) return 'guess correct'
    if (name === userGuess) return 'guess wrong'
    return 'guess'
  }

  return (
    <div className="wrap">
      <div className="hero">
        <div className="hero-badge" aria-hidden="true">🌸</div>
        <h1>Happy 40th!</h1>
      </div>

      <div className="progress-label">
        Message {index + 1} of {messages.length}
      </div>
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${((index + 1) / messages.length) * 100}%` }}
        />
      </div>

      <div className="card msg-card">
        <span className="quote" aria-hidden="true">&ldquo;</span>
        <p className="msg-text">{current.text}</p>
      </div>

      <p className="guess-label">Who sent this?</p>

      <div className="guesses">
        {choices.map(name => (
          <button
            key={name}
            className={choiceClass(name)}
            onClick={() => handleGuess(name)}
            disabled={isRevealed}
          >
            {name}
            {isRevealed && name === current.from && ' ✓'}
            {isRevealed && name === userGuess && name !== current.from && ' ✗'}
          </button>
        ))}
      </div>

      <div className="nav">
        <button
          className="nav-btn"
          onClick={() => setIndex(i => i - 1)}
          disabled={index === 0}
        >
          ← Prev
        </button>
        <button
          className="nav-btn primary"
          onClick={() => setIndex(i => i + 1)}
          disabled={!isRevealed}
        >
          {index === messages.length - 1 ? 'See score →' : 'Next →'}
        </button>
      </div>

      <p className="note">Made with love for Cristina&apos;s 40th 🌸</p>
    </div>
  )
}
