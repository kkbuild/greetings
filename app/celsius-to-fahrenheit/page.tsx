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
