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
      isMobile ? 'text-base text-center' : 'text-sm lg:text-base'
    }`
    const activeClasses = isActive(path)
      ? 'text-[#ff6b6b]'
      : 'text-white hover:text-[#ff6b6b]'
    return `${baseClasses} ${activeClasses}`
  }

  const isHomePage = pathname === '/'

  return (
    <nav className={`fixed top-0 left-0 right-0 w-full flex flex-col sm:flex-row items-center py-3 px-4 sm:py-6 sm:pr-12 sm:pl-0 z-[1000] ${isHomePage ? 'bg-transparent' : 'bg-black'}`} style={{ width: '100vw' }}>
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
          {isMenuOpen ? (
            <FaTimes className="w-6 h-6" />
          ) : (
            <FaBars className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:flex w-full items-center">
      {/* Left: Navigation Links */}
        <div className="flex gap-6 lg:gap-8 items-center flex-1 pl-12 mr-8 lg:mr-12">
        <Link 
          href="/" 
            className={getLinkClassName('/')}
          style={{ fontOpticalSizing: 'auto' }}
        >
          Home
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
          <h1 className="text-3xl lg:text-[2.5rem] font-comforter font-normal tracking-[2px] text-white m-0 lowercase">
          theben
        </h1>
      </div>
      
        {/* Right: Social Media Icons */}
        <div className="flex gap-4 lg:gap-6 items-center flex-1 justify-end">
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 w-full bg-black bg-opacity-95 backdrop-blur-md sm:hidden border-t border-gray-800">
          <div className="flex flex-col py-6 px-4 gap-8">
            {/* Navigation Links */}
            <div className="flex flex-col gap-4">
              <Link 
                href="/" 
                onClick={closeMenu}
                className={getLinkClassName('/', true)}
                style={{ fontOpticalSizing: 'auto' }}
              >
                Home
              </Link>
              <Link 
                href="/music" 
                onClick={closeMenu}
                className={getLinkClassName('/music', true)}
                style={{ fontOpticalSizing: 'auto' }}
              >
                Music
              </Link>
              <Link 
                href="/videos" 
                onClick={closeMenu}
                className={getLinkClassName('/videos', true)}
                style={{ fontOpticalSizing: 'auto' }}
              >
                Videos
              </Link>
              <Link 
                href="/tour" 
                onClick={closeMenu}
                className={getLinkClassName('/tour', true)}
                style={{ fontOpticalSizing: 'auto' }}
              >
                Tour
              </Link>
            </div>
            
            {/* Social Media Icons */}
            <div className="flex gap-6 items-center justify-center pt-4 border-t border-gray-800">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    onClick={closeMenu}
                    className="cursor-pointer transition-all duration-300 opacity-80 hover:scale-125 hover:opacity-100 p-1"
                    aria-label={social.name}
                    title={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconComponent className="w-6 h-6" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

