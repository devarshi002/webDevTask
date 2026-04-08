import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 min-h-[480px] md:min-h-[560px] bg-[#fdf6f0] overflow-hidden">

      {/* Left — Copy */}
      <div className="flex flex-col justify-center px-6 md:px-16 py-12 md:py-16 order-2 md:order-1">
        <p className="text-xs tracking-[0.22em] uppercase text-[#c4957a] mb-4 flex items-center gap-3">
          <span className="w-8 h-px bg-[#c4957a] inline-block" />
          Spring Collection 2026
        </p>
        <h1 className="font-serif text-[40px] md:text-[64px] font-normal leading-[1.08] text-[#5c3d35] mb-5">
          Fresh Blooms,<br />
          <em className="italic text-[#c4957a]">Crafted with</em><br />
          Love
        </h1>
        <p className="text-sm font-light leading-relaxed text-[#8b6e66] max-w-sm mb-8 tracking-wide">
          Handpicked florals for every moment — from quiet mornings
          to celebrations that deserve something beautiful.
        </p>
        <div className="flex flex-wrap items-center gap-4 md:gap-6">
          <Link to="/shop" className="text-xs tracking-[0.14em] uppercase text-white bg-[#c4957a]
            hover:bg-[#b0806a] px-6 md:px-8 py-3.5 rounded-sm transition-colors font-medium">
            Shop the Collection
          </Link>
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
                <span className="font-serif text-[22px] md:text-[28px] font-medium text-[#8b5e52] leading-none">
                  {num}
                </span>
                <span className="text-[10px] md:text-[11px] tracking-widest uppercase text-[#b09088] font-light">
                  {label}
                </span>
              </div>
            )
          )}
        </div>
      </div>

      {/* Right — Visual */}
      <div className="relative bg-[#f0e0d6] flex items-center justify-center overflow-hidden
        min-h-[280px] md:min-h-auto order-1 md:order-2">
        <div className="absolute w-[240px] md:w-[340px] h-[240px] md:h-[340px] rounded-full bg-[#e8cfc0] opacity-50" />
        <svg viewBox="0 0 200 280" className="w-[180px] md:w-[260px] h-auto relative z-10">
          <path d="M100 265 Q96 225 100 178" stroke="#7a9e6e" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <path d="M98 225 Q70 208 66 184 Q91 200 98 218" fill="#8fb87a"/>
          <path d="M102 210 Q132 193 136 169 Q113 187 102 205" fill="#7aa868"/>
          {[0,60,120,180,240,300].map((deg,i) => (
            <ellipse key={`o${i}`} cx="100" cy="118" rx="21" ry="33"
              fill={i%2===0?"#e8a0a0":"#d98888"} opacity="0.75"
              transform={`rotate(${deg} 100 118)`}/>
          ))}
          {[0,60,120,180,240,300].map((deg,i) => (
            <ellipse key={`m${i}`} cx="100" cy="118" rx="14" ry="24"
              fill={i%2===0?"#d07070":"#c86060"} opacity="0.85"
              transform={`rotate(${deg} 100 118)`}/>
          ))}
          <circle cx="100" cy="118" r="14" fill="#b04050"/>
          <circle cx="100" cy="118" r="8" fill="#8b2e3e"/>
          <circle cx="48" cy="80" r="3" fill="#c4957a" opacity="0.4"/>
          <circle cx="155" cy="185" r="3" fill="#c4957a" opacity="0.4"/>
          <circle cx="44" cy="108" r="7" fill="#f0c8c0" opacity="0.7"/>
          <circle cx="37" cy="101" r="5" fill="#f0c8c0" opacity="0.7"/>
          <circle cx="44" cy="94" r="5" fill="#f0c8c0" opacity="0.7"/>
          <circle cx="51" cy="101" r="5" fill="#f0c8c0" opacity="0.7"/>
          <circle cx="44" cy="101" r="4" fill="#e89080"/>
          <circle cx="162" cy="210" r="6" fill="#e8d4b8" opacity="0.8"/>
          <circle cx="156" cy="204" r="5" fill="#e8d4b8" opacity="0.8"/>
          <circle cx="162" cy="198" r="5" fill="#e8d4b8" opacity="0.8"/>
          <circle cx="168" cy="204" r="5" fill="#e8d4b8" opacity="0.8"/>
          <circle cx="162" cy="204" r="4" fill="#c4957a"/>
          <ellipse cx="55" cy="200" rx="11" ry="5" fill="#a0c890" opacity="0.5" transform="rotate(-40 55 200)"/>
          <ellipse cx="158" cy="72" rx="9" ry="4" fill="#a0c890" opacity="0.4" transform="rotate(20 158 72)"/>
        </svg>
        <div className="absolute bottom-6 left-2 md:left-0 bg-white border border-[#e8d5c4]
          rounded-md px-3 py-2 flex items-center gap-2 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#c4957a] animate-pulse" />
          <span className="text-xs text-[#5c3d35]">
            Same-day delivery in <strong className="text-[#c4957a]">Bengaluru</strong>
          </span>
        </div>
        <div className="absolute top-6 right-2 md:right-0 bg-[#c4957a] rounded px-3 py-2 text-center">
          <div className="font-serif text-[20px] md:text-[22px] font-medium text-white leading-none">50%</div>
          <div className="text-[10px] tracking-widest uppercase text-[#f5e6de] font-light">Off Today</div>
        </div>
      </div>
    </section>
  );
}