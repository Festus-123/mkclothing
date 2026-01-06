import React from 'react';
// import styles from './NavBar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCollapse } from '../../../redux/slices/navbarSlice';
import { MdDashboard, MdLogout, MdAnalytics, MdMenu } from 'react-icons/md';
import { FaStore, FaBlog } from 'react-icons/fa';

import NavLinks from '../NavLinks/NavLinks';

const NavBar = () => {
  const dispatch = useDispatch();
  const isCollapsed = useSelector((state) => state.navbar.isCollapsed);
  return (
    <>
      {!isCollapsed ? (
        <aside className="">
          <div className="">
            <h1 className="">M&K Clothing</h1>
            <div className="" onClick={() => dispatch(toggleCollapse())}>
              <span className="">{<MdMenu />}</span>
            </div>
          </div>

          <nav className="">
            <NavLinks label="Overview" to="/dashboard" icon={<MdDashboard />} />
            <NavLinks
              label="Analytics"
              to="/dashboard/analytics"
              icon={<MdAnalytics />}
            />
            <NavLinks
              label="Products"
              to="/dashboard/products"
              icon={<FaStore />}
            />
            <NavLinks label="Logs" to="/dashboard/logs" icon={<FaBlog />} />
          </nav>

          <div className="">
            <NavLinks label="Logout" to="/logout" icon={<MdLogout />} />
          </div>
        </aside>
      ) : (
        /* collapsed view: simple toggle to reopen */
        <aside className="" onClick={() => dispatch(toggleCollapse())}>
          <div className="">
            <span className="">{<MdMenu />}</span>
          </div>
        </aside>
      )}
    </>
  );
};

export default NavBar;
