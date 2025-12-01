import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Music from '@/components/Music'
import Videos from '@/components/Videos'
import Tours from '@/components/Tours'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'theben - The Ben Official Website | Rwandan Artist & Musician',
  description: 'theben (The Ben) - Benjamin Mugisha is a prominent Rwandan artist and musician from East Africa. Official website featuring latest music albums, videos, tours, and performances. Known for hit songs like "Ndaje", "Ni Forever", and "Naremeye".',
  keywords: ['theben', 'the ben', 'Theben', 'The Ben', 'theben official', 'theben music', 'theben rwanda', 'theben artist', 'theben musician', 'Rwandan artist', 'Rwandan musician', 'East African music', 'Benjamin Mugisha', 'Rwanda music', 'The Ben songs', 'Ndaje', 'Ni Forever', 'Naremeye', 'theben songs', 'theben videos', 'theben tour'],
  openGraph: {
    title: 'theben - The Ben Official Website | Rwandan Artist & Musician',
    description: 'theben (The Ben) - Benjamin Mugisha is a prominent Rwandan artist and musician from East Africa. Official website featuring latest music albums, videos, tours, and performances.',
    url: '/',
    images: ['/theben.jfif'],
  },
}

// Structured Data (JSON-LD) for SEO
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thebenofficial.com'

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'The Ben',
  alternateName: ['theben', 'Theben', 'Benjamin Mugisha', 'The Ben'],
  jobTitle: 'Musician',
  genre: ['Rwandan Music', 'East African Music', 'Hip Hop', 'Afrobeat', 'Afropop'],
  nationality: {
    '@type': 'Country',
    name: 'Rwanda',
  },
  description: 'theben (The Ben) - Benjamin Mugisha is a prominent Rwandan artist and musician from East Africa.',
  url: baseUrl,
  image: `${baseUrl}/theben.jfif`,
  sameAs: [
    // Add social media links when available
  ],
  knowsAbout: ['Music', 'Rwandan Music', 'East African Music', 'Hip Hop', 'Afrobeat'],
  award: 'East Africa Best Act',
}

const musicGroupSchema = {
  '@context': 'https://schema.org',
  '@type': 'MusicGroup',
  name: 'theben',
  alternateName: ['The Ben', 'Theben'],
  description: 'theben (The Ben) - Benjamin Mugisha is a prominent Rwandan artist and musician from East Africa.',
  url: baseUrl,
  image: `${baseUrl}/theben.jfif`,
  genre: ['Rwandan Music', 'East African Music', 'Hip Hop', 'Afrobeat'],
  foundingLocation: {
    '@type': 'Country',
    name: 'Rwanda',
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'theben - The Ben Official',
  alternateName: ['The Ben Official Website', 'theben official'],
  url: baseUrl,
  description: 'Official website of theben (The Ben) - Benjamin Mugisha, a prominent Rwandan artist and musician from East Africa.',
  publisher: {
    '@type': 'Person',
    name: 'The Ben',
    alternateName: 'theben',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${baseUrl}/music?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: baseUrl,
    },
  ],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(musicGroupSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="relative">
        <Hero />
        <Navbar />
      </div>
      <div className="flex flex-col bg-black">
        <Music limit={3} />
        <Videos limit={2} />
        <Tours />
      </div>
      <Footer />
    </>
  )
}
