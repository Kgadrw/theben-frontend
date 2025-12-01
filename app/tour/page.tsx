import Navbar from '@/components/Navbar'
import Tours from '@/components/Tours'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'theben Tours - The Ben Concert Dates & Tickets | Rwandan Artist',
  description: 'Find theben (The Ben)\'s upcoming tour dates and concert schedule. The Ben is a prominent Rwandan artist performing live shows across East Africa. Get tickets for his concerts and performances.',
  keywords: ['theben tours', 'theben concerts', 'theben tour dates', 'The Ben tours', 'The Ben concerts', 'The Ben tour dates', 'Rwandan artist concerts', 'The Ben tickets', 'East African music tours', 'Benjamin Mugisha tours', 'theben tickets'],
  openGraph: {
    title: 'theben Tours - The Ben Concert Dates & Tickets | Rwandan Artist',
    description: 'Find theben (The Ben)\'s upcoming tour dates and concert schedule. Get tickets for his live performances across East Africa.',
    url: '/tour',
    type: 'website',
    images: ['/theben.jfif'],
  },
}

export default function TourPage() {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <Tours />
        <Footer />
      </div>
    </>
  )
}
