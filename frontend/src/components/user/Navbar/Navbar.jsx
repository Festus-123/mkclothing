import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaRemoveFormat } from 'react-icons/fa';
// import { pathname } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const links = [
    { link: 'Home', section: '/' },
    { link: 'Collection', section: '/collection' },
    { link: 'About', section: '/about' },
    { link: 'Contact', section: '/contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 flex items-center justify-between p-4 bg-white ">
      {/* The logo */}
      <div className="flex items-center gap-2">
        {/* Image or badge */}
        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">
          M&K
        </div>
        <p className="text-sm font-semibold text-gray-800">M&K</p>
      </div>

      {/* the links for desktop */}
      <div className="hidden md:flex items-center gap-6">
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
        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl text-gray-700 cursor-pointer"
        >
          { menuOpen ? <FaRemoveFormat /> : <GiHamburgerMenu /> }
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
