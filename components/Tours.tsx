'use client'

export default function Tours() {
  return (
    <section className="relative w-full min-h-screen bg-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Tours Title */}
        <h1 className="text-white text-4xl md:text-5xl font-quicksand font-light uppercase tracking-wider mb-12 md:mb-16 text-left">
          Tours
        </h1>
        
        {/* Tour Dates */}
        <div className="flex flex-col gap-8">
          {/* Tour Date Item */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 pb-8 border-b border-gray-800">
            <div className="flex-shrink-0">
              <div className="text-white">
                <div className="text-2xl md:text-3xl font-quicksand font-light uppercase">JAN</div>
                <div className="text-4xl md:text-5xl font-quicksand font-light">26</div>
                <div className="text-lg md:text-xl font-quicksand font-light opacity-70">2026</div>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-white text-xl md:text-2xl font-quicksand font-light uppercase tracking-wider mb-2">
                Concert with Bruce Melodie
              </h2>
              <p className="text-white text-base md:text-lg font-quicksand font-light opacity-80 mb-2">
                Rwanda
              </p>
              <p className="text-white text-sm md:text-base font-quicksand font-light opacity-70">
                Highly anticipated concert with fellow Rwandan artist Bruce Melodie
              </p>
            </div>
            <div className="flex-shrink-0">
              <a
                href="#"
                className="inline-block text-white font-quicksand font-light uppercase tracking-wider border border-white px-6 py-2 transition-all duration-300 hover:bg-white hover:text-black hover:border-[#ff6b6b]"
              >
                Get Ticket
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

