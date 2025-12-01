import React from 'react';
import styles from './NavBar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCollapse } from '../../../redux/slices/navbarSlice';
import { MdDashboard, MdLogout, MdAnalytics, MdMenu} from 'react-icons/md'
import {FaStore}  from 'react-icons/fa'

import NavLinks from '../NavLinks/NavLinks';

const NavBar = () => {
  const dispatch = useDispatch();
  const isCollapsed  = useSelector((state) => state.navbar.isCollapsed)
  return (
    <>
      {!isCollapsed ? (
        <aside className={styles.navBar}>
          <div className={styles.logoSection}>
            <h1 className={styles.logo}>M&K Clothing</h1>
            <div
              className={styles.toggleSection}
              onClick={() => dispatch(toggleCollapse())}
            >
              <span className={styles.toggleIcon}>{<MdMenu />}</span>
            </div>
          </div>

          <nav className={styles.linksSection}>
            <NavLinks label="Overview" to="/dashboard" icon={<MdDashboard />} />
            <NavLinks label="Analytics" to="/analytics" icon={<MdAnalytics />} />
            <NavLinks label="Products" to="/dashboard/products" icon={<FaStore />} />
          </nav>

          <div className={styles.logoutSection}>
            <NavLinks label="Logout" to="/logout" icon={<MdLogout />} />
          </div>
        </aside>
      ) : (
        /* collapsed view: simple toggle to reopen */
        <aside
          className={styles.navBarCollapsed}
          onClick={() => dispatch(toggleCollapse())}
        >
          <div className={styles.toggleSection}>
            <span className={styles.toggleIconBack}>{<MdMenu />}</span>
          </div>
        </aside>
      )}
    </>
  );
};

export default NavBar;
