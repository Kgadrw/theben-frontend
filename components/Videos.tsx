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
        const response = await fetch(`${API_URL}/videos`)
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
    <section className="relative w-full min-h-screen bg-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Videos Title */}
        <h1 className="text-white text-4xl md:text-5xl font-quicksand font-light uppercase tracking-wider mb-12 md:mb-16 text-left">
          Videos
        </h1>
        
        {/* Videos */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-white font-quicksand font-light">Loading videos...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 justify-items-center">
            {displayVideos.map((video) => (
              <div key={video._id} className="flex flex-col items-center gap-6 w-full max-w-2xl">
                {video.videoUrl ? (
                  // Cloudinary video - show video player
                  <div className="relative w-full aspect-video bg-gray-800 rounded-lg overflow-hidden">
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
                    className="relative w-full cursor-pointer"
                  >
                    <Image
                      src={getVideoThumbnail(video)}
                      alt={`${video.title} - The Ben Rwandan Artist Music Video`}
                      width={900}
                      height={600}
                      className="w-full h-auto object-contain"
                      quality={90}
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.jpg'
                      }}
                    />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

