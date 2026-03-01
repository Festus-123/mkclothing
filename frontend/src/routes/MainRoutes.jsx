import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import Home from '../pages/user/Home.jsx';
import About from '../pages/user/About.jsx';
import Collection from '../pages/user/Collection.jsx';
import Contact from '../pages/user/Contact.jsx';

const MainRoutes = () => {
  const location = useLocation();
  const state = location.state;

  return (
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
  )
}

export default MainRoutes
