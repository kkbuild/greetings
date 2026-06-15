import { buildChoices, calculateScore } from '@/lib/guessing'

describe('buildChoices', () => {
  it('always includes the correct name', () => {
    const choices = buildChoices('Maria', ['Ana', 'Leo', 'Sofia', 'Pedro'])
    expect(choices).toContain('Maria')
  })

  it('returns exactly 4 choices', () => {
    const choices = buildChoices('Maria', ['Ana', 'Leo', 'Sofia', 'Pedro'])
    expect(choices).toHaveLength(4)
  })

  it('returns no duplicate names', () => {
    const choices = buildChoices('Maria', ['Ana', 'Leo', 'Sofia', 'Pedro'])
    expect(new Set(choices).size).toBe(4)
  })

  it('deduplicates when one person submitted multiple messages', () => {
    // Maria submitted 3 messages — allNames has her 3 times
    const choices = buildChoices('Ana', ['Maria', 'Maria', 'Maria', 'Ana'])
    expect(new Set(choices).size).toBe(choices.length)
    expect(choices).toContain('Ana')
    expect(choices).toContain('Maria')
  })

  it('pads with fallback names when fewer than 4 submitters', () => {
    const choices = buildChoices('Maria', ['Maria', 'Ana'])
    expect(choices).toHaveLength(4)
    expect(choices).toContain('Maria')
    expect(choices).toContain('Ana')
  })

  it('handles single submitter with fallbacks', () => {
    const choices = buildChoices('Maria', ['Maria'])
    expect(choices).toHaveLength(4)
    expect(choices).toContain('Maria')
  })
})

describe('calculateScore', () => {
  const messages = [
    { from: 'Ana' },
    { from: 'Leo' },
    { from: 'Sofia' },
  ]

  it('counts correct guesses', () => {
    const guesses = { 0: 'Ana', 1: 'Wrong', 2: 'Sofia' }
    expect(calculateScore(guesses, messages)).toBe(2)
  })

  it('returns 0 for all wrong guesses', () => {
    const guesses = { 0: 'X', 1: 'X', 2: 'X' }
    expect(calculateScore(guesses, messages)).toBe(0)
  })

  it('returns total for all correct guesses', () => {
    const guesses = { 0: 'Ana', 1: 'Leo', 2: 'Sofia' }
    expect(calculateScore(guesses, messages)).toBe(3)
  })
})
