import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Dashboard from '../pages/admin/dashboard/Dashboard.jsx';
import AddProduct from '../pages/admin/pages/add-products/AddProduct.jsx';
import Record from '../pages/admin/pages/records/Record.jsx';
import DisplayProducts from '../pages/admin/pages/display-products/DisplayProducts.jsx';
import EditProducts from '../pages/admin/pages/edit-products/EditProducts.jsx';

const AdminRoutes = () => {
  const location = useLocation();
  const state = location.state;

  return (
    <Routes>
      {/* Dashbaord */}
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="products" element={<DisplayProducts />} />
        <Route path="products/:id/edit" element={<EditProducts />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="records" element={<Record />} />
      </Route>

      {/* Full page edit fallback */}
      <Route path="dashboard/product/:id/edit" element={<EditProducts />} />
      <Route path="/dashboard/add-product" element={<AddProduct />} />

      {/* MODAL ROUTE */}
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/dashboard/products/:id/edit" element={<EditProducts />} />
          <Route path="/dashboard/add-product" element={<AddProduct />} />
        </Routes>
      )}
    </Routes>
  );
};

export default AdminRoutes;
