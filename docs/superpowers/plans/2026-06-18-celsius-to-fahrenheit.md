# Celsius to Fahrenheit Converter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a standalone page at `/celsius-to-fahrenheit` with one text input that live-converts Celsius to Fahrenheit.

**Architecture:** A pure conversion function in `lib/celsiusToFahrenheit.ts` (unit-tested in isolation), consumed by a client component page at `app/celsius-to-fahrenheit/page.tsx` that reuses existing `.wrap`/`.card`/`.err` classes from `app/globals.css`.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript, Jest + ts-jest (existing project setup — no new dependencies).

---

### Task 1: Conversion function

**Files:**
- Create: `lib/celsiusToFahrenheit.ts`
- Test: `__tests__/lib/celsiusToFahrenheit.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
import { celsiusToFahrenheit } from '@/lib/celsiusToFahrenheit'

describe('celsiusToFahrenheit', () => {
  it('converts a typical positive value', () => {
    expect(celsiusToFahrenheit(100)).toBe(212)
  })

  it('converts zero', () => {
    expect(celsiusToFahrenheit(0)).toBe(32)
  })

  it('converts a negative value', () => {
    expect(celsiusToFahrenheit(-40)).toBe(-40)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest __tests__/lib/celsiusToFahrenheit.test.ts`
Expected: FAIL with `Cannot find module '@/lib/celsiusToFahrenheit'`

- [ ] **Step 3: Write minimal implementation**

```ts
export function celsiusToFahrenheit(celsius: number): number {
  return celsius * 9 / 5 + 32
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx jest __tests__/lib/celsiusToFahrenheit.test.ts`
Expected: PASS, 3 tests passing

- [ ] **Step 5: Commit**

```bash
git add lib/celsiusToFahrenheit.ts __tests__/lib/celsiusToFahrenheit.test.ts
git commit -m "feat: add celsiusToFahrenheit conversion function"
```

---

### Task 2: Converter page

**Files:**
- Create: `app/celsius-to-fahrenheit/page.tsx`

- [ ] **Step 1: Write the page component**

```tsx
'use client'

import { useState } from 'react'
import { celsiusToFahrenheit } from '@/lib/celsiusToFahrenheit'

export default function CelsiusToFahrenheit() {
  const [celsiusInput, setCelsiusInput] = useState('')

  const parsed = celsiusInput.trim() === '' ? NaN : Number(celsiusInput)
  const isValid = !Number.isNaN(parsed)

  return (
    <div className="wrap">
      <div className="hero">
        <h1>Celsius to Fahrenheit</h1>
      </div>

      <div className="card">
        <label htmlFor="celsius">Celsius</label>
        <input
          id="celsius"
          name="celsius"
          type="text"
          inputMode="decimal"
          value={celsiusInput}
          onChange={e => setCelsiusInput(e.target.value)}
          placeholder="e.g. 100"
        />

        {isValid ? (
          <p>= {celsiusToFahrenheit(parsed)}°F</p>
        ) : (
          <div className="err" role="alert">Please enter a valid number</div>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Start the dev server**

Run: `npm run dev`
Expected: Server starts on `http://localhost:3000` with no compile errors

- [ ] **Step 3: Manually verify in browser**

Open `http://localhost:3000/celsius-to-fahrenheit`. Confirm:
- Typing `100` shows `= 212°F`
- Typing `0` shows `= 32°F`
- Typing `-40` shows `= -40°F`
- Clearing the input shows "Please enter a valid number"
- Typing letters (e.g. `abc`) shows "Please enter a valid number"

- [ ] **Step 4: Commit**

```bash
git add app/celsius-to-fahrenheit/page.tsx
git commit -m "feat: add Celsius to Fahrenheit converter page"
```

---

## Self-Review Notes

- **Spec coverage:** route ✅ (Task 2), live update via onChange ✅ (Task 2), error message on invalid input ✅ (Task 2), pure conversion function ✅ (Task 1), unit tests covering typical/zero/negative ✅ (Task 1). No reverse conversion or unit toggle added, matching "out of scope."
- **Placeholder scan:** none found — all steps have complete code and exact commands.
- **Type consistency:** `celsiusToFahrenheit(celsius: number): number` defined in Task 1 matches the call signature used in Task 2.
