'use client'

import { useState } from 'react'
import { FaEdit, FaTrash, FaPlus, FaCalendarAlt } from 'react-icons/fa'

const tours = [
  { 
    id: 1, 
    title: 'Concert with Bruce Melodie',
    location: 'Rwanda',
    date: '2026-01-26',
    description: 'Highly anticipated concert with fellow Rwandan artist Bruce Melodie'
  },
]

export default function AdminTours() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-black border border-gray-800 rounded-xl p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 via-transparent to-transparent"></div>
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
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-[#ff6b6b] to-[#ff8e8e] text-white px-6 py-3 rounded-xl font-quicksand font-light uppercase tracking-wider hover:shadow-lg hover:shadow-[#ff6b6b]/30 transition-all duration-300 flex items-center gap-2 border border-[#ff6b6b]/20"
          >
            <FaPlus className="w-5 h-5" />
            Add Tour
          </button>
        </div>
      </div>

      {/* Tours List */}
      <div className="bg-black border border-gray-800 rounded-xl overflow-hidden">
        <div className="divide-y divide-gray-800">
          {tours.map((tour) => (
            <div key={tour.id} className="p-6 hover:bg-gray-900/50 transition-colors group">
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
                  <button className="bg-gray-800 text-white px-4 py-2 rounded-lg font-quicksand font-light uppercase tracking-wider hover:bg-gray-700 transition-colors flex items-center gap-2">
                    <FaEdit className="w-4 h-4" />
                    Edit
                  </button>
                  <button className="bg-red-900 text-white px-4 py-2 rounded-lg font-quicksand font-light uppercase tracking-wider hover:bg-red-800 transition-colors flex items-center gap-2">
                    <FaTrash className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Tour Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black border border-gray-800 rounded-xl p-8 max-w-2xl w-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 via-transparent to-transparent"></div>
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-quicksand font-light text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                <FaCalendarAlt className="w-6 h-6 text-green-400" />
                Add New Tour
              </h2>
              <form className="space-y-4">
              <div>
                <label className="block text-gray-300 font-quicksand font-light mb-2">
                  Tour Title
                </label>
                <input
                  type="text"
                  className="w-full bg-black border border-gray-800 rounded-lg px-4 py-2 text-white font-quicksand font-light focus:outline-none focus:border-[#ff6b6b]"
                  placeholder="Enter tour title"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-quicksand font-light mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    className="w-full bg-black border border-gray-800 rounded-lg px-4 py-2 text-white font-quicksand font-light focus:outline-none focus:border-[#ff6b6b]"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-quicksand font-light mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    className="w-full bg-black border border-gray-800 rounded-lg px-4 py-2 text-white font-quicksand font-light focus:outline-none focus:border-[#ff6b6b]"
                    placeholder="Enter location"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-300 font-quicksand font-light mb-2">
                  Description
                </label>
                <textarea
                  className="w-full bg-black border border-gray-800 rounded-lg px-4 py-2 text-white font-quicksand font-light focus:outline-none focus:border-[#ff6b6b] min-h-[100px]"
                  placeholder="Enter tour description"
                />
              </div>
              <div>
                <label className="block text-gray-300 font-quicksand font-light mb-2">
                  Ticket URL
                </label>
                <input
                  type="url"
                  className="w-full bg-black border border-gray-800 rounded-lg px-4 py-2 text-white font-quicksand font-light focus:outline-none focus:border-[#ff6b6b]"
                  placeholder="https://..."
                />
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
                  Add Tour
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

