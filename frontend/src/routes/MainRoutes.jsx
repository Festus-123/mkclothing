import React from "react";
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { supabase } from '../supabse/supabaseClient.js';
import { SettingsContext } from '../context/context.js';

import Home from '../pages/user/home/Home.jsx';
import About from '../pages/user/about/About.jsx';
import Collection from '../pages/user/collection/Collection.jsx';
import Contact from '../pages/user/contact/Contact.jsx';

import PageError from '../components/admin/404page/404page.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import AdminRoutes from './AdminRoutes.jsx';

import SignUp from '../pages/admin/register/SignUp.jsx';
import SignIn from '../pages/admin/register/SignIn.jsx';

const MainRoutes = () => {
  const [session, setSession] = useState(null);
  const { settings } = useContext(SettingsContext);
  const location = useLocation();
  const state = location.state;

  useEffect(() => {
    const initialize = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
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

  return (
    <Routes location={state?.backgroundLocation || location}>
      {/* Public Customer Routes (No Auth Needed) */}
      <Route index element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/collections" element={<Collection />} />
      <Route path="/contact" element={<Contact />} />

      {/* 
        Admin Workspace 
        Note the '/*' - this allows nested matching inside AdminRoutes 
      */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute session={session}>
            <AdminRoutes session={session} />
          </ProtectedRoute>
        }
      />

      {/* Admin Auth Routes */}
      <Route
        path="/signup"
        element={
          session ? (
            <Navigate to="/dashboard" />
          ) : settings?.signup ? (
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

      {/* Global Fallback */}
      <Route path="*" element={<PageError />} />
    </Routes>
  );
};

export default MainRoutes;