'use client'

import { useState, useEffect, useRef } from 'react'
import { FaUpload, FaSave, FaYoutube, FaFileVideo, FaPlay } from 'react-icons/fa'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://theben.onrender.com/api'

export default function AdminHero() {
  const [videoId, setVideoId] = useState('')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [currentVideo, setCurrentVideo] = useState<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchCurrentHero()
  }, [])

  const fetchCurrentHero = async () => {
    try {
      const response = await fetch(`${API_URL}/hero`)
      if (response.ok) {
        const data = await response.json()
        setCurrentVideo(data)
        if (data.videoId) {
          setVideoId(data.videoId)
        }
        if (data.youtubeUrl) {
          setYoutubeUrl(data.youtubeUrl)
        }
        if (data.videoUrl) {
          setVideoUrl(data.videoUrl)
        }
      }
    } catch (error) {
      console.error('Error fetching hero video:', error)
    }
  }

  const extractVideoId = (url: string) => {
    if (!url) return ''
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)
    return match ? match[1] : url
  }

  const handleUrlChange = (url: string) => {
    setYoutubeUrl(url)
    const extractedId = extractVideoId(url)
    if (extractedId && extractedId !== url) {
      setVideoId(extractedId)
    }
  }

  const handleVideoIdChange = (id: string) => {
    setVideoId(id)
    setVideoUrl('') // Clear video URL when YouTube ID is entered
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check if it's a video file
    if (!file.type.startsWith('video/')) {
      alert('Please select a video file')
      return
    }

    setUploadedFile(file)
    setUploading(true)
    setUploadProgress(0)

    try {
      const formData = new FormData()
      formData.append('video', file)

      const response = await fetch(`${API_URL}/hero/upload`, {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        setVideoUrl(data.url)
        setVideoId('') // Clear YouTube fields
        setYoutubeUrl('')
        setUploadProgress(100)
        alert('Video uploaded successfully! Click Save to update.')
      } else {
        const error = await response.json()
        alert(`Upload failed: ${error.error || 'Unknown error'}`)
      }
    } catch (error: any) {
      console.error('Error uploading video:', error)
      alert('Failed to upload video. Please try again.')
    } finally {
      setUploading(false)
      setUploadProgress(0)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // If videoUrl is set, use it (local upload)
      if (videoUrl) {
        const response = await fetch(`${API_URL}/hero`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            videoUrl: videoUrl,
            videoId: null,
            youtubeUrl: null,
          }),
        })

        if (response.ok) {
          const data = await response.json()
          setCurrentVideo(data)
          alert('Hero video updated successfully!')
          window.location.reload()
        } else {
          const error = await response.json()
          alert(`Error: ${error.error || 'Failed to update hero video'}`)
        }
        setLoading(false)
        return
      }

      // Otherwise, use YouTube
      const finalVideoId = videoId || extractVideoId(youtubeUrl)
      
      if (!finalVideoId) {
        alert('Please enter a valid YouTube Video ID/URL or upload a video file')
        setLoading(false)
        return
      }

      const response = await fetch(`${API_URL}/hero`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          videoId: finalVideoId,
          youtubeUrl: youtubeUrl || `https://www.youtube.com/watch?v=${finalVideoId}`,
          videoUrl: null,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setCurrentVideo(data)
        alert('Hero video updated successfully!')
        window.location.reload()
      } else {
        const error = await response.json()
        alert(`Error: ${error.error || 'Failed to update hero video'}`)
      }
    } catch (error) {
      console.error('Error saving hero video:', error)
      alert('Failed to update hero video. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-black border border-gray-800 rounded-xl p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#ff6b6b]/5 via-transparent to-transparent"></div>
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-quicksand font-light text-white uppercase tracking-wider mb-2">
            Hero Video Management
          </h1>
          <p className="text-gray-400 font-quicksand font-light">
            Manage the hero video displayed on the homepage
          </p>
        </div>
      </div>

      {/* Current Video Info */}
      {currentVideo && (
        <div className="bg-black border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
          <h2 className="text-xl font-quicksand font-light text-white uppercase tracking-wider mb-6 flex items-center gap-2">
            <FaPlay className="w-5 h-5 text-[#ff6b6b]" />
            Current Hero Video
          </h2>
          <div className="space-y-2">
            <p className="text-gray-300 font-quicksand font-light">
              <span className="text-gray-400">Video ID:</span> {currentVideo.videoId || 'Not set'}
            </p>
            {currentVideo.updatedAt && (
              <p className="text-gray-400 text-sm font-quicksand font-light">
                Last updated: {new Date(currentVideo.updatedAt).toLocaleString()}
              </p>
            )}
            {currentVideo.videoId && (
              <div className="mt-4">
                <img
                  src={`https://img.youtube.com/vi/${currentVideo.videoId}/maxresdefault.jpg`}
                  alt="Hero Video Thumbnail"
                  className="w-full max-w-md rounded-lg border border-gray-800"
                />
              </div>
            )}
            {currentVideo.videoUrl && (
              <div className="mt-4">
                <div className="relative w-full max-w-md aspect-video bg-gray-800 rounded-lg overflow-hidden">
                  <video
                    src={currentVideo.videoUrl}
                    controls
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Upload Form */}
      <div className="bg-black border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
        <h2 className="text-xl font-quicksand font-light text-white uppercase tracking-wider mb-6 flex items-center gap-2">
          <FaUpload className="w-5 h-5 text-[#ff6b6b]" />
          Update Hero Video
        </h2>
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-gray-300 font-quicksand font-light mb-2">
              YouTube Video URL
            </label>
            <div className="flex items-center gap-2 mb-2">
              <FaYoutube className="text-gray-400" />
              <input
                type="url"
                value={youtubeUrl}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white font-quicksand font-light focus:outline-none focus:border-[#ff6b6b]"
              />
            </div>
            <p className="text-gray-500 text-sm font-quicksand font-light">
              Paste the full YouTube video URL
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black text-gray-400 font-quicksand font-light">OR</span>
            </div>
          </div>

          <div>
            <label className="block text-gray-300 font-quicksand font-light mb-2">
              YouTube Video ID
            </label>
            <input
              type="text"
              value={videoId}
              onChange={(e) => handleVideoIdChange(e.target.value)}
              placeholder="8ufRrmc6Bj4"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white font-quicksand font-light focus:outline-none focus:border-[#ff6b6b]"
            />
            <p className="text-gray-500 text-sm font-quicksand font-light mt-1">
              Enter just the YouTube video ID (e.g., 8ufRrmc6Bj4)
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black text-gray-400 font-quicksand font-light">OR</span>
            </div>
          </div>

          <div>
            <label className="block text-gray-300 font-quicksand font-light mb-2">
              Upload Video File
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-800 rounded-lg p-6 text-center cursor-pointer hover:border-[#ff6b6b] transition-colors"
            >
              <FaFileVideo className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-400 font-quicksand font-light text-sm mb-1">
                {uploadedFile ? uploadedFile.name : 'Click to upload or drag and drop'}
              </p>
              <p className="text-gray-500 font-quicksand font-light text-xs">
                Supports MP4, MOV, AVI, WebM (max 200MB)
              </p>
              {uploading && (
                <div className="mt-2">
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-[#ff6b6b] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-gray-400 text-xs mt-1">Uploading... {uploadProgress}%</p>
                </div>
              )}
              {videoUrl && !uploading && (
                <p className="text-green-400 text-xs mt-1">✓ Video uploaded successfully</p>
              )}
            </div>
            {videoUrl && (
              <div className="mt-4">
                <div className="relative w-full max-w-md aspect-video bg-gray-800 rounded-lg overflow-hidden">
                  <video
                    src={videoUrl}
                    controls
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Preview */}
          {videoId && (
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
              <p className="text-gray-400 text-sm font-quicksand font-light mb-2">
                Preview:
              </p>
              <img
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt="Video Preview"
                className="w-full max-w-md rounded-lg border border-gray-800"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.jpg'
                }}
              />
              <p className="text-gray-500 text-xs font-quicksand font-light mt-2">
                Video ID: {videoId}
              </p>
            </div>
          )}

          <div className="flex gap-4 justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#ff6b6b] text-white px-8 py-3 rounded-lg font-quicksand font-light uppercase tracking-wider hover:bg-opacity-80 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Saving...
                </>
              ) : (
                <>
                  <FaSave className="w-4 h-4" />
                  Save Hero Video
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

