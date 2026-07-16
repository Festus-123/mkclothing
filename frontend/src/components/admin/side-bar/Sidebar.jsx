// import React from 'react';
// import { FiPackage, FiBell, FiPlusCircle, FiSettings, FiMenu, FiFileText  } from 'react-icons/fi';
// import { FaSignOutAlt } from "react-icons/fa";
// import { supabase } from '../../../supabse/supabaseClient';
// import { Link, useNavigate } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';
// import { toast } from 'sonner';

// const Sidebar = ({ onclick }) => {
//   const location = useLocation();
//   const navigate = useNavigate();



//   const handleLogout = async () => {
//     toast.success('Logged out successfully');
//     // function to logout the user
//     console.log('logging out');
//     await supabase.auth.signOut();
//     navigate('/signin');
//   };

//   const Links = [
//     {
//       name: 'Products', icon: <FiPackage />, link: '/dashboard', state: null
//     },
//     {
//       name: 'Add Products', icon: <FiPlusCircle />, link: '/dashboard/add-product', state: { backgroundLocation: location }
//     },
//     {
//       name: 'Logs', icon: <FiFileText />, link: '/dashboard/records', state: null
//     },
//     {
//       name: "Annoucemnets", icon: <FiBell />, link: '/dashboard/announcements', state: null
//     },
//     {
//       name: 'Orders', icon: <FiPackage />, link: '/dashboard/orders', state: null
//     },
//     {
//       name: 'Settings', icon: <FiSettings />, link: '/dashboard/settings', state: null
//     },
//   ];

//   return (
//     <div className="relative h-full bg-white">
//       <div className="absolute inset-0 bg-linear-to-b from-[darkred]/10 via-[white]/10 to-[white]/10 backdrop-blur-sm" />

//       {/* Nav links  */}
//       <div className="relative p-4 h-full flex flex-col gap-10">
//         <div className="flex flex-row items-center justify-between">
//           <h1 className="text-xl md:text-lg">Mk Clothing</h1>
//           <div className="cursor-pointer bg-[#a5888811] hover:bg-[#917e7e15] rounded-full p-2">
//             <FiMenu onClick={onclick} />
//           </div>
//         </div>

//         {/* Nav Links  */}
//         <div className="flex flex-col justify-between h-[88%]">
//         <div className="flex flex-col gap-3">
//           {Links.map((item, key) => (
//             <Link
//               to={item.link}
//               key={key}
//               state={item.state}
//               className={`flex flex-row items-center gap-2 text-lg font-light cursor-pointer ${
//                 location.pathname === item.link && 'bg-[#986b6b11] hover:bg-[#986b6b1e] text-amber-900'
//               }`}
//             >
//               {item.icon}
//               <h1>{item.name}</h1>
//             </Link>
//           ))}
//         </div>

//         {/* Logout  */}
//           <div
//             className="px-3 flex flex-row items-center gap-5 text-sm md:text-lg font-light hover:bg-[#986b6b11] cursor-pointer "
//             onClick={handleLogout}
//           >
//             <FaSignOutAlt size={20} />
//             <h1>Log Out</h1>
//           </div>
//         </div>
        

//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React from 'react';
import {
  FiPackage,
  FiBell,
  FiPlusCircle,
  FiSettings,
  FiMenu,
  FiFileText,
  FiBox,
} from 'react-icons/fi';
import { FaSignOutAlt } from 'react-icons/fa';
import { supabase } from '../../../supabse/supabaseClient';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import Logo from '../logo/Logo';

const Sidebar = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    toast.success('Logged out successfully');

    await supabase.auth.signOut();

    navigate('/signin');
  };

  const navigation = [
    {
      title: 'Inventory',
      links: [
        {
          name: 'Products',
          icon: <FiPackage size={18} />,
          path: '/dashboard',
        },
        {
          name: 'Add Product',
          icon: <FiPlusCircle size={18} />,
          path: '/dashboard/add-product',
          state: {
            backgroundLocation: location,
          },
        },
        {
          name: 'Orders',
          icon: <FiBox size={18} />,
          path: '/dashboard/orders',
        },
      ],
    },

    {
      title: 'Management',
      links: [
        {
          name: 'Logs',
          icon: <FiFileText size={18} />,
          path: '/dashboard/records',
        },
        {
          name: 'Announcements',
          icon: <FiBell size={18} />,
          path: '/dashboard/announcements',
        },
        {
          name: 'Settings',
          icon: <FiSettings size={18} />,
          path: '/dashboard/settings',
        },
      ],
    },
  ];

  return (
    <aside className="h-full w-full bg-white border-r border-gray-200 shadow-xl flex flex-col">

      {/* Header */}

      <div className="flex items-center justify-between px-6 py-6 border-b border-gray-200">

        <div className="flex items-center gap-3">

          <Logo />

          <div>
            <h2 className="font-bold text-gray-800">
              M&K Clothing
            </h2>

            <p className="text-xs text-gray-500">
              Admin Workspace
            </p>
          </div>

        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition"
          >
            <FiMenu size={20} />
          </button>
        )}

      </div>

      {/* Navigation */}

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8">

        {navigation.map((section) => (

          <div key={section.title}>

            <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold px-3 mb-3">
              {section.title}
            </p>

            <div className="space-y-2">

              {section.links.map((item) => {
                const active =
                  location.pathname === item.path;

                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    state={item.state}
                    onClick={onClose}
                    className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200

                    ${
                      active
                        ? 'bg-amber-50 text-amber-700 font-semibold shadow-sm'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }
                    `}
                  >
                    {active && (
                      <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-amber-500" />
                    )}

                    {item.icon}

                    <span>{item.name}</span>
                  </Link>
                );
              })}

            </div>

          </div>
        ))}

      </div>

      {/* Footer */}

      <div className="border-t border-gray-200 p-4">

        <div className="flex items-center gap-3 mb-4">

          <div className="w-11 h-11 rounded-full bg-linear-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white font-semibold">
            A
          </div>

          <div>
            <h3 className="font-medium text-gray-800">
              Administrator
            </h3>

            <p className="text-xs text-gray-500">
              M&K Dashboard
            </p>
          </div>

        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 rounded-xl border border-red-200 py-3 text-red-600 hover:bg-red-50 transition"
        >
          <FaSignOutAlt />

          Logout
        </button>

      </div>

    </aside>
  );
};

export default Sidebar;