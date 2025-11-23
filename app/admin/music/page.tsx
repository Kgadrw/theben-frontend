'use client'

import { useState, useRef, useEffect } from 'react'
import { FaEdit, FaTrash, FaPlus, FaImage, FaUpload, FaSave, FaTimes } from 'react-icons/fa'
import { API_BASE_URL } from '@/app/config/api'
import Image from 'next/image'

interface Album {
  _id: string
  title: string
  description: string
  image: string
  hoverImage?: string
  link?: string
}

export default function AdminMusic() {
  const [albums, setAlbums] = useState<Album[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingAlbum, setEditingAlbum] = useState<Album | null>(null)
  const [formTitle, setFormTitle] = useState('')
  const [formDescription, setFormDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [hoverImageUrl, setHoverImageUrl] = useState('')
  const [listeningLink, setListeningLink] = useState('')
  const [uploading, setUploading] = useState(false)
  const [uploadingHover, setUploadingHover] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadProgressHover, setUploadProgressHover] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const hoverFileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchAlbums()
  }, [])

  const fetchAlbums = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/music`)
      if (response.ok) {
        const data = await response.json()
        setAlbums(data || [])
      }
    } catch (error) {
      console.error('Error fetching albums:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (album: Album) => {
    setEditingAlbum(album)
    setFormTitle(album.title)
    setFormDescription(album.description)
    setImageUrl(album.image)
    setHoverImageUrl(album.hoverImage || '')
    setListeningLink(album.link || '')
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this album?')) return

    try {
      const response = await fetch(`${API_BASE_URL}/music/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await fetchAlbums()
        alert('Album deleted successfully!')
      } else {
        const error = await response.json()
        alert(`Failed to delete: ${error.error || 'Unknown error'}`)
      }
    } catch (error: any) {
      console.error('Error deleting album:', error)
      alert('Failed to delete album. Please try again.')
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

      const response = await fetch(`${API_BASE_URL}/music/upload`, {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        setImageUrl(data.url)
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

  const handleHoverFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    setUploadingHover(true)
    setUploadProgressHover(0)

    try {
      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch(`${API_BASE_URL}/music/upload`, {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        setHoverImageUrl(data.url)
        setUploadProgressHover(100)
      } else {
        const error = await response.json()
        alert(`Upload failed: ${error.error || 'Unknown error'}`)
      }
    } catch (error: any) {
      console.error('Error uploading hover image:', error)
      alert('Failed to upload hover image. Please try again.')
    } finally {
      setUploadingHover(false)
      setTimeout(() => setUploadProgressHover(0), 1000)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formTitle.trim() || !imageUrl.trim()) {
      alert('Please fill in all required fields')
      return
    }

    try {
      const url = editingAlbum ? `${API_BASE_URL}/music/${editingAlbum._id}` : `${API_BASE_URL}/music`
      const method = editingAlbum ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formTitle,
          description: formDescription,
          image: imageUrl,
          hoverImage: hoverImageUrl || null,
          link: listeningLink || null,
        }),
      })

      if (response.ok) {
        await fetchAlbums()
        setShowModal(false)
        resetForm()
        alert(`${editingAlbum ? 'Album updated' : 'Album created'} successfully!`)
      } else {
        const error = await response.json()
        alert(`Failed to ${editingAlbum ? 'update' : 'create'}: ${error.error || 'Unknown error'}`)
      }
    } catch (error: any) {
      console.error(`Error ${editingAlbum ? 'updating' : 'creating'} album:`, error)
      alert(`Failed to ${editingAlbum ? 'update' : 'create'} album. Please try again.`)
    }
  }

  const resetForm = () => {
    setEditingAlbum(null)
    setFormTitle('')
    setFormDescription('')
    setImageUrl('')
    setHoverImageUrl('')
    setListeningLink('')
  }

  const handleCloseModal = () => {
    setShowModal(false)
    resetForm()
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-white text-xl font-quicksand font-light">Loading albums...</p>
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
              Music Management
            </h1>
            <p className="text-gray-400 font-quicksand font-light">
              Manage albums and music content
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
            Add Album
          </button>
        </div>
      </div>

      {/* Albums Grid */}
      {albums.length === 0 ? (
        <div className="bg-black border border-gray-800 rounded-xl p-12 text-center">
          <p className="text-gray-400 font-quicksand font-light text-lg">No albums found. Add your first album!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {albums.map((album) => (
            <div
              key={album._id}
              className="bg-black border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 group"
            >
              <div className="aspect-square bg-gray-800 relative">
                <Image
                  src={album.image}
                  alt={album.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-t-xl"
                />
              </div>
              <div className="p-4">
                <h3 className="text-white font-quicksand font-light text-lg mb-1">
                  {album.title}
                </h3>
                <p className="text-gray-400 text-sm font-quicksand font-light mb-4 line-clamp-2">
                  {album.description}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(album)}
                    className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg font-quicksand font-light uppercase tracking-wider hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaEdit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(album._id)}
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

      {/* Add/Edit Album Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black border border-gray-800 rounded-xl p-8 max-w-2xl w-full relative overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-quicksand font-light text-white uppercase tracking-wider flex items-center gap-2">
                  <FaImage className="w-6 h-6 text-purple-400" />
                  {editingAlbum ? 'Edit Album' : 'Add New Album'}
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
                    Album Title *
                  </label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white font-quicksand font-light focus:outline-none focus:border-[#ff6b6b]"
                    placeholder="Enter album title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-quicksand font-light mb-2">
                    Description
                  </label>
                  <textarea
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white font-quicksand font-light focus:outline-none focus:border-[#ff6b6b] min-h-[100px] resize-y"
                    placeholder="Enter album description"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-quicksand font-light mb-2">
                    Album Image *
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
                        <div className="relative w-full max-w-xs mx-auto aspect-square bg-gray-800 rounded-lg overflow-hidden">
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
                </div>
                <div>
                  <label className="block text-gray-300 font-quicksand font-light mb-2">
                    Listening Link (Optional)
                  </label>
                  <input
                    type="url"
                    value={listeningLink}
                    onChange={(e) => setListeningLink(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white font-quicksand font-light focus:outline-none focus:border-[#ff6b6b]"
                    placeholder="https://spotify.com/album/... or https://youtube.com/..."
                  />
                  <p className="text-gray-500 font-quicksand font-light text-xs mt-1">
                    Add a link where users can listen to this music (Spotify, YouTube, etc.)
                  </p>
                </div>
                <div>
                  <label className="block text-gray-300 font-quicksand font-light mb-2">
                    Hover Image (Optional)
                  </label>
                  <input
                    ref={hoverFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleHoverFileChange}
                    className="hidden"
                  />
                  <div
                    onClick={() => hoverFileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-800 rounded-lg p-6 text-center cursor-pointer hover:border-[#ff6b6b] transition-colors"
                  >
                    <FaImage className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-400 font-quicksand font-light text-sm mb-1">
                      Click to upload hover image or drag and drop
                    </p>
                    <p className="text-gray-500 font-quicksand font-light text-xs">
                      This image will show on hover (optional)
                    </p>
                    {uploadingHover && (
                      <div className="mt-2">
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div
                            className="bg-[#ff6b6b] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgressHover}%` }}
                          />
                        </div>
                        <p className="text-gray-400 text-xs mt-1">Uploading... {uploadProgressHover}%</p>
                      </div>
                    )}
                    {hoverImageUrl && !uploadingHover && (
                      <div className="mt-4">
                        <div className="relative w-full max-w-xs mx-auto aspect-square bg-gray-800 rounded-lg overflow-hidden">
                          <Image
                            src={hoverImageUrl}
                            alt="Hover image preview"
                            fill
                            style={{ objectFit: 'cover' }}
                            className="rounded-lg"
                          />
                        </div>
                        <p className="text-green-400 text-xs mt-1">✓ Hover image uploaded successfully</p>
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
                    disabled={!formTitle.trim() || !imageUrl.trim()}
                    className="bg-[#ff6b6b] text-white px-6 py-2 rounded-lg font-quicksand font-light uppercase tracking-wider hover:shadow-lg hover:shadow-[#ff6b6b]/30 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed border border-[#ff6b6b]/20"
                  >
                    <FaSave className="w-4 h-4" />
                    {editingAlbum ? 'Update Album' : 'Add Album'}
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
