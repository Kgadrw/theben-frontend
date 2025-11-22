import Navbar from '@/components/Navbar'
import About from '@/components/About'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about The Ben (Benjamin Mugisha), a prominent Rwandan artist and musician from East Africa. Discover his biography, achievements, and musical journey. Winner of the "East Africa Best Act/Song" award at the Pipo Music Awards.',
  keywords: ['The Ben biography', 'The Ben about', 'Benjamin Mugisha', 'Rwandan artist biography', 'The Ben awards', 'Pipo Music Awards', 'East Africa Best Act'],
  openGraph: {
    title: 'About The Ben | Rwandan Artist Biography',
    description: 'Learn about The Ben (Benjamin Mugisha), a prominent Rwandan artist and musician. Discover his biography, achievements, and musical journey.',
    url: '/about',
    type: 'profile',
    images: ['/theben.jfif'],
  },
}

// Structured Data for About page
const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'The Ben',
  alternateName: ['Benjamin Mugisha', 'Theben'],
  jobTitle: 'Musician',
  nationality: {
    '@type': 'Country',
    name: 'Rwanda',
  },
  birthDate: '1987-01-09',
  description: 'The Ben (Benjamin Mugisha) is a prominent figure in the East African music scene. He has produced numerous popular songs, such as "Ndaje", "Ni Forever", and "Naremeye", and often collaborates with other African artists.',
  award: 'East Africa Best Act/Song award at the Pipo Music Awards',
  knowsAbout: ['Music', 'Rwandan Music', 'East African Music', 'Hip Hop', 'Afrobeat'],
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <Navbar />
      <div className="pt-20">
        <About />
        <Footer />
      </div>
    </>
  )
}
