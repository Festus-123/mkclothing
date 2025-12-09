import React from "react";
import './styles/variable.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";

import ProtectedRoute from "./routes/ProtectedRoute.jsx";

import SignUp from "./pages/admin/register/SignUp.jsx";
import PageError from "./components/admin/404page/404page.jsx";
import SignIn from "./pages/admin/register/SignIn.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>

          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* 404 fallback */}
          <Route path="*" element={<PageError />} />

        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
