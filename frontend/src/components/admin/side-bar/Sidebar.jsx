import React, { useState } from 'react';
// import { FaMenu } from "react-icons/fa"
import { GiHamburgerMenu, GiBookPile, GiFlatPlatform, GiFloatingGhost, GiSettingsKnobs } from 'react-icons/gi';

import { useNavigate } from 'react-router-dom';

const Sidebar = ({ onclick }) => {
  const navigate = useNavigate();
  const [move, setMove] = useState("right")

  const handleMovement = () => {
    if(move === "right") setMove("left")
    if(move === "left") setMove("right")
  }

  return (
    <div className="relative h-full text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/sidebar-img.jpg)',
          opacity: 0.5,
        }}
      />

      <div className="absolute inset-0 bg-linear-to-b from-[darkred]/40 via-[darkred]/40 to-[darkred]/60 backdrop-blur-md" />

      {/* Nav links  */}
      <div className="relative p-4 h-full">
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-xl md:text-lg">Mk Clothing</h1>
          <div className="cursor-pointer bg-[#80808054] hover:bg-[#8080808f] rounded-full p-2">
            <GiHamburgerMenu onClick={onclick} />
          </div>
        </div>

        {/* Nav Links  */}
        <div className='w-full h-[80%] md:h-[40%] flex flex-col items-center md:items-start justify-center md:justify-baseline gap-10 md:gap-5'>
          <div
            className="flex flex-row items-center gap-5 text-xl md:text-lg font-medium md:font-light hover:md:p-2 hover:p-3 hover:bg-[#80808054] hover:w-full cursor-pointer"
            onClick={() => navigate('products')}
          >
            <GiFlatPlatform />
            <h1>Products</h1>
          </div>
          <div
            className="flex flex-row items-center gap-5 text-xl md:text-lg font-medium md:font-light hover:md:p-2 hover:p-3 hover:bg-[#80808054] hover:w-full cursor-pointer"
            onClick={() => navigate('add-product')}
          >
            <GiFlatPlatform />
            <h1>Add Products</h1>
          </div>
          <div
            className="flex flex-row items-center gap-5 text-xl md:text-lg font-medium md:font-light hover:md:p-2 hover:p-3 hover:bg-[#80808054] hover:w-full cursor-pointer"
            onClick={() => navigate('records')}
          >
            <GiBookPile />
            <h1>Records</h1>
          </div>

        </div>
        <div className='flex flex-col gap-2'>
          <div
            className="p-3 flex flex-row items-center gap-5 text-sm md:text-lg font-light md:font-light hover:md:p-3 hover:p-3 hover:bg-[#80808054] hover:w-full cursor-pointer "
            onClick={() => navigate('')}
          >
            <GiSettingsKnobs size={20}/>
            <h1>Settings</h1>
          </div>
          <div
            className="px-3 flex flex-row items-center gap-5 text-sm md:text-lg font-light md:font-light hover:w-full cursor-pointer "
            onClick={() => navigate('')}
          >
            <GiFloatingGhost size={20}/>
            <h1>Log Out</h1>
          </div>
          <div className='flex flex-row items-center gap-10 md:gap-0 md:justify-between font-light text-sm md:text-lg md:w-full p-3 cursor-pointer'>
            <p>Enable Sign uo</p>
            {/* Knob container */}
            <div 
              onClick={handleMovement}
              className='w-12 h-5 p-2 shadow-sm flex flex-col items-center justify-center bg-[#ffffff4d] backdrop-blur-xs rounded-full'>
              {/* Knob */}
              <div className={`absolute rounded-full bg-[#ffffff57] w-6 p-3 backdrop-blur-md shadow-md ${move === "right" ? "left-0" : "right-0 bg-amber-600 transition-discrete ease-out"}`}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
