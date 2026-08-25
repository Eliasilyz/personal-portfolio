import React from "react";
import { profile } from "../../content/profile";
import { useLanguage } from "../../lib/LanguageProvider";

export default function About() {
  const { language, t } = useLanguage();
  const bioText = profile.bio[language] || profile.bio.en;
  const highlightsList = profile.highlights[language] || profile.highlights.en;

  return (
    <section id="about" className="py-16 md:py-24 border-b border-[#d4cfc6] dark:border-[#2a2620]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Section Eyebrow */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-[#c8860a] dark:text-[#e8a020]">
              [01] / {t("about.title")}
            </div>
            <h2 className="text-3xl font-['Newsreader',Georgia,serif] italic font-normal text-[#0f0d0a] dark:text-[#f0ece4]">
              {profile.displayName} — in brief.
            </h2>
          </div>

          {/* Core Story & Highlights */}
          <div className="lg:col-span-8 space-y-8">
            <p className="text-lg sm:text-xl font-['Newsreader',Georgia,serif] font-normal leading-relaxed text-[#0f0d0a] dark:text-[#f0ece4]">
              {bioText}
            </p>

            <div className="border-t border-[#d4cfc6] dark:border-[#2a2620] pt-6 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#7a7368] dark:text-[#8a8278]">
                CORE DISCIPLINE & RECORD
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-[#0f0d0a] dark:text-[#f0ece4]">
                {highlightsList.map((item, index) => (
                  <div
                    key={index}
                    className="p-3 bg-[#ebe8e1] dark:bg-[#1a1714] border border-[#d4cfc6] dark:border-[#2a2620] leading-relaxed"
                  >
                    <span className="text-[#c8860a] dark:text-[#e8a020] mr-2">§</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
