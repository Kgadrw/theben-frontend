import Navbar from '@/components/Navbar'
import Tours from '@/components/Tours'
import Footer from '@/components/Footer'

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

