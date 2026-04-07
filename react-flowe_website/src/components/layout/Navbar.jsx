// src/components/layout/Navbar.jsx
import { useState } from 'react';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="font-[Jost]">
      {/* Promo Banner */}
      <div className="bg-rose-100 text-center py-2 text-[10px] md:text-xs tracking-widest text-rose-700 px-4">
        Free delivery over <strong className="text-rose-500">₹999</strong>
        &nbsp;·&nbsp; Code <strong className="text-rose-500">BLOOM20</strong> for 20% off
      </div>

      {/* Main Nav */}
      <nav className="bg-[#fdf6f0] border-b border-rose-200 px-5 md:px-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-[64px] md:h-[72px]">

          {/* Logo */}
          <div className="font-[Cormorant_Garamond] text-xl md:text-2xl font-medium text-[#8b5e52] tracking-wide cursor-pointer">
            ✿ Petal <em className="italic text-[#c4957a]">&amp; Co.</em>
          </div>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8 list-none">
            {['Shop', 'Bouquets', 'Occasions', 'Subscriptions', 'About'].map(link => (
              <li key={link}>
                <a href="#" className="text-xs tracking-[0.1em] uppercase text-[#7a5c52]
                  hover:text-[#c4957a] border-b border-transparent hover:border-[#c4957a]
                  pb-0.5 transition-all">
                  {link}
                </a>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="text-[#8b5e52] hover:text-[#c4957a] transition-colors">
              <Search size={18} strokeWidth={1.5} />
            </button>
            <div className="hidden md:block w-px h-5 bg-rose-200" />
            <button className="relative text-[#8b5e52] hover:text-[#c4957a] transition-colors">
              <ShoppingBag size={18} strokeWidth={1.5} />
              <span className="absolute -top-1 -right-1 bg-[#c4957a] text-white
                text-[9px] w-4 h-4 rounded-full flex items-center justify-center">3</span>
            </button>
            <button className="hidden md:block text-xs tracking-widest uppercase text-white
              bg-[#c4957a] hover:bg-[#b0806a] px-5 py-2 rounded-sm transition-colors">
              Order Now
            </button>
            {/* Hamburger */}
            <button className="md:hidden text-[#8b5e52]" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-rose-200 py-4 flex flex-col gap-4">
            {['Shop', 'Bouquets', 'Occasions', 'Subscriptions', 'About'].map(link => (
              <a key={link} href="#"
                className="text-xs tracking-[0.1em] uppercase text-[#7a5c52]
                  hover:text-[#c4957a] transition-colors px-1"
                onClick={() => setMenuOpen(false)}>
                {link}
              </a>
            ))}
            <button className="text-xs tracking-widest uppercase text-white
              bg-[#c4957a] hover:bg-[#b0806a] px-5 py-2.5 rounded-sm transition-colors w-full mt-2">
              Order Now
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}