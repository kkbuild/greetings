# Celsius to Fahrenheit Converter — Design

## Purpose

A simple, standalone page with one text input that converts a Celsius
temperature to Fahrenheit, updating live as the user types.

## Scope

- New route only. No changes to existing pages (`app/page.tsx`,
  `app/for-cristina/*`).
- Pure client-side computation — no API route, no persistence, no
  external state.

## Route

`app/celsius-to-fahrenheit/page.tsx` — client component (`'use client'`).

## UI

- Reuses existing visual language from `app/globals.css` (`.wrap`,
  `.card`, `.err` classes) for consistency with the rest of the app.
- One labeled text input for Celsius (`type="text"`, not `type="number"`,
  so invalid input — letters, empty string — can be explicitly detected
  rather than silently coerced by the browser).
- A result line below the input showing `= X°F`, recalculated on every
  keystroke (`onChange`, no debounce — computation is trivial).
- If the input is empty or fails to parse as a number, the result line
  is replaced with an error message ("Please enter a valid number")
  rendered with the existing `.err` class.

## Logic

Pure conversion function, extracted for testability:

```ts
// lib/celsiusToFahrenheit.ts
export function celsiusToFahrenheit(celsius: number): number {
  return celsius * 9 / 5 + 32
}
```

The page component parses the input string with `Number(value)`,
treating empty string and `NaN` as invalid, and calls
`celsiusToFahrenheit` for valid numeric input.

## Testing

`__tests__/lib/celsiusToFahrenheit.test.ts`, following the existing
`__tests__/lib` pattern in this repo. Covers:

- A typical positive value (e.g. 100°C → 212°F)
- 0°C → 32°F
- A negative value (e.g. -40°C → -40°F)

## Out of scope

- No Fahrenheit-to-Celsius reverse conversion.
- No unit toggle/switcher.
- No styling beyond reusing existing global classes.
