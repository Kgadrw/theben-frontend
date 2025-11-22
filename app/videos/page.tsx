import Navbar from '@/components/Navbar'
import Videos from '@/components/Videos'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Videos',
  description: 'Watch The Ben\'s latest music videos and performances. The Ben is a prominent Rwandan artist showcasing his music videos, live performances, and behind-the-scenes content.',
  keywords: ['The Ben videos', 'The Ben music videos', 'Rwandan music videos', 'The Ben performances', 'East African music videos', 'Benjamin Mugisha videos'],
  openGraph: {
    title: 'The Ben Videos | Rwandan Artist Music Videos',
    description: 'Watch The Ben\'s latest music videos and performances. Experience his music through official music videos and live performances.',
    url: '/videos',
    type: 'website',
    images: ['/theben.jfif'],
  },
}

export default function VideosPage() {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <Videos />
        <Footer />
      </div>
    </>
  )
}
