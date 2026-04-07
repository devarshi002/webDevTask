import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { CartProvider } from './cart/CartContext'
import { AuthProvider, useAuth } from './auth/AuthContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Login from './pages/Login'
import Signup from './pages/Signup'

function ProtectedRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}

function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/checkout" element={
          <ProtectedRoute>
            <div className="min-h-screen bg-[#fdf6f0] flex items-center justify-center">
              <p className="font-[Cormorant_Garamond] text-2xl text-[#5c3d35]">
                Checkout coming soon 🌸
              </p>
            </div>
          </ProtectedRoute>
        } />
      </Routes>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}