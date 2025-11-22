'use client'

import Image from 'next/image'

export default function Music() {
  return (
    <section className="relative w-full min-h-screen bg-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Music Title */}
        <h1 className="text-white text-4xl md:text-5xl font-quicksand font-light uppercase tracking-wider mb-12 md:mb-16 text-left">
          Music
        </h1>
        
        {/* Albums */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16">
        {/* First Album */}
        <div className="flex flex-col items-center gap-6 flex-1 max-w-md">
          <div className="relative w-full">
            <Image
              src="/album 1.jpg"
              alt="Music Album"
              width={600}
              height={800}
              className="w-full h-auto object-contain"
              priority
              quality={90}
            />
          </div>
          <div className="text-center">
            <h2 className="text-white text-2xl font-quicksand font-light uppercase tracking-wider mb-2">
              Album Title
            </h2>
            <p className="text-white text-sm opacity-80">
              Album description or release date
            </p>
          </div>
        </div>

        {/* Second Album */}
        <div className="flex flex-col items-center gap-6 flex-1 max-w-md">
          <div className="relative w-full">
            <Image
              src="/album 1.jpg"
              alt="Music Album"
              width={600}
              height={800}
              className="w-full h-auto object-contain"
              quality={90}
            />
          </div>
          <div className="text-center">
            <h2 className="text-white text-2xl font-quicksand font-light uppercase tracking-wider mb-2">
              Album Title
            </h2>
            <p className="text-white text-sm opacity-80">
              Album description or release date
            </p>
          </div>
        </div>

        {/* Third Album */}
        <div className="flex flex-col items-center gap-6 flex-1 max-w-md">
          <div className="relative w-full">
            <Image
              src="/album 1.jpg"
              alt="Music Album"
              width={600}
              height={800}
              className="w-full h-auto object-contain"
              quality={90}
            />
          </div>
          <div className="text-center">
            <h2 className="text-white text-2xl font-quicksand font-light uppercase tracking-wider mb-2">
              Album Title
            </h2>
            <p className="text-white text-sm opacity-80">
              Album description or release date
            </p>
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}

