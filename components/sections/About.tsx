import React from "react";
import { profile } from "../../content/profile";
import { useLanguage } from "../../lib/LanguageProvider";
import { useGithubStats } from "../../lib/useGithubStats";

export default function About() {
  const { language, t } = useLanguage();
  const bioText = profile.bio[language] || profile.bio.en;
  const highlightsList = profile.highlights[language] || profile.highlights.en;
  const { stats, loading } = useGithubStats();

  return (
    <section id="about" className="section-ink relative overflow-hidden py-16 md:py-24">
      {/* Reticle detail - terminal bracket motif top-right */}
      <div className="absolute top-6 right-6 text-white/20 font-mono text-xs tracking-widest select-none hidden md:block" aria-hidden>
        <div className="flex items-center gap-2">
          <span>{"<>"}</span>
          <span className="w-6 h-[1px] bg-white/20" />
          <span className="w-2 h-2 border border-white/20 rounded-full" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* Left: editorial copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex px-3 py-1 rounded-full bg-[#e8a020] text-black text-xs font-mono font-bold tracking-widest">[01] / {t("about.title")}</div>
            <h2 className="text-[40px] sm:text-[56px] font-black tracking-tight leading-[0.9] text-[#f7f4ef]" style={{ fontFamily: "var(--font-display)" }}>
              {profile.displayName}
              <span className="block font-light italic text-[#f7f4ef]/80">— in brief.</span>
            </h2>
            <p className="text-[18px] sm:text-[20px] leading-relaxed text-[#f7f4ef]/85 max-w-xl" style={{ fontFamily: "var(--font-serif)" }}>
              {bioText}
            </p>

            {/* Pill highlights instead of square cards */}
            <div className="flex flex-wrap gap-2 pt-2">
              {highlightsList.map((item, i) => (
                <span
                  key={i}
                  className={`px-4 py-2 rounded-full text-xs font-mono leading-relaxed border ${i === 0 ? "bg-[#e8a020] text-black border-[#e8a020]" : "bg-white/10 text-[#f7f4ef] border-white/15 backdrop-blur"}`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Right: B&W photo bleed + stats */}
          <div className="lg:col-span-5 relative">
            {/* B&W high-contrast photo card bleeding */}
            <div className="rounded-[32px] overflow-hidden bg-white p-2 rotate-[0.6deg] lg:ml-4">
              <img
                src="https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=800&q=80&fm=webp"
                alt="Code and workspace"
                className="w-full aspect-[4/3] object-cover rounded-[24px] grayscale contrast-125"
                loading="lazy"
              />
              <div className="flex items-center justify-between px-3 py-2.5">
                <span className="text-xs font-mono text-black">Ponorogo — East Java</span>
                <span className="text-[11px] font-mono px-2 py-1 rounded-full bg-[#e8a020] text-black">18 y/o</span>
              </div>
            </div>

            {/* Big stats — live dari GitHub API (build-time) */}
            <div className="grid grid-cols-2 gap-3 mt-4 lg:ml-4">
              <div className="bg-white text-black rounded-[20px] p-4">
                <div className="text-3xl font-black tracking-tight leading-none">{loading ? "…" : `${stats.years_on_github}+`}</div>
                <div className="text-[10px] font-mono leading-tight opacity-60 mt-1">{t("githubStats.years")}</div>
              </div>
              <div className="bg-[#e8a020] text-black rounded-[20px] p-4 hand-rotate-2">
                <div className="text-3xl font-black tracking-tight leading-none">{loading ? "…" : stats.public_repos}</div>
                <div className="text-[10px] font-mono leading-tight opacity-70 mt-1">{t("githubStats.publicRepos")}</div>
              </div>
            </div>

            {/* Cursor blink detail */}
            <div className="absolute -bottom-2 -right-2 hidden lg:flex items-center gap-1.5 bg-white text-black rounded-full px-3 py-1.5 text-xs font-mono shadow-lg">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              building<span className="opacity-40">_</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bleed divider - skills */}
      <div className="mt-14 border-y border-white/10 overflow-hidden py-3 bg-black/20" aria-hidden>
        <div className="flex gap-6 animate-bleed" style={{ width: "200%" }}>
          <span className="bleed-text text-white">skills . skills . skills . skills . skills . skills . skills .</span>
          <span className="bleed-text text-white">skills . skills . skills . skills . skills . skills . skills .</span>
        </div>
      </div>
    </section>
  );
}
