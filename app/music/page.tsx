import Navbar from '@/components/Navbar'
import Music from '@/components/Music'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Music',
  description: 'Discover The Ben\'s latest music albums and tracks. The Ben is a prominent Rwandan artist known for hit songs like "Ndaje", "Ni Forever", and "Naremeye". Stream and download his music.',
  keywords: ['The Ben music', 'The Ben albums', 'Rwandan music', 'The Ben songs', 'Ndaje', 'Ni Forever', 'Naremeye', 'East African music', 'Benjamin Mugisha music'],
  openGraph: {
    title: 'The Ben Music | Rwandan Artist Albums and Songs',
    description: 'Discover The Ben\'s latest music albums and tracks. Stream his hit songs including "Ndaje", "Ni Forever", and "Naremeye".',
    url: '/music',
    type: 'website',
    images: ['/theben.jfif'],
  },
}

export default function MusicPage() {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <Music />
        <Footer />
      </div>
    </>
  )
}
