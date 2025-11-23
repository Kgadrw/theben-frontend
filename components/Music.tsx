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
  link?: string
  createdAt?: string
}

export default function Music() {
  const [albums, setAlbums] = useState<Album[]>([])
  const [loading, setLoading] = useState(true)

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

  return (
    <section className="relative w-full min-h-screen bg-black py-20 px-12">
      <div className="max-w-7xl mx-auto">
        {/* Music Title */}
        <h1 className="text-white text-4xl md:text-5xl font-quicksand font-light uppercase tracking-wider mb-12 md:mb-16 text-center">
          Music
        </h1>
        
        {/* Albums */}
        {!loading && displayAlbums.length > 0 && (
          <div className="border border-gray-800 rounded-xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16">
              {displayAlbums.slice(0, 3).map((album) => {
                const albumContent = (
                  <div className="flex flex-col items-center gap-6 flex-1 max-w-md">
                    <div className="relative w-full">
                      <Image
                        src={album.image.startsWith('http') ? album.image : album.image.startsWith('/') ? album.image : `/${album.image}`}
                        alt={`${album.title} - The Ben Rwandan Artist Album Cover`}
                        width={600}
                        height={800}
                        className={`w-full h-auto transition-opacity duration-300 ${album.hoverImage ? 'group-hover:opacity-0' : ''}`}
                        priority
                        loading="eager"
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
                )

                return album.link ? (
                  <a
                    key={album._id}
                    href={album.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer hover:opacity-90 transition-all duration-300 block group"
                  >
                    {albumContent}
                  </a>
                ) : (
                  <div key={album._id} className="opacity-75 group">
                    {albumContent}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
