import React from 'react';
// import { FaMenu } from "react-icons/fa"
import { GiHamburgerMenu, GiBookPile, GiFlatPlatform } from 'react-icons/gi';

import { useNavigate } from 'react-router-dom';

const Sidebar = ({ onclick }) => {
  const navigate = useNavigate();

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
            onClick={() => navigate('')}
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
      </div>
    </div>
  );
};

export default Sidebar;
