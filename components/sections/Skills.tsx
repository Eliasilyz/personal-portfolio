import React from "react";
import { profile } from "../../content/profile";
import { useLanguage } from "../../lib/LanguageProvider";

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="py-16 md:py-24 border-b border-[#d4cfc6] dark:border-[#2a2620] bg-[#ebe8e1]/40 dark:bg-[#1a1714]/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Header Column */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-[#c8860a] dark:text-[#e8a020]">
              [02] / {t("skills.title")}
            </div>
            <h2 className="text-3xl font-['Newsreader',Georgia,serif] italic font-normal text-[#0f0d0a] dark:text-[#f0ece4]">
              Stack & Domain Knowledge
            </h2>
            <p className="text-xs font-mono text-[#7a7368] dark:text-[#8a8278]">
              {t("skills.subtitle")}
            </p>
          </div>

          {/* Ledger Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Object.entries(profile.skills).map(([category, items], idx) => (
              <div
                key={category}
                className="border border-[#d4cfc6] dark:border-[#2a2620] bg-[#f7f4ef] dark:bg-[#100e0b] p-5 space-y-3"
              >
                <div className="flex items-center justify-between border-b border-[#d4cfc6] dark:border-[#2a2620] pb-2">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0f0d0a] dark:text-[#f0ece4]">
                    {category}
                  </h3>
                  <span className="text-[10px] font-mono text-[#7a7368] dark:text-[#8a8278]">
                    0{idx + 1}
                  </span>
                </div>

                <ul className="space-y-1.5 text-xs font-mono text-[#7a7368] dark:text-[#8a8278]">
                  {items.map((item, i) => (
                    <li key={i} className="flex items-baseline space-x-2">
                      <span className="text-[#c8860a] dark:text-[#e8a020] text-[10px]">↳</span>
                      <span className="text-[#0f0d0a] dark:text-[#f0ece4]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
