import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FiSearch } from 'react-icons/fi';
import { FaSearch } from 'react-icons/fa';
import { IoClose, IoPerson } from 'react-icons/io5';
import { motion, AnimatePresence } from "motion/react";
// import { pathname } from "react-router-dom";

import Logo from '../logo/Logo';
import SearchModal from '../search-modal/SearchModal';
import { shopData } from '../../../data/shop';
import MegaMenu from './mega-menu/MegaMenu';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const [isSearch, setIsSearch] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const links = [
    { link: 'Home', section: '/' },
    { link: 'Collections', section: '/collections' },
    { link: 'shop', section: '' },
    { link: 'Contact', section: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0  w-full z-50 flex items-center justify-center p-4 bg-white ">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        {/* The logo */}
        <Logo />

        {/* Search bar for items and categories */}
        {!isSearch && (
          <div onClick={() => setIsSearch(true)} className="">
            <div className="relative hidden md:block max-w-2xl">
              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

              <input
                type="text"
                placeholder="Search jackets, cargo pants, tops..."
                className="w-full rounded-full border border-gray-300 bg-white py-4 pl-14 pr-6 text-sm outline-none transition focus:border-orange-500"
              />
            </div>
          </div>
        )}

        <AnimatePresence>
          {isSearch && (
            <motion.div
              className="fixed inset-0 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isSearch && <SearchModal onClose={() => setIsSearch(false)} />}
            </motion.div>
          )}
        </AnimatePresence>

        {/* the links for desktop */}
        <div
          onMouseLeave={() => setActiveMenu(null)}
          className="hidden md:flex items-center gap-6 p-3"
        >
          {links.map((item, index) => (
            <Link
              key={index}
              to={item.section}
              onMouseEnter={
                item.link === 'shop'
                  ? () => setActiveMenu('shop')
                  : () => setActiveMenu(null)
              }
              className="text-gray-600 hover:text-gray-900 transition "
            >
              {item.link}{' '}
              {item.link === 'shop' && <select name="" id=""></select>}
            </Link>
          ))}

          {activeMenu && <MegaMenu menu={shopData[activeMenu]} />}
        </div>

        {/* Links for mobile */}
        {menuOpen && (
          <div className="md:hidden absolute bg-white border-t border-gray-300 top-full left-0 w-full p-4 flex flex-col items-start gap-4">
            {links.map((item, index) => (
              <Link
                key={index}
                to={item.section}
                className="w-full border border-gray-300 p-4 rounded-2xl text-gray-600 hover:text-gray-900 transition"
              >
                {item.link}
              </Link>
            ))}
          </div>
        )}

        {/* the call to action button */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSearch(true)}
            className="md:hidden text-xl"
          >
            <FiSearch />
          </button>

          <button className="hidden lg:block">
            <Link
              to="/collections"
              className="bg-orange-500 text-white text-sm px-4 py-2 rounded-full hover:bg-orange-600 transition"
            >
              Shop Now
            </Link>
          </button>

          <button className="border border-gray-300 text-gray-600 rounded-full p-2 cursor-pointer hover:scale-105">
            <IoPerson />
          </button>

          <button
            onClick={toggleMenu}
            className="md:hidden text-2xl text-gray-500 cursor-pointer"
          >
            {menuOpen ? <IoClose className="" /> : <GiHamburgerMenu />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
