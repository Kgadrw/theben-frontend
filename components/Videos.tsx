'use client'

import Image from 'next/image'

export default function Videos() {
  const videoId = '8ufRrmc6Bj4'
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`

  return (
    <section className="relative w-full min-h-screen bg-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Videos Title */}
        <h1 className="text-white text-4xl md:text-5xl font-quicksand font-light uppercase tracking-wider mb-12 md:mb-16 text-left">
          Videos
        </h1>
        
        {/* Videos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 justify-items-center">
          {/* First Video */}
          <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-full cursor-pointer"
            >
              <Image
                src={thumbnailUrl}
                alt="Video Thumbnail"
                width={900}
                height={600}
                className="w-full h-auto object-contain"
                quality={90}
              />
            </a>
          </div>

          {/* Second Video */}
          <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-full cursor-pointer"
            >
              <Image
                src={thumbnailUrl}
                alt="Video Thumbnail"
                width={900}
                height={600}
                className="w-full h-auto object-contain"
                quality={90}
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

