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
        <aside className="bg-[#80808043] lg:p-4 flex flex-col h-screen gap-10 w-[20%]">
          <div className=" flex flex-row items-center justify-between">
            <h1 className="font-medium text-lg lg:text-xl">M&K Clothing</h1>
            <div className="hover:bg-[#80808030] rounded-full p-2 " onClick={() => dispatch(toggleCollapse())}>
              <span className="text-xl ">{<MdMenu />}</span>
            </div>
          </div>

          <nav className="flex flex-col gap-5">
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
        <aside className="px-2 pt-4" onClick={() => dispatch(toggleCollapse())}>
          <div className="p-2 bg-[#80808042] rounded-md cursor-pointer hover:bg-[#80808027]">
            <span className="text-xl ">{<MdMenu />}</span>
          </div>
        </aside>
      )}
    </>
  );
};

export default NavBar;
