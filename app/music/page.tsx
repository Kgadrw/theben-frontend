import Navbar from '@/components/Navbar'
import Music from '@/components/Music'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'theben Music - The Ben Songs & Albums | Rwandan Artist',
  description: 'Discover theben (The Ben)\'s latest music albums and tracks. The Ben is a prominent Rwandan artist known for hit songs like "Ndaje", "Ni Forever", and "Naremeye". Stream and download his music.',
  keywords: ['theben music', 'theben songs', 'theben albums', 'The Ben music', 'The Ben albums', 'Rwandan music', 'The Ben songs', 'Ndaje', 'Ni Forever', 'Naremeye', 'East African music', 'Benjamin Mugisha music', 'theben tracks'],
  openGraph: {
    title: 'theben Music - The Ben Songs & Albums | Rwandan Artist',
    description: 'Discover theben (The Ben)\'s latest music albums and tracks. Stream his hit songs including "Ndaje", "Ni Forever", and "Naremeye".',
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
