import { useState } from "react";
import { Check, X } from "lucide-react";
import { Link } from "react-router-dom";
import { plans, whySubscribe, faqs, bottomCta } from "../data/subscriptions";
import { supabase } from "../lib/supabase";

function InquiryModal({ plan, billing, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const price = billing === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.phone) {
      setError("Please fill all fields");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("subscription_inquiries").insert([{
      name: form.name,
      email: form.email,
      phone: form.phone,
      plan_id: plan.id,
      plan_name: plan.name,
      billing,
      price,
    }]);
    if (error) {
      setError("Something went wrong. Please try again.");
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-md w-full max-w-md shadow-2xl overflow-hidden">

        {/* Modal Header */}
        <div className="bg-[#f0e0d6] px-6 py-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] tracking-[0.16em] uppercase text-[#c4957a] mb-0.5">
              Selected Plan
            </p>
            <h3 className="font-[Cormorant_Garamond] text-[22px] text-[#5c3d35]">
              {plan.emoji} {plan.name}
            </h3>
            <p className="text-[12px] text-[#a08878] font-light">
              ₹{price}/mo · {billing === "yearly" ? "Billed yearly" : "Billed monthly"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#8b5e52] hover:text-[#c4957a] transition-colors"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <div className="px-6 py-6">
          {success ? (
            <div className="text-center py-6">
              <p className="text-4xl mb-4">🌸</p>
              <h4 className="font-[Cormorant_Garamond] text-[24px] text-[#5c3d35] mb-2">
                We'll be in touch!
              </h4>
              <p className="text-[13px] font-light text-[#a08878] leading-relaxed mb-6">
                Thank you <strong className="text-[#5c3d35]">{form.name}</strong>!
                Our team will contact you at <strong className="text-[#5c3d35]">{form.phone}</strong> within 24 hours to set up your subscription.
              </p>
              <button
                onClick={onClose}
                className="text-xs tracking-widest uppercase text-white
                  bg-[#c4957a] hover:bg-[#b0806a] px-8 py-3 rounded-sm transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <p className="text-[13px] font-light text-[#8b6e66] leading-relaxed mb-6">
                Fill in your details and our team will contact you within
                <strong className="text-[#5c3d35]"> 24 hours</strong> to complete your subscription.
              </p>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-xs
                  px-4 py-3 rounded-sm mb-4 tracking-wide">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {[
                  { label: "Full Name *", name: "name", type: "text", placeholder: "Priya Sharma" },
                  { label: "Email *", name: "email", type: "email", placeholder: "your@email.com" },
                  { label: "Phone *", name: "phone", type: "tel", placeholder: "+91 98765 43210" },
                ].map(({ label, name, type, placeholder }) => (
                  <div key={name} className="flex flex-col gap-1.5">
                    <label className="text-[11px] tracking-[0.14em] uppercase text-[#7a5c52]">
                      {label}
                    </label>
                    <input
                      type={type}
                      name={name}
                      value={form[name]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      className="border border-[#e8d5c4] focus:border-[#c4957a] outline-none
                        px-3.5 py-2.5 text-sm font-light text-[#5c3d35] rounded-sm
                        placeholder-[#c4b5ac] transition-colors bg-[#fdf6f0]"
                    />
                  </div>
                ))}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 text-xs tracking-widest uppercase text-white
                    bg-[#c4957a] hover:bg-[#b0806a] py-3.5 rounded-sm
                    transition-colors disabled:opacity-60"
                >
                  {loading ? "Submitting..." : "Request Subscription"}
                </button>
              </form>

              <p className="text-center text-[11px] font-light text-[#b09088] mt-4">
                No payment needed now · Our team will guide you through 🌸
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Subscriptions() {
  const [billing, setBilling] = useState("monthly");
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <div className="bg-[#fdf6f0] font-[Jost] min-h-screen">

      {/* Inquiry Modal */}
      {selectedPlan && (
        <InquiryModal
          plan={selectedPlan}
          billing={billing}
          onClose={() => setSelectedPlan(null)}
        />
      )}

      {/* Hero */}
      <section className="bg-[#3d2820] py-20 px-6 text-center">
        <p className="text-[11px] tracking-[0.22em] uppercase text-[#c4957a] mb-4 flex items-center justify-center gap-3">
          <span className="w-8 h-px bg-[#c4957a] inline-block" />
          Membership Plans
          <span className="w-8 h-px bg-[#c4957a] inline-block" />
        </p>
        <h1 className="font-[Cormorant_Garamond] text-[52px] font-normal text-[#f5e6de] leading-tight mb-4">
          Flowers That{" "}
          <em className="italic text-[#c4957a]">Never Stop</em> Coming
        </h1>
        <p className="text-sm font-light text-[#a08878] max-w-md mx-auto leading-relaxed mb-10">
          Subscribe and wake up to fresh blooms every week — handpicked,
          delivered, and always beautiful.
        </p>

        {/* Billing Toggle */}
        <div className="inline-flex items-center bg-[#2e1e18] border border-[#5c3d35] rounded-sm p-1 gap-1">
          <button
            onClick={() => setBilling("monthly")}
            className={`text-xs tracking-widest uppercase px-5 py-2 rounded-sm transition-all
              ${billing === "monthly"
                ? "bg-[#c4957a] text-white"
                : "text-[#a08878] hover:text-[#f5e6de]"}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling("yearly")}
            className={`text-xs tracking-widest uppercase px-5 py-2 rounded-sm transition-all flex items-center gap-2
              ${billing === "yearly"
                ? "bg-[#c4957a] text-white"
                : "text-[#a08878] hover:text-[#f5e6de]"}`}
          >
            Yearly
            <span className="bg-[#5c3d35] text-[#c4957a] text-[10px] px-1.5 py-0.5 rounded-sm">
              Save 20%
            </span>
          </button>
        </div>
      </section>

      {/* Plans */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const price = billing === "monthly"
              ? plan.monthlyPrice
              : plan.yearlyPrice;

            return (
              <div
                key={plan.id}
                className={`relative rounded-md overflow-hidden border transition-all duration-300
                  hover:-translate-y-1 hover:shadow-xl
                  ${plan.isPremium
                    ? "border-[#c4957a] shadow-lg"
                    : "border-[#e8d5c4]"}`}
                style={{ background: plan.isPremium ? plan.color : "white" }}
              >
                {plan.badge && (
                  <div className={`text-center py-2 text-[10px] tracking-widest uppercase font-medium
                    ${plan.isPremium
                      ? "bg-[#c4957a] text-white"
                      : "bg-[#f0e0d6] text-[#8b5e52]"}`}>
                    {plan.badge}
                  </div>
                )}

                <div className="p-8">
                  <div className="mb-6">
                    <span className="text-3xl">{plan.emoji}</span>
                    <h3 className={`font-[Cormorant_Garamond] text-[26px] mt-2
                      ${plan.isPremium ? "text-[#f5e6de]" : "text-[#5c3d35]"}`}>
                      {plan.name}
                    </h3>
                    <p className={`text-[12px] font-light mt-1
                      ${plan.isPremium ? "text-[#a08878]" : "text-[#b09088]"}`}>
                      {plan.tagline}
                    </p>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                      <span className={`font-[Cormorant_Garamond] text-[48px] font-medium leading-none
                        ${plan.isPremium ? "text-[#f5e6de]" : "text-[#5c3d35]"}`}>
                        ₹{price}
                      </span>
                      <span className={`text-sm font-light
                        ${plan.isPremium ? "text-[#a08878]" : "text-[#b09088]"}`}>
                        /mo
                      </span>
                    </div>
                    {billing === "yearly" && (
                      <p className="text-[11px] mt-1 text-[#c4957a]">
                        Billed ₹{price * 12}/year
                      </p>
                    )}
                  </div>

                  <ul className="flex flex-col gap-3 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check
                          size={14}
                          strokeWidth={2}
                          className="shrink-0 mt-0.5"
                          color={plan.isPremium ? "#c4957a" : "#8fb87a"}
                        />
                        <span className={`text-[13px] font-light
                          ${plan.isPremium ? "text-[#d4c4bc]" : "text-[#7a5c52]"}`}>
                          {f}
                        </span>
                      </li>
                    ))}
                    {plan.missing.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 opacity-40">
                        <span className="w-3.5 h-px bg-current mt-2 shrink-0" />
                        <span className={`text-[13px] font-light
                          ${plan.isPremium ? "text-[#a08878]" : "text-[#b09088]"}`}>
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setSelectedPlan(plan)}
                    className={`w-full text-xs tracking-widest uppercase py-3.5 rounded-sm
                      transition-colors font-medium
                      ${plan.isPremium
                        ? "bg-[#c4957a] hover:bg-[#d4a58a] text-white"
                        : "border border-[#c4957a] text-[#c4957a] hover:bg-[#c4957a] hover:text-white"}`}
                  >
                    Get {plan.name}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why Subscribe */}
      <section className="bg-[#f0e0d6] py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-[Cormorant_Garamond] text-[38px] text-[#5c3d35]">
              Why <em className="italic text-[#c4957a]">Subscribe?</em>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {whySubscribe.map(({ icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="text-[28px] text-[#c4957a] mb-3">{icon}</div>
                <h4 className="font-[Cormorant_Garamond] text-[18px] text-[#5c3d35] mb-2">
                  {title}
                </h4>
                <p className="text-[12px] font-light text-[#8b6e66] leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-2xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="font-[Cormorant_Garamond] text-[38px] text-[#5c3d35]">
            Common <em className="italic text-[#c4957a]">Questions</em>
          </h2>
        </div>
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-[#e8d5c4] rounded-md bg-white overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left
                  text-[13px] text-[#5c3d35] font-medium tracking-wide bg-transparent border-none cursor-pointer"
              >
                {faq.q}
                <span className={`text-[#c4957a] text-lg transition-transform duration-200
                  ${openFaq === i ? "rotate-45" : ""}`}>
                  +
                </span>
              </button>
              {openFaq === i && (
                <div className="px-6 pb-4">
                  <p className="text-[13px] font-light text-[#8b6e66] leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#5c3d35] py-16 px-6 text-center">
        <h2 className="font-[Cormorant_Garamond] text-[38px] text-[#f5e6de] mb-4">
          {bottomCta.heading}{" "}
          <em className="italic text-[#c4957a]">{bottomCta.headingItalic}</em>
        </h2>
        <p className="text-sm font-light text-[#a08878] mb-8 max-w-sm mx-auto">
          {bottomCta.subtext}
        </p>
        <Link
          to={bottomCta.buttonLink}
          className="inline-block text-xs tracking-widest uppercase text-white
            bg-[#c4957a] hover:bg-[#d4a58a] px-10 py-4 rounded-sm transition-colors"
        >
          {bottomCta.buttonText}
        </Link>
      </section>

    </div>
  );
}