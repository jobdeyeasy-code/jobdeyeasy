import type { Metadata } from 'next'
import { Poppins, Inter } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
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
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
