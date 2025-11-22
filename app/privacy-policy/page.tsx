import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <section className="relative w-full min-h-screen bg-black py-20 px-4">
          <div className="max-w-4xl mx-auto text-white">
            <h1 className="text-4xl md:text-5xl font-quicksand font-light uppercase tracking-wider mb-12 text-left">
              Privacy Policy
            </h1>
            
            <div className="space-y-8 font-quicksand font-light leading-relaxed opacity-90">
              <div>
                <h2 className="text-2xl font-quicksand font-light uppercase tracking-wider mb-4">
                  Introduction
                </h2>
                <p className="text-base md:text-lg mb-4">
                  This Privacy Policy describes how The Ben ("we", "us", or "our") collects, uses, and protects your personal information when you visit our website.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-quicksand font-light uppercase tracking-wider mb-4">
                  Information We Collect
                </h2>
                <p className="text-base md:text-lg mb-4">
                  We may collect personal information that you provide directly to us, including but not limited to your name, email address, and any other information you choose to provide.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-quicksand font-light uppercase tracking-wider mb-4">
                  How We Use Your Information
                </h2>
                <p className="text-base md:text-lg mb-4">
                  We use the information we collect to provide, maintain, and improve our services, respond to your inquiries, and communicate with you about our services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-quicksand font-light uppercase tracking-wider mb-4">
                  Data Security
                </h2>
                <p className="text-base md:text-lg mb-4">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-quicksand font-light uppercase tracking-wider mb-4">
                  Contact Us
                </h2>
                <p className="text-base md:text-lg mb-4">
                  If you have any questions about this Privacy Policy, please contact us.
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

