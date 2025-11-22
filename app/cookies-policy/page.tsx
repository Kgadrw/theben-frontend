import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function CookiesPolicyPage() {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <section className="relative w-full min-h-screen bg-black py-20 px-4">
          <div className="max-w-4xl mx-auto text-white">
            <h1 className="text-4xl md:text-5xl font-quicksand font-light uppercase tracking-wider mb-12 text-left">
              Cookies Policy
            </h1>
            
            <div className="space-y-8 font-quicksand font-light leading-relaxed opacity-90">
              <div>
                <h2 className="text-2xl font-quicksand font-light uppercase tracking-wider mb-4">
                  What Are Cookies
                </h2>
                <p className="text-base md:text-lg mb-4">
                  Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the owners of the site.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-quicksand font-light uppercase tracking-wider mb-4">
                  How We Use Cookies
                </h2>
                <p className="text-base md:text-lg mb-4">
                  We use cookies to understand how you use our website, to improve your experience, and to personalize content and advertisements. We may also use cookies to remember your preferences and settings.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-quicksand font-light uppercase tracking-wider mb-4">
                  Types of Cookies We Use
                </h2>
                <ul className="list-disc list-inside text-base md:text-lg mb-4 space-y-2 ml-4">
                  <li>Essential cookies: Required for the website to function properly</li>
                  <li>Analytics cookies: Help us understand how visitors interact with our website</li>
                  <li>Preference cookies: Remember your choices and preferences</li>
                  <li>Marketing cookies: Used to deliver relevant advertisements</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-quicksand font-light uppercase tracking-wider mb-4">
                  Managing Cookies
                </h2>
                <p className="text-base md:text-lg mb-4">
                  You can control and manage cookies in various ways. Please visit our Cookies Settings page to manage your cookie preferences.
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

