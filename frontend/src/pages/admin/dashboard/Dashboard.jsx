
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FiBell } from 'react-icons/fi';

import Sidebar from '../../../components/admin/side-bar/Sidebar';

const Dashboard = () => {
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">
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

      <main className="flex flex-col  flex-1 lg:ml-72 min-h-screen overflow-hidden">
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
              {/* <button className="relative p-3 rounded-xl hover:bg-gray-100 transition">
                <FiBell size={20} />

                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500" />
              </button> */}

              <div className="hidden sm:flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-2">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center font-bold">
                  A
                </div>

                <div>
                  <p className="text-sm font-semibold">Administrator</p>

                  <p className="text-xs text-gray-500">Admin Account</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page */}

        <section className="p-5 md:p-8 flex-1 overflow-hidden ">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
