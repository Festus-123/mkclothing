import React from 'react';
import AboutGradient from './AboutGradient';
import AboutText from './AboutText';
import AboutImage from './AboutImage';

const AboutMain = () => {
  return (
    <section className="relative w-full min-h-[500px] px-6 md:px-16 py-16 flex items-center justify-center">
      <AboutGradient />

      <div className="relative z-10 grid md:grid-cols-2 gap-10 w-full max-w-7xl">
        <AboutText />
        <AboutImage />
      </div>
    </section>
  );
};

export default AboutMain;
