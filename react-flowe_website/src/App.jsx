import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { CartProvider } from './cart/CartContext'
import { AuthProvider, useAuth } from './auth/AuthContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import MyOrders from './pages/MyOrders'
import Bouquets from './pages/Bouquets'
import Occasions from './pages/Occasions'
import Subscriptions from './pages/Subscriptions'
import About from './pages/About'
import Admin from './pages/Admin'
import Contact from './pages/Contact'
import FAQs from './pages/FAQs'
import DeliveryInfo from './pages/DeliveryInfo'
import CareGuide from './pages/CareGuide'
import Returns from './pages/Returns'

// ── Layout wrapper ──
function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

// ── Protected route ──
function ProtectedRoute() {
  const { user } = useAuth()
  return user ? <Outlet /> : <Navigate to="/login" replace />
}

function AppRoutes() {
  return (
    <Routes>

      {/* ── Admin — no Navbar/Footer ── */}
      <Route path="/admin" element={<Admin />} />

      {/* ── All other pages — with Navbar/Footer ── */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/bouquets" element={<Bouquets />} />
        <Route path="/occasions" element={<Occasions />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/care-guide" element={<CareGuide />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/delivery-info" element={<DeliveryInfo />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ── Protected ── */}
        <Route element={<ProtectedRoute />}>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/my-orders" element={<MyOrders />} />
        </Route>

        {/* ── 404 ── */}
        <Route path="*" element={
          <div className="min-h-screen bg-[#fdf6f0] font-[Jost] flex flex-col
            items-center justify-center gap-4 px-4">
            <p className="text-6xl">🌸</p>
            <h1 className="font-[Cormorant_Garamond] text-4xl text-[#5c3d35]">
              Page Not Found
            </h1>
            <p className="text-sm font-light text-[#a08878]">
              This page doesn't exist yet.
            </p>
            <a href="/"
              className="text-xs tracking-widest uppercase text-white
                bg-[#c4957a] hover:bg-[#b0806a] px-8 py-3 rounded-sm transition-colors">
              Back to Home
            </a>
          </div>
        } />
      </Route>

    </Routes>
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