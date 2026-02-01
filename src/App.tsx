// import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import ForgotPassword from "./pages/ForgotPassword"

function App() {

  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
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

export default App
