import React, { useState } from 'react';
import NavbarBtn from './NavbarBtn';
import NavbarLinks from './NavbarLinks';
import NavbarLogo from './NavbarLogo';
import { GiHamburgerMenu } from 'react-icons/gi';

const NavbarMain = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <NavbarLogo />

        {/* Center Links (Desktop) */}
        <div className="hidden lg:flex flex-1 justify-center">
          <NavbarLinks />
        </div>

        {/* Button & Toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <NavbarBtn />
          </div>
          <button
            onClick={toggleMenu}
            className="lg:hidden text-2xl text-gray-700"
          >
            <GiHamburgerMenu />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t py-4">
          <NavbarLinks isMobile />
          <div className="mt-4 flex justify-center sm:hidden">
            <NavbarBtn />
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarMain;
