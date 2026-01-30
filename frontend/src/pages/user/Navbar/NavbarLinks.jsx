import React from 'react';
import { Link } from 'react-router-dom';

const links = [
  { link: 'Home', section: '' },
  { link: 'Collection', section: 'collection' },
  { link: 'About', section: 'about' },
  { link: 'Contact', section: 'contact' },
];

const NavbarLinks = ({ isMobile = false }) => {
  return (
    <ul
      className={`flex gap-6 text-sm text-gray-700 ${
        isMobile ? 'flex-col items-center space-y-4' : 'items-center'
      }`}
    >
      {links.map((item) => (
        <li key={item.section}>
          <Link
            to={`/${item.section}`}
            smooth={true}
            spy={true}
            duration={500}
            offset={-100}
            activeClass="after:w-full"
            className="cursor-pointer hover:bg-[#80808012] relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-orange-500 after:transition-all py-1 px-4"
            aria-current="page"
          >
            {item.link}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavbarLinks;
