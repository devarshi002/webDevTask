// src/pages/DeliveryInfo.jsx
import { Link } from "react-router-dom";
import { Truck, Clock, MapPin, Package, AlertCircle, CheckCircle } from "lucide-react";

const deliveryZones = [
  { area: "Indiranagar", time: "2–3 hours", charge: "Free above ₹999" },
  { area: "Koramangala", time: "2–3 hours", charge: "Free above ₹999" },
  { area: "HSR Layout", time: "3–4 hours", charge: "Free above ₹999" },
  { area: "Whitefield", time: "4–5 hours", charge: "₹149 flat" },
  { area: "JP Nagar", time: "3–4 hours", charge: "Free above ₹999" },
  { area: "Jayanagar", time: "2–3 hours", charge: "Free above ₹999" },
  { area: "Marathahalli", time: "3–4 hours", charge: "Free above ₹999" },
  { area: "Electronic City", time: "4–5 hours", charge: "₹149 flat" },
  { area: "Hebbal", time: "3–4 hours", charge: "Free above ₹999" },
  { area: "Yelahanka", time: "4–5 hours", charge: "₹149 flat" },
  { area: "Bannerghatta Road", time: "3–4 hours", charge: "Free above ₹999" },
  { area: "Malleswaram", time: "2–3 hours", charge: "Free above ₹999" },
];

const steps = [
  {
    step: "01",
    title: "Place Your Order",
    desc: "Browse our collection, add to cart, and checkout. You'll receive an instant order confirmation email.",
    icon: <Package size={22} strokeWidth={1.5} className="text-[#c4957a]" />,
  },
  {
    step: "02",
    title: "We Prepare Your Flowers",
    desc: "Our florists handcraft your bouquet fresh the same morning. Every arrangement is packed with care.",
    icon: "🌸",
  },
  {
    step: "03",
    title: "Out for Delivery",
    desc: "Your flowers are dispatched with our delivery partner. You'll receive a call before arrival.",
    icon: <Truck size={22} strokeWidth={1.5} className="text-[#c4957a]" />,
  },
  {
    step: "04",
    title: "Delivered with Love",
    desc: "Your flowers arrive fresh and beautifully wrapped. Enjoy and don't forget to share the joy!",
    icon: "💐",
  },
];

export default function DeliveryInfo() {
  return (
    <div className="min-h-screen bg-[#fdf6f0] font-[Jost]">

      {/* Hero */}
      <section className="bg-[#f0e0d6] px-4 md:px-10 py-14 md:py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-[11px] tracking-[0.22em] uppercase text-[#c4957a] mb-3
            flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-[#c4957a] inline-block" />
            Fast & Fresh
            <span className="w-8 h-px bg-[#c4957a] inline-block" />
          </p>
          <h1 className="font-[Cormorant_Garamond] text-[40px] md:text-[56px] text-[#5c3d35]
            font-normal leading-tight mb-4">
            Delivery
            <em className="italic text-[#c4957a]"> Information</em>
          </h1>
          <p className="text-sm font-light text-[#8b6e66] leading-relaxed max-w-md mx-auto">
            We deliver fresh flowers across Bengaluru — same day, on time,
            and always beautifully wrapped.
          </p>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="max-w-5xl mx-auto px-4 md:px-10 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-16">
          {[
            {
              icon: <Clock size={22} strokeWidth={1.5} className="text-[#c4957a]" />,
              title: "Same Day Delivery",
              desc: "Order before 12 PM for same-day delivery across Bengaluru.",
              highlight: "Mon – Sat",
            },
            {
              icon: <Truck size={22} strokeWidth={1.5} className="text-[#c4957a]" />,
              title: "Free Delivery",
              desc: "Enjoy free delivery on all orders above ₹999. Flat ₹99 below that.",
              highlight: "Orders above ₹999",
            },
            {
              icon: <MapPin size={22} strokeWidth={1.5} className="text-[#c4957a]" />,
              title: "Coverage Area",
              desc: "We deliver to 50+ areas across Bengaluru. More cities coming soon.",
              highlight: "Bengaluru Only",
            },
          ].map(({ icon, title, desc, highlight }) => (
            <div key={title} className="bg-white border border-[#e8d5c4] rounded-md p-6
              hover:shadow-sm transition-shadow">
              <div className="w-10 h-10 rounded-full bg-[#f0e0d6] flex items-center
                justify-center mb-4">
                {icon}
              </div>
              <span className="text-[10px] tracking-widest uppercase text-[#c4957a]
                bg-[#f0e0d6] px-2.5 py-1 rounded-sm">
                {highlight}
              </span>
              <h3 className="font-[Cormorant_Garamond] text-[20px] text-[#5c3d35] mt-3 mb-2">
                {title}
              </h3>
              <p className="text-[13px] font-light text-[#8b6e66] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <p className="text-[11px] tracking-[0.22em] uppercase text-[#c4957a] mb-2
              flex items-center justify-center gap-3">
              <span className="w-8 h-px bg-[#c4957a] inline-block" />
              How It Works
            </p>
            <h2 className="font-[Cormorant_Garamond] text-[32px] md:text-[38px] text-[#5c3d35]">
              From Order to Your <em className="italic text-[#c4957a]">Doorstep</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {steps.map(({ step, title, desc, icon }) => (
              <div key={step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-[#f0e0d6] border border-[#e8d5c4]
                  flex items-center justify-center mx-auto mb-4 text-2xl">
                  {typeof icon === "string" ? icon : icon}
                </div>
                <span className="font-[Cormorant_Garamond] text-[36px] text-[#e8d5c4]
                  leading-none block mb-1">
                  {step}
                </span>
                <h3 className="font-serif text-[16px] text-[#5c3d35] mb-2">{title}</h3>
                <p className="text-[12px] font-light text-[#a08878] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Zones Table */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <p className="text-[11px] tracking-[0.22em] uppercase text-[#c4957a] mb-2
              flex items-center justify-center gap-3">
              <span className="w-8 h-px bg-[#c4957a] inline-block" />
              Delivery Zones
            </p>
            <h2 className="font-[Cormorant_Garamond] text-[32px] md:text-[38px] text-[#5c3d35]">
              Areas We <em className="italic text-[#c4957a]">Cover</em>
            </h2>
          </div>

          <div className="bg-white border border-[#e8d5c4] rounded-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#f0e0d6]">
                <tr>
                  {["Area", "Estimated Time", "Delivery Charge"].map(h => (
                    <th key={h} className="text-left text-[11px] tracking-widest uppercase
                      text-[#8b5e52] px-5 py-3 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {deliveryZones.map((zone, i) => (
                  <tr key={zone.area}
                    className={`border-t border-[#e8d5c4]
                      ${i % 2 === 0 ? "bg-white" : "bg-[#fdf6f0]"}`}>
                    <td className="px-5 py-3 text-[13px] text-[#5c3d35] font-medium">
                      {zone.area}
                    </td>
                    <td className="px-5 py-3 text-[13px] text-[#8b6e66] font-light">
                      {zone.time}
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-[12px] px-2.5 py-1 rounded-sm
                        ${zone.charge === "Free above ₹999"
                          ? "bg-green-50 text-green-700"
                          : "bg-[#f0e0d6] text-[#8b5e52]"}`}>
                        {zone.charge}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[12px] font-light text-[#b09088] mt-3 text-center">
            Don't see your area? <Link to="/contact" className="text-[#c4957a]
              hover:text-[#8b5e52] transition-colors">Contact us</Link> — we may still deliver!
          </p>
        </div>

        {/* Important Notes */}
        <div className="mb-16">
          <h2 className="font-[Cormorant_Garamond] text-[28px] text-[#5c3d35] mb-6">
            Important Notes
          </h2>
          <div className="flex flex-col gap-3">
            {[
              { type: "info", text: "Orders placed after 12 PM will be delivered the next business day unless otherwise specified." },
              { type: "info", text: "Our delivery partner will call 30 minutes before arriving. Please ensure someone is available." },
              { type: "info", text: "We do not deliver on Sundays and public holidays." },
              { type: "warning", text: "During peak seasons (Valentine's Day, Mother's Day), delivery slots fill up fast. Order early!" },
              { type: "success", text: "All orders above ₹999 automatically qualify for free delivery — no code needed." },
              { type: "success", text: "You can track your order status anytime from the My Orders section in your account." },
            ].map(({ type, text }, i) => (
              <div key={i} className={`flex items-start gap-3 p-4 rounded-md border
                ${type === "warning"
                  ? "bg-amber-50 border-amber-200"
                  : type === "success"
                  ? "bg-green-50 border-green-200"
                  : "bg-blue-50 border-blue-200"}`}>
                {type === "success"
                  ? <CheckCircle size={16} strokeWidth={1.5} className="text-green-600 shrink-0 mt-0.5" />
                  : <AlertCircle size={16} strokeWidth={1.5}
                      className={`shrink-0 mt-0.5
                        ${type === "warning" ? "text-amber-600" : "text-blue-600"}`} />}
                <p className={`text-[13px] font-light leading-relaxed
                  ${type === "warning"
                    ? "text-amber-800"
                    : type === "success"
                    ? "text-green-800"
                    : "text-blue-800"}`}>
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#3d2820] py-14 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <p className="text-3xl mb-4">🚚</p>
          <h3 className="font-[Cormorant_Garamond] text-3xl text-[#f5e6de] mb-3">
            Ready to Order?
          </h3>
          <p className="text-[13px] font-light text-[#a08878] mb-6 leading-relaxed">
            Fresh flowers delivered to your door — same day across Bengaluru.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/shop"
              className="text-xs tracking-widest uppercase text-white bg-[#c4957a]
                hover:bg-[#b0806a] px-8 py-3.5 rounded-sm transition-colors">
              Shop Now
            </Link>
            <Link to="/contact"
              className="text-xs tracking-widest uppercase text-[#c4957a]
                border border-[#c4957a] hover:bg-[#c4957a] hover:text-white
                px-8 py-3.5 rounded-sm transition-colors">
              Have Questions?
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}