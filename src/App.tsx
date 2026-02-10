import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import ForgotPassword from "./pages/ForgotPassword"
import ProtectedRoute from "./components/ProtectedRoutes"
import PublicRoute from "./components/PublicRoutes"
// import Home from "./pages/Index"
import States from "./pages/States"
import LocalGovts from "./pages/LGAs"
import Setting from "./pages/Settings"
import Logout from "./pages/Logout"
import Users from "./pages/Users"
import ResetPassword from "./pages/ResetPassword"
import NotFoundPage from "./pages/NotFoundPage"
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
         <Route path="/reset-password" element={
          <PublicRoute>
            <ResetPassword />
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
        <Route 
          path="/404" 
          element={<NotFoundPage />}
        />
      </Routes>
     </Router>
    </>
  )
}

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<States />} />
      {/* <Route path="/" element={<Home />} /> */}
      {/* <Route path="/states" element={<States />} /> */}
      <Route path="/local-governments" element={<LocalGovts />} />
      <Route path="/users" element={<Users />} />
      {/* <Route path="/wards" element={<Wards />} /> */}
      <Route path="/settings" element={<Setting />} />
      <Route path="/logout" element={<Logout />} />

      <Route 
        path="*" 
        element={<NotFoundPage />}
      />
    </Routes>
  )
}

export default App
