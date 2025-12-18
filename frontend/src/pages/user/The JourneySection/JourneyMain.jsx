import React from 'react';
import JourneyText1 from './JourneyText1';
import JourneyQoute from './JourneyQoute';
import JourneyText2 from './JourneyText2';

const JourneyMain = () => {
  return (
    <section className="w-full bg-[#faf7f5] px-6 md:px-20 py-20 text-center">
      <h2 className="text-3xl md:text-4xl font-semibold text-[#8b4a1f] mb-6">
        The Journey
      </h2>

      <JourneyText1 />
      <JourneyQoute />
      <JourneyText2 />
    </section>
  );
};

export default JourneyMain;
