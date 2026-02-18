import React from 'react';
// import './styles/variable.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';

import Home from './pages/user/Home.jsx';
import About from './pages/user/About.jsx';
import Collection from './pages/user/Collection.jsx';
import Contact from './pages/user/Contact.jsx';

import SignUp from './pages/admin/register/SignUp.jsx';
import SignIn from './pages/admin/register/SignIn.jsx';

// Dashbaord
import Dashboard from './pages/admin/dashboard/Dashboard.jsx';
import AddProduct from './pages/admin/pages/add-products/AddProduct.jsx';
import Record from './pages/admin/pages/records/Record.jsx';
import DisplayProducts from './pages/admin/pages/display-products/DisplayProducts.jsx';
import EditProducts from './pages/admin/pages/edit-products/EditProducts.jsx';

function App() {
  const location = useLocation();
  const state = location.state;

  return (
    <>
      <Toaster
        position="top-right"
        richColors
        closeButton
        toastOptions={{
          style: {
            borderRadius: '10px',
            padding: '14px',
          },
        }}
      />
      {/* MAIN ROUTES */}
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="products" element={<DisplayProducts />} />
          <Route path="products/:id/edit" element={<EditProducts />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="records" element={<Record />} />
        </Route>

        {/* Full page edit fallback */}
        <Route path="/product/:id/edit" element={<EditProducts />} />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>

      {/* MODAL ROUTE */}
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/dashboard/products/:id/edit" element={<EditProducts />} />
        </Routes>
      )}
    </>
  );
}

export default App;
