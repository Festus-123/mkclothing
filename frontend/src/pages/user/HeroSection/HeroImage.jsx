import React from 'react';

const HeroImage = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <img
        src="/assets/unsplash_r9tbGERTUP0.png"
        alt="Hero"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default HeroImage;
