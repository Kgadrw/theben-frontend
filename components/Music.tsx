'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://theben.onrender.com/api'

interface Album {
  _id: string
  title: string
  description: string
  image: string
  hoverImage?: string
  link?: string
  createdAt?: string
  price?: string
}

export default function Music() {
  const [albums, setAlbums] = useState<Album[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch(`${API_URL}/music`, {
          cache: 'no-store',
          next: { revalidate: 0 }
        })
        if (response.ok) {
          const data = await response.json()
          // Sort by createdAt (newest first) and take the 3 latest
          const sortedAlbums = (data || []).sort((a: Album, b: Album) => {
            const dateA = new Date(a.createdAt || 0).getTime()
            const dateB = new Date(b.createdAt || 0).getTime()
            return dateB - dateA
          })
          setAlbums(sortedAlbums)
        }
      } catch (error) {
        console.error('Error fetching albums:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAlbums()
  }, [])

  // Fallback to default albums if API returns empty or fails
  const displayAlbums = albums.length > 0 ? albums : [
    { _id: '1', title: 'Album Title', description: 'Album description or release date', image: '/album 1.jpg' },
    { _id: '2', title: 'Album Title', description: 'Album description or release date', image: '/album 1.jpg' },
    { _id: '3', title: 'Album Title', description: 'Album description or release date', image: '/album 1.jpg' },
  ]

  // Reset index if it's out of bounds
  useEffect(() => {
    if (displayAlbums.length > 0 && currentIndex >= displayAlbums.length) {
      setCurrentIndex(0)
    }
  }, [displayAlbums.length, currentIndex])

  const nextAlbum = () => {
    if (displayAlbums.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % displayAlbums.length)
    }
  }

  const prevAlbum = () => {
    if (displayAlbums.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + displayAlbums.length) % displayAlbums.length)
    }
  }

  const currentAlbum = displayAlbums.length > 0 && currentIndex < displayAlbums.length ? displayAlbums[currentIndex] : null

  return (
    <section className="relative w-full h-full min-h-screen bg-black py-4 md:py-6 px-6 md:px-12 overflow-hidden">
      {/* Textured black background with subtle pattern */}
      <div className="absolute inset-0 bg-black opacity-100" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)`,
        backgroundSize: '20px 20px'
      }}></div>
      
      <div className="relative z-10 h-full flex flex-col justify-start pt-2 md:pt-4">
        {/* Music Title */}
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-quicksand font-light uppercase tracking-wider mb-8 md:mb-12">
          Music
        </h1>
        
        {/* Albums Carousel */}
        {!loading && currentAlbum && (
          <div className="flex flex-col lg:flex-row w-full min-h-[600px]">
            {/* Left Section - Album Cover */}
            <div className="w-full lg:w-1/2 bg-black flex items-center justify-center p-8">
              <div className="relative w-full max-w-lg aspect-square">
                <Image
                  src={currentAlbum.image.startsWith('http') ? currentAlbum.image : currentAlbum.image.startsWith('/') ? currentAlbum.image : `/${currentAlbum.image}`}
                  alt={`${currentAlbum.title} - The Ben Rwandan Artist Album Cover`}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                  priority
                  loading="eager"
                  quality={90}
                  onError={(e) => {
                    e.currentTarget.src = '/album 1.jpg'
                  }}
                />
                {currentAlbum.hoverImage && (
                  <Image
                    src={currentAlbum.hoverImage.startsWith('http') ? currentAlbum.hoverImage : currentAlbum.hoverImage.startsWith('/') ? currentAlbum.hoverImage : `/${currentAlbum.hoverImage}`}
                    alt={`${currentAlbum.title} - The Ben Rwandan Artist Album Cover Hover`}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute top-0 left-0"
                    quality={90}
                    onError={(e) => {
                      e.currentTarget.src = '/album 1.jpg'
                    }}
                  />
                )}
              </div>
            </div>
            
            {/* Right Section - Dark Background with Info */}
            <div className="relative w-full lg:w-1/2 bg-black flex items-center justify-center" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)`,
              backgroundSize: '20px 20px'
            }}>
              {/* Left Navigation Chevron */}
              <button
                onClick={prevAlbum}
                className="absolute left-4 md:left-8 z-20 text-white hover:text-gray-300 transition-all duration-300"
                aria-label="Previous album"
              >
                <FaChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
              </button>
              
              {/* Center Content */}
              <div className="flex flex-col items-center gap-4 text-center px-12">
                <h2 className="text-white text-5xl md:text-6xl lg:text-7xl font-sans font-bold uppercase tracking-tight">
                  {currentAlbum.title}
                </h2>
                {currentAlbum.link ? (
                  <a
                    href={currentAlbum.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-white text-black px-8 py-3 md:px-12 md:py-4 rounded-lg font-quicksand font-bold uppercase tracking-wider text-sm md:text-base hover:bg-gray-200 transition-all duration-300"
                  >
                    Listen
                  </a>
                ) : (
                  <button
                    disabled
                    className="inline-block bg-gray-600 text-gray-400 px-8 py-3 md:px-12 md:py-4 rounded-lg font-quicksand font-bold uppercase tracking-wider text-sm md:text-base cursor-not-allowed"
                  >
                    Listen
                  </button>
                )}
              </div>
              
              {/* Right Navigation Chevron */}
              <button
                onClick={nextAlbum}
                className="absolute right-4 md:right-8 z-20 text-white hover:text-gray-300 transition-all duration-300"
                aria-label="Next album"
              >
                <FaChevronRight className="w-8 h-8 md:w-10 md:h-10" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
