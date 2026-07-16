// import React, { useState } from 'react';
// import Sidebar from '../../../components/admin/side-bar/Sidebar';
// import { Outlet } from 'react-router-dom';
// import { GiHamburgerMenu } from 'react-icons/gi';
// // eslint-disable-next-line no-unused-vars
// import { motion } from 'framer-motion';

// const Dashboard = () => {
//   const [mobileNav, setMobileNav] = useState(false);

//   return (
//     <div className="relative flex flex-col w-full h-full md:p-0">
//       <div
//         className={`sticky top-0 z-40 bg-white w-full h-auto flex border-b border-gray-200 b p-2 gap-2`}
//       >
//         {mobileNav ? (
//           <motion.div
//             className="fixed inset-0 z-50 w-[80%] sm:w-[60%] md:w-[40%] lg:w-[20%]"
//             initial={{ x: '-100%' }}
//             animate={{ x: 0 }}
//             transition={{ duration: 0.3, ease: 'easeInOut' }}
//             onMouseLeave={() => setMobileNav(false)}
//           >
//             <Sidebar onclick={() => setMobileNav(false)}/>
//           </motion.div>
//         ) : (
//           <div
//             className={`p-2 cursor-pointer text-gray-500`}
//             onClick={() => setMobileNav(true)}
//             onMouseOver={() => setMobileNav(true)}
//           >
//             <GiHamburgerMenu size={20} />
//           </div>
//         )}

//         <div className={`inset-0 pb-2 flex flex-col md:gap-2 gap-1`}>
//           <h1 className="font-medium text-xl md:text-2xl font-sans flex flex-row items-center gap-2">
//             <span className="bg-linear-to-l from-orange-400 to-red-500 text-white p-1 text-xs rounded-full">
//               M&K
//             </span>
//             M&K Clothing
//           </h1>
//           <p className="font-light text-xs md:font-sm ">
//             Dashboard
//             <span className="bg-blue-100 rounded-full py-0.2 px-2 ml-1 text-black">
//               admin
//             </span>
//           </p>
//         </div>
//       </div>

//       <div className={`relative h-full`}>
//          <Outlet />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FiBell } from 'react-icons/fi';

import Sidebar from '../../../components/admin/side-bar/Sidebar';

const Dashboard = () => {
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* ================= Desktop Sidebar ================= */}

      <aside className="hidden lg:flex w-72 fixed left-0 top-0 bottom-0 z-40">
        <Sidebar />
      </aside>

      {/* ================= Mobile Sidebar ================= */}

      <AnimatePresence>
        {mobileNav && (
          <>
            {/* Backdrop */}

            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileNav(false)}
            />

            {/* Drawer */}

            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.25 }}
              className="fixed top-0 left-0 h-full w-[82%] sm:w-[65%] md:w-[45%] bg-white z-50 shadow-2xl lg:hidden"
            >
              <Sidebar onClose={() => setMobileNav(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ================= Main Content ================= */}

      <main className="flex-1 lg:ml-72">

        {/* Header */}

        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-5 md:px-8 py-5">

          <div className="flex items-center justify-between">

            {/* Left */}

            <div className="flex items-center gap-4">

              <button
                onClick={() => setMobileNav(true)}
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition cursor-pointer"
              >
                <GiHamburgerMenu size={20} />
              </button>

              <div>

                <h1 className="text-2xl font-bold text-gray-800">
                  Inventory Dashboard
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                  Manage products, announcements and orders
                </p>

              </div>

            </div>

            {/* Right */}

            <div className="flex items-center gap-4">

              <button className="relative p-3 rounded-xl hover:bg-gray-100 transition">

                <FiBell size={20} />

                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500" />

              </button>

              <div className="hidden sm:flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-2">

                <div className="w-10 h-10 rounded-full bg-linear-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center font-bold">
                  A
                </div>

                <div>

                  <p className="text-sm font-semibold">
                    Administrator
                  </p>

                  <p className="text-xs text-gray-500">
                    Admin Account
                  </p>

                </div>

              </div>

            </div>

          </div>

        </header>

        {/* Page */}

        <section className="p-5 md:p-8">
          <Outlet />
        </section>

      </main>

    </div>
  );
};

export default Dashboard;