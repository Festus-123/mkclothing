import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

import Home from '../pages/user/Home.jsx';
import About from '../pages/user/About.jsx';
import Collection from '../pages/user/Collection.jsx';
import Contact from '../pages/user/Contact.jsx';

import Dashboard from '../pages/admin/dashboard/Dashboard.jsx';
import AddProduct from '../pages/admin/pages/add-products/AddProduct.jsx';
import Record from '../pages/admin/pages/records/Record.jsx';
import DisplayProducts from '../pages/admin/pages/display-products/DisplayProducts.jsx';
import EditProducts from '../pages/admin/pages/edit-products/EditProducts.jsx';
import Annoucement from '../pages/admin/pages/announcement/Annoucement.jsx';

import SignUp from '../pages/admin/register/SignUp.jsx';
import SignIn from '../pages/admin/register/SignIn.jsx';

const MainRoutes = ({ session }) => {
  const location = useLocation();
  const state = location.state;

  return (
    <Routes location={state?.backgroundLocation || location}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/collection" element={<Collection />} />
      <Route path="/contact" element={<Contact />} />

      {/* Auth */}
      <Route
        path="/signup"
        element={session ? <Navigate to="/dashboard" /> : <SignUp />}
      />
      <Route
        path="/signin"
        element={session ? <Navigate to="/dashboard" /> : <SignIn />}
      />

      {/* Dashbaord */}
      <Route
        path="/dashboard"
        element={session ? <Dashboard /> : <Navigate to="/signin" />}
      >
        <Route index element={<DisplayProducts />} />
        <Route path="products/:id/edit" element={<EditProducts />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="records" element={<Record />} />
        <Route path="annoucemnets" element={<Annoucement />} />
      </Route>

      {/* Full page edit fallback */}
      <Route path="dashboard/product/:id/edit" element={<EditProducts />} />
      <Route path="/dashboard/add-product" element={<AddProduct />} />

      {/* MODAL ROUTE */}
      {state?.backgroundLocation && (
        <Route>
          <Route
            path="/dashboard/products/:id/edit"
            element={<EditProducts />}
          />
          <Route path="/dashboard/add-product" element={<AddProduct />} />
        </Route>
      )}
    </Routes>
  );
};

export default MainRoutes;
