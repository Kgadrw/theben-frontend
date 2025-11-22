import Navbar from '@/components/Navbar'
import Music from '@/components/Music'
import Footer from '@/components/Footer'

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

