'use client'

import { useState, useRef } from 'react'
import { FaEdit, FaTrash, FaPlus, FaImage, FaUpload } from 'react-icons/fa'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://theben.onrender.com/api'

const albums = [
  { id: 1, title: 'Album Title', description: 'Album description or release date', image: '/album 1.jpg' },
  { id: 2, title: 'Album Title', description: 'Album description or release date', image: '/album 1.jpg' },
  { id: 3, title: 'Album Title', description: 'Album description or release date', image: '/album 1.jpg' },
]

export default function AdminMusic() {
  const [showModal, setShowModal] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-black border border-gray-800 rounded-xl p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-transparent to-transparent"></div>
        <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-quicksand font-light text-white uppercase tracking-wider mb-2">
              Music Management
            </h1>
            <p className="text-gray-400 font-quicksand font-light">
              Manage albums and music content
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-[#ff6b6b] to-[#ff8e8e] text-white px-6 py-3 rounded-xl font-quicksand font-light uppercase tracking-wider hover:shadow-lg hover:shadow-[#ff6b6b]/30 transition-all duration-300 flex items-center gap-2 border border-[#ff6b6b]/20"
          >
            <FaPlus className="w-5 h-5" />
            Add Album
          </button>
        </div>
      </div>

      {/* Albums Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {albums.map((album) => (
          <div
            key={album.id}
            className="bg-black border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 group"
          >
            <div className="aspect-square bg-gray-800 relative">
              <img
                src={album.image}
                alt={album.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-white font-quicksand font-light text-lg mb-1">
                {album.title}
              </h3>
              <p className="text-gray-400 text-sm font-quicksand font-light mb-4">
                {album.description}
              </p>
              <div className="flex gap-2">
                <button className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg font-quicksand font-light uppercase tracking-wider hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                  <FaEdit className="w-4 h-4" />
                  Edit
                </button>
                <button className="flex-1 bg-red-900 text-white px-4 py-2 rounded-lg font-quicksand font-light uppercase tracking-wider hover:bg-red-800 transition-colors flex items-center justify-center gap-2">
                  <FaTrash className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Album Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black border border-gray-800 rounded-xl p-8 max-w-2xl w-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-transparent to-transparent"></div>
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-quicksand font-light text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                <FaImage className="w-6 h-6 text-purple-400" />
                Add New Album
              </h2>
              <form className="space-y-4">
              <div>
                <label className="block text-gray-300 font-quicksand font-light mb-2">
                  Album Title
                </label>
                <input
                  type="text"
                  className="w-full bg-black border border-gray-800 rounded-lg px-4 py-2 text-white font-quicksand font-light focus:outline-none focus:border-[#ff6b6b]"
                  placeholder="Enter album title"
                />
              </div>
              <div>
                <label className="block text-gray-300 font-quicksand font-light mb-2">
                  Description
                </label>
                <textarea
                  className="w-full bg-black border border-gray-800 rounded-lg px-4 py-2 text-white font-quicksand font-light focus:outline-none focus:border-[#ff6b6b] min-h-[100px]"
                  placeholder="Enter album description"
                />
              </div>
              <div>
                <label className="block text-gray-300 font-quicksand font-light mb-2">
                  Album Image
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (!file) return

                    if (!file.type.startsWith('image/')) {
                      alert('Please select an image file')
                      return
                    }

                    setUploading(true)
                    setUploadProgress(0)

                    try {
                      const formData = new FormData()
                      formData.append('image', file)

                      const response = await fetch(`${API_URL}/music/upload`, {
                        method: 'POST',
                        body: formData,
                      })

                      if (response.ok) {
                        const data = await response.json()
                        setImageUrl(data.url)
                        setUploadProgress(100)
                        alert('Image uploaded successfully!')
                      } else {
                        const error = await response.json()
                        alert(`Upload failed: ${error.error || 'Unknown error'}`)
                      }
                    } catch (error: any) {
                      console.error('Error uploading image:', error)
                      alert('Failed to upload image. Please try again.')
                    } finally {
                      setUploading(false)
                      setUploadProgress(0)
                    }
                  }}
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
                      <img
                        src={imageUrl}
                        alt="Uploaded preview"
                        className="w-full max-w-xs mx-auto rounded-lg border border-gray-800"
                      />
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
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-800 text-white px-6 py-2 rounded-lg font-quicksand font-light uppercase tracking-wider hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#ff6b6b] text-white px-6 py-2 rounded-lg font-quicksand font-light uppercase tracking-wider hover:bg-opacity-80 transition-colors"
                >
                  Add Album
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

