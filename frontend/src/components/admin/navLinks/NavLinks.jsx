import React from "react";
import styles from "./NavLinks.module.css";
import { NavLink } from "react-router-dom";

const NavLinks = ({ to, label, icon: Icon, }) => {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        isActive || to == '/dashboard/products/add' ? `${styles.navLink} ${styles.active}` : styles.navLink
      }
    >
      <span className={styles.text}>{label}</span>
      <span className={styles.icon}>{Icon}</span>
    </NavLink>
  );
};

export default NavLinks;
