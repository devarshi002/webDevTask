import { useState } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Please fill all required fields");
      return;
    }
    setLoading(true);
    setError("");

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject || "General Inquiry",
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setSuccess(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#fdf6f0] font-[Jost]">

      {/* Hero */}
      <section className="bg-[#f0e0d6] px-4 md:px-10 py-14 md:py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-[11px] tracking-[0.22em] uppercase text-[#c4957a] mb-3
            flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-[#c4957a] inline-block" />
            We'd Love to Hear from You
            <span className="w-8 h-px bg-[#c4957a] inline-block" />
          </p>
          <h1 className="font-[Cormorant_Garamond] text-[40px] md:text-[56px] text-[#5c3d35]
            font-normal leading-tight mb-4">
            Get in <em className="italic text-[#c4957a]">Touch</em>
          </h1>
          <p className="text-sm font-light text-[#8b6e66] leading-relaxed max-w-md mx-auto">
            Have a question about an order, need help with a custom arrangement,
            or just want to say hello? We're here for you 🌸
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 md:px-10 py-12 md:py-16
        grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">

        {/* Left — Contact Info */}
        <div>
          <h2 className="font-[Cormorant_Garamond] text-[28px] md:text-[32px] text-[#5c3d35] mb-8">
            Contact Information
          </h2>

          <div className="flex flex-col gap-6">
            {[
              {
                icon: <Mail size={18} strokeWidth={1.5} className="text-[#c4957a]" />,
                label: "Email Us",
                value: "hello@petalandco.in",
                sub: "We reply within 24 hours",
              },
              {
                icon: <Phone size={18} strokeWidth={1.5} className="text-[#c4957a]" />,
                label: "Call Us",
                value: "+91 98765 43210",
                sub: "Mon–Sat, 9 AM to 6 PM",
              },
              {
                icon: <MapPin size={18} strokeWidth={1.5} className="text-[#c4957a]" />,
                label: "Visit Us",
                value: "12, Rose Garden Lane, Indiranagar",
                sub: "Bengaluru, Karnataka 560038",
              },
              {
                icon: <Clock size={18} strokeWidth={1.5} className="text-[#c4957a]" />,
                label: "Working Hours",
                value: "Monday – Saturday",
                sub: "9:00 AM – 6:00 PM IST",
              },
            ].map(({ icon, label, value, sub }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#f0e0d6] border border-[#e8d5c4]
                  flex items-center justify-center shrink-0 mt-0.5">
                  {icon}
                </div>
                <div>
                  <p className="text-[11px] tracking-[0.14em] uppercase text-[#b09088] mb-1">
                    {label}
                  </p>
                  <p className="text-[14px] text-[#5c3d35] font-medium">{value}</p>
                  <p className="text-[12px] font-light text-[#a08878] mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-[#e8d5c4] my-8" />

          {/* Quick links */}
          <div>
            <p className="text-[11px] tracking-[0.18em] uppercase text-[#5c3d35] mb-4 font-medium">
              Quick Help
            </p>
            <div className="flex flex-col gap-2">
              {[
                { label: "Track your order", path: "/my-orders" },
                { label: "View FAQs", path: "/faqs" },
                { label: "Delivery information", path: "/delivery-info" },
                { label: "Returns & refunds", path: "/returns" },
              ].map(({ label, path }) => (
                <a key={label} href={path}
                  className="text-[13px] font-light text-[#c4957a] hover:text-[#8b5e52]
                    transition-colors flex items-center gap-2">
                  → {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Contact Form */}
        <div>
          <h2 className="font-[Cormorant_Garamond] text-[28px] md:text-[32px] text-[#5c3d35] mb-8">
            Send a Message
          </h2>

          {success ? (
            <div className="bg-white border border-[#e8d5c4] rounded-md p-10 text-center">
              <p className="text-4xl mb-4">🌸</p>
              <h3 className="font-[Cormorant_Garamond] text-2xl text-[#5c3d35] mb-2">
                Message Sent!
              </h3>
              <p className="text-[13px] font-light text-[#a08878] leading-relaxed mb-6">
                Thank you for reaching out. We'll get back to you within 24 hours.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="text-xs tracking-widest uppercase text-white bg-[#c4957a]
                  hover:bg-[#b0806a] px-8 py-3 rounded-sm transition-colors">
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600
                  text-xs px-4 py-3 rounded-sm tracking-wide">
                  {error}
                </div>
              )}

              {[
                { label: "Full Name *", name: "name", type: "text" },
                { label: "Email Address *", name: "email", type: "email" },
                { label: "Subject", name: "subject", type: "text" },
              ].map(({ label, name, type }) => (
                <div key={name} className="flex flex-col gap-1.5">
                  <label className="text-[11px] tracking-[0.14em] uppercase text-[#8b5e52]">
                    {label}
                  </label>
                  <input
                    type={type}
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    className="border border-[#e8d5c4] focus:border-[#c4957a] bg-white
                      px-4 py-2.5 rounded-sm text-sm text-[#5c3d35] outline-none
                      transition-colors placeholder:text-[#d4b8a8]"
                  />
                </div>
              ))}

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] tracking-[0.14em] uppercase text-[#8b5e52]">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell us how we can help you..."
                  className="border border-[#e8d5c4] focus:border-[#c4957a] bg-white
                    px-4 py-2.5 rounded-sm text-sm text-[#5c3d35] outline-none
                    transition-colors resize-none placeholder:text-[#d4b8a8]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`text-xs tracking-widest uppercase text-white py-4
                  rounded-sm transition-colors mt-2
                  ${loading
                    ? "bg-[#d4b5a8] cursor-not-allowed"
                    : "bg-[#c4957a] hover:bg-[#b0806a]"}`}
              >
                {loading ? "Sending..." : "Send Message 🌸"}
              </button>

              <p className="text-[11px] font-light text-[#b09088] text-center">
                We typically respond within 24 hours on business days.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Bottom banner */}
      <section className="bg-[#5c3d35] py-12 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <p className="font-[Cormorant_Garamond] text-2xl md:text-3xl text-[#f5e6de] mb-3">
            Need Something Urgently?
          </p>
          <p className="text-[13px] font-light text-[#a08878] mb-6">
            For same-day orders or urgent queries, call us directly.
          </p>
          <a href="tel:+919876543210"
            className="text-xs tracking-widest uppercase text-white bg-[#c4957a]
              hover:bg-[#b0806a] px-8 py-3.5 rounded-sm transition-colors inline-block">
            📞 Call Now — +91 98765 43210
          </a>
        </div>
      </section>

    </div>
  );
}