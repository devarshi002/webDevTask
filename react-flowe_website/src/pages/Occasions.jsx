import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { occasions } from "../data/occasions";

function OccasionCard({ occasion, index }) {
  const isEven = index % 2 === 0;

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden rounded-md
      border border-[#e8d5c4] bg-white
      hover:shadow-[0_16px_48px_rgba(139,94,82,0.1)] transition-shadow duration-300`}>

      {/* Image */}
      <div className={`relative h-[280px] md:h-auto overflow-hidden
        ${isEven ? 'md:order-1' : 'md:order-2'}`}>
        <img
          src={occasion.image}
          alt={occasion.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        {/* Emoji badge */}
        <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-white/90
          border border-[#e8d5c4] flex items-center justify-center text-2xl shadow-sm">
          {occasion.emoji}
        </div>
        {/* Highlight badge */}
        <div className="absolute bottom-4 right-4 bg-[#c4957a] text-white
          text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-sm">
          {occasion.highlight}
        </div>
      </div>

      {/* Content */}
      <div className={`flex flex-col justify-center px-8 md:px-12 py-10
        ${isEven ? 'md:order-2' : 'md:order-1'}`}
        style={{ background: occasion.bg + '40' }}>

        <p className="text-[11px] tracking-[0.2em] uppercase text-[#c4957a] mb-3
          flex items-center gap-3">
          <span className="w-6 h-px bg-[#c4957a] inline-block" />
          {occasion.tag}
        </p>

        <h2 className="font-[Cormorant_Garamond] text-[32px] md:text-[38px] text-[#5c3d35]
          font-normal mb-4 leading-tight">
          {occasion.name}
        </h2>

        <p className="text-[13px] font-light text-[#8b6e66] leading-relaxed mb-6 max-w-sm">
          {occasion.desc}
        </p>

        {/* Mini product preview */}
        <div className="flex items-center gap-3 mb-6">
          {occasion.products.map((p, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <img
                src={p.image}
                alt={p.name}
                className="w-14 h-14 rounded-sm object-cover border border-[#e8d5c4]"
              />
              <span className="text-[10px] text-[#b09088] font-light">₹{p.price}</span>
            </div>
          ))}
          <div className="w-10 h-10 rounded-sm border border-dashed border-[#c4957a]
            flex items-center justify-center text-[#c4957a] text-xs">
            +more
          </div>
        </div>

        {/* CTA */}
        <Link
          to={occasion.path}
          className="inline-flex items-center gap-2 text-xs tracking-[0.14em] uppercase
            text-white bg-[#c4957a] hover:bg-[#b0806a] px-6 py-3 rounded-sm
            transition-colors self-start group"
        >
          {occasion.cta}
          <ArrowRight size={14} strokeWidth={1.5}
            className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

export default function Occasions() {
  const [activeEmoji, setActiveEmoji] = useState(null);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[#fdf6f0] font-[Jost] min-h-screen">

      {/* ── Hero ── */}
      <section className="bg-[#fdf6f0] px-4 md:px-10 py-16 md:py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] tracking-[0.22em] uppercase text-[#c4957a] mb-4
            flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-[#c4957a] inline-block" />
            Every Moment Deserves Flowers
            <span className="w-8 h-px bg-[#c4957a] inline-block" />
          </p>
          <h1 className="font-[Cormorant_Garamond] text-[42px] md:text-[64px] font-normal
            leading-[1.05] text-[#5c3d35] mb-6">
            Shop by<br />
            <em className="italic text-[#c4957a]">Occasion</em>
          </h1>
          <p className="text-sm font-light leading-relaxed text-[#8b6e66] max-w-lg mx-auto mb-10">
            Whether you're celebrating love, marking a milestone, or simply saying
            "I'm thinking of you" — we have the perfect arrangement for every moment.
          </p>

          {/* Quick jump buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {occasions.map(o => (
              <button
                key={o.id}
                onClick={() => scrollTo(`occasion-${o.id}`)}
                className="flex items-center gap-2 text-[12px] font-light text-[#7a5c52]
                  bg-white border border-[#e8d5c4] hover:border-[#c4957a] hover:text-[#c4957a]
                  px-4 py-2 rounded-full transition-all cursor-pointer"
              >
                <span>{o.emoji}</span>
                {o.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Decorative divider ── */}
      <div className="flex items-center justify-center gap-4 py-2">
        <span className="w-24 md:w-48 h-px bg-[#e8d5c4]" />
        <span className="text-[#c4957a] text-lg">✿</span>
        <span className="w-24 md:w-48 h-px bg-[#e8d5c4]" />
      </div>

      {/* ── Occasion Cards ── */}
      <section className="max-w-6xl mx-auto px-4 md:px-10 py-12 md:py-16 flex flex-col gap-8">
        {occasions.map((occasion, index) => (
          <div key={occasion.id} id={`occasion-${occasion.id}`}>
            <OccasionCard occasion={occasion} index={index} />
          </div>
        ))}
      </section>

      {/* ── Custom order banner ── */}
      <section className="bg-[#3d2820] py-16 px-4 md:px-10 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-[#c4957a] text-2xl mb-4">✿</p>
          <h3 className="font-[Cormorant_Garamond] text-3xl md:text-4xl text-[#f5e6de] mb-4">
            Can't Find What You're Looking For?
          </h3>
          <p className="text-[13px] font-light text-[#a08878] leading-relaxed mb-8 max-w-md mx-auto">
            We do custom arrangements for weddings, corporate events, and special occasions.
            Get in touch and we'll create something just for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/shop"
              className="text-xs tracking-widest uppercase text-white bg-[#c4957a]
                hover:bg-[#b0806a] px-8 py-3.5 rounded-sm transition-colors">
              Browse All Flowers
            </Link>
            <a href="mailto:hello@petalandco.in"
              className="text-xs tracking-widest uppercase text-[#c4957a]
                border border-[#c4957a] hover:bg-[#c4957a] hover:text-white
                px-8 py-3.5 rounded-sm transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* ── Why us ── */}
      <section className="bg-[#f0e0d6] py-12 px-4 md:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: '🌸', title: 'Fresh Daily', desc: 'Handpicked every morning' },
            { icon: '🚚', title: 'Same Day', desc: 'Order before 12 PM' },
            { icon: '💝', title: 'Gift Wrapped', desc: 'Every order beautifully packed' },
            { icon: '⭐', title: '4.9 Rating', desc: '12,000+ happy customers' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="text-center">
              <div className="text-2xl mb-2">{icon}</div>
              <h4 className="font-serif text-[15px] text-[#5c3d35] mb-1">{title}</h4>
              <p className="text-[12px] font-light text-[#8b6e66]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}