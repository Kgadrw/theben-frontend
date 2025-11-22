import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function TermsOfUsePage() {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <section className="relative w-full min-h-screen bg-black py-20 px-4">
          <div className="max-w-4xl mx-auto text-white">
            <h1 className="text-4xl md:text-5xl font-quicksand font-light uppercase tracking-wider mb-12 text-left">
              Terms of Use
            </h1>
            
            <div className="space-y-8 font-quicksand font-light leading-relaxed opacity-90">
              <div>
                <h2 className="text-2xl font-quicksand font-light uppercase tracking-wider mb-4">
                  Acceptance of Terms
                </h2>
                <p className="text-base md:text-lg mb-4">
                  By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-quicksand font-light uppercase tracking-wider mb-4">
                  Use License
                </h2>
                <p className="text-base md:text-lg mb-4">
                  Permission is granted to temporarily view the materials on The Ben's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-quicksand font-light uppercase tracking-wider mb-4">
                  Restrictions
                </h2>
                <p className="text-base md:text-lg mb-4">
                  You may not modify or copy the materials, use the materials for any commercial purpose, or attempt to decompile or reverse engineer any software contained on The Ben's website.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-quicksand font-light uppercase tracking-wider mb-4">
                  Intellectual Property
                </h2>
                <p className="text-base md:text-lg mb-4">
                  All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of The Ben and is protected by copyright and other intellectual property laws.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-quicksand font-light uppercase tracking-wider mb-4">
                  Disclaimer
                </h2>
                <p className="text-base md:text-lg mb-4">
                  The materials on The Ben's website are provided on an 'as is' basis. The Ben makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability.
                </p>
              </div>

              <div>
                <p className="text-sm opacity-70">
                  Last updated: January 2025
                </p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  )
}

