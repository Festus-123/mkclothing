import React from 'react';
import { Link } from 'react-scroll';

const links = [
  { link: 'Home', section: 'home' },
  { link: 'Collections', section: 'collections' },
  { link: 'About', section: 'about' },
  { link: 'Contact', section: 'contact' },
];

const NavbarLinks = () => {
  return (
    <ul>
      {links.map((link, index) => (
        <li className="" key={index}>
          <Link
            className=""
            to={link.section}
            smooth={true}
            spy={true}
            duration={500}
            offset={-130}
          >
            {link.link}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavbarLinks;
