import React from "react";
import { Milestone, journey } from "../../content/journey";
import { useLanguage } from "../../lib/LanguageProvider";

export default function Journey() {
  const { t, language } = useLanguage();

  return (
    <section id="journey" className="section-ink relative overflow-hidden py-16 md:py-24">
      {/* reticle corners */}
      <div className="pointer-events-none absolute top-4 left-4 w-6 h-6 border-l border-t border-white/20 hidden md:block" aria-hidden />
      <div className="pointer-events-none absolute top-4 right-4 w-6 h-6 border-r border-t border-white/20 hidden md:block" aria-hidden />
      <div className="pointer-events-none absolute bottom-4 left-4 w-6 h-6 border-l border-b border-white/20 hidden md:block" aria-hidden />
      <div className="pointer-events-none absolute bottom-4 right-4 w-6 h-6 border-r border-b border-white/20 hidden md:block" aria-hidden />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex px-3 py-1 rounded-full bg-[#e8a020] text-black text-xs font-mono font-bold tracking-widest">[04] / {t("journey.title")}</div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-[0.9] text-[#f7f4ef]" style={{ fontFamily: "var(--font-display)" }}>
              Timeline &<br />
              <span className="italic font-light text-[#f7f4ef]/80">Experience</span>
            </h2>
          </div>
          <p className="text-sm font-mono text-white/60 max-w-md md:text-right">{t("journey.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {journey.map((item: Milestone, idx) => {
            const title = item.title[language] || item.title.en;
            const description = item.description[language] || item.description.en;
            const highlights = item.highlights[language] || item.highlights.en;
            const isMustard = idx === 0;
            return (
              <div
                key={item.id}
                className={`${idx === 0 ? "md:col-span-8" : idx === 1 ? "md:col-span-4" : "md:col-span-6"} rounded-[24px] p-6 sm:p-7 flex flex-col ${isMustard ? "bg-[#e8a020] text-black hand-rotate-1" : idx %2===0 ? "bg-white/10 text-[#f7f4ef] border border-white/10 backdrop-blur hand-rotate-2" : "bg-white/10 text-[#f7f4ef] border border-white/10 backdrop-blur hand-rotate-3"}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-xs font-mono px-3 py-1 rounded-full ${isMustard ? "bg-black text-white" : "bg-white text-black"}`}>{item.year}</span>
                  <span className={`text-[11px] font-mono uppercase tracking-wider ${isMustard ? "text-black/60" : "text-white/60"}`}>{item.category}</span>
                </div>
                <h3 className="text-lg font-bold tracking-tight leading-tight mt-4">{title}</h3>
                <p className={`text-sm leading-relaxed mt-2 ${isMustard ? "text-black/70" : "text-white/70"}`}>{description}</p>
                {highlights && highlights.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {highlights.slice(0, 3).map((h, i) => (
                      <span key={i} className={`px-2.5 py-1 rounded-full text-xs font-mono border ${isMustard ? "bg-black/10 border-black/10" : "bg-white/10 border-white/10"}`}>
                        {h}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-12 border-y border-white/10 overflow-hidden py-3 bg-white/5" aria-hidden>
        <div className="flex gap-6 animate-bleed" style={{ width: "200%" }}>
          <span className="bleed-text text-white">journey . journey . journey . journey . journey .</span>
          <span className="bleed-text text-white">journey . journey . journey . journey . journey .</span>
        </div>
      </div>
    </section>
  );
}
