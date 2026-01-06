import React from "react";
// import './styles/variable.css';
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
import EditProducts from './pages/admin/pages/edit-products/EditProducts.jsx'
import Logs from "./pages/admin/pages/logs/Logs.jsx";


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>

          {/* <Route path="/signup" element={<SignUp />} /> */}
          <Route path="/home" element={<Home/>} />
          <Route path="/signin" element={<SignIn />} />
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
              <Route path="edit/:id" element={<EditProducts />}/>
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

// import React from 'react'

// const App = () => {
//   return (
//     <div className='bg-[grey]  p-8'>
//       <h1 className='font-medium text-lg'>Help Me</h1>
//     </div>
//   )
// }

// export default App
