import React from "react";
import { ArrowUpRight } from "lucide-react";
import { profile } from "../../content/profile";
import { useLanguage } from "../../lib/LanguageProvider";
import { useGithubStats } from "../../lib/useGithubStats";

export default function Hero() {
  const { language, t } = useLanguage();
  const { stats, loading } = useGithubStats();

  return (
    <section id="hero" className="section-cream pt-6 pb-8 md:pt-8 md:pb-12 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#6b6560]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e8a020]" aria-hidden />
            {profile.location} — {profile.age} y/o · {t("hero.availableForWork")}
          </div>

          {/* De-AI: mix sans + serif italic, tight + loose */}
          <h1 className="animate-entry">
            <span className="block display-oversized text-[56px] sm:text-[88px] lg:text-[110px] text-[#0f0d0a] leading-[0.85] tracking-[-0.05em]">Building</span>
            <span className="block -mt-2 sm:-mt-4 display-oversized text-[56px] sm:text-[88px] lg:text-[110px] leading-[0.85] tracking-[-0.05em] text-[#0f0d0a]">
              software<span className="text-[#e8a020]">.</span>
              <span className="align-baseline ml-2 sm:ml-3 text-[18px] sm:text-[20px] font-normal tracking-normal font-[var(--font-serif)] italic text-[#6b6560]">— dev-first</span>
            </span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            <div className="lg:col-span-5 space-y-6 animate-entry" style={{ animationDelay: "80ms" }}>
              <p className="text-base sm:text-[17px] text-[#4a4640] leading-relaxed max-w-md border-l-2 border-[#e8a020] pl-4">
                {profile.bio[language] || profile.bio.en}
              </p>
              <div className="flex flex-wrap gap-2.5">
                <a href="#projects" className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-[#0f0d0a] text-[#f7f4ef] text-xs font-mono uppercase tracking-wider hover:bg-[#e8a020] hover:text-black transition-colors duration-150">
                  <span>{t("hero.viewProjects")}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a href="#contact" className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full border border-[#d4cfc6] bg-transparent text-[#0f0d0a] text-xs font-mono uppercase tracking-wider hover:bg-[#0f0d0a] hover:text-white hover:border-[#0f0d0a] transition-colors">
                  <span>{t("hero.contactMe")}</span>
                </a>
                <a href="https://github.com/Eliasilyz" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full bg-[#f7f4ef] border border-[#d4cfc6] text-[#0f0d0a] text-xs font-mono hover:border-[#0f0d0a] transition-colors">
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
                <a href="https://www.linkedin.com/in/farel-hanafi/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full bg-[#f7f4ef] border border-[#d4cfc6] text-[#0f0d0a] text-xs font-mono hover:border-[#0f0d0a] transition-colors">
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              </div>

              {/* Uneven pills: first two solid, rest outline dashed — less AI */}
              <div className="flex flex-wrap gap-2 pt-2">
                {["Next.js", "TypeScript"].map((tag) => (
                  <span key={tag} className="px-3.5 py-1.5 rounded-full bg-[#e8a020] text-black text-xs font-mono font-bold">
                    {tag}
                  </span>
                ))}
                {["Tailwind", "Node.js", "Fabric"].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-full border border-dashed border-[#b8b2a6] bg-[#f7f4ef] text-xs font-mono text-[#0f0d0a]">
                    {tag}
                  </span>
                ))}
                <span className="px-3 py-1.5 rounded-full bg-[#0f0d0a] text-[#f7f4ef] text-xs font-mono">React</span>
              </div>
              <div className="text-[11px] font-mono text-[#6b6560]">↳ Ponorogo → remote · building since 2022</div>
            </div>

            <div className="lg:col-span-7 relative lg:-mt-24 lg:-ml-2 animate-entry" style={{ animationDelay: "140ms" }}>
              <div className="relative bg-[#e8a020] rounded-[32px] p-3 sm:p-4 lg:ml-8 hand-rotate-1 lg:-translate-y-2">
                <div fetchpriority="high" className="rounded-[24px] overflow-hidden bg-[#0f0d0a] aspect-[4/3] relative">
                  {/* Authentic craft: live code preview (bukan stock hand+PYTHON) — static snapshot dari project nyata */}
                  <div className="absolute inset-0 p-4 sm:p-5 font-mono text-[11px] sm:text-xs leading-relaxed overflow-hidden">
                    <div className="flex items-center gap-1.5 mb-3 text-white/40 text-[10px]">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" /><span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" /><span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                      <span className="ml-2">app/page.tsx — portfolio</span>
                    </div>
                    <div className="text-[#f7f4ef]/90"><span className="text-[#e8a020]">export default</span> <span className="text-[#7dd3ce]">function</span> <span className="text-[#f7f4ef]">Hero</span>() {"{"}</div>
                    <div className="text-white/60 pl-3">{"return ("}</div>
                    <div className="pl-6 text-[#f7f4ef]">&lt;<span className="text-[#ff7ab2]">h1</span> <span className="text-[#7dd3ce]">className</span>=<span className="text-[#e8a020]">"display-oversized"</span>&gt;</div>
                    <div className="pl-8 text-white/80">Building software.</div>
                    <div className="pl-6 text-[#f7f4ef]">&lt;/<span className="text-[#ff7ab2]">h1</span>&gt;</div>
                    <div className="text-white/60 pl-3">{")"}</div>
                    <div className="text-[#f7f4ef]/90">{"}"}</div>
                    <div className="mt-3 flex items-center gap-2 text-[#e8a020] text-[11px]"><span className="w-1.5 h-1 bg-[#e8a020] animate-pulse" /> building — live preview</div>
                  </div>
                  <div className="absolute top-3 right-3 bg-[#f7f4ef]/90 backdrop-blur px-2 py-1 rounded-full text-[10px] font-mono text-black border border-black/10 -rotate-2">fig. 01 — source</div>
                </div>
                <div className="absolute -bottom-4 -left-2 sm:-left-4 w-[88px] h-[88px] sm:w-[104px] sm:h-[104px] rounded-full border-[4px] border-[#f7f4ef] overflow-hidden shadow-xl bg-[#f7f4ef] rotate-3">
                  <img src={profile.avatarUrl} alt={profile.fullName} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -top-3 -right-2 sm:right-4 bg-[#0f0d0a] text-[#f7f4ef] rounded-full px-4 py-2 flex items-center gap-2 shadow-lg text-xs font-mono">
                  <span className="w-2 h-2 rounded-full bg-[#e8a020] animate-pulse" />
                  Available for work
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-8 lg:ml-8">
                {[
                  { value: loading ? "…" : `${stats.years_on_github}+`, label: t("githubStats.years"), rot: "hand-rotate-1" },
                  { value: loading ? "…" : `${stats.public_repos}`, label: t("githubStats.publicRepos"), rot: "hand-rotate-2" },
                  { value: loading ? "…" : `${stats.total_stars}`, label: t("githubStats.stars"), rot: "hand-rotate-3" },
                ].map((s) => (
                  <div key={s.label} className={`bg-[#ebe8e1] rounded-[20px] px-3 py-4 text-center border border-[#d4cfc6] ${s.rot}`}>
                    <div className="text-[28px] sm:text-[30px] font-black tracking-tight leading-none text-[#0f0d0a]">{s.value}</div>
                    <div className="text-[10px] font-mono leading-tight text-[#6b6560] mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 border-y border-[#d4cfc6] bg-[#f7f4ef] overflow-hidden py-3 select-none" aria-hidden>
        <div className="flex gap-6 animate-bleed" style={{ width: "200%" }}>
          <span className="bleed-text text-[#0f0d0a]">about . about . about . about . about . about . about . about .</span>
          <span className="bleed-text text-[#0f0d0a]">about . about . about . about . about . about . about . about .</span>
        </div>
      </div>
    </section>
  );
}
