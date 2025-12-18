import React from 'react';

const JourneyQoute = () => {
  return (
    <div className="relative max-w-4xl mx-auto bg-white/70 rounded-2xl p-8 md:p-12 mb-10">
      {/* red accent line */}
      <div className="absolute left-0 top-0 h-full w-1 bg-red-600 rounded-l-2xl" />

      <div className="text-left">
        <span className="text-4xl text-red-600 font-bold">❝</span>
        <p className="italic text-sm md:text-base text-[#8b4a1f] mt-4 mb-4">
          I believe clothing is more than just fabric; I believe it brings about
          the primary reasons of man sins against Christ.
        </p>
        <p className="font-semibold text-sm text-red-600">— Mummy ISRAEL</p>
      </div>
    </div>
  );
};

export default JourneyQoute;
