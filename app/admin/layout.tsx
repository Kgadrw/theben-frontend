'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  FaHome, 
  FaMusic, 
  FaVideo, 
  FaCalendarAlt, 
  FaCog, 
  FaBars, 
  FaTimes,
  FaSignOutAlt,
  FaUser,
  FaPlay,
  FaBell,
  FaUserCircle
} from 'react-icons/fa'
import { isAuthenticated, logout as logoutUser } from '@/lib/auth'

const sidebarItems = [
  { name: 'Dashboard', href: '/admin', icon: FaHome },
  { name: 'Hero Video', href: '/admin/hero', icon: FaPlay },
  { name: 'About', href: '/admin/about', icon: FaUserCircle },
  { name: 'Music', href: '/admin/music', icon: FaMusic },
  { name: 'Videos', href: '/admin/videos', icon: FaVideo },
  { name: 'Tours', href: '/admin/tours', icon: FaCalendarAlt },
  { name: 'Settings', href: '/admin/settings', icon: FaCog },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isAuth, setIsAuth] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    // Skip authentication check for login page
    if (pathname === '/admin/login') {
      setIsAuth(true)
      return
    }
    
    // Check authentication for other admin pages
    if (!isAuthenticated()) {
      router.push('/admin/login')
    } else {
      setIsAuth(true)
    }
  }, [router, pathname])

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin'
    }
    return pathname.startsWith(href)
  }

  const handleLogout = () => {
    logoutUser()
    router.push('/admin/login')
  }

  // If on login page, render children without admin layout
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  // Show loading only while checking authentication (for non-login pages)
  if (!isAuth) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-black border-r border-gray-800 transform transition-transform duration-300 ease-in-out
        md:translate-x-0 md:fixed
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo/Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800 bg-black">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#ff6b6b] flex items-center justify-center">
                <span className="text-white font-comforter text-2xl lowercase">t</span>
              </div>
              <div>
                <h1 className="text-2xl font-comforter text-white lowercase tracking-wide">theben</h1>
                <p className="text-xs text-gray-400 font-quicksand font-light uppercase tracking-wider">Admin Panel</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-white hover:text-[#ff6b6b] transition-colors"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {sidebarItems.map((item) => {
              const IconComponent = item.icon
              const active = isActive(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 group
                    ${active 
                      ? 'bg-[#ff6b6b] text-white shadow-lg shadow-[#ff6b6b]/20' 
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }
                  `}
                >
                  <IconComponent className={`w-5 h-5 ${active ? 'text-white' : 'text-gray-400 group-hover:text-[#ff6b6b] transition-colors'}`} />
                  <span className="font-quicksand font-light uppercase tracking-wider text-sm">{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-gray-800 bg-black">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-300 hover:bg-gray-800 hover:text-[#ff6b6b] transition-all duration-200 group border border-transparent hover:border-gray-800"
            >
              <FaSignOutAlt className="w-5 h-5 text-gray-400 group-hover:text-[#ff6b6b] transition-colors" />
              <span className="font-quicksand font-light uppercase tracking-wider text-sm">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-72">
        {/* Top Bar */}
        <header className="bg-black border-b border-gray-800 px-6 py-5 flex items-center justify-between sticky top-0 z-30 backdrop-blur-sm bg-black/95">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-white hover:text-[#ff6b6b] transition-colors p-2 rounded-lg hover:bg-gray-800"
            >
              <FaBars className="w-6 h-6" />
            </button>
            <div className="hidden md:block">
              <h2 className="text-xl font-quicksand font-light text-white uppercase tracking-wider">
                Admin Dashboard
              </h2>
              <p className="text-xs text-gray-400 font-quicksand font-light mt-0.5">
                Manage your content and settings
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800">
              <FaBell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#ff6b6b] rounded-full"></span>
            </button>
            <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-lg bg-gray-900 border border-gray-800">
              <div className="text-right">
                <p className="text-sm text-white font-quicksand font-light">{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                <p className="text-xs text-gray-400 font-quicksand font-light">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8 bg-black min-h-[calc(100vh-80px)]">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

