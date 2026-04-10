import { useState } from 'react';
import { Heart, Plus, Check } from 'lucide-react';
import { useCart } from "../../cart/CartContext";

export default function ProductCard({ product }) {
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const { name, tag, desc, price, oldPrice, rating, reviews, badge, bg } = product;

  const flowerImages = {
  rose: "/images/rose.jpg",
  wildflower: "/images/wildflowers.jpg",
  lavender: "/images/lavender.jpg",
  tulip: "/images/tulip.jpg",
};

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="group w-full bg-white border border-[#e8d5c4] rounded-md
      overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(139,94,82,0.12)]
      transition-all duration-300 cursor-pointer relative">

      {/* Image area */}
      <div className="relative h-[200px] md:h-[240px] overflow-hidden" style={{ background: bg }}>
        <img
  src={flowerImages[product.flowerType]}
  alt={product.name}
  loading="lazy"
  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
/>

        {/* Badge */}
        {badge && (
          <span className={`absolute top-3 left-3 text-[10px] font-medium tracking-widest
            uppercase px-2.5 py-1 rounded-sm z-10
            ${badge === 'New' ? 'bg-[#c4957a] text-white' : ''}
            ${badge === 'Bestseller' ? 'bg-[#f0e0d6] text-[#8b5e52]' : ''}
            ${badge.includes('%') ? 'bg-[#5c3d35] text-[#f5e6de]' : ''}`}>
            {badge}
          </span>
          
        )}

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

        {/* Quick add overlay */}
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
        <p className="text-[10px] tracking-[0.14em] uppercase text-[#b09088] font-light mb-1">{tag}</p>
        <h3 className="font-serif text-[18px] md:text-[20px] font-normal text-[#5c3d35] leading-tight mb-1">
          {name}
        </h3>
        <p className="text-[12px] font-light text-[#a08878] leading-relaxed mb-3">{desc}</p>

        {/* Stars */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`text-xs ${i < rating ? 'text-[#c4957a]' : 'text-[#e8d5c4]'}`}>★</span>
          ))}
          <span className="text-[11px] text-[#a08878] font-light ml-1">({reviews})</span>
        </div>

        {/* Price + Add */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif text-[20px] md:text-[22px] font-medium text-[#5c3d35]">₹{price}</span>
            {oldPrice && (
              <span className="text-[13px] font-light text-[#b09088] line-through">₹{oldPrice}</span>
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