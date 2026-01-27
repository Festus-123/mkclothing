import React from "react";
// import './styles/variable.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/user/Home.jsx";
import About from "./pages/user/About.jsx";
import Collection from "./pages/user/Collection.jsx";
import Contact from "./pages/user/Contact.jsx";

// Dashbaord
import Dashboard from "./pages/admin/dashboard/Dashboard.jsx";
import AddProduct from "./pages/admin/pages/add-products/AddProduct.jsx";

function App() {
  return (
      <BrowserRouter>
        <Routes>

          {/* <Route path="/signup" element={<SignUp />} /> */}
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/collection" element={<Collection/>} />
          <Route path="/contact" element={<Contact/>} />

         {/* Dashboard routes */}
          <Route path="/dashboard" element={<Dashboard/>} >
            <Route path="add-product" element={<AddProduct />}/>
          </Route>

        </Routes>
      </BrowserRouter>
  );
}

export default App;
