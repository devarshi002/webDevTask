// src/pages/Home.jsx
import HeroSection from '../components/home/HeroSection';
import ProductCard from '../components/shop/ProductCard';
import { products } from '../data/products';

export default function Home() {
  return (
    <main>
      <HeroSection />

      {/* Best Sellers */}
      <section className="bg-[#fdf6f0] py-14 md:py-20 px-5 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <p className="text-[11px] tracking-[0.22em] uppercase text-[#c4957a] mb-3
              flex items-center justify-center gap-3">
              <span className="w-6 md:w-8 h-px bg-[#c4957a] inline-block" />
              Handpicked For You
              <span className="w-6 md:w-8 h-px bg-[#c4957a] inline-block" />
            </p>
            <h2 className="font-[Cormorant_Garamond] text-[32px] md:text-[42px]
              font-normal text-[#5c3d35] leading-tight">
              Our Best <em className="italic text-[#c4957a]">Sellers</em>
            </h2>
            <p className="text-sm font-light text-[#a08878] mt-3 max-w-md mx-auto leading-relaxed">
              Flowers that our customers keep coming back for — fresh, beautiful, and full of meaning.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-10 md:mt-12">
            <button className="text-xs tracking-[0.16em] uppercase text-[#8b5e52]
              border border-[#c4957a] hover:bg-[#c4957a] hover:text-white
              px-8 md:px-10 py-3.5 rounded-sm transition-all duration-200 font-medium">
              View All Flowers
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-[#f0e0d6] py-12 md:py-16 px-5 md:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {[
            { icon: '✿', title: 'Fresh Daily', desc: 'Every bouquet is handpicked the same morning it ships.' },
            { icon: '✦', title: 'Same-Day Delivery', desc: 'Order before 12 PM for same-day delivery in Bengaluru.' },
            { icon: '❀', title: 'Sustainably Grown', desc: 'We source only from local, eco-conscious flower farms.' },
            { icon: '♡', title: 'Happy Guarantee', desc: "Not in love with your order? We'll replace it, no questions asked." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="text-center">
              <div className="text-[24px] md:text-[28px] text-[#c4957a] mb-3">{icon}</div>
              <h3 className="font-[Cormorant_Garamond] text-[16px] md:text-[18px]
                font-normal text-[#5c3d35] mb-2">{title}</h3>
              <p className="text-[12px] md:text-[13px] font-light text-[#8b6e66] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Occasions */}
      <section className="bg-[#fdf6f0] py-14 md:py-20 px-5 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <p className="text-[11px] tracking-[0.22em] uppercase text-[#c4957a] mb-3
              flex items-center justify-center gap-3">
              <span className="w-6 md:w-8 h-px bg-[#c4957a] inline-block" />
              Shop By Occasion
              <span className="w-6 md:w-8 h-px bg-[#c4957a] inline-block" />
            </p>
            <h2 className="font-[Cormorant_Garamond] text-[32px] md:text-[42px] font-normal text-[#5c3d35]">
              Every <em className="italic text-[#c4957a]">Moment</em> Deserves Flowers
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { label: 'Birthdays', bg: '#fce8e0', emoji: '🎂' },
              { label: 'Anniversaries', bg: '#f4e0ec', emoji: '💍' },
              { label: 'Sympathy', bg: '#e8f0e4', emoji: '🕊️' },
              { label: 'Just Because', bg: '#e8e4f4', emoji: '✨' },
            ].map(({ label, bg, emoji }) => (
              <div key={label}
                className="rounded-md p-5 md:p-8 text-center cursor-pointer
                  hover:-translate-y-1 hover:shadow-md transition-all duration-200"
                style={{ background: bg }}>
                <div className="text-2xl md:text-3xl mb-2 md:mb-3">{emoji}</div>
                <h4 className="font-[Cormorant_Garamond] text-[16px] md:text-[18px] text-[#5c3d35]">
                  {label}
                </h4>
                <p className="text-[10px] md:text-[11px] tracking-widest uppercase
                  text-[#c4957a] mt-1 md:mt-2 font-light">Shop Now →</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-[#5c3d35] py-14 md:py-20 px-5 md:px-10 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-[#c4957a] text-3xl mb-5">❝</p>
          <p className="font-[Cormorant_Garamond] text-[20px] md:text-[24px] font-light
            italic text-[#f5e6de] leading-relaxed mb-7">
            The flowers arrived so fresh and beautifully arranged. It felt like receiving a piece of a garden.
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#c4957a] flex items-center
              justify-center font-[Cormorant_Garamond] text-white text-sm">P</div>
            <div className="text-left">
              <p className="text-[#f5e6de] text-sm font-medium">Priya Sharma</p>
              <p className="text-[#a08878] text-xs font-light tracking-wide">Bengaluru · Verified Buyer</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}