import React, { useState } from 'react';
import Sidebar from '../../../components/admin/side-bar/Sidebar';
import { Outlet } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <div className="relative flex flex-col w-full h-full md:p-0">
      <div
        className={`w-full h-auto flex border-b border-gray-500 z-10 bg-white/10 p-2 gap-2`}
      >
        {mobileNav ? (
          <motion.div
            className="fixed inset-0 z-50 w-[80%] md:w-[20%] "
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            onMouseLeave={() => setMobileNav(false)}
          >
            <Sidebar onclick={() => setMobileNav(false)}/>
          </motion.div>
        ) : (
          <div
            className="p-2 cursor-pointer"
            onClick={() => setMobileNav(true)}
            onMouseOver={() => setMobileNav(true)}
          >
            <GiHamburgerMenu size={20} />
          </div>
        )}

        <div className={`inset-0 pb-2 flex flex-col md:gap-2 gap-1`}>
          <h1 className="font-medium text-xl md:text-2xl font-sans flex flex-row items-center gap-2">
            <span className="bg-linear-to-l from-orange-400 to-red-500 text-white p-1 text-xs rounded-full">
              M&K
            </span>
            M&K Clothing
          </h1>
          <p className="font-light text-xs md:font-sm ">
            Dashboard
            <span className="bg-blue-100 rounded-full py-0.2 px-2 ml-1 text-black">
              admin
            </span>
          </p>
        </div>
      </div>

      <div className={`relative h-full p-2`}>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
