import React from 'react';

const MiniCard = ({ img, bg, title, description }) => {
  return (
    /* 1. We wrap the component in a fixed-height box. 
         This leaves empty spatial headroom above it so the out-of-bounds image doesn't get clipped.
    */
    <div className="relative h-28 w-72 flex items-end group cursor-pointer mt-12">
      
      {/* 2. THE BACKGROUND CAPSULE CARD CONTAINER */}
      <div
        style={{ backgroundColor: bg }}
        className="w-full h-20 p-4 rounded-full flex flex-row items-center justify-between gap-4 shadow-sm transition-all duration-300 ease-out group-hover:shadow-md group-hover:scale-[1.02]"
      >
        {/* TEXT REGION CONTAINER */}
        <div className="flex flex-col text-left pl-4 max-w-[60%] select-none">
          <h3 className="font-bold text-sm md:text-base text-gray-900 tracking-tight leading-tight">
            {title}
          </h3>
          
          {/* THE HOVER EFFECT TRICK:
              By default, we show the description. On card hover, we slide the description out 
              and smoothly reveal the glowing "Click Now" pill button! */}
          <div className="relative h-4 mt-0.5 overflow-hidden">
            <p className="text-[11px] text-gray-700 font-medium transition-all duration-300 transform group-hover:-translate-y-5">
              {description}
            </p>
            <span className="absolute inset-0 text-[10px] font-extrabold uppercase tracking-wider text-red-500 bg-white px-2.5 py-0.5 rounded-full w-fit shadow-xs transition-all duration-300 transform translate-y-5 group-hover:translate-y-0">
              Click Now
            </span>
          </div>
        </div>

        {/* EMPTY BLOCK STRUT - Holds structural layout grids clear for the absolute image overlay */}
        <div className="w-20 h-20 shrink-0" />
      </div>

      {/* 3. THE POP-OUT FLOATING IMAGE GRAPHIC */}
      <div className="absolute bottom-0 right-4 w-24 h-32 pointer-events-none overflow-visible">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-contain object-bottom transition-all duration-300 ease-out transform origin-bottom scale-100 group-hover:scale-110 group-hover:-translate-y-1 drop-shadow-md"
        />
      </div>

    </div>
  );
};

export default MiniCard;