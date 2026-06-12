import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { useState, useEffect } from 'react';
import { SettingsContext } from '../context/context.js';

import { supabase } from '../supabse/supabaseClient.js';
import ProtectedRoute from './ProtectedRoute.jsx';

import Home from '../pages/user/home/Home.jsx';
import About from '../pages/user/about/About.jsx';
import Collection from '../pages/user/collection/Collection.jsx';
import Contact from '../pages/user/contact/Contact.jsx';

import Dashboard from '../pages/admin/dashboard/Dashboard.jsx';
import AddProduct from '../pages/admin/pages/add-products/AddProduct.jsx';
import Record from '../pages/admin/pages/records/Record.jsx';
import DisplayProducts from '../pages/admin/pages/display-products/DisplayProducts.jsx';
import EditProducts from '../pages/admin/pages/edit-products/EditProducts.jsx';
// import Annoucement from '../pages/admin/pages/announcement/Annoucement.jsx';

import SignUp from '../pages/admin/register/SignUp.jsx';
import SignIn from '../pages/admin/register/SignIn.jsx';
import PageError from '../components/admin/404page/404page.jsx';
import Settings from '../pages/admin/pages/settings/Settings.jsx';
import Announcement from '../pages/admin/pages/announcement/Annoucement.jsx';
import AddAnnouncement from '../pages/admin/pages/announcement/AddAnnouncement.jsx';
import EditAnnouncement from '../pages/admin/pages/announcement/EditAnnouncement.jsx';

const MainRoutes = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const { settings } = useContext(SettingsContext);
  const location = useLocation();
  const state = location.state;

  useEffect(() => {
    const initialize = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };

    initialize();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (loading)
    return (
      <div className="w-full h-screen bg-black/40 text-white flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/collections" element={<Collection />} />
        <Route path="/contact" element={<Contact />} />

        {/* Auth */}
        <Route
          path="/signup"
          element={
            session ? (
              <Navigate to="/dashboard" />
            ) : settings.signup ? (
              <SignUp />
            ) : (
              <PageError />
            )
          }
        />

        <Route
          path="/signin"
          element={session ? <Navigate to="/dashboard" /> : <SignIn />}
        />

        {/* Dashbaord */}
        <Route
          path="/dashboard"
          element={ <ProtectedRoute session={session}>
            <Dashboard />
          </ProtectedRoute> }
        >
          <Route index element={<DisplayProducts />} />
          <Route path="products/:id/edit" element={<EditProducts />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="records" element={<Record />} />
          <Route path="announcements" element={<Announcement />} />
          <Route path="add-announcement" element={<AddAnnouncement />} />
          <Route path="edit-announcement/:id" element={<EditAnnouncement />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Full page edit fallback */}
        {/* <Route path="dashboard/products/:id/edit" element={<EditProducts />} />
        <Route path="dashboard/add-product" element={<AddProduct />} />
        <Route
          path="dashboard/add-announcement"
          element={<AddAnnouncement />}
        /> */}

        <Route path="*" element={<PageError />} />
      </Routes>
      {/* MODAL ROUTE */}
      {state?.backgroundLocation && (
        <Routes>
          <Route
            path="dashboard/products/:id/edit"
            element={<EditProducts />}
          />
          <Route path="dashboard/add-product" element={<AddProduct />} />
          <Route
            path="dashboard/add-announcement"
            element={<AddAnnouncement />}
          />
          <Route
            path="dashboard/edit-announcement/:id"
            element={<EditAnnouncement />}
          />
        </Routes>
      )}
    </>
  );
};

export default MainRoutes;
