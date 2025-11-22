'use client'

import Image from 'next/image'

export default function About() {
  return (
    <section className="relative w-full min-h-screen bg-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Biography Text - Left */}
          <div className="flex-1 text-white">
            <h2 className="text-white text-3xl md:text-4xl font-quicksand font-light uppercase tracking-wider mb-6 md:mb-8">
              Biography
            </h2>
            <p className="text-base md:text-lg leading-relaxed font-quicksand font-light opacity-90 mb-6">
              Born Benjamin Mugisha on January 9, 1987, "The Ben" is a prominent figure in the East African music scene. He has produced numerous popular songs, such as "Ndaje", "Ni Forever", and "Naremeye", and often collaborates with other African artists. He was recently awarded the "East Africa Best Act/Song" award at the Pipo Music Awards for his song "True Love". He and his wife, Uwicyeza Pamella, welcomed their first child in early 2025.
            </p>
            <p className="text-base md:text-lg leading-relaxed font-quicksand font-light opacity-90">
              The Ben is also preparing for a highly anticipated concert with fellow Rwandan artist Bruce Melodie in January 2026, which has generated significant buzz in the local entertainment industry.
            </p>
          </div>

          {/* Theben Image - Right */}
          <div className="flex-1 w-full max-w-md">
            <div className="relative w-full">
              <Image
                src="/theben.jfif"
                alt="Theben"
                width={600}
                height={800}
                className="w-full h-auto object-contain"
                priority
                quality={90}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

