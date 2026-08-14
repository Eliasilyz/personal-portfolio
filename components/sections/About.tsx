import React from "react";
import { User, CheckCircle2, Award, Terminal, Cpu, LineChart } from "lucide-react";
import { profile } from "../../content/profile";
import { useLanguage } from "../../lib/LanguageProvider";

export default function About() {
  const { language, t } = useLanguage();

  const bioText = profile.bio[language] || profile.bio.en;
  const highlightsList = profile.highlights[language] || profile.highlights.en;

  const quickStats = [
    {
      icon: Terminal,
      title: t("about.quickStats.experience"),
      desc: "React, Next.js, TS & Tailwind",
      color: "text-emerald-500",
    },
    {
      icon: Cpu,
      title: t("about.quickStats.minecraft"),
      desc: "Custom Fabric Mods & NBT",
      color: "text-purple-500",
    },
    {
      icon: LineChart,
      title: t("about.quickStats.markets"),
      desc: "Stockbit, Binance",
      color: "text-amber-500",
    },
  ];

  return (
    <section id="about" className="py-16 md:py-24 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Title */}
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <User className="w-4 h-4" />
            <span>{t("about.title")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            {profile.fullName} ({profile.displayName})
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            {t("about.subtitle")}
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Bio text & highlights */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
                {bioText}
              </p>
            </div>

            {/* Highlights List */}
            <div className="space-y-3">
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                Key Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {highlightsList.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-2.5 p-3 rounded-xl bg-slate-100/80 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stat Cards */}
          <div className="lg:col-span-5 space-y-4">
            {quickStats.map((stat, idx) => {
              const IconComp = stat.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500/50 transition-colors flex items-center space-x-4"
                >
                  <div className={`p-3 rounded-xl bg-slate-100 dark:bg-slate-800 ${stat.color}`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {stat.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {stat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
