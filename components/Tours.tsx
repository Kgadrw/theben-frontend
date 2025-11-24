'use client'

import { useState, useEffect } from 'react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://theben.onrender.com/api'

interface Tour {
  _id: string
  title: string
  location: string
  date: string
  description: string
  ticketUrl?: string
}

export default function Tours() {
  const [tours, setTours] = useState<Tour[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch(`${API_URL}/tours`)
        if (response.ok) {
          const data = await response.json()
          setTours(data || [])
        }
      } catch (error) {
        console.error('Error fetching tours:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTours()
  }, [])

  // Fallback to default tour if API returns empty or fails
  const displayTours = tours.length > 0 ? tours : [
    { 
      _id: '1', 
      title: 'Concert with Bruce Melodie',
      location: 'Rwanda',
      date: '2026-01-26',
      description: 'Highly anticipated concert with fellow Rwandan artist Bruce Melodie',
      ticketUrl: '#'
    },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return {
      month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
      day: date.toLocaleDateString('en-US', { day: 'numeric' }),
      year: date.toLocaleDateString('en-US', { year: 'numeric' })
    }
  }

  return (
    <section className="relative w-full bg-black py-4 md:py-6 px-6 md:px-12">
      <div className="relative z-10 h-full flex flex-col justify-start pt-2 md:pt-4">
        {/* Tours Title */}
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-quicksand font-light uppercase tracking-wider mb-8 md:mb-12">
          Tour
        </h1>
        
        {/* Tour Dates */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-white font-quicksand font-light">Loading tours...</div>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {displayTours.map((tour) => {
              const { month, day, year } = formatDate(tour.date)
              return (
                <div key={tour._id} className="flex flex-col md:flex-row items-start md:items-center gap-6 pb-8 border-b border-gray-800 last:border-0">
                  <div className="flex-shrink-0">
                    <div className="text-white">
                      <div className="text-2xl md:text-3xl font-quicksand font-light uppercase">{month}</div>
                      <div className="text-4xl md:text-5xl font-quicksand font-light">{day}</div>
                      <div className="text-lg md:text-xl font-quicksand font-light opacity-70">{year}</div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-white text-xl md:text-2xl font-quicksand font-light uppercase tracking-wider mb-2">
                      {tour.title}
                    </h2>
                    <p className="text-white text-base md:text-lg font-quicksand font-light opacity-80 mb-2">
                      {tour.location}
                    </p>
                    <p className="text-white text-sm md:text-base font-quicksand font-light opacity-70">
                      {tour.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0 self-end md:self-auto">
                    <a
                      href={tour.ticketUrl || '#'}
                      target={tour.ticketUrl && tour.ticketUrl !== '#' ? '_blank' : undefined}
                      rel={tour.ticketUrl && tour.ticketUrl !== '#' ? 'noopener noreferrer' : undefined}
                      className="inline-block text-white font-quicksand font-light uppercase tracking-wider border border-white px-6 py-2 transition-all duration-300 hover:bg-white hover:text-black hover:border-[#ff6b6b]"
                    >
                      Get Ticket
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

