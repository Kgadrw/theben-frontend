'use client'

import { useState } from 'react'
import { FaSave } from 'react-icons/fa'

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteTitle: 'Theben | Official Website',
    siteDescription: 'Official website for theben',
    email: 'contact@theben.com',
    socialMedia: {
      facebook: '',
      twitter: '',
      instagram: '',
      youtube: '',
      spotify: '',
      appleMusic: '',
      soundcloud: '',
    },
  })

  const handleChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setSettings({
        ...settings,
        [parent]: {
          ...settings[parent as keyof typeof settings],
          [child]: value,
        },
      })
    } else {
      setSettings({
        ...settings,
        [field]: value,
      })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-quicksand font-light text-white uppercase tracking-wider mb-2">
          Settings
        </h1>
        <p className="text-gray-400 font-quicksand font-light">
          Manage website settings and configuration
        </p>
      </div>

      {/* General Settings */}
      <div className="bg-black border border-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-quicksand font-light text-white uppercase tracking-wider mb-6">
          General Settings
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 font-quicksand font-light mb-2">
              Site Title
            </label>
            <input
              type="text"
              value={settings.siteTitle}
              onChange={(e) => handleChange('siteTitle', e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white font-quicksand font-light focus:outline-none focus:border-[#ff6b6b]"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-quicksand font-light mb-2">
              Site Description
            </label>
            <textarea
              value={settings.siteDescription}
              onChange={(e) => handleChange('siteDescription', e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white font-quicksand font-light focus:outline-none focus:border-[#ff6b6b] min-h-[100px]"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-quicksand font-light mb-2">
              Contact Email
            </label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white font-quicksand font-light focus:outline-none focus:border-[#ff6b6b]"
            />
          </div>
        </div>
      </div>

      {/* Social Media Settings */}
      <div className="bg-black border border-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-quicksand font-light text-white uppercase tracking-wider mb-6">
          Social Media Links
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(settings.socialMedia).map(([key, value]) => (
            <div key={key}>
              <label className="block text-gray-300 font-quicksand font-light mb-2 capitalize">
                {key === 'appleMusic' ? 'Apple Music' : key}
              </label>
              <input
                type="url"
                value={value}
                onChange={(e) => handleChange(`socialMedia.${key}`, e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white font-quicksand font-light focus:outline-none focus:border-[#ff6b6b]"
                placeholder={`https://...`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="bg-[#ff6b6b] text-white px-8 py-3 rounded-lg font-quicksand font-light uppercase tracking-wider hover:bg-opacity-80 transition-colors flex items-center gap-2">
          <FaSave className="w-4 h-4" />
          Save Settings
        </button>
      </div>
    </div>
  )
}

