import React, { useState } from 'react';
import Sidebar from '../../../components/admin/side-bar/Sidebar';
import { Outlet } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';

const Dashboard = () => {
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <div className="reelative flex flex-row w-[90%] h-screen">
      {mobileNav ? (
        <div
          className={`h-full ${mobileNav ? 'absolute md:relative w-[90%] md:w-[25%]' : 'hidden'} `}
        >
          <Sidebar onclick={() => setMobileNav(false)} />
        </div>
      ) : (
        <div className='py-4 md:py-6 px-2'>
        <div className=" h-6 flex text-lg md:text-xl cursor-pointer ">
          <GiHamburgerMenu  onClick={() => setMobileNav(true)} />
        </div>
        </div>
      )}

      <div className="md:flex flex-col gap-5 md:w-[80%] w-full p-2 md:p-4">
        <div className="">
          <h1 className="font-medium text-2xl md:text-4xl font-sans">
            Dashboard
          </h1>
          <p className="font-light text-xs md:font-sm">Welcome admin </p>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
