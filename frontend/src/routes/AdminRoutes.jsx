import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Dashboard from '../pages/admin/dashboard/Dashboard.jsx';
import AddProduct from '../pages/admin/pages/add-products/AddProduct.jsx';
import Record from '../pages/admin/pages/records/Record.jsx';
import DisplayProducts from '../pages/admin/pages/display-products/DisplayProducts.jsx';
import EditProducts from '../pages/admin/pages/edit-products/EditProducts.jsx';
import Settings from '../pages/admin/pages/settings/Settings.jsx';
import Announcement from '../pages/admin/pages/announcement/Annoucement.jsx';
import AddAnnouncement from '../pages/admin/pages/announcement/AddAnnouncement.jsx';
import EditAnnouncement from '../pages/admin/pages/announcement/EditAnnouncement.jsx';
import OrdersManagement from '../pages/admin/pages/orders/Orders.jsx';

import RecoverySetupModal from '../pages/admin/register/RecoverySetupModal.jsx.jsx';

const AdminRoutes = () => {
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  // console.log(backgroundLocation, "bgl")
  // console.log("location", location)

  return (
    <>
      <Routes location={backgroundLocation || location}>
        {/* 
          Changed path from "/dashboard" to "/" 
          because the parent route "/dashboard/*" already handles the prefix!
        */}
        <Route path="/" element={<Dashboard />}>
          <Route index element={<DisplayProducts />} />
          <Route path="products/:id/edit" element={<EditProducts />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="records" element={<Record />} />
          <Route path="announcements" element={<Announcement />} />
          <Route path="add-announcement" element={<AddAnnouncement />} />
          <Route path="edit-announcement/:id" element={<EditAnnouncement />} />
          <Route path="settings" element={<Settings />} />
          <Route path="orders" element={<OrdersManagement />} />
        </Route>
      </Routes>

      {/* ADMIN MODAL OVERLAYS */}
      {backgroundLocation && (
        <Routes>
          <Route
            path="products/:id/edit"
            element={<EditProducts />}
          />
          <Route path="add-product" element={<AddProduct />} />
          <Route
            path="add-announcement"
            element={<AddAnnouncement />}
          />
          <Route
            path="edit-announcement/:id"
            element={<EditAnnouncement />}
          />
        </Routes>
      )}
    </>
  );
};

export default AdminRoutes;