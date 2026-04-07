import { useState } from "react";
import { ShoppingBag, Search, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../cart/CartContext";
import { useAuth } from "../../auth/AuthContext";
import CartDrawer from "../../cart/CartDrawer";

const navLinks = [
  { label: "Shop", path: "/shop" },
  { label: "Bouquets", path: "/bouquets" },
  { label: "Occasions", path: "/occasions" },
  { label: "Subscriptions", path: "/subscriptions" },
  { label: "About", path: "/about" },
];

export default function Navbar() {
  const { totalItems } = useCart();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <>
      <header className="font-[Jost]">
        {/* Promo Banner */}
        <div className="bg-rose-100 text-center py-2 text-xs tracking-widest text-rose-700">
          Free delivery on orders over <strong className="text-rose-500">₹999</strong>
          &nbsp;·&nbsp; Use code <strong className="text-rose-500">BLOOM20</strong> for 20% off
        </div>

        {/* Main Nav */}
        <nav className="bg-[#fdf6f0] border-b border-rose-200 px-10">
          <div className="max-w-7xl mx-auto flex items-center justify-between h-[72px]">

            {/* Logo */}
            <Link to="/" className="font-[Cormorant_Garamond] text-2xl font-medium
              text-[#8b5e52] tracking-wide cursor-pointer">
              ✿ Petal <em className="text-[#c4957a]">&amp; Co.</em>
            </Link>

            {/* Links */}
            <ul className="flex items-center gap-8 list-none">
              {navLinks.map(({ label, path }) => (
                <li key={label}>
                  <Link to={path} className="text-xs tracking-[0.1em] uppercase text-[#7a5c52]
                    hover:text-[#c4957a] border-b border-transparent hover:border-[#c4957a]
                    pb-0.5 transition-all">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button className="text-[#8b5e52] hover:text-[#c4957a] transition-colors">
                <Search size={18} strokeWidth={1.5} />
              </button>
              <div className="w-px h-5 bg-rose-200" />

              {/* Cart */}
              <button
                onClick={() => setDrawerOpen(true)}
                className="relative text-[#8b5e52] hover:text-[#c4957a] transition-colors"
              >
                <ShoppingBag size={18} strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#c4957a] text-white
                    text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Auth */}
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f0e0d6] border border-[#e8d5c4]
                    flex items-center justify-center">
                    <User size={14} strokeWidth={1.5} className="text-[#8b5e52]" />
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-1.5 text-xs tracking-wide
                      text-[#8b5e52] hover:text-[#c4957a] transition-colors"
                  >
                    <LogOut size={14} strokeWidth={1.5} />
                    Sign out
                  </button>
                </div>
              ) : (
                <Link to="/login" className="text-xs tracking-widest uppercase text-white
                  bg-[#c4957a] hover:bg-[#b0806a] px-5 py-2 rounded-sm transition-colors">
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </nav>
      </header>

      <CartDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}