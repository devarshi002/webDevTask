// src/pages/Returns.jsx
import { Link } from "react-router-dom";
import { CheckCircle, XCircle, AlertCircle, RefreshCw, Clock, Phone } from "lucide-react";

const eligibleReasons = [
  "Flowers arrived wilted, damaged, or in poor condition",
  "Wrong flowers delivered (different from what was ordered)",
  "Significant delay in delivery causing flowers to wilt",
  "Missing items from your order",
  "Flowers arrived with pests or disease",
];

const notEligibleReasons = [
  "Change of mind after delivery",
  "Flowers wilted due to improper care after delivery",
  "Minor colour variations from website photos (natural variation)",
  "Claims made after 24 hours of delivery",
  "Flowers gifted to someone else who didn't like them",
];

const refundTimeline = [
  {
    step: "01",
    title: "Contact Us",
    desc: "Reach out within 24 hours of delivery via email or phone with photos of the issue.",
    icon: <Phone size={20} strokeWidth={1.5} className="text-[#c4957a]" />,
    time: "Within 24 hrs of delivery",
  },
  {
    step: "02",
    title: "We Review",
    desc: "Our team reviews your complaint and photos within 2–4 hours on business days.",
    icon: <AlertCircle size={20} strokeWidth={1.5} className="text-[#c4957a]" />,
    time: "2–4 hours",
  },
  {
    step: "03",
    title: "Resolution Offered",
    desc: "We offer a replacement delivery or full refund based on your preference.",
    icon: <RefreshCw size={20} strokeWidth={1.5} className="text-[#c4957a]" />,
    time: "Same day",
  },
  {
    step: "04",
    title: "Refund Processed",
    desc: "If refund is chosen, it's processed within 5–7 business days to your original payment method.",
    icon: <CheckCircle size={20} strokeWidth={1.5} className="text-[#c4957a]" />,
    time: "5–7 business days",
  },
];

export default function Returns() {
  return (
    <div className="min-h-screen bg-[#fdf6f0] font-[Jost]">

      {/* Hero */}
      <section className="bg-[#f0e0d6] px-4 md:px-10 py-14 md:py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-[11px] tracking-[0.22em] uppercase text-[#c4957a] mb-3
            flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-[#c4957a] inline-block" />
            100% Satisfaction Guaranteed
            <span className="w-8 h-px bg-[#c4957a] inline-block" />
          </p>
          <h1 className="font-[Cormorant_Garamond] text-[40px] md:text-[56px] text-[#5c3d35]
            font-normal leading-tight mb-4">
            Returns &amp;
            <em className="italic text-[#c4957a]"> Refunds</em>
          </h1>
          <p className="text-sm font-light text-[#8b6e66] leading-relaxed max-w-md mx-auto">
            We stand behind every bouquet we deliver. If something isn't right,
            we'll make it right — no questions asked.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 md:px-10 py-12 md:py-16">

        {/* Guarantee banner */}
        <div className="bg-[#3d2820] rounded-md p-6 md:p-8 mb-12 text-center">
          <p className="text-4xl mb-4">💐</p>
          <h2 className="font-[Cormorant_Garamond] text-[28px] md:text-[32px]
            text-[#f5e6de] mb-3">
            Our Happy Flower Guarantee
          </h2>
          <p className="text-[14px] font-light text-[#a08878] leading-relaxed
            max-w-lg mx-auto mb-6">
            If you're not completely happy with your flowers for any reason,
            contact us within <strong className="text-[#c4957a]">24 hours</strong> of
            delivery and we'll send a replacement or issue a full refund.
            No hassle. No questions asked.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Free Replacement", "Full Refund", "No Questions Asked", "24hr Response"].map(tag => (
              <span key={tag} className="text-[11px] tracking-widest uppercase
                text-[#c4957a] border border-[#c4957a] px-3 py-1.5 rounded-sm">
                ✦ {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Eligible / Not eligible */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">

          {/* Eligible */}
          <div className="bg-white border border-[#e8d5c4] rounded-md overflow-hidden">
            <div className="bg-green-50 border-b border-green-200 px-5 py-4
              flex items-center gap-3">
              <CheckCircle size={18} strokeWidth={1.5} className="text-green-600" />
              <h3 className="font-[Cormorant_Garamond] text-[20px] text-green-800">
                Eligible for Return / Refund
              </h3>
            </div>
            <div className="p-5 flex flex-col gap-3">
              {eligibleReasons.map((reason, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle size={14} strokeWidth={1.5}
                    className="text-green-500 shrink-0 mt-0.5" />
                  <p className="text-[13px] font-light text-[#5c3d35] leading-relaxed">
                    {reason}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Not eligible */}
          <div className="bg-white border border-[#e8d5c4] rounded-md overflow-hidden">
            <div className="bg-red-50 border-b border-red-200 px-5 py-4
              flex items-center gap-3">
              <XCircle size={18} strokeWidth={1.5} className="text-red-500" />
              <h3 className="font-[Cormorant_Garamond] text-[20px] text-red-800">
                Not Eligible for Return
              </h3>
            </div>
            <div className="p-5 flex flex-col gap-3">
              {notEligibleReasons.map((reason, i) => (
                <div key={i} className="flex items-start gap-3">
                  <XCircle size={14} strokeWidth={1.5}
                    className="text-red-400 shrink-0 mt-0.5" />
                  <p className="text-[13px] font-light text-[#5c3d35] leading-relaxed">
                    {reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How to claim */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-[11px] tracking-[0.22em] uppercase text-[#c4957a] mb-2
              flex items-center justify-center gap-3">
              <span className="w-8 h-px bg-[#c4957a] inline-block" />
              How to Claim
            </p>
            <h2 className="font-[Cormorant_Garamond] text-[32px] text-[#5c3d35]">
              Refund <em className="italic text-[#c4957a]">Process</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {refundTimeline.map(({ step, title, desc, icon, time }) => (
              <div key={step} className="bg-white border border-[#e8d5c4] rounded-md p-5
                text-center hover:shadow-sm transition-shadow">
                <div className="w-12 h-12 rounded-full bg-[#f0e0d6] flex items-center
                  justify-center mx-auto mb-3">
                  {icon}
                </div>
                <span className="font-[Cormorant_Garamond] text-[32px] text-[#e8d5c4]
                  leading-none block mb-2">
                  {step}
                </span>
                <h3 className="font-serif text-[15px] text-[#5c3d35] mb-2">{title}</h3>
                <p className="text-[12px] font-light text-[#a08878] leading-relaxed mb-3">
                  {desc}
                </p>
                <span className="text-[10px] tracking-widest uppercase text-[#c4957a]
                  bg-[#f0e0d6] px-2.5 py-1 rounded-sm">
                  <Clock size={10} className="inline mr-1" />
                  {time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* What to include */}
        <div className="bg-amber-50 border border-amber-200 rounded-md p-6 md:p-8 mb-12">
          <div className="flex items-start gap-4">
            <AlertCircle size={22} strokeWidth={1.5} className="text-amber-600 shrink-0 mt-1" />
            <div>
              <h3 className="font-[Cormorant_Garamond] text-[22px] text-amber-800 mb-3">
                What to Include in Your Complaint
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "📸 Clear photos of the damaged/wilted flowers",
                  "🧾 Your order ID or payment ID",
                  "📧 Email address used for the order",
                  "📝 Brief description of the issue",
                  "📅 Date and time of delivery",
                  "✅ Your preference — replacement or refund",
                ].map((item, i) => (
                  <p key={i} className="text-[13px] font-light text-amber-800 leading-relaxed">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cancellation policy */}
        <div className="bg-white border border-[#e8d5c4] rounded-md p-6 md:p-8 mb-12">
          <h3 className="font-[Cormorant_Garamond] text-[24px] text-[#5c3d35] mb-5">
            Cancellation Policy
          </h3>
          <div className="flex flex-col gap-4">
            {[
              {
                time: "More than 2 hours before delivery",
                policy: "Full refund — no questions asked.",
                color: "green",
              },
              {
                time: "Less than 2 hours before delivery",
                policy: "50% refund — flowers may already be prepared.",
                color: "amber",
              },
              {
                time: "After delivery",
                policy: "No cancellation possible — contact us if there's an issue with quality.",
                color: "red",
              },
            ].map(({ time, policy, color }) => (
              <div key={time} className={`flex items-start gap-4 p-4 rounded-md
                ${color === "green"
                  ? "bg-green-50 border border-green-200"
                  : color === "amber"
                  ? "bg-amber-50 border border-amber-200"
                  : "bg-red-50 border border-red-200"}`}>
                <Clock size={16} strokeWidth={1.5}
                  className={`shrink-0 mt-0.5
                    ${color === "green"
                      ? "text-green-600"
                      : color === "amber"
                      ? "text-amber-600"
                      : "text-red-500"}`} />
                <div>
                  <p className={`text-[13px] font-medium mb-1
                    ${color === "green"
                      ? "text-green-800"
                      : color === "amber"
                      ? "text-amber-800"
                      : "text-red-800"}`}>
                    {time}
                  </p>
                  <p className={`text-[13px] font-light
                    ${color === "green"
                      ? "text-green-700"
                      : color === "amber"
                      ? "text-amber-700"
                      : "text-red-700"}`}>
                    {policy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact for refund */}
        <div className="bg-[#f0e0d6] border border-[#e8d5c4] rounded-md p-6 md:p-8
          flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-[Cormorant_Garamond] text-[24px] text-[#5c3d35] mb-2">
              Ready to Raise a Complaint?
            </h3>
            <p className="text-[13px] font-light text-[#8b6e66] leading-relaxed max-w-sm">
              Contact us within 24 hours of delivery. We're here Mon–Sat, 9 AM to 6 PM.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link to="/contact"
              className="text-xs tracking-widest uppercase text-white bg-[#c4957a]
                hover:bg-[#b0806a] px-6 py-3 rounded-sm transition-colors text-center">
              Contact Us
            </Link>
            <a href="mailto:hello@petalandco.in"
              className="text-xs tracking-widest uppercase text-[#8b5e52]
                border border-[#c4957a] hover:bg-[#c4957a] hover:text-white
                px-6 py-3 rounded-sm transition-colors text-center">
              Email Us
            </a>
          </div>
        </div>

      </section>

      {/* Bottom CTA */}
      <section className="bg-[#5c3d35] py-14 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <p className="text-3xl mb-4">🌸</p>
          <h3 className="font-[Cormorant_Garamond] text-3xl text-[#f5e6de] mb-3">
            Shop with Confidence
          </h3>
          <p className="text-[13px] font-light text-[#a08878] mb-6 leading-relaxed">
            Every order is backed by our Happy Flower Guarantee.
            Fresh flowers or your money back.
          </p>
          <Link to="/shop"
            className="text-xs tracking-widest uppercase text-white bg-[#c4957a]
              hover:bg-[#b0806a] px-8 py-3.5 rounded-sm transition-colors inline-block">
            Shop Now
          </Link>
        </div>
      </section>

    </div>
  );
}