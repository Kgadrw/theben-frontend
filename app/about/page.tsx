import Navbar from '@/components/Navbar'
import About from '@/components/About'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About theben - The Ben Biography | Rwandan Artist',
  description: 'Learn about theben (The Ben) - Benjamin Mugisha, a prominent Rwandan artist and musician from East Africa. Discover his biography, achievements, and musical journey. Winner of the "East Africa Best Act/Song" award at the Pipo Music Awards.',
  keywords: ['theben about', 'theben biography', 'The Ben biography', 'The Ben about', 'theben artist', 'Benjamin Mugisha', 'Rwandan artist biography', 'The Ben awards', 'Pipo Music Awards', 'East Africa Best Act', 'theben musician'],
  openGraph: {
    title: 'About theben - The Ben Biography | Rwandan Artist',
    description: 'Learn about theben (The Ben) - Benjamin Mugisha, a prominent Rwandan artist and musician. Discover his biography, achievements, and musical journey.',
    url: '/about',
    type: 'profile',
    images: ['/theben.jfif'],
  },
}

// Structured Data for About page
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thebenofficial.com'

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'The Ben',
  alternateName: ['theben', 'Theben', 'Benjamin Mugisha', 'The Ben'],
  jobTitle: 'Musician',
  nationality: {
    '@type': 'Country',
    name: 'Rwanda',
  },
  birthDate: '1987-01-09',
  description: 'theben (The Ben) - Benjamin Mugisha is a prominent figure in the East African music scene. He has produced numerous popular songs, such as "Ndaje", "Ni Forever", and "Naremeye", and often collaborates with other African artists.',
  award: 'East Africa Best Act/Song award at the Pipo Music Awards',
  knowsAbout: ['Music', 'Rwandan Music', 'East African Music', 'Hip Hop', 'Afrobeat'],
  url: `${baseUrl}/about`,
  image: `${baseUrl}/theben.jfif`,
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
