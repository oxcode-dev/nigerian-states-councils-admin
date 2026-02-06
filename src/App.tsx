// import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import ForgotPassword from "./pages/ForgotPassword"
import ProtectedRoute from "./components/ProtectedRoutes"
import PublicRoute from "./components/PublicRoutes"
import Home from "./pages/Index"
import States from "./pages/States"
import LocalGovts from "./pages/LGAs"
// import Wards from "./pages/Wards"

function App() {

  return (
    <>
     <Router>
      <Routes>
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
          } 
        />
        <Route path="/forgot-password" element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
          } 
        />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AdminRoutes />
            </ProtectedRoute>
          }
        />
      </Routes>
     </Router>
    </>
  )
}

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/states" element={<States />} />
      <Route path="/local-governments" element={<LocalGovts />} />
      {/* <Route path="/wards" element={<Wards />} /> */}
    </Routes>
  )
}

export default App
