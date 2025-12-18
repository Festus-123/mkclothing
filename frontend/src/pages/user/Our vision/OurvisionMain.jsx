// OurvisionMain.jsx
import React from 'react'

const OurvisionMain = () => {
  return (
    <section className="w-full">
      {/* Visions & Values */}
      <div className="px-6 md:px-20 py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-[#8b4a1f] mb-3">
          Our Visions and Values
        </h2>
        <p className="text-sm text-[#8b4a1f]/80 mb-16">
          Built on Principles that guide everything we do
        </p>

        <div className="grid gap-14 md:grid-cols-3 max-w-6xl mx-auto">
          {/* Excellence */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 mb-6 rounded-2xl bg-white shadow-xl flex items-center justify-center">
              <span className="text-3xl text-red-600">🌐</span>
            </div>
            <h3 className="font-semibold text-[#8b4a1f] mb-2">Excellence</h3>
            <p className="text-xs text-[#8b4a1f]/70 max-w-[220px]">
              We strive for perfection in every stitch, every sale and every
              customer interaction.
            </p>
          </div>

          {/* Passion */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 mb-6 rounded-2xl bg-white shadow-xl flex items-center justify-center">
              <span className="text-3xl text-red-600">❤</span>
            </div>
            <h3 className="font-semibold text-[#8b4a1f] mb-2">Passion</h3>
            <p className="text-xs text-[#8b4a1f]/70 max-w-[220px]">
              We strive for perfection in every stitch, every sale and every
              customer interaction.
            </p>
          </div>

          {/* Community */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 mb-6 rounded-2xl bg-white shadow-xl flex items-center justify-center">
              <span className="text-3xl text-red-600">👥</span>
            </div>
            <h3 className="font-semibold text-[#8b4a1f] mb-2">Community</h3>
            <p className="text-xs text-[#8b4a1f]/70 max-w-[220px]">
              We strive for perfection in every stitch, every sale and every
              customer interaction.
            </p>
          </div>
        </div>
      </div>

      {/* Quote Banner */}
      <div className="w-full bg-gradient-to-r from-orange-600 via-orange-500 to-red-500 py-20 text-center text-white">
        <div className="max-w-4xl mx-auto px-6">
          <span className="block text-4xl mb-6">❝</span>
          <h3 className="text-2xl md:text-3xl font-medium leading-relaxed mb-4">
            Fashion is the amor to survive the reality of everyday life
          </h3>
          <p className="text-sm opacity-90">— Mummy ISRAEL</p>
        </div>
      </div>

      {/* Connect Section */}
      <div className="px-6 md:px-20 py-24">
        <div className="max-w-5xl mx-auto rounded-3xl border bg-[#faf7f5] p-10 md:p-14 text-center">
          <h3 className="text-2xl md:text-3xl font-semibold text-[#8b4a1f] mb-2">
            Let’s Connect
          </h3>
          <p className="text-sm text-[#8b4a1f]/80 mb-8">
            Want to know more about our brand or make sales contact us
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 rounded-full bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition">
              Send an Email
            </button>
            <button className="px-8 py-3 rounded-full border border-red-600 text-red-600 text-sm font-medium hover:bg-red-50 transition">
              Schedule a meeting
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurvisionMain