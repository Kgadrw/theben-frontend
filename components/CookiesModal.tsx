'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaTimes } from 'react-icons/fa'
import { hasCookieConsent, saveCookiePreferences, type CookiePreferences } from '@/lib/cookies'

export default function CookiesModal() {
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user has already given consent
    if (!hasCookieConsent()) {
      // Show modal after a small delay
      const timer = setTimeout(() => {
        setShowModal(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      analytics: true,
      preferences: true,
      marketing: true,
    }
    saveCookiePreferences(allAccepted)
    setShowModal(false)
  }

  const handleReject = () => {
    // Only accept essential cookies
    const essentialOnly: CookiePreferences = {
      essential: true,
      analytics: false,
      preferences: false,
      marketing: false,
    }
    saveCookiePreferences(essentialOnly)
    setShowModal(false)
  }

  const handleCustomize = () => {
    // Set essential only for now, user can customize on settings page
    const essentialOnly: CookiePreferences = {
      essential: true,
      analytics: false,
      preferences: false,
      marketing: false,
    }
    saveCookiePreferences(essentialOnly)
    setShowModal(false)
    router.push('/cookies-settings')
  }

  if (!showModal) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999]">
      {/* Dark overlay similar to hero */}
      <div className="absolute inset-0 bg-black opacity-90 backdrop-blur-sm"></div>
      {/* Content */}
      <div className="relative border-t border-gray-800 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl font-quicksand font-light text-white uppercase tracking-wider mb-2">
                We Use Cookies
              </h2>
              <p className="text-gray-300 font-quicksand font-light text-xs sm:text-sm leading-relaxed opacity-90">
                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                By clicking "Accept All", you consent to our use of cookies.{' '}
                <Link href="/cookies-policy" className="text-[#ff6b6b] hover:underline whitespace-nowrap transition-colors">
                  Learn more
                </Link>
              </p>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto items-center">
              <button
                onClick={handleReject}
                className="flex-1 sm:flex-none px-4 py-2 bg-transparent text-white font-quicksand font-light uppercase tracking-wider text-xs sm:text-sm border border-transparent hover:bg-white hover:bg-opacity-10 hover:border-white transition-all duration-300"
              >
                Reject All
              </button>
              <button
                onClick={handleCustomize}
                className="flex-1 sm:flex-none px-4 py-2 bg-transparent text-white font-quicksand font-light uppercase tracking-wider text-xs sm:text-sm border border-transparent hover:bg-white hover:bg-opacity-10 hover:border-white transition-all duration-300"
              >
                Customize
              </button>
              <button
                onClick={handleAcceptAll}
                className="flex-1 sm:flex-none px-4 sm:px-6 py-2 bg-transparent text-white font-quicksand font-light uppercase tracking-wider text-xs sm:text-sm border border-white hover:bg-white hover:text-black transition-all duration-300"
              >
                Accept All
              </button>
              {/* Close button */}
              <button
                onClick={handleReject}
                className="text-white hover:text-[#ff6b6b] transition-colors duration-300 p-1"
                aria-label="Close"
              >
                <FaTimes className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

