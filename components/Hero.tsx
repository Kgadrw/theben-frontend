'use client'

import { useState, useEffect } from 'react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://theben.onrender.com/api'

export default function Hero() {
  const [videoId, setVideoId] = useState('8ufRrmc6Bj4') // Default video ID
  const [videoUrl, setVideoUrl] = useState<string | null>(null) // Cloudinary video URL
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detect if device is mobile
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth < 768
      setIsMobile(isMobileDevice)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Fetch hero video from API
    const fetchHeroVideo = async () => {
      try {
        const response = await fetch(`${API_URL}/hero`)
        if (response.ok) {
          const data = await response.json()
          if (data.videoUrl) {
            // Use Cloudinary video URL
            setVideoUrl(data.videoUrl)
            setVideoId('') // Clear YouTube video ID
          } else if (data.videoId) {
            // Use YouTube video ID
            setVideoId(data.videoId)
            setVideoUrl(null) // Clear Cloudinary URL
          }
        }
      } catch (error) {
        console.error('Error fetching hero video:', error)
        // Keep default video ID if API fails
      }
    }

    fetchHeroVideo()
  }, [])

  // Hide all YouTube controls and overlays: controls=0, disablekb=1, fs=0, iv_load_policy=3, cc_load_policy=0
  // Disable autoplay on mobile devices
  // Additional parameters to hide title, share button, and suggestions
  const autoplayParam = isMobile ? '0' : '1'
  const embedUrl = videoId 
    ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=${autoplayParam}&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&disablekb=1&fs=0&iv_load_policy=3&cc_load_policy=0&origin=${typeof window !== 'undefined' ? window.location.origin : ''}&widget_referrer=${typeof window !== 'undefined' ? window.location.origin : ''}`
    : ''

  return (
    <section className="relative w-full h-[60vh] md:h-screen overflow-hidden">
      <div className="absolute inset-0 w-full h-full z-[1] overflow-hidden" style={{ isolation: 'isolate' }}>
        {videoUrl ? (
          // Cloudinary video
          <video
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none border-0 w-full h-full object-cover md:w-full md:h-full"
            style={{
              width: '100vw',
              height: '56.25vw',
              minHeight: '100vh',
              minWidth: '177.78vh',
            }}
            src={videoUrl}
            autoPlay={!isMobile}
            muted
            loop
            playsInline
            key={videoUrl}
            aria-label="The Ben - Rwandan Artist Music Video"
          />
        ) : (
          // YouTube video - scaled larger to crop out YouTube UI elements
          <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ clipPath: 'inset(0)' }}>
            <iframe
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none border-0"
              style={{
                width: '120vw',
                height: '67.5vw',
                minHeight: '120vh',
                minWidth: '213.33vh',
                transform: 'translate(-50%, -50%)',
              }}
              src={embedUrl}
              title="The Ben - Rwandan Artist Music Video"
              allow="autoplay; encrypted-media"
              allowFullScreen={false}
              frameBorder="0"
              key={videoId}
            />
          </div>
        )}
      </div>
      {/* Dark overlay to reduce brightness */}
      <div className="absolute inset-0 w-full h-full bg-black opacity-40 z-[2] pointer-events-none"></div>
    </section>
  )
}

