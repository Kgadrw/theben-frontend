import Navbar from '@/components/Navbar'
import Videos from '@/components/Videos'
import Footer from '@/components/Footer'

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

