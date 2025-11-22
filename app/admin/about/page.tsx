'use client'

import { useState, useEffect, useRef } from 'react'
import { FaSave, FaUpload, FaImage } from 'react-icons/fa'
import { API_BASE_URL } from '@/app/config/api'
import Image from 'next/image'

interface AboutData {
  _id: string
  biography: string
  image: string
  title: string
}

export default function AdminAbout() {
  const [about, setAbout] = useState<AboutData | null>(null)
  const [biography, setBiography] = useState('')
  const [title, setTitle] = useState('Biography')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchAbout()
  }, [])

  const fetchAbout = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/about`)
      if (response.ok) {
        const data = await response.json()
        setAbout(data)
        setBiography(data.biography || '')
        setTitle(data.title || 'Biography')
        setImageUrl(data.image || '')
      }
    } catch (error) {
      console.error('Error fetching about:', error)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/about`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          biography,
          title,
          image: imageUrl || '/theben.jfif',
        }),
      })

      if (response.ok) {
        const updated = await response.json()
        setAbout(updated)
        alert('About section updated successfully!')
      } else {
        const error = await response.json()
        alert(`Failed to update: ${error.error || 'Unknown error'}`)
      }
    } catch (error: any) {
      console.error('Error updating about:', error)
      alert('Failed to update about section. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    if (file.size > 200 * 1024 * 1024) {
      alert('File size must be less than 200MB')
      return
    }

    setUploading(true)
    setUploadProgress(0)

    try {
      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch(`${API_BASE_URL}/about/upload`, {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const result = await response.json()
        setImageUrl(result.url)
        setUploadProgress(100)
      } else {
        const error = await response.json()
        alert(`Upload failed: ${error.error || 'Unknown error'}`)
      }
    } catch (error: any) {
      console.error('Error uploading image:', error)
      alert('Failed to upload image. Please try again.')
    } finally {
      setUploading(false)
      setTimeout(() => setUploadProgress(0), 1000)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-black border border-gray-800 rounded-xl p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-quicksand font-light text-white uppercase tracking-wider mb-2">
            About / Biography Management
          </h1>
          <p className="text-gray-400 font-quicksand font-light">
            Manage biography text, title, and image
          </p>
        </div>
      </div>

      {/* Current About Info */}
      {about && (
        <div className="bg-black border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
          <h2 className="text-xl font-quicksand font-light text-white uppercase tracking-wider mb-6 flex items-center gap-2">
            <FaImage className="w-5 h-5 text-[#ff6b6b]" />
            Current About Section
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-400 text-sm font-quicksand font-light mb-1">Title:</p>
              <p className="text-white font-quicksand font-light mb-4">{about.title}</p>
              <p className="text-gray-400 text-sm font-quicksand font-light mb-1">Biography Preview:</p>
              <p className="text-gray-300 font-quicksand font-light text-sm line-clamp-3">{about.biography}</p>
              {about.updatedAt && (
                <p className="text-gray-500 text-xs font-quicksand font-light mt-4">
                  Last updated: {new Date(about.updatedAt).toLocaleString()}
                </p>
              )}
            </div>
            {about.image && (
              <div>
                <p className="text-gray-400 text-sm font-quicksand font-light mb-2">Current Image:</p>
                <div className="relative w-full max-w-sm aspect-[3/4] bg-gray-800 rounded-lg overflow-hidden">
                  <Image
                    src={about.image}
                    alt="About image"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-lg"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Update Form */}
      <div className="bg-black border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
        <h2 className="text-xl font-quicksand font-light text-white uppercase tracking-wider mb-6 flex items-center gap-2">
          <FaUpload className="w-5 h-5 text-[#ff6b6b]" />
          Update About Section
        </h2>
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-gray-300 font-quicksand font-light mb-2">
              Biography Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Biography"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white font-quicksand font-light focus:outline-none focus:border-[#ff6b6b]"
            />
            <p className="text-gray-500 text-sm font-quicksand font-light mt-1">
              The title displayed above the biography text
            </p>
          </div>

          <div>
            <label className="block text-gray-300 font-quicksand font-light mb-2">
              Biography Text
            </label>
            <textarea
              value={biography}
              onChange={(e) => setBiography(e.target.value)}
              placeholder="Enter biography text..."
              rows={10}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white font-quicksand font-light focus:outline-none focus:border-[#ff6b6b] resize-y"
            />
            <p className="text-gray-500 text-sm font-quicksand font-light mt-1">
              Biography text will be automatically split into paragraphs
            </p>
          </div>

          <div>
            <label className="block text-gray-300 font-quicksand font-light mb-2">
              Biography Image
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-800 rounded-lg p-6 text-center cursor-pointer hover:border-[#ff6b6b] transition-colors"
            >
              <FaImage className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-400 font-quicksand font-light text-sm mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-gray-500 font-quicksand font-light text-xs">
                Supports JPG, PNG, GIF, WebP (max 200MB)
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
              {imageUrl && !uploading && (
                <div className="mt-4">
                  <div className="relative w-full max-w-xs mx-auto aspect-[3/4] bg-gray-800 rounded-lg overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt="Uploaded preview"
                      fill
                      style={{ objectFit: 'cover' }}
                      className="rounded-lg"
                    />
                  </div>
                  <p className="text-green-400 text-xs mt-1">✓ Image uploaded successfully</p>
                </div>
              )}
            </div>
            {imageUrl && (
              <input
                type="hidden"
                value={imageUrl}
                name="imageUrl"
              />
            )}
          </div>

          <div className="flex gap-4 justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#ff6b6b] text-white px-8 py-3 rounded-lg font-quicksand font-light uppercase tracking-wider hover:shadow-lg hover:shadow-[#ff6b6b]/30 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed border border-[#ff6b6b]/20"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Saving...
                </>
              ) : (
                <>
                  <FaSave className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

