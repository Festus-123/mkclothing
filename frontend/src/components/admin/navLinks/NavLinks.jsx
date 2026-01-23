import React from "react";
// import styles from "./NavLinks.module.css";
import { NavLink } from "react-router-dom";

const NavLinks = ({ to, label, icon: Icon, }) => {
  return (
    <NavLink
      to={to}
      end
      className="flex flex-row gap-2 items-center hover:bg-[#80808020] py-1"
    >
      <span className="text-xl">{Icon}</span>
      <span className="text-lg">{label}</span>
    </NavLink>
  );
};

export default NavLinks;
