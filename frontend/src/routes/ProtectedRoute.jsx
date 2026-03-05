import React from 'react'
import { Routes, Route } from "react-router-dom"

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
