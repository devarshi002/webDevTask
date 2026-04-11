import { Link } from "react-router-dom";
import { team, milestones, values, stats, hero, mission, cta } from "../data/about";

export default function About() {
  return (
    <div className="bg-[#fdf6f0] font-[Jost] min-h-screen">

      {/* Hero */}
      <section className="bg-[#3d2820] py-24 px-6 text-center">
        <p className="text-[11px] tracking-[0.22em] uppercase text-[#c4957a] mb-4 flex items-center justify-center gap-3">
          <span className="w-8 h-px bg-[#c4957a] inline-block" />
          {hero.eyebrow}
          <span className="w-8 h-px bg-[#c4957a] inline-block" />
        </p>
        <h1 className="font-[Cormorant_Garamond] text-[52px] font-normal text-[#f5e6de] leading-tight mb-6">
          {hero.heading}<br />
          <em className="italic text-[#c4957a]">{hero.headingItalic}</em>
        </h1>
        <p className="text-sm font-light text-[#a08878] max-w-lg mx-auto leading-relaxed">
          {hero.subtext}
        </p>
      </section>

      {/* Mission */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <p className="text-[11px] tracking-[0.22em] uppercase text-[#c4957a] mb-4 flex items-center justify-center gap-3">
          <span className="w-8 h-px bg-[#c4957a] inline-block" />
          {mission.eyebrow}
          <span className="w-8 h-px bg-[#c4957a] inline-block" />
        </p>
        <h2 className="font-[Cormorant_Garamond] text-[40px] text-[#5c3d35] mb-6 leading-tight">
          {mission.heading}{" "}
          <em className="italic text-[#c4957a]">{mission.headingItalic}</em>
        </h2>
        <p className="text-sm font-light text-[#8b6e66] leading-relaxed max-w-2xl mx-auto">
          {mission.subtext}
        </p>
      </section>

      {/* Values */}
      <section className="bg-[#f0e0d6] py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-[Cormorant_Garamond] text-[38px] text-[#5c3d35]">
              What We <em className="italic text-[#c4957a]">Stand For</em>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {values.map(({ icon, title, desc }) => (
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

      {/* Timeline */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="font-[Cormorant_Garamond] text-[38px] text-[#5c3d35]">
            Our <em className="italic text-[#c4957a]">Journey</em>
          </h2>
        </div>
        <div className="relative">
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-[#e8d5c4]" />
          <div className="flex flex-col gap-8">
            {milestones.map(({ year, text }, i) => (
              <div key={i} className="flex items-start gap-6 relative">
                <div className="w-10 h-10 rounded-full bg-[#f0e0d6] border-2 border-[#c4957a]
                  flex items-center justify-center shrink-0 z-10">
                  <div className="w-2 h-2 rounded-full bg-[#c4957a]" />
                </div>
                <div className="pt-2">
                  <span className="text-[11px] tracking-widest uppercase text-[#c4957a] font-medium">
                    {year}
                  </span>
                  <p className="text-[14px] font-light text-[#5c3d35] mt-1 leading-relaxed">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-[#f0e0d6] py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-[Cormorant_Garamond] text-[38px] text-[#5c3d35]">
              Meet the <em className="italic text-[#c4957a]">Team</em>
            </h2>
            <p className="text-sm font-light text-[#8b6e66] mt-3 max-w-sm mx-auto">
              The people behind every bouquet — passionate about flowers and people.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map(({ name, role, initials, bio }) => (
              <div key={name}
                className="bg-white border border-[#e8d5c4] rounded-md p-8 text-center
                  hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-[#f0e0d6] border-2 border-[#c4957a]
                  flex items-center justify-center mx-auto mb-4">
                  <span className="font-[Cormorant_Garamond] text-[20px] text-[#8b5e52]">
                    {initials}
                  </span>
                </div>
                <h4 className="font-[Cormorant_Garamond] text-[22px] text-[#5c3d35] mb-1">
                  {name}
                </h4>
                <p className="text-[11px] tracking-widest uppercase text-[#c4957a] mb-4 font-light">
                  {role}
                </p>
                <p className="text-[13px] font-light text-[#8b6e66] leading-relaxed">
                  {bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#5c3d35] py-16 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map(({ num, label }) => (
            <div key={label}>
              <p className="font-[Cormorant_Garamond] text-[42px] font-medium text-[#f5e6de] leading-none">
                {num}
              </p>
              <p className="text-[11px] tracking-widest uppercase text-[#a08878] font-light mt-2">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center bg-[#fdf6f0]">
        <h2 className="font-[Cormorant_Garamond] text-[38px] text-[#5c3d35] mb-4">
          {cta.heading}{" "}
          <em className="italic text-[#c4957a]">{cta.headingItalic}</em>
        </h2>
        <p className="text-sm font-light text-[#8b6e66] mb-8 max-w-sm mx-auto">
          {cta.subtext}
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            to={cta.primaryLink}
            className="text-xs tracking-widest uppercase text-white
              bg-[#c4957a] hover:bg-[#b0806a] px-10 py-4 rounded-sm transition-colors"
          >
            {cta.primaryText}
          </Link>
          <Link
            to={cta.secondaryLink}
            className="text-xs tracking-widest uppercase text-[#8b5e52]
              border border-[#c4957a] hover:bg-[#c4957a] hover:text-white
              px-10 py-4 rounded-sm transition-colors"
          >
            {cta.secondaryText}
          </Link>
        </div>
      </section>

    </div>
  );
}