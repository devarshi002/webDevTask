import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Plus, Check } from "lucide-react";
import { bouquets } from "../data/bouquets";
import { useCart } from "../cart/CartContext";

const categories = ["All", "Romantic", "Seasonal", "Everyday"];

function BouquetCard({ product }) {
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="group bg-white border border-[#e8d5c4] rounded-md overflow-hidden
      hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(139,94,82,0.12)]
      transition-all duration-300 cursor-pointer">

      {/* Image */}
      <div className="relative h-[220px] overflow-hidden" style={{ background: product.bg }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-3 left-3 text-[10px] font-medium tracking-widest
            uppercase px-2.5 py-1 rounded-sm z-10
            ${product.badge === 'New' ? 'bg-[#c4957a] text-white' : ''}
            ${product.badge === 'Bestseller' ? 'bg-[#f0e0d6] text-[#8b5e52]' : ''}
            ${product.badge.includes('%') ? 'bg-[#5c3d35] text-[#f5e6de]' : ''}`}>
            {product.badge}
          </span>
        )}

        {/* Size tag */}
        <span className="absolute bottom-3 left-3 text-[10px] tracking-wide
          bg-white/90 text-[#8b5e52] px-2 py-1 rounded-sm">
          {product.size}
        </span>

        {/* Wishlist */}
        <button
          onClick={() => setWished(!wished)}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90
            border border-[#e8d5c4] flex items-center justify-center z-10
            hover:border-[#c4957a] transition-colors"
        >
          <Heart size={14} strokeWidth={1.5} className="text-[#c4957a]"
            fill={wished ? '#c4957a' : 'none'} />
        </button>

        {/* Quick add */}
        <button
          onClick={handleAdd}
          className="absolute bottom-0 left-0 right-0 bg-[#3d2820]/80 text-[#f5e6de]
            text-[11px] tracking-[0.14em] uppercase py-3 z-10
            translate-y-full group-hover:translate-y-0
            opacity-0 group-hover:opacity-100 transition-all duration-300 border-none cursor-pointer"
        >
          Quick Add to Cart
        </button>
      </div>

      {/* Body */}
      <div className="px-4 pt-3.5 pb-4">
        <p className="text-[10px] tracking-[0.14em] uppercase text-[#b09088] font-light mb-1">
          {product.tag}
        </p>
        <h3 className="font-serif text-[19px] font-normal text-[#5c3d35] leading-tight mb-1">
          {product.name}
        </h3>
        <p className="text-[12px] font-light text-[#a08878] leading-relaxed mb-3">
          {product.desc}
        </p>

        {/* Stars */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`text-xs ${i < product.rating ? 'text-[#c4957a]' : 'text-[#e8d5c4]'}`}>★</span>
          ))}
          <span className="text-[11px] text-[#a08878] font-light ml-1">({product.reviews})</span>
        </div>

        {/* Price + Add */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif text-[21px] font-medium text-[#5c3d35]">₹{product.price}</span>
            {product.oldPrice && (
              <span className="text-[13px] font-light text-[#b09088] line-through">₹{product.oldPrice}</span>
            )}
          </div>
          <button
            onClick={handleAdd}
            className={`w-[34px] h-[34px] rounded-full cursor-pointer flex items-center justify-center
              border-none transition-all duration-200
              ${added ? 'bg-[#5c3d35]' : 'bg-[#c4957a] hover:bg-[#b0806a] active:scale-90'}`}
          >
            {added
              ? <Check size={14} strokeWidth={2} color="#fff" />
              : <Plus size={14} strokeWidth={2} color="#fff" />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Bouquets() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? bouquets
    : bouquets.filter(b => b.category === activeCategory);

  return (
    <div className="bg-[#fdf6f0] font-[Jost] min-h-screen">

      {/* ── Hero ── */}
      <section className="relative bg-[#3d2820] overflow-hidden min-h-[480px] md:min-h-[560px]
        flex items-center">

        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          {['✿','❀','✦','✿','❀'].map((s, i) => (
            <span key={i} className="absolute text-white text-6xl"
              style={{ top: `${15 + i * 18}%`, left: `${5 + i * 22}%`, opacity: 0.4 }}>
              {s}
            </span>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-2
          gap-10 items-center py-16">

          {/* Left copy */}
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-[#c4957a] mb-4
              flex items-center gap-3">
              <span className="w-8 h-px bg-[#c4957a] inline-block" />
              Handcrafted with Love
            </p>
            <h1 className="font-[Cormorant_Garamond] text-[44px] md:text-[64px] font-normal
              leading-[1.05] text-[#f5e6de] mb-6">
              Beautiful<br />
              <em className="italic text-[#c4957a]">Bouquets</em><br />
              for Every Mood
            </h1>
            <p className="text-sm font-light leading-relaxed text-[#a08878] max-w-sm mb-8">
              Each bouquet is handcrafted the same morning it's delivered —
              fresh, fragrant, and full of intention.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#bouquets"
                className="text-xs tracking-[0.14em] uppercase text-white bg-[#c4957a]
                  hover:bg-[#b0806a] px-8 py-3.5 rounded-sm transition-colors">
                Browse Bouquets
              </a>
              <Link to="/shop"
                className="text-xs tracking-[0.14em] uppercase text-[#c4957a]
                  border border-[#c4957a] hover:bg-[#c4957a] hover:text-white
                  px-8 py-3.5 rounded-sm transition-colors">
                View All Flowers
              </Link>
            </div>
          </div>

          {/* Right — featured image */}
          <div className="relative hidden md:block">
            <div className="w-full h-[380px] rounded-md overflow-hidden">
              <img
                src="/images/bouquets/classic-roses.jpg"
                alt="Featured bouquet"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-5 -left-5 bg-white border border-[#e8d5c4]
              rounded-md px-4 py-3 shadow-lg">
              <p className="text-[11px] tracking-widest uppercase text-[#b09088] mb-1">
                Starting from
              </p>
              <p className="font-[Cormorant_Garamond] text-2xl text-[#5c3d35]">₹799</p>
            </div>
            {/* Same day badge */}
            <div className="absolute -top-4 -right-4 bg-[#c4957a] rounded-md px-3 py-2 text-center">
              <p className="text-white text-[11px] tracking-widest uppercase font-light">
                Same Day
              </p>
              <p className="text-white text-[11px] tracking-widest uppercase font-medium">
                Delivery 🚚
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <div className="bg-[#f0e0d6] py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {[
            ['50+', 'Bouquet Styles'],
            ['Fresh Daily', 'Handcrafted'],
            ['4.9★', 'Avg Rating'],
            ['Same Day', 'Delivery'],
          ].map(([num, label]) => (
            <div key={label} className="text-center">
              <p className="font-[Cormorant_Garamond] text-xl text-[#5c3d35]">{num}</p>
              <p className="text-[10px] tracking-widest uppercase text-[#b09088] font-light">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bouquets Grid ── */}
      <section id="bouquets" className="max-w-7xl mx-auto px-4 md:px-10 py-12 md:py-16">

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-[#c4957a] mb-2
              flex items-center gap-3">
              <span className="w-8 h-px bg-[#c4957a] inline-block" />
              Our Collection
            </p>
            <h2 className="font-[Cormorant_Garamond] text-[32px] md:text-[40px] text-[#5c3d35]">
              Fresh <em className="italic text-[#c4957a]">Bouquets</em>
            </h2>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[11px] tracking-widest uppercase px-4 py-2 rounded-sm
                  transition-colors border cursor-pointer
                  ${activeCategory === cat
                    ? 'bg-[#c4957a] text-white border-[#c4957a]'
                    : 'bg-white text-[#8b5e52] border-[#e8d5c4] hover:border-[#c4957a]'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <p className="text-[12px] text-[#b09088] font-light mb-6">
          Showing {filtered.length} bouquet{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(bouquet => (
            <BouquetCard key={bouquet.id} product={bouquet} />
          ))}
        </div>
      </section>

      {/* ── Care Guide Banner ── */}
      <section className="bg-[#5c3d35] py-14 px-4 md:px-10 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-[#c4957a] text-2xl mb-4">✿</p>
          <h3 className="font-[Cormorant_Garamond] text-3xl text-[#f5e6de] mb-3">
            Keep Your Bouquet Fresh Longer
          </h3>
          <p className="text-[13px] font-light text-[#a08878] leading-relaxed mb-6 max-w-md mx-auto">
            Trim stems at an angle, change water every 2 days, and keep away from direct sunlight.
            Our flowers last 7–10 days with proper care.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { icon: '✂️', tip: 'Trim stems daily' },
              { icon: '💧', tip: 'Fresh water every 2 days' },
              { icon: '🌡️', tip: 'Keep in cool room' },
              { icon: '☀️', tip: 'Avoid direct sunlight' },
            ].map(({ icon, tip }) => (
              <div key={tip} className="flex items-center gap-2">
                <span className="text-lg">{icon}</span>
                <span className="text-[12px] text-[#c4b5ac] font-light">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}