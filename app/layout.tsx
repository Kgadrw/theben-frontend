import type { Metadata, Viewport } from 'next'
import { Quicksand, Comforter_Brush } from 'next/font/google'
import './globals.css'

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
  display: 'swap',
})

const comforterBrush = Comforter_Brush({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-comforter-brush',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Theben | Official Website',
  description: 'Official website for theben',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${quicksand.variable} ${comforterBrush.variable}`}>
      <body>{children}</body>
    </html>
  )
}

