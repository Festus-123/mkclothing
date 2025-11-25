import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

import SignUp from "./pages/admin/SignUp.jsx";
import SignIn from "./pages/admin/SignIn.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/signin" element={<SignIn />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
