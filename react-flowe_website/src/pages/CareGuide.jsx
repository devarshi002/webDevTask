// src/pages/CareGuide.jsx
import { Link } from "react-router-dom";
import { Droplets, Sun, Scissors, ThermometerSun, Heart, AlertTriangle } from "lucide-react";

const flowerGuides = [
  {
    name: "Roses",
    image: "/images/rose.jpg",
    lifespan: "7–10 days",
    difficulty: "Easy",
    tips: [
      "Trim 2–3 cm off stems at a 45° angle every 2 days",
      "Remove leaves below the waterline to prevent bacteria",
      "Change water every 2 days with a drop of bleach",
      "Keep away from fruits — ethylene gas shortens life",
      "Store in a cool room away from direct sunlight",
    ],
    color: "#fce8e0",
  },
  {
    name: "Tulips",
    image: "/images/tulip.jpg",
    lifespan: "5–7 days",
    difficulty: "Easy",
    tips: [
      "Tulips continue to grow after cutting — trim regularly",
      "Keep in cold water — they prefer cool temperatures",
      "Place a penny in the vase to keep them upright",
      "Keep away from direct sunlight and heat",
      "Change water daily for best results",
    ],
    color: "#fff8e4",
  },
  {
    name: "Lavender",
    image: "/images/lavender.jpg",
    lifespan: "10–14 days",
    difficulty: "Very Easy",
    tips: [
      "Lavender lasts longer dried — hang upside down to dry",
      "Minimal water needed — don't overwater",
      "Place in bright indirect light",
      "Remove lower leaves to prevent rot",
      "Great for air drying and potpourri",
    ],
    color: "#f0e4f4",
  },
  {
    name: "Wildflowers",
    image: "/images/wildflowers.jpg",
    lifespan: "5–8 days",
    difficulty: "Moderate",
    tips: [
      "Trim stems immediately upon receiving",
      "Use flower food from the packet provided",
      "Change water every day — wildflowers are thirsty",
      "Remove wilted blooms to extend others' life",
      "Keep in a cool spot away from drafts",
    ],
    color: "#e8f0e4",
  },
];

const generalTips = [
  {
    icon: <Scissors size={22} strokeWidth={1.5} className="text-[#c4957a]" />,
    title: "Trim Stems Daily",
    desc: "Cut 2–3 cm off the bottom of stems at a 45° angle. This increases the surface area for water absorption and keeps flowers hydrated.",
    color: "#fce8e0",
  },
  {
    icon: <Droplets size={22} strokeWidth={1.5} className="text-[#c4957a]" />,
    title: "Change Water Every 2 Days",
    desc: "Fresh water prevents bacteria buildup. Add a small drop of bleach or use the flower food packet included with your order.",
    color: "#e8f4f8",
  },
  {
    icon: <Sun size={22} strokeWidth={1.5} className="text-[#c4957a]" />,
    title: "Avoid Direct Sunlight",
    desc: "Place flowers in bright but indirect light. Direct sunlight speeds up wilting. A cool room with good light is ideal.",
    color: "#fff8e4",
  },
  {
    icon: <ThermometerSun size={22} strokeWidth={1.5} className="text-[#c4957a]" />,
    title: "Keep Cool",
    desc: "Flowers last longer in cooler temperatures. Keep away from ACs, heaters, and appliances that emit heat or cold air directly.",
    color: "#e8f0e4",
  },
  {
    icon: <Heart size={22} strokeWidth={1.5} className="text-[#c4957a]" />,
    title: "Remove Wilted Blooms",
    desc: "Remove any flowers that start to wilt immediately. This prevents ethylene gas from spreading and wilting nearby healthy blooms.",
    color: "#f0e4f4",
  },
  {
    icon: <AlertTriangle size={22} strokeWidth={1.5} className="text-[#c4957a]" />,
    title: "Keep Away from Fruits",
    desc: "Ripening fruits release ethylene gas which causes flowers to wilt faster. Keep your vase in a fruit-free zone.",
    color: "#f0e0d6",
  },
];

export default function CareGuide() {
  return (
    <div className="min-h-screen bg-[#fdf6f0] font-[Jost]">

      {/* Hero */}
      <section className="bg-[#f0e0d6] px-4 md:px-10 py-14 md:py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-[11px] tracking-[0.22em] uppercase text-[#c4957a] mb-3
            flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-[#c4957a] inline-block" />
            Keep Them Beautiful
            <span className="w-8 h-px bg-[#c4957a] inline-block" />
          </p>
          <h1 className="font-[Cormorant_Garamond] text-[40px] md:text-[56px] text-[#5c3d35]
            font-normal leading-tight mb-4">
            Flower Care
            <em className="italic text-[#c4957a]"> Guide</em>
          </h1>
          <p className="text-sm font-light text-[#8b6e66] leading-relaxed max-w-md mx-auto">
            With a little love and the right care, your flowers can last up to 2 weeks.
            Here's everything you need to know 🌸
          </p>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="max-w-6xl mx-auto px-4 md:px-10 py-12 md:py-16">
        <div className="text-center mb-10">
          <p className="text-[11px] tracking-[0.22em] uppercase text-[#c4957a] mb-2
            flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-[#c4957a] inline-block" />
            General Tips
          </p>
          <h2 className="font-[Cormorant_Garamond] text-[32px] md:text-[38px] text-[#5c3d35]">
            6 Golden Rules for
            <em className="italic text-[#c4957a]"> Fresh Flowers</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-16">
          {generalTips.map(({ icon, title, desc, color }) => (
            <div key={title} className="bg-white border border-[#e8d5c4] rounded-md p-6
              hover:-translate-y-1 hover:shadow-sm transition-all duration-200">
              <div className="w-11 h-11 rounded-full flex items-center justify-center mb-4"
                style={{ background: color }}>
                {icon}
              </div>
              <h3 className="font-[Cormorant_Garamond] text-[20px] text-[#5c3d35] mb-2">
                {title}
              </h3>
              <p className="text-[13px] font-light text-[#8b6e66] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Flower specific guides */}
        <div className="text-center mb-10">
          <p className="text-[11px] tracking-[0.22em] uppercase text-[#c4957a] mb-2
            flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-[#c4957a] inline-block" />
            By Flower Type
          </p>
          <h2 className="font-[Cormorant_Garamond] text-[32px] md:text-[38px] text-[#5c3d35]">
            Care by
            <em className="italic text-[#c4957a]"> Flower Type</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {flowerGuides.map(({ name, image, lifespan, difficulty, tips, color }) => (
            <div key={name} className="bg-white border border-[#e8d5c4] rounded-md
              overflow-hidden hover:shadow-sm transition-shadow">

              {/* Header */}
              <div className="flex items-center gap-4 p-5"
                style={{ background: color + "80" }}>
                <img src={image} alt={name}
                  className="w-16 h-16 rounded-sm object-cover border border-[#e8d5c4]" />
                <div>
                  <h3 className="font-[Cormorant_Garamond] text-[24px] text-[#5c3d35]">
                    {name}
                  </h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[11px] tracking-wide text-[#8b5e52]
                      bg-white/80 px-2.5 py-1 rounded-sm border border-[#e8d5c4]">
                      ⏱ {lifespan}
                    </span>
                    <span className="text-[11px] tracking-wide text-[#8b5e52]
                      bg-white/80 px-2.5 py-1 rounded-sm border border-[#e8d5c4]">
                      🌿 {difficulty}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="p-5">
                <p className="text-[11px] tracking-widest uppercase text-[#b09088] mb-3">
                  Care Tips
                </p>
                <ul className="flex flex-col gap-2.5">
                  {tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[13px]
                      font-light text-[#8b6e66]">
                      <span className="text-[#c4957a] mt-0.5 shrink-0">✦</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Vase tips */}
        <div className="bg-[#3d2820] rounded-md p-8 md:p-10 mb-16">
          <div className="text-center mb-8">
            <h2 className="font-[Cormorant_Garamond] text-[28px] md:text-[32px]
              text-[#f5e6de] mb-2">
              Vase & Water Tips
            </h2>
            <p className="text-[13px] font-light text-[#a08878]">
              The right vase and water makes all the difference
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { emoji: "🏺", title: "Right Vase Size", desc: "Use a vase that's ⅔ the height of your flowers for proper support." },
              { emoji: "💧", title: "Water Level", desc: "Fill the vase ⅓ full. Too much water causes stem rot." },
              { emoji: "🧴", title: "Flower Food", desc: "Use the packet we include or mix 1 tsp sugar + 1 drop bleach per litre." },
              { emoji: "🧼", title: "Clean Vase", desc: "Always use a clean vase — bacteria is the #1 enemy of cut flowers." },
              { emoji: "❄️", title: "Cool Water", desc: "Use room temperature or slightly cool water. Avoid warm water." },
              { emoji: "🌿", title: "Remove Leaves", desc: "Strip any leaves that would sit below the waterline to prevent rot." },
            ].map(({ emoji, title, desc }) => (
              <div key={title} className="bg-white/5 border border-[#5c3d35]
                rounded-md p-4">
                <span className="text-2xl mb-3 block">{emoji}</span>
                <h4 className="text-[14px] text-[#f5e6de] mb-1">{title}</h4>
                <p className="text-[12px] font-light text-[#a08878] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Lifespan table */}
        <div className="bg-white border border-[#e8d5c4] rounded-md overflow-hidden mb-16">
          <div className="bg-[#f0e0d6] px-5 py-4">
            <h3 className="font-[Cormorant_Garamond] text-[22px] text-[#5c3d35]">
              Expected Flower Lifespans
            </h3>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e8d5c4]">
                {["Flower", "Without Care", "With Proper Care"].map(h => (
                  <th key={h} className="text-left text-[11px] tracking-widest uppercase
                    text-[#8b5e52] px-5 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { flower: "Roses", without: "3–4 days", with: "7–10 days" },
                { flower: "Tulips", without: "2–3 days", with: "5–7 days" },
                { flower: "Lavender", without: "7 days (fresh)", with: "Weeks (dried)" },
                { flower: "Wildflowers", without: "2–3 days", with: "5–8 days" },
                { flower: "Peonies", without: "3–4 days", with: "6–8 days" },
                { flower: "Lilies", without: "4–5 days", with: "10–14 days" },
              ].map((row, i) => (
                <tr key={row.flower}
                  className={`border-t border-[#e8d5c4]
                    ${i % 2 === 0 ? "bg-white" : "bg-[#fdf6f0]"}`}>
                  <td className="px-5 py-3 text-[13px] text-[#5c3d35] font-medium">
                    {row.flower}
                  </td>
                  <td className="px-5 py-3 text-[13px] text-red-400 font-light">
                    {row.without}
                  </td>
                  <td className="px-5 py-3 text-[13px] text-green-600 font-light">
                    {row.with}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#5c3d35] py-14 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <p className="text-3xl mb-4">🌸</p>
          <h3 className="font-[Cormorant_Garamond] text-3xl text-[#f5e6de] mb-3">
            Still Have Questions?
          </h3>
          <p className="text-[13px] font-light text-[#a08878] mb-6 leading-relaxed">
            Our florists are happy to give you personalised care advice.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/shop"
              className="text-xs tracking-widest uppercase text-white bg-[#c4957a]
                hover:bg-[#b0806a] px-8 py-3.5 rounded-sm transition-colors">
              Shop Fresh Flowers
            </Link>
            <Link to="/contact"
              className="text-xs tracking-widest uppercase text-[#c4957a]
                border border-[#c4957a] hover:bg-[#c4957a] hover:text-white
                px-8 py-3.5 rounded-sm transition-colors">
              Ask Our Florists
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}