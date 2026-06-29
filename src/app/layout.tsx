import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'JobDeyEasy — We do the hard part. You hit Send.',
  description:
    'JobDeyEasy finds jobs that fit you and prepares your entire application — tailored CV, matching cover letter, and exactly where to send it. Delivered on WhatsApp.',
  openGraph: {
    title: 'JobDeyEasy — We do the hard part. You hit Send.',
    description:
      'AI-drafted, human-checked job applications. Delivered on WhatsApp. No CV? We build one.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body>{children}</body>
    </html>
  )
}
