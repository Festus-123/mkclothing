import React from 'react';
import { IMAGES } from '../../../assets/images-list';

const About = () => {
  return (
    <section className="py-16 md:py-24 border-t border-gray-200 bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 ">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="relative">
            <img
              src={IMAGES.jacket3}
              alt="Premium Fashion"
              className="w-full h-125 object-cover rounded-3xl shadow-2xl "
            />

            <div
              className="absolute -bottom-6 -right-1  md:-right-6 bg-orange-500 text-white px-6 py-4 rounded-2xl shadow-xl "
            >
              <h3 className="text-2xl font-bold">100%</h3>
              <p className="text-sm">Premium Quality</p>
            </div>
          </div>

          {/* Text Section */}
          <div>
            <p className="uppercase tracking-[0.3em] text-orange-500 text-sm font-semibold mb-4">
              About M&amp;K
            </p>

            <h2
              className=" text-4xl md:text-6xl font-bold leading-tight mb-8 "
            >
              Look & Feel
              <span className="italic text-orange-500"> Premium</span>
            </h2>

            <p
              className="text-gray-600 text-lg leading-relaxed mb-6 "
            >
              Crafted for individuals who embrace distinction, M&amp;K combines
              refined tailoring, premium fabrics, and contemporary design to
              create pieces that command attention without saying a word.
            </p>

            <p
              className="text-gray-600 text-lg leading-relaxed "
            >
              Every collection is designed to elevate confidence, celebrate
              individuality, and deliver a timeless sense of elegance for every
              occasion.
            </p>

            <button
              className="mt-8 bg-black text-white hover:bg-whitehover:text-black cursor-pointer px-8 py-4 hover:scale-105 transition "
            >
              Explore Collection
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
