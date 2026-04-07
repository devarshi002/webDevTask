// src/components/layout/Footer.jsx
import { useState } from 'react';

const shopLinks = ['All Flowers','Bouquets','Seasonal Picks','Subscriptions','Gift Sets','Corporate Orders'];
const helpLinks = ['Delivery Info','Track My Order','Returns & Refunds','Care Guide','FAQs','Contact Us'];
const socials = [{ label: 'IG', title: 'Instagram' },{ label: 'Pin', title: 'Pinterest' },{ label: 'Fb', title: 'Facebook' },{ label: 'WA', title: 'WhatsApp' }];

export default function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-[#3d2820] font-[Jost]">

      {/* Trust Bar */}
      <div className="bg-[#2e1e18] flex flex-wrap items-center justify-center
        gap-4 md:gap-10 py-3 px-5">
        {['Fresh, handpicked daily','Same-day delivery','100% satisfaction guarantee','Secure checkout'].map(t => (
          <span key={t} className="text-[10px] tracking-widest uppercase text-[#6b4e44]
            flex items-center gap-1.5">
            <span className="text-[#c4957a]">✦</span> {t}
          </span>
        ))}
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-12 md:py-16
        grid grid-cols-2 md:grid-cols-[1.8fr_1fr_1fr_1.4fr] gap-8 md:gap-12">

        {/* Brand — full width on mobile */}
        <div className="col-span-2 md:col-span-1">
          <div className="font-[Cormorant_Garamond] text-[26px] text-[#f5e6de] mb-4 tracking-wide">
            ✿ Petal <em className="italic text-[#c4957a]">&amp; Co.</em>
          </div>
          <p className="text-[13px] font-light leading-[1.85] text-[#a08878] max-w-[260px] mb-6">
            We believe every flower tells a story. From our garden to your doorstep — with love, care, and a little magic.
          </p>
          <div className="flex gap-2.5">
            {socials.map(({ label, title }) => (
              <button key={title} title={title}
                className="w-[34px] h-[34px] rounded-full border border-[#5c3d35]
                  flex items-center justify-center text-[#a08878] hover:border-[#c4957a]
                  hover:text-[#c4957a] transition-all text-[10px] tracking-wide font-light">
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Shop */}
        <div>
          <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#f5e6de] mb-4">Shop</p>
          <ul className="flex flex-col gap-2.5">
            {shopLinks.map(l => (
              <li key={l}>
                <a href="#" className="text-[13px] font-light text-[#a08878]
                  hover:text-[#c4957a] transition-colors">{l}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div>
          <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#f5e6de] mb-4">Help</p>
          <ul className="flex flex-col gap-2.5">
            {helpLinks.map(l => (
              <li key={l}>
                <a href="#" className="text-[13px] font-light text-[#a08878]
                  hover:text-[#c4957a] transition-colors">{l}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter — full width on mobile */}
        <div className="col-span-2 md:col-span-1">
          <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#f5e6de] mb-4">
            Stay in Bloom
          </p>
          <p className="text-[13px] font-light leading-relaxed text-[#a08878] mb-4">
            Get early access to seasonal drops, care tips, and exclusive offers.
          </p>
          <div className="flex flex-col gap-2.5">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="bg-white/5 border border-[#5c3d35] focus:border-[#c4957a]
                text-[#f5e6de] placeholder-[#6b4e44] text-[13px] font-light
                px-3.5 py-2.5 rounded-sm outline-none transition-colors w-full" />
            <button className="text-[11px] font-medium tracking-[0.14em] uppercase
              text-[#3d2820] bg-[#c4957a] hover:bg-[#d4a58a] py-3 rounded-sm transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <hr className="border-[#5c3d35] mx-5 md:mx-10" />

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-4 md:py-5
        flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[11px] font-light text-[#6b4e44] text-center sm:text-left">
          © 2026 <span className="text-[#c4957a]">Petal &amp; Co.</span> — Made with ✿ in Bengaluru
        </p>
        <ul className="flex gap-4 md:gap-6 list-none">
          {['Privacy Policy','Terms of Use','Cookie Settings'].map(l => (
            <li key={l}>
              <a href="#" className="text-[11px] font-light text-[#6b4e44]
                hover:text-[#c4957a] transition-colors">{l}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}