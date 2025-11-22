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
  title: {
    default: 'The Ben | Rwandan Artist | Official Website',
    template: '%s | The Ben - Rwandan Artist'
  },
  description: 'The Ben (Benjamin Mugisha) is a prominent Rwandan artist and musician from East Africa. Discover his latest music, videos, tours, and performances. Known for hit songs like "Ndaje", "Ni Forever", and "Naremeye".',
  keywords: ['The Ben', 'Theben', 'Rwandan artist', 'Rwandan musician', 'East African music', 'Benjamin Mugisha', 'Rwanda music', 'The Ben songs', 'Ndaje', 'Ni Forever', 'Naremeye', 'East Africa Best Act', 'Rwandan singer', 'Rwanda entertainment'],
  authors: [{ name: 'The Ben' }],
  creator: 'The Ben',
  publisher: 'The Ben',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://theben.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://theben.com',
    siteName: 'The Ben - Rwandan Artist',
    title: 'The Ben | Rwandan Artist | Official Website',
    description: 'The Ben (Benjamin Mugisha) is a prominent Rwandan artist and musician from East Africa. Discover his latest music, videos, tours, and performances.',
    images: [
      {
        url: '/theben.jfif',
        width: 1200,
        height: 630,
        alt: 'The Ben - Rwandan Artist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Ben | Rwandan Artist | Official Website',
    description: 'The Ben (Benjamin Mugisha) is a prominent Rwandan artist and musician from East Africa. Discover his latest music, videos, tours, and performances.',
    images: ['/theben.jfif'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

import CookiesModal from '@/components/CookiesModal'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${quicksand.variable} ${comforterBrush.variable}`}>
      <body itemScope itemType="https://schema.org/Person">
        {children}
        <CookiesModal />
      </body>
    </html>
  )
}

