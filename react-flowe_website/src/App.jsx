import { CartProvider } from './cart/CartContext'
import { AuthProvider, useAuth } from './auth/AuthContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { lazy, Suspense } from 'react'
// ✅ Lazy load all pages
const Home = lazy(() => import('./pages/Home'))
const Shop = lazy(() => import('./pages/Shop'))
const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))
const Checkout = lazy(() => import('./pages/Checkout'))
const OrderSuccess = lazy(() => import('./pages/OrderSuccess'))
const MyOrders = lazy(() => import('./pages/MyOrders'))
const Bouquets = lazy(() => import('./pages/Bouquets'))
const Occasions = lazy(() => import('./pages/Occasions'))
const Subscriptions = lazy(() => import('./pages/Subscriptions'))
const About = lazy(() => import('./pages/About'))
const Admin = lazy(() => import('./pages/Admin'))
const Contact = lazy(() => import('./pages/Contact'))
const FAQs = lazy(() => import('./pages/FAQs'))
const DeliveryInfo = lazy(() => import('./pages/DeliveryInfo'))
const CareGuide = lazy(() => import('./pages/CareGuide'))
const Returns = lazy(() => import('./pages/Returns'))

// ✅ Loading spinner
function PageLoader() {
  return (
    <div className="min-h-screen bg-[#fdf6f0] flex items-center justify-center">
      <div className="text-center">
        <p className="font-[Cormorant_Garamond] text-3xl text-[#c4957a] animate-pulse">
          ✿
        </p>
        <p className="text-[11px] tracking-widest uppercase text-[#b09088] mt-2">
          Loading...
        </p>
      </div>
    </div>
  );
}

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
    // ✅ Wrap everything in Suspense
    <Suspense fallback={<PageLoader />}>
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
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/delivery-info" element={<DeliveryInfo />} />
          <Route path="/care-guide" element={<CareGuide />} />
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
    </Suspense>
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