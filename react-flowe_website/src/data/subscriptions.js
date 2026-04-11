export const plans = [
  {
    id: "basic",
    name: "Basic Bloom",
    emoji: "🌷",
    tagline: "Perfect for flower lovers",
    monthlyPrice: 499,
    yearlyPrice: 399,
    color: "#ffffff",
    badge: null,
    isPremium: false,
    features: [
      "1 bouquet per month",
      "Seasonal flower selection",
      "Free delivery on orders",
      "Email order updates",
      "Cancel anytime",
    ],
    missing: [
      "Priority bouquet selection",
      "Dedicated bloom advisor",
      "Exclusive member discounts",
    ],
  },
  {
    id: "premium",
    name: "Premium Petal",
    emoji: "🌹",
    tagline: "Our most popular plan",
    monthlyPrice: 999,
    yearlyPrice: 799,
    color: "#5c3d35",
    badge: "Most Popular",
    isPremium: true,
    features: [
      "2 bouquets per month",
      "Priority flower selection",
      "Free delivery always",
      "SMS + email updates",
      "10% off all shop orders",
      "Cancel anytime",
    ],
    missing: [
      "Dedicated bloom advisor",
    ],
  },
  {
    id: "elite",
    name: "Elite Garden",
    emoji: "🌺",
    tagline: "The full bloom experience",
    monthlyPrice: 1799,
    yearlyPrice: 1499,
    color: "#ffffff",
    badge: "Best Value",
    isPremium: false,
    features: [
      "4 bouquets per month",
      "Handpicked premium selection",
      "Free express delivery",
      "Dedicated bloom advisor",
      "20% off all shop orders",
      "Early access to new arrivals",
      "Cancel anytime",
    ],
    missing: [],
  },
];

export const whySubscribe = [
  {
    icon: "✿",
    title: "Always Fresh",
    desc: "Handpicked the morning of delivery, never sitting in a warehouse.",
  },
  {
    icon: "♡",
    title: "Save More",
    desc: "Members save up to 20% compared to one-time orders.",
  },
  {
    icon: "✦",
    title: "Skip Anytime",
    desc: "Going on vacation? Pause your plan with one click.",
  },
  {
    icon: "❀",
    title: "Surprise Element",
    desc: "Every bouquet is a seasonal surprise curated by our florists.",
  },
];

export const faqs = [
  {
    q: "When will my flowers be delivered?",
    a: "We deliver every Monday and Thursday. You can choose your preferred delivery day during checkout.",
  },
  {
    q: "Can I skip a month?",
    a: "Yes! You can pause or skip any month from your account dashboard with at least 3 days notice.",
  },
  {
    q: "How fresh are the flowers?",
    a: "All bouquets are handpicked the same morning they ship — guaranteed fresh for 7+ days.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Absolutely. No lock-in, no cancellation fees. Cancel from your account with one click.",
  },
  {
    q: "Do you deliver outside Bengaluru?",
    a: "Currently we deliver across Bengaluru. We're expanding to Mumbai and Pune soon!",
  },
];

export const bottomCta = {
  heading: "Ready to",
  headingItalic: "Bloom?",
  subtext: "Join 2,000+ happy subscribers across Bengaluru getting fresh flowers every week.",
  buttonText: "Start Your Subscription",
  buttonLink: "/shop",
};