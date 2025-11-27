import React, { useState } from 'react'
import NavbarBtn from "./NavbarBtn";
import NavbarLinks from "./NavbarLinks";
import NavbarLogo from "./NavbarLogo";
import { GiHamburgerMenu } from "react-icons/gi";


const NavbarMain = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const toggleMenu = () => setMenuOpen (!menuOpen)
  return (
    <nav>
      <div>
        <NavbarLogo/>
      </div>
      <div>
        <NavbarLinks/>
      </div>
      <div>
        <NavbarBtn/>
        <div className="">
            <button onClick={toggleMenu} className="">
              <GiHamburgerMenu />
            </button>
          </div>
        
      </div>
       {menuOpen && (
        <div className="lg:hidden sm:block mt-2">
          <NavbarLinks isMobile />
        </div>
      )}
    </nav>
  )
}

export default NavbarMain
