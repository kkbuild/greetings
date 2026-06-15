const FALLBACKS = ['A friend', 'Someone special', 'A mystery guest']

export function buildChoices(correctName: string, allNames: string[]): string[] {
  const uniqueOthers = Array.from(new Set(allNames.filter(n => n !== correctName)))
  const shuffled = [...uniqueOthers].sort(() => Math.random() - 0.5)
  const choices: string[] = [correctName, ...shuffled.slice(0, 3)]

  let fallbackIndex = 0
  while (choices.length < 4) {
    const fallback = FALLBACKS[fallbackIndex % FALLBACKS.length]
    if (!choices.includes(fallback)) choices.push(fallback)
    fallbackIndex++
  }

  return choices.sort(() => Math.random() - 0.5)
}

export function calculateScore(
  guesses: Record<number, string>,
  messages: { from: string }[]
): number {
  return messages.filter((msg, i) => guesses[i] === msg.from).length
}
