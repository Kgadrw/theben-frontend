'use client'

import { useState, useEffect } from 'react'
import { FaEdit, FaTrash, FaPlus, FaCalendarAlt, FaSave, FaTimes } from 'react-icons/fa'
import { API_BASE_URL } from '@/app/config/api'

interface Tour {
  _id: string
  title: string
  location: string
  date: string
  description: string
  ticketUrl: string
}

export default function AdminTours() {
  const [tours, setTours] = useState<Tour[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingTour, setEditingTour] = useState<Tour | null>(null)
  const [formTitle, setFormTitle] = useState('')
  const [formLocation, setFormLocation] = useState('')
  const [formDate, setFormDate] = useState('')
  const [formDescription, setFormDescription] = useState('')
  const [formTicketUrl, setFormTicketUrl] = useState('')

  useEffect(() => {
    fetchTours()
  }, [])

  const fetchTours = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/tours`)
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

  const handleEdit = (tour: Tour) => {
    setEditingTour(tour)
    setFormTitle(tour.title)
    setFormLocation(tour.location)
    setFormDate(tour.date.split('T')[0]) // Format date for input
    setFormDescription(tour.description)
    setFormTicketUrl(tour.ticketUrl)
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tour?')) return

    try {
      const response = await fetch(`${API_BASE_URL}/tours/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await fetchTours()
        alert('Tour deleted successfully!')
      } else {
        const error = await response.json()
        alert(`Failed to delete: ${error.error || 'Unknown error'}`)
      }
    } catch (error: any) {
      console.error('Error deleting tour:', error)
      alert('Failed to delete tour. Please try again.')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formTitle.trim() || !formLocation.trim() || !formDate) {
      alert('Please fill in all required fields')
      return
    }

    try {
      const url = editingTour ? `${API_BASE_URL}/tours/${editingTour._id}` : `${API_BASE_URL}/tours`
      const method = editingTour ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formTitle,
          location: formLocation,
          date: formDate,
          description: formDescription,
          ticketUrl: formTicketUrl || '#',
        }),
      })

      if (response.ok) {
        await fetchTours()
        setShowModal(false)
        resetForm()
        alert(`${editingTour ? 'Tour updated' : 'Tour created'} successfully!`)
      } else {
        const error = await response.json()
        alert(`Failed to ${editingTour ? 'update' : 'create'}: ${error.error || 'Unknown error'}`)
      }
    } catch (error: any) {
      console.error(`Error ${editingTour ? 'updating' : 'creating'} tour:`, error)
      alert(`Failed to ${editingTour ? 'update' : 'create'} tour. Please try again.`)
    }
  }

  const resetForm = () => {
    setEditingTour(null)
    setFormTitle('')
    setFormLocation('')
    setFormDate('')
    setFormDescription('')
    setFormTicketUrl('')
  }

  const handleCloseModal = () => {
    setShowModal(false)
    resetForm()
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-white text-xl font-quicksand font-light">Loading tours...</p>
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
              Tour Management
            </h1>
            <p className="text-gray-400 font-quicksand font-light">
              Manage tour dates and events
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
            Add Tour
          </button>
        </div>
      </div>

      {/* Tours List */}
      {tours.length === 0 ? (
        <div className="bg-black border border-gray-800 rounded-xl p-12 text-center">
          <p className="text-gray-400 font-quicksand font-light text-lg">No tours found. Add your first tour!</p>
        </div>
      ) : (
        <div className="bg-black border border-gray-800 rounded-xl overflow-hidden">
          <div className="divide-y divide-gray-800">
            {tours.map((tour) => (
              <div key={tour._id} className="p-6 hover:bg-gray-900/50 transition-colors group">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="text-white">
                        <div className="text-xl font-quicksand font-light uppercase">
                          {new Date(tour.date).toLocaleDateString('en-US', { month: 'short' })}
                        </div>
                        <div className="text-3xl font-quicksand font-light">
                          {new Date(tour.date).toLocaleDateString('en-US', { day: 'numeric' })}
                        </div>
                        <div className="text-sm font-quicksand font-light opacity-70">
                          {new Date(tour.date).toLocaleDateString('en-US', { year: 'numeric' })}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white text-xl font-quicksand font-light uppercase tracking-wider mb-2">
                          {tour.title}
                        </h3>
                        <p className="text-gray-400 font-quicksand font-light mb-2">
                          {tour.location}
                        </p>
                        <p className="text-gray-500 text-sm font-quicksand font-light">
                          {tour.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(tour)}
                      className="bg-gray-800 text-white px-4 py-2 rounded-lg font-quicksand font-light uppercase tracking-wider hover:bg-gray-700 transition-colors flex items-center gap-2"
                    >
                      <FaEdit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(tour._id)}
                      className="bg-red-900 text-white px-4 py-2 rounded-lg font-quicksand font-light uppercase tracking-wider hover:bg-red-800 transition-colors flex items-center gap-2"
                    >
                      <FaTrash className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add/Edit Tour Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black border border-gray-800 rounded-xl p-8 max-w-2xl w-full relative overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-quicksand font-light text-white uppercase tracking-wider flex items-center gap-2">
                  <FaCalendarAlt className="w-6 h-6 text-green-400" />
                  {editingTour ? 'Edit Tour' : 'Add New Tour'}
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
                    Tour Title *
                  </label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white font-quicksand font-light focus:outline-none focus:border-[#ff6b6b]"
                    placeholder="Enter tour title"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 font-quicksand font-light mb-2">
                      Date *
                    </label>
                    <input
                      type="date"
                      value={formDate}
                      onChange={(e) => setFormDate(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white font-quicksand font-light focus:outline-none focus:border-[#ff6b6b]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-quicksand font-light mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      value={formLocation}
                      onChange={(e) => setFormLocation(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white font-quicksand font-light focus:outline-none focus:border-[#ff6b6b]"
                      placeholder="Enter location"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-300 font-quicksand font-light mb-2">
                    Description
                  </label>
                  <textarea
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white font-quicksand font-light focus:outline-none focus:border-[#ff6b6b] min-h-[100px] resize-y"
                    placeholder="Enter tour description"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-quicksand font-light mb-2">
                    Ticket URL
                  </label>
                  <input
                    type="url"
                    value={formTicketUrl}
                    onChange={(e) => setFormTicketUrl(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white font-quicksand font-light focus:outline-none focus:border-[#ff6b6b]"
                    placeholder="https://..."
                  />
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
                    disabled={!formTitle.trim() || !formLocation.trim() || !formDate}
                    className="bg-[#ff6b6b] text-white px-6 py-2 rounded-lg font-quicksand font-light uppercase tracking-wider hover:shadow-lg hover:shadow-[#ff6b6b]/30 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed border border-[#ff6b6b]/20"
                  >
                    <FaSave className="w-4 h-4" />
                    {editingTour ? 'Update Tour' : 'Add Tour'}
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
