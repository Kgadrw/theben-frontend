'use client'

import { useState, useRef, useEffect } from 'react'
import { FaEdit, FaTrash, FaPlus, FaFileVideo, FaYoutube, FaSave, FaTimes, FaVideo } from 'react-icons/fa'
import { API_BASE_URL } from '@/app/config/api'
import Image from 'next/image'

interface Video {
  _id: string
  title: string
  videoId?: string
  youtubeUrl?: string
  videoUrl?: string
}

export default function AdminVideos() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingVideo, setEditingVideo] = useState<Video | null>(null)
  const [formTitle, setFormTitle] = useState('')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/videos`)
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

  const handleEdit = (video: Video) => {
    setEditingVideo(video)
    setFormTitle(video.title || '')
    setYoutubeUrl(video.youtubeUrl || '')
    setVideoUrl(video.videoUrl || '')
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this video?')) return

    try {
      const response = await fetch(`${API_BASE_URL}/videos/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await fetchVideos()
        alert('Video deleted successfully!')
      } else {
        const error = await response.json()
        alert(`Failed to delete: ${error.error || 'Unknown error'}`)
      }
    } catch (error: any) {
      console.error('Error deleting video:', error)
      alert('Failed to delete video. Please try again.')
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('video/')) {
      alert('Please select a video file')
      return
    }

    setUploading(true)
    setUploadProgress(0)
    setYoutubeUrl('') // Clear YouTube URL when local video is uploaded

    try {
      const formData = new FormData()
      formData.append('video', file)

      const response = await fetch(`${API_BASE_URL}/videos/upload`, {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        setVideoUrl(data.url)
        setUploadProgress(100)
      } else {
        const error = await response.json()
        alert(`Upload failed: ${error.error || 'Unknown error'}`)
      }
    } catch (error: any) {
      console.error('Error uploading video:', error)
      alert('Failed to upload video. Please try again.')
    } finally {
      setUploading(false)
      setTimeout(() => setUploadProgress(0), 1000)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formTitle.trim()) {
      alert('Please enter a video title')
      return
    }

    if (!videoUrl && !youtubeUrl) {
      alert('Please provide either a YouTube URL or upload a video file')
      return
    }

    try {
      const url = editingVideo ? `${API_BASE_URL}/videos/${editingVideo._id}` : `${API_BASE_URL}/videos`
      const method = editingVideo ? 'PUT' : 'POST'

      const body: any = { title: formTitle }

      if (videoUrl) {
        body.videoUrl = videoUrl
        body.videoId = null
        body.youtubeUrl = null
      } else if (youtubeUrl) {
        body.youtubeUrl = youtubeUrl
        body.videoUrl = null
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        await fetchVideos()
        setShowModal(false)
        resetForm()
        alert(`${editingVideo ? 'Video updated' : 'Video created'} successfully!`)
      } else {
        const error = await response.json()
        alert(`Failed to ${editingVideo ? 'update' : 'create'}: ${error.error || 'Unknown error'}`)
      }
    } catch (error: any) {
      console.error(`Error ${editingVideo ? 'updating' : 'creating'} video:`, error)
      alert(`Failed to ${editingVideo ? 'update' : 'create'} video. Please try again.`)
    }
  }

  const resetForm = () => {
    setEditingVideo(null)
    setFormTitle('')
    setYoutubeUrl('')
    setVideoUrl('')
  }

  const handleCloseModal = () => {
    setShowModal(false)
    resetForm()
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-white text-xl font-quicksand font-light">Loading videos...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-black border border-gray-800 rounded-xl p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-quicksand font-light text-white uppercase tracking-wider mb-2">
              Video Management
            </h1>
            <p className="text-gray-400 font-quicksand font-light">
              Manage video content
            </p>
          </div>
          <button
            onClick={() => {
              resetForm()
              setShowModal(true)
            }}
            className="bg-[#ff6b6b] text-white px-6 py-3 rounded-xl font-quicksand font-light uppercase tracking-wider hover:shadow-lg hover:shadow-[#ff6b6b]/30 transition-all duration-300 flex items-center gap-2 border border-[#ff6b6b]/20"
          >
            <FaPlus className="w-5 h-5" />
            Add Video
          </button>
        </div>
      </div>

      {/* Videos Grid */}
      {videos.length === 0 ? (
        <div className="bg-black border border-gray-800 rounded-xl p-12 text-center">
          <p className="text-gray-400 font-quicksand font-light text-lg">No videos found. Add your first video!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((video) => (
            <div
              key={video._id}
              className="bg-black border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group"
            >
              <div className="aspect-video bg-gray-800 relative">
                {video.videoUrl ? (
                  <video
                    src={video.videoUrl}
                    className="w-full h-full object-cover"
                    controls={false}
                    muted
                  />
                ) : video.videoId ? (
                  <Image
                    src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                    alt={video.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-t-xl"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No thumbnail available
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-white font-quicksand font-light text-lg mb-4">
                  {video.title}
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(video)}
                    className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg font-quicksand font-light uppercase tracking-wider hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaEdit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(video._id)}
                    className="flex-1 bg-red-900 text-white px-4 py-2 rounded-lg font-quicksand font-light uppercase tracking-wider hover:bg-red-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaTrash className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Video Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black border border-gray-800 rounded-xl p-8 max-w-2xl w-full relative overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-quicksand font-light text-white uppercase tracking-wider flex items-center gap-2">
                  <FaVideo className="w-6 h-6 text-blue-400" />
                  {editingVideo ? 'Edit Video' : 'Add New Video'}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-white transition-colors p-2"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-300 font-quicksand font-light mb-2">
                    Video Title *
                  </label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white font-quicksand font-light focus:outline-none focus:border-[#ff6b6b]"
                    placeholder="Enter video title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-quicksand font-light mb-2">
                    YouTube Video URL
                  </label>
                  <div className="flex items-center gap-2">
                    <FaYoutube className="text-gray-400" />
                    <input
                      type="text"
                      value={youtubeUrl}
                      onChange={(e) => {
                        setYoutubeUrl(e.target.value)
                        if (e.target.value) setVideoUrl('') // Clear local video when YouTube URL is entered
                      }}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white font-quicksand font-light focus:outline-none focus:border-[#ff6b6b]"
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                  </div>
                  <p className="text-gray-500 text-sm font-quicksand font-light mt-1">
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
                      Click to upload or drag and drop
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
                      <div className="mt-4">
                        <div className="relative w-full max-w-xs mx-auto aspect-video bg-gray-800 rounded-lg overflow-hidden">
                          <video
                            src={videoUrl}
                            controls
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-green-400 text-xs mt-1">✓ Video uploaded successfully</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 justify-end pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="bg-gray-800 text-white px-6 py-2 rounded-lg font-quicksand font-light uppercase tracking-wider hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!formTitle.trim() || (!videoUrl && !youtubeUrl)}
                    className="bg-[#ff6b6b] text-white px-6 py-2 rounded-lg font-quicksand font-light uppercase tracking-wider hover:shadow-lg hover:shadow-[#ff6b6b]/30 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed border border-[#ff6b6b]/20"
                  >
                    <FaSave className="w-4 h-4" />
                    {editingVideo ? 'Update Video' : 'Add Video'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
