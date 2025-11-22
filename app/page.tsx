import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Music from '@/components/Music'
import Videos from '@/components/Videos'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <div className="fixed inset-0 h-[60vh] md:h-screen overflow-hidden z-0">
        <Hero />
        <Navbar />
      </div>
      <div className="relative z-10" style={{ marginTop: '60vh' }}>
        <style dangerouslySetInnerHTML={{
          __html: `
            @media (min-width: 768px) {
              .content-wrapper {
                margin-top: 100vh !important;
              }
            }
          `
        }} />
        <div className="content-wrapper">
          <About />
          <Music />
          <Videos />
          <Footer />
        </div>
      </div>
    </>
  )
}

