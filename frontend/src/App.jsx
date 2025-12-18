import React from "react";
import './styles/variable.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";

import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import Home from "./pages/user/Home.jsx";
import About from "./pages/user/About.jsx";
import Collection from "./pages/user/Collection.jsx";
import Contact from "./pages/user/Contact.jsx";
import SignUp from "./pages/admin/register/SignUp.jsx";
import PageError from "./components/admin/404page/404page.jsx";
import SignIn from "./pages/admin/register/SignIn.jsx";
import Dashboard from "./pages/admin/dashboard/Dashboard.jsx";

// dashboard pages
import Overview from "./pages/admin/pages/Overview/Overview.jsx";
import Products from "./pages/admin/pages/products/products.jsx";
import DisplayProducts from "./pages/admin/pages/display-products/DisplayProducts.jsx";
import AddProduct from "./pages/admin/pages/add-products/AddProduct.jsx";
// import Logs from "./pages/admin/pages/logs/Logs.jsx";

// user route pages 
import Home from "./pages/user/Home.jsx";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>

          <Route path="/new/use/Home" element={<Home />}/>

          {/* <Route path="/signup" element={<SignUp />} /> */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/collection" element={<Collection/>} />
          <Route path="/contact" element={<Contact/>} />


          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Overview />} />
            <Route 
            path="products"
            element={
              <Products />
            }>
              <Route index element={<DisplayProducts />} />
              <Route path="add" element={<AddProduct />}/>
            </Route>

          {/* 404 fallback */}
          <Route path="*" element={<PageError />} />

            {/* <Route path="logs" element={<Logs />}/> */}
            <Route path="*" element={<PageError />} />
          </Route>
          
          <Route path="*" element={<PageError />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
