import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Music from '@/components/Music'
import Videos from '@/components/Videos'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description: 'The Ben (Benjamin Mugisha) is a prominent Rwandan artist and musician from East Africa. Discover his latest music albums, videos, tours, and performances. Known for hit songs like "Ndaje", "Ni Forever", and "Naremeye".',
  keywords: ['The Ben', 'Rwandan artist', 'Rwandan musician', 'East African music', 'Benjamin Mugisha', 'Rwanda music', 'The Ben songs', 'Ndaje', 'Ni Forever', 'Naremeye'],
  openGraph: {
    title: 'The Ben | Rwandan Artist | Official Website',
    description: 'The Ben (Benjamin Mugisha) is a prominent Rwandan artist and musician from East Africa. Discover his latest music albums, videos, tours, and performances.',
    url: '/',
    images: ['/theben.jfif'],
  },
}

// Structured Data (JSON-LD) for SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'The Ben',
  alternateName: ['Benjamin Mugisha', 'Theben'],
  jobTitle: 'Musician',
  nationality: {
    '@type': 'Country',
    name: 'Rwanda',
  },
  description: 'The Ben (Benjamin Mugisha) is a prominent Rwandan artist and musician from East Africa.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://theben.com',
  image: '/theben.jfif',
  sameAs: [
    // Add social media links when available
  ],
  knowsAbout: ['Music', 'Rwandan Music', 'East African Music', 'Hip Hop', 'Afrobeat'],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="relative">
        <Hero />
        <Navbar />
      </div>
      <Music />
      <Videos />
      <Footer />
    </>
  )
}
