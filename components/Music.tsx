'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://theben.onrender.com/api'

interface Album {
  _id: string
  title: string
  description: string
  image: string
  hoverImage?: string
}

export default function Music() {
  const [albums, setAlbums] = useState<Album[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch(`${API_URL}/music`)
        if (response.ok) {
          const data = await response.json()
          setAlbums(data || [])
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

  return (
    <section className="relative w-full min-h-screen bg-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Music Title */}
        <h1 className="text-white text-4xl md:text-5xl font-quicksand font-light uppercase tracking-wider mb-12 md:mb-16 text-left">
          Music
        </h1>
        
        {/* Albums */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-white font-quicksand font-light">Loading albums...</div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16">
            {displayAlbums.slice(0, 3).map((album) => (
              <div key={album._id} className="flex flex-col items-center gap-6 flex-1 max-w-md group">
                <div className="relative w-full">
                  <Image
                    src={album.image.startsWith('http') ? album.image : album.image.startsWith('/') ? album.image : `/${album.image}`}
                    alt={`${album.title} - The Ben Rwandan Artist Album Cover`}
                    width={600}
                    height={800}
                    className={`w-full h-auto transition-opacity duration-300 ${album.hoverImage ? 'group-hover:opacity-0' : ''}`}
                    priority
                    quality={90}
                    onError={(e) => {
                      e.currentTarget.src = '/album 1.jpg'
                    }}
                  />
                  {album.hoverImage && (
                    <Image
                      src={album.hoverImage.startsWith('http') ? album.hoverImage : album.hoverImage.startsWith('/') ? album.hoverImage : `/${album.hoverImage}`}
                      alt={`${album.title} - The Ben Rwandan Artist Album Cover Hover`}
                      width={600}
                      height={800}
                      className="w-full h-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute top-0 left-0"
                      quality={90}
                      onError={(e) => {
                        e.currentTarget.src = '/album 1.jpg'
                      }}
                    />
                  )}
                </div>
                <div className="text-center">
                  <h2 className="text-white text-2xl font-quicksand font-light uppercase tracking-wider mb-2">
                    {album.title}
                  </h2>
                  <p className="text-white text-sm opacity-80">
                    {album.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
