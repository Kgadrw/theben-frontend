'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://theben.onrender.com/api'

interface Video {
  _id: string
  title: string
  videoId?: string
  youtubeUrl?: string
  videoUrl?: string
}

interface VideosProps {
  limit?: number
}

export default function Videos({ limit }: VideosProps = {}) {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`${API_URL}/videos`, {
          cache: 'no-store',
          next: { revalidate: 0 }
        })
        if (response.ok) {
          const data = await response.json()
          setVideos(data || [])
        }
      } catch (error) {
        console.error('Error fetching videos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  // Fallback to default videos if API returns empty or fails
  const allVideos = videos.length > 0 ? videos : [
    { _id: '1', title: 'Video 1', videoId: '8ufRrmc6Bj4' },
    { _id: '2', title: 'Video 2', videoId: '8ufRrmc6Bj4' },
  ]
  
  // Apply limit if provided, otherwise show all
  const displayVideos = limit ? allVideos.slice(0, limit) : allVideos

  const getVideoThumbnail = (video: Video) => {
    if (video.videoId) {
      return `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`
    }
    // For Cloudinary videos, you might want to generate a thumbnail
    return '/placeholder.jpg'
  }

  const getVideoUrl = (video: Video) => {
    if (video.youtubeUrl) {
      return video.youtubeUrl
    }
    if (video.videoId) {
      return `https://www.youtube.com/watch?v=${video.videoId}`
    }
    if (video.videoUrl) {
      return video.videoUrl
    }
    return '#'
  }

  return (
    <section className="relative w-full h-full min-h-screen bg-black py-4 md:py-6 px-6 md:px-12">
      <div className="h-full flex flex-col justify-start pt-2 md:pt-4">
        {/* Video Title */}
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-quicksand font-light uppercase tracking-wider mb-8 md:mb-12">
          Video
        </h1>
        
        {/* Videos */}
        {!loading && (
          <div className={`flex flex-col ${limit ? 'md:flex-row' : 'md:grid md:grid-cols-2'} gap-8 md:gap-12`}>
            {displayVideos.map((video, index) => (
              <div key={video._id} className="flex flex-col gap-4 flex-1">
                {/* Video Thumbnail with Play Button */}
                <a
                  href={getVideoUrl(video)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-full cursor-pointer group"
                >
                  <div className="relative w-full aspect-video bg-gray-900 overflow-hidden">
                    {video.videoUrl ? (
                      // Cloudinary video - show video player
                      <video
                        src={video.videoUrl}
                        className="w-full h-full object-cover"
                        muted
                      />
                    ) : (
                      // YouTube video - show thumbnail
                      <Image
                        src={getVideoThumbnail(video)}
                        alt={`${video.title} - The Ben Rwandan Artist Music Video`}
                        width={800}
                        height={450}
                        className="w-full h-full object-cover"
                        priority={index === 0}
                        quality={90}
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.jpg'
                        }}
                      />
                    )}
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-all duration-300">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 md:w-8 md:h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
                
                {/* Video Info and Watch Now Button */}
                <div className="flex flex-col gap-3">
                  <a
                    href={getVideoUrl(video)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-fit"
                  >
                    <div className="relative inline-block">
                      <div className="absolute -inset-2 border-2 border-red-500" style={{
                        borderRadius: '50%',
                        width: 'calc(100% + 1rem)',
                        height: 'calc(100% + 1rem)',
                        top: '-0.5rem',
                        left: '-0.5rem'
                      }}></div>
                      <div className="relative text-white px-6 py-2 font-quicksand font-light uppercase tracking-wider text-sm md:text-base hover:opacity-80 transition-all duration-300">
                        WATCH NOW
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

