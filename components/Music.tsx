'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

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

interface MusicProps {
  limit?: number
}

export default function Music({ limit }: MusicProps = {}) {
  const [albums, setAlbums] = useState<Album[]>([])
  const [loading, setLoading] = useState(true)
  const [startIndex, setStartIndex] = useState(0)

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
  const allAlbums = albums.length > 0 ? albums : [
    { _id: '1', title: 'Album Title', description: 'Album description or release date', image: '/album 1.jpg', price: '$10.00' },
    { _id: '2', title: 'Album Title', description: 'Album description or release date', image: '/album 1.jpg', price: '$12.00' },
    { _id: '3', title: 'Album Title', description: 'Album description or release date', image: '/album 1.jpg', price: '$10.00' },
  ]

  // Get albums based on limit or show all
  const getDisplayAlbums = () => {
    if (allAlbums.length === 0) return []
    
    // If limit is provided (homepage), use carousel with limited albums
    if (limit) {
      const result = []
      for (let i = 0; i < limit; i++) {
        const index = (startIndex + i) % allAlbums.length
        result.push(allAlbums[index])
      }
      return result
    }
    
    // If no limit (music page), show all albums (already sorted by date)
    return allAlbums
  }

  const displayAlbums = getDisplayAlbums()

  // Auto-advance albums every 5 seconds (only when limit is set)
  useEffect(() => {
    if (!limit || allAlbums.length <= limit) return

    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % allAlbums.length)
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [allAlbums.length, limit])

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
        
        {/* Albums Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : displayAlbums.length > 0 && (
          <div className={`flex flex-col ${limit ? 'md:flex-row' : 'md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'} gap-8 md:gap-12 justify-center items-center md:items-start`}>
            <AnimatePresence mode="popLayout">
              {displayAlbums.map((album, index) => (
                <motion.div
                  key={album._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center gap-4 flex-1 w-full max-w-xs md:max-w-sm"
                >
                  {/* Album Card with Dark Frame */}
                  <div className="relative w-full bg-black border border-black rounded-lg p-4 md:p-6">
                    {/* Album Cover */}
                    <div className="relative w-full aspect-square mb-4">
                      <Image
                        src={album.image.startsWith('http') ? album.image : album.image.startsWith('/') ? album.image : `/${album.image}`}
                        alt={`${album.title} - The Ben Rwandan Artist Album Cover`}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                        priority={index === 0}
                        quality={90}
                        onError={(e) => {
                          e.currentTarget.src = '/album 1.jpg'
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Album Title */}
                  <div className="text-center w-full">
                    <h2 className="text-white text-sm md:text-base font-sans uppercase tracking-wider mb-2">
                      {album.title}
                    </h2>
                    {album.price && (
                      <p className="text-white text-base md:text-lg font-sans mb-4">
                        {album.price}
                      </p>
                    )}
                    {/* Listen Button */}
                    <a
                      href={album.link || 'https://open.spotify.com/artist/71jxVM5UsQTnPa9DpkK21E'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-2 bg-transparent border-2 border-white text-white font-quicksand font-light uppercase tracking-wider text-sm hover:bg-white hover:text-black transition-all duration-300 rounded-sm"
                    >
                      Listen
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  )
}
