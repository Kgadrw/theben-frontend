'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function CookiesSettingsPage() {
  const [essential, setEssential] = useState(true)
  const [analytics, setAnalytics] = useState(false)
  const [preferences, setPreferences] = useState(false)
  const [marketing, setMarketing] = useState(false)

  const handleSave = () => {
    // Save cookie preferences
    alert('Cookie preferences saved!')
  }

  return (
    <>
      <Navbar />
      <div className="pt-20">
        <section className="relative w-full min-h-screen bg-black py-20 px-4">
          <div className="max-w-4xl mx-auto text-white">
            <h1 className="text-4xl md:text-5xl font-quicksand font-light uppercase tracking-wider mb-12 text-left">
              Cookies Settings
            </h1>
            
            <div className="space-y-8 font-quicksand font-light leading-relaxed opacity-90">
              <div>
                <p className="text-base md:text-lg mb-8">
                  Manage your cookie preferences. You can enable or disable different types of cookies below.
                </p>
              </div>

              {/* Essential Cookies */}
              <div className="border-b border-gray-800 pb-6">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h2 className="text-xl font-quicksand font-light uppercase tracking-wider mb-2">
                      Essential Cookies
                    </h2>
                    <p className="text-sm opacity-70">
                      Required for the website to function properly. These cannot be disabled.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={essential}
                      disabled
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff6b6b]"></div>
                  </label>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="border-b border-gray-800 pb-6">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h2 className="text-xl font-quicksand font-light uppercase tracking-wider mb-2">
                      Analytics Cookies
                    </h2>
                    <p className="text-sm opacity-70">
                      Help us understand how visitors interact with our website.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={analytics}
                      onChange={(e) => setAnalytics(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff6b6b]"></div>
                  </label>
                </div>
              </div>

              {/* Preference Cookies */}
              <div className="border-b border-gray-800 pb-6">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h2 className="text-xl font-quicksand font-light uppercase tracking-wider mb-2">
                      Preference Cookies
                    </h2>
                    <p className="text-sm opacity-70">
                      Remember your choices and preferences for a better experience.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences}
                      onChange={(e) => setPreferences(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff6b6b]"></div>
                  </label>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="border-b border-gray-800 pb-6">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h2 className="text-xl font-quicksand font-light uppercase tracking-wider mb-2">
                      Marketing Cookies
                    </h2>
                    <p className="text-sm opacity-70">
                      Used to deliver relevant advertisements and track campaign performance.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={marketing}
                      onChange={(e) => setMarketing(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff6b6b]"></div>
                  </label>
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-6">
                <button
                  onClick={handleSave}
                  className="inline-block text-white font-quicksand font-light uppercase tracking-wider border border-white px-8 py-3 transition-all duration-300 hover:bg-white hover:text-black hover:border-[#ff6b6b]"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  )
}

