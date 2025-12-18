import React, { useState } from 'react'

const EmailComp = () => {
  const [images, setImages] = useState([])

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)

    if (files.length + images.length > 5) {
      alert('You can attach at most 5 images')
      return
    }

    setImages(prev => [...prev, ...files])
  }

  return (
    <section className="w-full px-6 md:px-20 py-20">
      <div className="max-w-4xl mx-auto">
        {/* Form */}
        <div className="space-y-6">
          {/* Our Email */}
          <div className="flex items-center gap-4">
            <label className="min-w-[90px] text-sm text-[#8b4a1f]">Our Email :</label>
            <div className="flex-1 rounded-full bg-gray-200 px-6 py-3 text-sm text-gray-600">
              m&kclothing@email.com
            </div>
          </div>

          {/* Your Email */}
          <div className="flex items-center gap-4">
            <label className="min-w-[90px] text-sm text-[#8b4a1f]">Your Email :</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-full bg-gray-200 px-6 py-3 text-sm outline-none"
            />
          </div>

          {/* Description */}
          <div className="flex items-start gap-4">
            <label className="min-w-[90px] pt-3 text-sm text-[#8b4a1f]">Description :</label>
            <div className="relative flex-1">
              <textarea
                placeholder="Could we meet up later..."
                className="w-full h-48 rounded-3xl bg-gray-200 p-6 text-sm resize-none outline-none"
              />

              {/* attachment box */}
              <label className="absolute top-4 right-4 w-20 h-24 rounded-2xl bg-gray-300 flex flex-col items-center justify-center text-red-500 font-semibold cursor-pointer">
                +{5 - images.length}
                <span className="text-[10px] font-normal text-gray-600">images</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Preview */}
          {images.length > 0 && (
            <div className="flex gap-3 flex-wrap">
              {images.map((img, index) => (
                <div key={index} className="w-16 h-16 rounded-xl overflow-hidden bg-gray-200">
                  <img
                    src={URL.createObjectURL(img)}
                    alt="attachment"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Send Button */}
          <div className="pt-4">
            <button className="w-full py-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium">
              Send Message
            </button>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-20 w-full bg-gradient-to-r from-orange-500 to-red-500 py-6 text-center text-white text-sm">
        Note if you dont recieve feedback after contacting us within 24hrs please wait a little more
      </div>
    </section>
  )
}

export default EmailComp
