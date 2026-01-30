import React, { useState } from 'react';
import Sidebar from '../../../components/admin/side-bar/Sidebar';
import { Outlet } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';

const Dashboard = () => {
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <div className="reelative flex flex-col w-full h-screen md:p-0">
      <div
        className={`flex flex-row gap-0 w-full border-b border-[#80808040] ${!mobileNav && 'sticky'}`}
      >
        {mobileNav ? (
          <div
            className={`h-full  ${mobileNav ? 'absolute md:fixed w-[90%] md:w-[20%]' : 'hidden'} `}
          >
            <Sidebar onclick={() => setMobileNav(false)} />
          </div>
        ) : (
          <div className="m-3 absolute right-0 md:relative">
            <div className=" h-auto p-2 flex text-lg md:text-xl cursor-pointer hover:bg-[#80808031] rounded-full">
              <GiHamburgerMenu onClick={() => setMobileNav(true)} />
            </div>
          </div>
        )}

        <div
          className={`m-2 inset-0 pb-2 flex flex-col md:gap-2 gap-1 ${mobileNav && 'md:ml-[21%]'}`}
        >
          <h1 className="font-medium text-xl md:text-2xl font-sans flex flex-row items-center gap-2">
            <span className='bg-linear-to-l from-orange-400 to-red-500 text-white p-1 text-xs rounded-full'>M&K</span>
            M&K Clothing
          </h1>
          <p className="font-light text-xs md:font-sm ">
            Dashboard
            <span className="bg-blue-100 rounded-full py-0.2 px-2 mr-5">
              admin
            </span>
          </p>
        </div>
      </div>

      <div className={`h-full ${mobileNav && 'md:ml-[21%]'}`}>
        <Outlet />
      </div>

      <div className={`w-full p-4 flex flex-col items-center justify-center bg-linear-to-b from-orange-400 to-red-600 text-white ${mobileNav && "md:ml-[20%] md:w-[80%]"}`}>
        <p className='font-light text-xs md:text-lg'>Admin use only! ensure that admin privileges are kept secured</p>
      </div>
    </div>
  );
};

export default Dashboard;
