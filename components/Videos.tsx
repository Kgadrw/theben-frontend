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

export default function Videos() {
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
  const displayVideos = videos.length > 0 ? videos.slice(0, 2) : [
    { _id: '1', title: 'Video 1', videoId: '8ufRrmc6Bj4' },
    { _id: '2', title: 'Video 2', videoId: '8ufRrmc6Bj4' },
  ]

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
    <section className="relative w-full min-h-screen bg-black py-20 px-12">
      <div className="max-w-7xl mx-auto">
        {/* Videos Title */}
        <h1 className="text-white text-4xl md:text-5xl font-quicksand font-light uppercase tracking-wider mb-12 md:mb-16 text-center">
          Videos
        </h1>
        
        {/* Videos */}
        {!loading && (
          <div className="flex flex-col gap-12 md:gap-16">
            {displayVideos.map((video) => (
              <div key={video._id} className="flex flex-col items-center gap-6 w-full">
                {video.videoUrl ? (
                  // Cloudinary video - show video player
                  <div className="relative w-full aspect-video bg-gray-800 rounded-lg overflow-hidden max-w-5xl">
                    <video
                      src={video.videoUrl}
                      controls
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  // YouTube video - show thumbnail
                  <a
                    href={getVideoUrl(video)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-full cursor-pointer max-w-5xl"
                  >
                    <Image
                      src={getVideoThumbnail(video)}
                      alt={`${video.title} - The Ben Rwandan Artist Music Video`}
                      width={1200}
                      height={675}
                      className="w-full h-auto object-contain rounded-lg"
                      priority
                      loading="eager"
                      quality={90}
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.jpg'
                      }}
                    />
                  </a>
                )}
                <div className="text-center w-full max-w-5xl">
                  <h2 className="text-white text-2xl md:text-3xl font-quicksand font-bold uppercase tracking-wider">
                    {video.title}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

