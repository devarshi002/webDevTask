// src/pages/FAQs.jsx
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";

const faqData = [
  {
    category: "Orders & Delivery",
    faqs: [
      {
        q: "What are your delivery timings?",
        a: "We deliver between 9 AM and 7 PM, Monday to Saturday. Orders placed before 12 PM are eligible for same-day delivery in Bengaluru.",
      },
      {
        q: "Do you offer same-day delivery?",
        a: "Yes! We offer same-day delivery within Bengaluru for orders placed before 12 PM. A delivery charge of ₹99 applies for orders under ₹999.",
      },
      {
        q: "Which areas do you deliver to?",
        a: "We currently deliver across Bengaluru including Indiranagar, Koramangala, HSR Layout, Whitefield, JP Nagar, Jayanagar, and more. Enter your pincode at checkout to confirm availability.",
      },
      {
        q: "Can I schedule a delivery for a specific time?",
        a: "Currently we offer morning (9 AM–1 PM) and evening (2 PM–7 PM) delivery slots. You can mention your preference in the order notes at checkout.",
      },
      {
        q: "What if I'm not home during delivery?",
        a: "Our delivery partner will call you before arriving. If you're unavailable, we'll attempt redelivery once. Please ensure someone is available to receive the flowers.",
      },
    ],
  },
  {
    category: "Products & Quality",
    faqs: [
      {
        q: "How fresh are your flowers?",
        a: "All our flowers are handpicked fresh every morning from local farms. We never stock flowers for more than 24 hours to ensure maximum freshness and longevity.",
      },
      {
        q: "How long will my flowers last?",
        a: "With proper care — trimming stems, changing water every 2 days, and keeping away from direct sunlight — your flowers should last 7–10 days.",
      },
      {
        q: "Can I request a custom bouquet?",
        a: "Absolutely! We love creating custom arrangements. Contact us at hello@petalandco.in or use the Contact Us form with your requirements, budget, and occasion.",
      },
      {
        q: "Are your flowers sustainably sourced?",
        a: "Yes! We source all our flowers from local, eco-conscious farms in and around Karnataka. We prioritize seasonal blooms to minimize our carbon footprint.",
      },
    ],
  },
  {
    category: "Payments & Pricing",
    faqs: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major payment methods including UPI (GPay, PhonePe, Paytm), credit/debit cards, net banking, and wallets via Razorpay.",
      },
      {
        q: "Is it safe to pay online?",
        a: "Absolutely. All payments are processed securely through Razorpay, which is PCI DSS compliant. We never store your card details.",
      },
      {
        q: "How do I apply a discount code?",
        a: "Enter your discount code at checkout before proceeding to payment. The discount will be applied automatically. Use code BLOOM20 for 20% off your first order!",
      },
      {
        q: "Do you offer free delivery?",
        a: "Yes! Orders above ₹999 get free delivery. Orders below ₹999 have a flat delivery charge of ₹99.",
      },
    ],
  },
  {
    category: "Returns & Refunds",
    faqs: [
      {
        q: "What is your return policy?",
        a: "We have a 100% satisfaction guarantee. If you're unhappy with your flowers for any reason, contact us within 24 hours of delivery with a photo and we'll replace or refund your order.",
      },
      {
        q: "My flowers arrived damaged. What do I do?",
        a: "We're sorry to hear that! Please take a photo immediately and contact us at hello@petalandco.in or call us within 24 hours. We'll arrange a replacement or full refund.",
      },
      {
        q: "Can I cancel my order?",
        a: "Orders can be cancelled up to 2 hours before the scheduled delivery time. Contact us immediately if you need to cancel. Refunds are processed within 5–7 business days.",
      },
    ],
  },
  {
    category: "Account & Subscriptions",
    faqs: [
      {
        q: "Do I need an account to order?",
        a: "Yes, you need to create a free account to place orders. This helps us track your orders and send delivery updates.",
      },
      {
        q: "What are flower subscriptions?",
        a: "Our subscription plans deliver fresh flowers to your doorstep weekly or monthly at a discounted price. Perfect for keeping your home or office fresh year-round.",
      },
      {
        q: "How do I track my order?",
        a: "Log in to your account and visit 'My Orders' to see the status of all your orders including payment confirmation and delivery status.",
      },
    ],
  },
];

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`border border-[#e8d5c4] rounded-md overflow-hidden transition-all
      ${open ? 'bg-white shadow-sm' : 'bg-white hover:border-[#c4957a]'}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4
          text-left cursor-pointer"
      >
        <span className="text-[14px] text-[#5c3d35] font-light pr-4 leading-snug">
          {faq.q}
        </span>
        {open
          ? <ChevronUp size={16} strokeWidth={1.5} className="text-[#c4957a] shrink-0" />
          : <ChevronDown size={16} strokeWidth={1.5} className="text-[#b09088] shrink-0" />}
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-[#f0e0d6]">
          <p className="text-[13px] font-light text-[#8b6e66] leading-relaxed pt-4">
            {faq.a}
          </p>
        </div>
      )}
    </div>
  );
}

export default function FAQs() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...faqData.map(f => f.category)];

  const filtered = activeCategory === "All"
    ? faqData
    : faqData.filter(f => f.category === activeCategory);

  const totalFAQs = faqData.reduce((sum, cat) => sum + cat.faqs.length, 0);

  return (
    <div className="min-h-screen bg-[#fdf6f0] font-[Jost]">

      {/* Hero */}
      <section className="bg-[#f0e0d6] px-4 md:px-10 py-14 md:py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-[11px] tracking-[0.22em] uppercase text-[#c4957a] mb-3
            flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-[#c4957a] inline-block" />
            Got Questions?
            <span className="w-8 h-px bg-[#c4957a] inline-block" />
          </p>
          <h1 className="font-[Cormorant_Garamond] text-[40px] md:text-[56px] text-[#5c3d35]
            font-normal leading-tight mb-4">
            Frequently Asked
            <em className="italic text-[#c4957a]"> Questions</em>
          </h1>
          <p className="text-sm font-light text-[#8b6e66] leading-relaxed max-w-md mx-auto">
            {totalFAQs} answers to our most common questions.
            Can't find what you're looking for?{" "}
            <Link to="/contact" className="text-[#c4957a] hover:text-[#8b5e52] transition-colors">
              Contact us
            </Link>
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <div className="bg-white border-b border-[#e8d5c4] px-4 md:px-10 py-4 overflow-x-auto">
        <div className="flex gap-2 max-w-5xl mx-auto min-w-max md:min-w-0 md:flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[11px] tracking-widest uppercase px-4 py-2 rounded-sm
                transition-colors border cursor-pointer whitespace-nowrap
                ${activeCategory === cat
                  ? 'bg-[#c4957a] text-white border-[#c4957a]'
                  : 'bg-white text-[#8b5e52] border-[#e8d5c4] hover:border-[#c4957a]'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <section className="max-w-3xl mx-auto px-4 md:px-10 py-12 md:py-16">
        {filtered.map(category => (
          <div key={category.category} className="mb-10">
            <div className="flex items-center gap-4 mb-5">
              <h2 className="font-[Cormorant_Garamond] text-[24px] text-[#5c3d35]">
                {category.category}
              </h2>
              <span className="text-[11px] tracking-widest uppercase text-[#b09088]
                bg-[#f0e0d6] px-2.5 py-1 rounded-sm">
                {category.faqs.length} questions
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {category.faqs.map((faq, i) => (
                <FAQItem key={i} faq={faq} />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Still need help */}
      <section className="bg-[#5c3d35] py-14 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <p className="text-3xl mb-4">🌸</p>
          <h3 className="font-[Cormorant_Garamond] text-3xl text-[#f5e6de] mb-3">
            Still Have Questions?
          </h3>
          <p className="text-[13px] font-light text-[#a08878] mb-6 leading-relaxed">
            Our team is happy to help. Reach out and we'll get back to you within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact"
              className="text-xs tracking-widest uppercase text-white bg-[#c4957a]
                hover:bg-[#b0806a] px-8 py-3.5 rounded-sm transition-colors">
              Contact Us
            </Link>
            <a href="tel:+919876543210"
              className="text-xs tracking-widest uppercase text-[#c4957a]
                border border-[#c4957a] hover:bg-[#c4957a] hover:text-white
                px-8 py-3.5 rounded-sm transition-colors">
              Call Us
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}