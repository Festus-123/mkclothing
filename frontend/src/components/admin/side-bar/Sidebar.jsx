import React from 'react';
import { FiPackage, FiBell, FiPlusCircle, FiSettings, FiMenu, FiFileText  } from 'react-icons/fi';
import { FaSignOutAlt } from "react-icons/fa";
import { supabase } from '../../../supabse/supabaseClient';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';

const Sidebar = ({ onclick }) => {
  const location = useLocation();
  const navigate = useNavigate();



  const handleLogout = async () => {
    toast.success('Logged out successfully');
    // function to logout the user
    console.log('logging out');
    await supabase.auth.signOut();
    navigate('/signin');
  };

  const Links = [
    {
      name: 'Products', icon: <FiPackage />, link: '/dashboard', state: ""
    },
    {
      name: 'Add Products', icon: <FiPlusCircle />, link: 'add-product', state: { backgroundLocation: location }
    },
    {
      name: 'Logs', icon: <FiFileText />, link: '/dashboard/records', state: ""
    },
    {
      name: "Annoucemnets", icon: <FiBell />, link: '/dashboard/announcements', state: ""
    },
    {
      name: 'Settings', icon: <FiSettings />, link: '/dashboard/settings', state: ""
    },
  ];

  return (
    <div className="relative h-full bg-white">
      <div className="absolute inset-0 bg-linear-to-b from-[darkred]/10 via-[white]/10 to-[white]/10 backdrop-blur-sm" />

      {/* Nav links  */}
      <div className="relative p-4 h-full flex flex-col gap-10">
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-xl md:text-lg">Mk Clothing</h1>
          <div className="cursor-pointer bg-[#a5888811] hover:bg-[#917e7e15] rounded-full p-2">
            <FiMenu onClick={onclick} />
          </div>
        </div>

        {/* Nav Links  */}
        <div className="flex flex-col justify-between h-[88%]">
        <div className="flex flex-col gap-3">
          {Links.map((item, key) => (
            <Link
              to={item.link}
              key={key}
              state={item.state}
              className={`flex flex-row items-center gap-2 text-lg font-light cursor-pointer ${
                location.pathname === item.link && 'bg-[#986b6b11] hover:bg-[#986b6b1e] text-amber-900'
              }`}
            >
              {item.icon}
              <h1>{item.name}</h1>
            </Link>
          ))}
        </div>

        {/* Logout  */}
          <div
            className="px-3 flex flex-row items-center gap-5 text-sm md:text-lg font-light hover:bg-[#986b6b11] cursor-pointer "
            onClick={handleLogout}
          >
            <FaSignOutAlt size={20} />
            <h1>Log Out</h1>
          </div>
        </div>
        

      </div>
    </div>
  );
};

export default Sidebar;
