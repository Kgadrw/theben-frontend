'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { API_BASE_URL } from '@/app/config/api'

interface AboutData {
  _id: string
  biography: string
  image: string
  title: string
}

export default function About() {
  const [about, setAbout] = useState<AboutData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/about`)
        if (response.ok) {
          const data = await response.json()
          setAbout(data)
        }
      } catch (error) {
        console.error('Error fetching about:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAbout()
  }, [])

  // Split biography into paragraphs (split by periods followed by spaces)
  const biographyParagraphs = about?.biography
    ? about.biography.split(/(?<=\.)\s+(?=[A-Z])/).filter(p => p.trim())
    : []

  if (loading) {
    return (
      <section className="relative w-full min-h-screen bg-black py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center py-20">
            <p className="text-white text-xl font-quicksand font-light">Loading biography...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative w-full min-h-screen bg-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Biography Text - Left */}
          <div className="flex-1 text-white">
            <h2 className="text-white text-3xl md:text-4xl font-quicksand font-light uppercase tracking-wider mb-6 md:mb-8">
              {about?.title || 'Biography'}
            </h2>
            {biographyParagraphs.length > 0 ? (
              biographyParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={`text-base md:text-lg leading-relaxed font-quicksand font-light opacity-90 ${
                    index < biographyParagraphs.length - 1 ? 'mb-6' : ''
                  }`}
                >
                  {paragraph.trim()}
                </p>
              ))
            ) : (
              <p className="text-base md:text-lg leading-relaxed font-quicksand font-light opacity-90">
                {about?.biography || 'No biography available.'}
              </p>
            )}
          </div>

          {/* Theben Image - Right */}
          <div className="flex-1 w-full max-w-md">
            <div className="relative w-full">
              <Image
                src={about?.image || '/theben.jfif'}
                alt="The Ben - Rwandan Artist and Musician Benjamin Mugisha"
                width={600}
                height={800}
                className="w-full h-auto object-contain"
                priority
                quality={90}
                onError={(e) => {
                  e.currentTarget.src = '/theben.jfif'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
