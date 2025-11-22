'use client'

import Link from 'next/link'
import { FaFacebook, FaInstagram, FaYoutube, FaSpotify } from 'react-icons/fa'
import { SiApplemusic, SiSoundcloud, SiTwitter } from 'react-icons/si'

const socialLinks = [
  { name: 'Facebook', icon: FaFacebook, url: '#' },
  { name: 'X (Twitter)', icon: SiTwitter, url: '#' },
  { name: 'Instagram', icon: FaInstagram, url: '#' },
  { name: 'YouTube', icon: FaYoutube, url: '#' },
  { name: 'Spotify', icon: FaSpotify, url: '#' },
  { name: 'Apple Music', icon: SiApplemusic, url: '#' },
  { name: 'SoundCloud', icon: SiSoundcloud, url: '#' },
]

export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-gray-800 py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Social Media Icons */}
        <div className="flex gap-4 items-center">
          {socialLinks.map((social) => {
            const IconComponent = social.icon
            return (
              <a
                key={social.name}
                href={social.url}
                className="text-white text-xl opacity-70 hover:opacity-100 transition-opacity duration-300"
                aria-label={social.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconComponent className="w-5 h-5" />
              </a>
            )
          })}
        </div>

        {/* Copyright and Links */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-white text-xs md:text-sm opacity-70">
          <span>© 2025 THEBEN</span>
          <span className="hidden sm:inline">|</span>
          <Link href="/privacy-policy" className="hover:opacity-100 transition-opacity">PRIVACY POLICY</Link>
          <span>|</span>
          <Link href="/terms-of-use" className="hover:opacity-100 transition-opacity">TERMS OF USE</Link>
          <span>|</span>
          <Link href="/cookies-policy" className="hover:opacity-100 transition-opacity">COOKIES POLICY</Link>
          <span>|</span>
          <Link href="/cookies-settings" className="hover:opacity-100 transition-opacity">COOKIES SETTINGS</Link>
        </div>
      </div>
    </footer>
  )
}

