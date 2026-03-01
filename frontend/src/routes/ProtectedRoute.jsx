import React from 'react'
import { Routes, Route } from "react-router-dom"

import SignUp from '../pages/admin/register/SignUp.jsx';
import SignIn from '../pages/admin/register/SignIn.jsx';
const ProtectedRoute = () => {
  return (
    <Routes>
      {/* Auth */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
    </Routes>
  )
}

export default ProtectedRoute
