import React from 'react';
import HeroGradient from './HeroGradient';
import HeroText from './HeroText';
import HeroImage from './HeroImage';

const HeroMain = () => {
  return (
    <section className="relative h-screen flex items-center w-full">
      <HeroImage />
      <HeroGradient />

      <div className="max-w-7xl mx-auto">
        <HeroText />
      </div>
    </section>
  );
};

export default HeroMain;
