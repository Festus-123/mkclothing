import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaRemoveFormat, FaSearch } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { IoArrowDown, IoClose } from 'react-icons/io5';
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
    { link: 'shop', section: '/shop' },
    { link: 'Contact', section: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0  w-full z-50 flex items-center justify-center p-4 bg-white ">
      <div
        className='w-full max-w-7xl mx-auto flex items-center justify-between'>

      {/* The logo */}
      <Logo />

      {/* Search bar for items and categories */}
      {!isSearch && (
        <div className="">
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

      {isSearch && <SearchModal onClose={() => setIsSearch(false)} />}

      {/* the links for desktop */}
      <div
        onMouseLeave={() => setActiveMenu(null)}
        className="hidden md:flex items-center gap-6 p-3"
      >
        {links.map((item, index) => (
          <Link
            key={index}
            to={item.section}
            onMouseEnter={ item.link === "shop" ? () => setActiveMenu('shop') : () => setActiveMenu(null)}
            className="text-gray-600 hover:text-gray-900 transition "
          >
            {item.link}{' '}
            {item.link === 'shop' && <select name="" id=""></select>}
          </Link>
        ))}

        {activeMenu && (
          <MegaMenu
            menu={shopData[activeMenu]}
          />
        )}
      </div>

      {/* Links for mobile */}
      {menuOpen && (
        <div className="absolute bg-white md:hidden border-t border-gray-300 top-full left-0 w-full p-4 flex flex-col items-end gap-10">
          {links.map((item, index) => (
            <Link
              key={index}
              to={item.section}
              className="text-gray-600 hover:text-gray-900 transition"
            >
              {item.link}
            </Link>
          ))}
        </div>
      )}

      {/* the call to action button */}
      <div className="flex items-center gap-4">
        <div className="hidden sm:block">
          <a href="#">
            <button className="bg-orange-500 text-white text-sm px-4 py-2 rounded-full hover:bg-orange-600 transition">
              Shop Now
            </button>
          </a>
        </div>

        <button onClick={() => setIsSearch(true)} className="md:hidden text-xl">
          <FiSearch />
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
