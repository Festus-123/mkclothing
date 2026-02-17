import React from 'react';
// import './styles/variable.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

function App() {
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
    <BrowserRouter>
      <Routes>

        {/* <Route path="/signup" element={<SignUp />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/contact" element={<Contact />} />

        {/* Dashboard routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="products" element={<DisplayProducts />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="records" element={<Record />} />
        </Route>

        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
