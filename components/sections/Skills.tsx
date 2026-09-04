import React from "react";
import { profile } from "../../content/profile";
import { useLanguage } from "../../lib/LanguageProvider";

export default function Skills() {
  const { t } = useLanguage();
  const entries = Object.entries(profile.skills);

  // Asymmetric: 1 primary large + 3 small flat — removes uniform border/shadow
  const primary = entries[0]; // Web Development
  const rest = entries.slice(1);

  return (
    <section id="skills" className="section-cream py-16 md:py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8">
          <div className="space-y-2">
            <div className="inline-flex px-3 py-1 rounded-full bg-[#e8a020] text-black text-xs font-mono font-bold tracking-widest">[02] / {t("skills.title")}</div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-none text-[#0f0d0a]" style={{ fontFamily: "var(--font-display)" }}>
              Stack & Domain
            </h2>
            <div className="h-1 w-12 bg-[#e8a020] rounded-full mt-2" aria-hidden />
          </div>
          <p className="text-sm font-mono text-[#6b6560] max-w-md md:text-right">{t("skills.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 items-start">
          {/* Primary large — only this gets elevation + mustard accent */}
          <div className="md:col-span-7 rounded-[32px] p-7 sm:p-8 bg-[#e8a020] text-black hand-rotate-1 shadow-[0_12px_32px_rgba(232,160,32,0.18)] flex flex-col">
            <div className="flex items-start justify-between gap-3 pb-5">
              <h3 className="text-[11px] font-mono font-bold uppercase tracking-[0.14em] leading-none pt-1">{primary[0]}</h3>
              <span className="shrink-0 text-[11px] font-mono px-2.5 py-1 rounded-full bg-black text-white">01 — primary</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {primary[1].map((item) => (
                <span key={item} className="px-3.5 py-1.5 rounded-full bg-black text-white text-xs font-mono">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-black/10 text-[11px] font-mono text-black/85 leading-relaxed">
              Core stack — shown larger on purpose. Others stay flat.
            </div>
          </div>

          {/* Small flat cards — no border, just background, varied sizes */}
          <div className="md:col-span-5 grid grid-cols-1 gap-4 content-start">
            {rest.map(([category, items], idx) => (
              <div
                key={category}
                className={`rounded-[24px] p-5 sm:p-6 bg-[#ebe8e1] flex flex-col ${idx === 1 ? "hand-rotate-2 md:ml-3" : idx === 2 ? "hand-rotate-3" : "hand-rotate-1"}`}
              >
                <div className="flex items-center justify-between pb-3">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0f0d0a]">{category}</h3>
                  <span className="text-[10px] font-mono tracking-widest text-[#6b6560]">0{idx + 2}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((item) => (
                    <span key={item} className="px-2.5 py-1 rounded-full bg-[#f7f4ef] text-[#0f0d0a] text-[11px] font-mono">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
