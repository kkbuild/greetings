import type { Metadata } from 'next'
import { Libre_Baskerville, Raleway } from 'next/font/google'
import './globals.css'

const baskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
})

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: "Happy 40th, Cristina 🌸",
  description: "Leave Cristina an anonymous birthday message — she'll guess who it's from!",
  themeColor: '#fdf3e7',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${baskerville.variable} ${raleway.variable}`}>
      <body>{children}</body>
    </html>
  )
}
