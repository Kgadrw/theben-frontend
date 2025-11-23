'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaFacebook, FaInstagram, FaYoutube, FaSpotify, FaBars, FaTimes } from 'react-icons/fa'
import { SiApplemusic, SiSoundcloud, SiTwitter } from 'react-icons/si'

const socialLinks = [
  {
    name: 'Facebook',
    icon: FaFacebook,
    url: '#'
  },
  {
    name: 'X (Twitter)',
    icon: SiTwitter,
    url: '#'
  },
  {
    name: 'Instagram',
    icon: FaInstagram,
    url: '#'
  },
  {
    name: 'YouTube',
    icon: FaYoutube,
    url: '#'
  },
  {
    name: 'Spotify',
    icon: FaSpotify,
    url: '#'
  },
  {
    name: 'Apple Music',
    icon: SiApplemusic,
    url: '#'
  },
  {
    name: 'SoundCloud',
    icon: SiSoundcloud,
    url: '#'
  },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }

  const getLinkClassName = (path: string, isMobile: boolean = false) => {
    const baseClasses = `font-quicksand font-light uppercase tracking-wider transition-colors duration-300 ${
      isMobile ? 'text-base' : 'text-sm lg:text-base'
    }`
    const activeClasses = isActive(path)
      ? 'text-[#ff6b6b] font-medium'
      : 'text-white hover:text-[#ff6b6b]'
    
    return `${baseClasses} ${activeClasses}`
  }

  const isHomePage = pathname === '/'

  return (
    <nav className={`absolute top-0 left-0 right-0 w-full flex flex-col sm:flex-row items-center py-3 px-4 sm:py-6 sm:pr-12 sm:pl-0 z-[1000] ${isHomePage ? 'bg-transparent' : 'bg-black'}`}>
      {/* Mobile: Header with Artist Name and Hamburger */}
      <div className="w-full flex items-center justify-between sm:hidden">
        <h1 className="text-3xl font-comforter font-normal tracking-[2px] text-white m-0 lowercase">
          theben
        </h1>
        <button
          onClick={toggleMenu}
          className="text-white p-2 focus:outline-none"
          aria-label="Toggle menu"
        >
          <FaBars className="w-6 h-6" />
        </button>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:flex w-full items-center">
      {/* Left: Navigation Links */}
        <div className="flex gap-4 lg:gap-4 items-center flex-1 pl-12 mr-8 lg:mr-12">
        <Link 
          href="/" 
            className={getLinkClassName('/')}
          style={{ fontOpticalSizing: 'auto' }}
        >
          Home
        </Link>
        <Link 
          href="/about" 
            className={getLinkClassName('/about')}
          style={{ fontOpticalSizing: 'auto' }}
        >
          About
        </Link>
        <Link 
          href="/music" 
            className={getLinkClassName('/music')}
          style={{ fontOpticalSizing: 'auto' }}
        >
          Music
        </Link>
        <Link 
          href="/videos" 
            className={getLinkClassName('/videos')}
          style={{ fontOpticalSizing: 'auto' }}
        >
          Videos
        </Link>
        <Link 
          href="/tour" 
            className={getLinkClassName('/tour')}
          style={{ fontOpticalSizing: 'auto' }}
        >
          Tour
        </Link>
      </div>
      
      {/* Center: Artist Name */}
        <div className="flex-1 flex justify-center mx-8 lg:mx-12">
          <h1 className="text-3xl lg:text-[2.5rem] font-comforter font-normal tracking-[2px] text-white m-0 lowercase" itemProp="name">
          theben
        </h1>
      </div>
      
        {/* Right: Social Media Icons */}
        <div className="flex gap-2 lg:gap-4 items-center flex-1 justify-end">
          {socialLinks.map((social) => {
            const IconComponent = social.icon
            return (
          <a
                key={social.name}
                href={social.url}
                className="cursor-pointer transition-all duration-300 opacity-80 hover:scale-125 hover:opacity-100 p-1"
                aria-label={social.name}
                title={social.name}
            target="_blank"
            rel="noopener noreferrer"
          >
                <IconComponent className="w-6 h-6 lg:w-6 lg:h-6" />
          </a>
            )
          })}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-[999] sm:hidden"
            onClick={closeMenu}
          />
          {/* Side Drawer Menu - Left Side (2/3 width) */}
          <div className="fixed top-0 left-0 w-2/3 h-full bg-black bg-opacity-98 backdrop-blur-md sm:hidden z-[1000] border-r border-gray-800 shadow-2xl transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full py-6 px-6 gap-8">
              {/* Close Button - Top Left */}
              <div className="flex justify-start">
                <button
                  onClick={closeMenu}
                  className="text-white p-2 focus:outline-none hover:text-[#ff6b6b] transition-colors"
                  aria-label="Close menu"
                >
                  <FaTimes className="w-6 h-6" />
                </button>
              </div>
              
              {/* Navigation Links - Left Aligned */}
              <div className="flex flex-col gap-6 flex-1">
                <Link 
                  href="/" 
                  onClick={closeMenu}
                  className={`font-quicksand uppercase tracking-wider text-base transition-colors duration-300 ${
                    isActive('/') ? 'text-[#ff6b6b] font-medium' : 'text-white font-light hover:text-[#ff6b6b]'
                  }`}
                  style={{ fontOpticalSizing: 'auto' }}
                >
                  HOME
                </Link>
                <Link 
                  href="/music" 
                  onClick={closeMenu}
                  className={`font-quicksand uppercase tracking-wider text-base transition-colors duration-300 ${
                    isActive('/music') ? 'text-[#ff6b6b] font-medium' : 'text-white font-light hover:text-[#ff6b6b]'
                  }`}
                  style={{ fontOpticalSizing: 'auto' }}
                >
                  MUSIC
                </Link>
                <Link 
                  href="/videos" 
                  onClick={closeMenu}
                  className={`font-quicksand uppercase tracking-wider text-base transition-colors duration-300 ${
                    isActive('/videos') ? 'text-[#ff6b6b] font-medium' : 'text-white font-light hover:text-[#ff6b6b]'
                  }`}
                  style={{ fontOpticalSizing: 'auto' }}
                >
                  VIDEOS
                </Link>
                <Link 
                  href="/tour" 
                  onClick={closeMenu}
                  className={`font-quicksand uppercase tracking-wider text-base transition-colors duration-300 ${
                    isActive('/tour') ? 'text-[#ff6b6b] font-medium' : 'text-white font-light hover:text-[#ff6b6b]'
                  }`}
                  style={{ fontOpticalSizing: 'auto' }}
                >
                  TOUR
                </Link>
                <Link 
                  href="/about" 
                  onClick={closeMenu}
                  className={`font-quicksand uppercase tracking-wider text-base transition-colors duration-300 ${
                    isActive('/about') ? 'text-[#ff6b6b] font-medium' : 'text-white font-light hover:text-[#ff6b6b]'
                  }`}
                  style={{ fontOpticalSizing: 'auto' }}
                >
                  ABOUT
                </Link>
              </div>
              
              {/* Social Media Icons - Bottom */}
              <div className="flex gap-4 items-center justify-start pt-4 border-t border-gray-800">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      onClick={closeMenu}
                      className="cursor-pointer transition-all duration-300 opacity-80 hover:scale-125 hover:opacity-100 text-white"
                      aria-label={social.name}
                      title={social.name}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  )
}

