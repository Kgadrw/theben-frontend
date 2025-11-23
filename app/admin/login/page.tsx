'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const ADMIN_EMAIL = 'thebenjamin@123'
const ADMIN_PASSWORD = 'benjamin@123'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Simple validation
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password')
      return
    }

    // Check credentials
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Set authentication token
      localStorage.setItem('admin_authenticated', 'true')
      localStorage.setItem('admin_email', email)
      
      // Redirect to admin dashboard
      router.push('/admin')
      router.refresh()
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-comforter text-white lowercase tracking-wide mb-2">theben</h1>
          <p className="text-gray-400 font-quicksand font-light uppercase tracking-wider text-sm">Admin Login</p>
        </div>

        {/* Login Form */}
        <div className="bg-black border border-gray-800 rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-900/20 border border-red-800 text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Email Input */}
            <div>
              <label className="block text-white mb-2 text-sm uppercase">
                Username
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#ff6b6b]"
                placeholder="thebenjamin@123"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-white mb-2 text-sm uppercase">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#ff6b6b]"
                placeholder="Enter password"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#ff6b6b] text-white px-6 py-3 rounded-lg uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

