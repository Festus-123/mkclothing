import React from 'react';

const HeroText = () => {
  return (
    <div className="max-w-xl text-white">
      <span className="inline-block mb-4 text-xs px-3 py-1 border border-orange-500 text-orange-500 rounded-full">
        New Collection 2025
      </span>

      <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
        Where <span className="text-orange-500">Elegance</span>
        <br />
        Meets Styles
      </h1>

      <p className="mt-4 text-sm text-gray-200">
        Style is a part of our daily living. What we wear speaks volumes about
        us. We offer styles that blend elegance and innovation, designed to fit
        every occasion.
      </p>

      <div className="mt-6 flex gap-4">
        <button className="bg-orange-500 text-white text-sm px-6 py-2 rounded-md hover:bg-orange-600 transition">
          Collections
        </button>
        <button className="border border-orange-500 text-orange-500 text-sm px-6 py-2 rounded-md hover:bg-orange-500 hover:text-white transition">
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default HeroText;
