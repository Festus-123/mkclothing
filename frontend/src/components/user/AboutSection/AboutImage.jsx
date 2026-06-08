import React from 'react';

const AboutImage = () => {
  return (
    <div className="relative flex items-center justify-center">
      {/* frame */}
      <div className="relative w-full h-[320px] md:h-[380px] rounded-[3rem] border-2 border-white/80 overflow-hidden">
        {/* empty image */}
        <img src="" alt="CEO" className="w-full h-full object-cover" />
      </div>

      {/* dots */}
      <div className="absolute bottom-6 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-white/50" />
        <span className="h-2 w-6 rounded-full bg-white" />
        <span className="h-2 w-2 rounded-full bg-white/50" />
        <span className="h-2 w-2 rounded-full bg-white/50" />
        <span className="h-2 w-2 rounded-full bg-white/50" />
      </div>
    </div>
  );
};

export default AboutImage;
