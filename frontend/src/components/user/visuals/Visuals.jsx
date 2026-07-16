import React from 'react';
import { IMAGES } from '../../../assets/images-list';

const Visuals = () => {
  const visuals = [
    IMAGES.cargo_pants2,
    IMAGES.stylish,
    IMAGES.sport_outfit,
    IMAGES.top2,
  ];

  return (
    <section className="">
      <div className="w-full border-t border-gray-200">

        {/* Heading */}
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
            Editorial Gallery
          </p>

          <h2 className="max-w-3xl text-4xl font-light leading-tight md:text-6xl">
            Fashion is more than clothing—
            <span className="italic font-semibold text-orange-500">
              {" "}it's visual storytelling.
            </span>
          </h2>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-500">
            Every collection is thoughtfully designed to express confidence,
            individuality, and timeless elegance. Discover pieces that leave
            an impression from every angle.
          </p>

        </div>

        {/* Gallery */}
        <div className="flex overflow-x-auto pb-6 scrollbar-hide max-w-12xl">

          {visuals.map((item, index) => (
            <div
              key={index}
              className="min-w-70 shrink-0 overflow-hidden md:min-w-95"
            >
              <img
                src={item}
                alt={`Editorial ${index + 1}`}
                className="h-125 w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Visuals;