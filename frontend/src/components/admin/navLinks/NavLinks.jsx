import React from "react";
// import styles from "./NavLinks.module.css";
import { NavLink } from "react-router-dom";

const NavLinks = ({ to, label, icon: Icon, }) => {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        isActive || to == '/dashboard/products/add' ?  "" : ""
      }
    >
      <span className="">{label}</span>
      <span className="">{Icon}</span>"
    </NavLink>
  );
};

export default NavLinks;
