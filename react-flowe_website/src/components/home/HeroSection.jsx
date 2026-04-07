// src/components/home/HeroSection.jsx
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 min-h-[480px] md:min-h-[560px] bg-[#fdf6f0]">

      {/* Left — Copy */}
      <div className="flex flex-col justify-center px-6 py-14 md:px-16 md:py-16 order-2 md:order-1">
        <p className="text-[10px] md:text-xs tracking-[0.22em] uppercase text-[#c4957a] mb-4 flex items-center gap-3">
          <span className="w-6 md:w-8 h-px bg-[#c4957a] inline-block" />
          Spring Collection 2026
        </p>

        <h1 className="font-[Cormorant_Garamond] text-[44px] md:text-[64px] font-normal
          leading-[1.08] text-[#5c3d35] mb-5">
          Fresh Blooms,<br />
          <em className="italic text-[#c4957a]">Crafted with</em><br />
          Love
        </h1>

        <p className="text-sm font-light leading-relaxed text-[#8b6e66] max-w-sm mb-8 tracking-wide">
          Handpicked florals for every moment — from quiet mornings to celebrations
          that deserve something beautiful.
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <button className="text-xs tracking-[0.14em] uppercase text-white bg-[#c4957a]
            hover:bg-[#b0806a] px-8 py-3.5 rounded-sm transition-colors font-medium w-full sm:w-auto">
            Shop the Collection
          </button>
          <button className="flex items-center gap-2 text-xs tracking-[0.12em] uppercase
            text-[#8b5e52] hover:text-[#c4957a] transition-colors group">
            Our Story
            <ArrowRight size={16} strokeWidth={1.5}
              className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="flex gap-6 md:gap-8 mt-10 pt-8 border-t border-[#e8d5c4]">
          {[['120+', 'Varieties'], ['4.9★', 'Avg Rating'], ['12k', 'Happy Orders']].map(
            ([num, label]) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="font-[Cormorant_Garamond] text-[22px] md:text-[28px]
                  font-medium text-[#8b5e52] leading-none">{num}</span>
                <span className="text-[10px] tracking-widest uppercase text-[#b09088] font-light">
                  {label}
                </span>
              </div>
            )
          )}
        </div>
      </div>

      {/* Right — Visual */}
      <div className="relative bg-[#f0e0d6] flex items-center justify-center
        min-h-[280px] md:min-h-auto order-1 md:order-2">
        <div className="text-[120px] md:text-[180px] opacity-20 select-none">✿</div>

        {/* Same-day badge */}
        <div className="absolute bottom-6 left-4 md:bottom-14 md:left-0 bg-white
          border border-[#e8d5c4] rounded-md px-3 py-2 flex items-center gap-2 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#c4957a] animate-pulse flex-shrink-0" />
          <span className="text-[11px] text-[#5c3d35]">
            Same-day delivery in <strong className="text-[#c4957a]">Bengaluru</strong>
          </span>
        </div>

        {/* Offer badge */}
        <div className="absolute top-6 right-4 md:top-14 md:right-0 bg-[#c4957a]
          rounded px-3 py-2 text-center">
          <div className="font-[Cormorant_Garamond] text-xl font-medium text-white leading-none">50%</div>
          <div className="text-[10px] tracking-widest uppercase text-[#f5e6de] font-light">Off Today</div>
        </div>
      </div>

    </section>
  );
}