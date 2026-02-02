// import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import ForgotPassword from "./pages/ForgotPassword"
import ProtectedRoute from "./components/ProtectedRoutes"

function App() {

  return (
    <>
     <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
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

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
    </div>
  )
}

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/product/create" element={<CreateProduct />} />
      <Route path="/product/edit/:id" element={<EditProduct />} />
      <Route path="/product/delete/:id" element={<DeleteProduct />} /> */}
    </Routes>
  )
}

export default App
