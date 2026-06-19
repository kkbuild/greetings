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
