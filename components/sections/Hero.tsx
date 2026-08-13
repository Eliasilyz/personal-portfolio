import React from "react";
import { ArrowRight, Code, TrendingUp, Gamepad2, MapPin, Sparkles, FolderGit2, Mail } from "lucide-react";
import { profile } from "../../content/profile";
import { useLanguage } from "../../lib/LanguageProvider";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Main Hero Content */}
          <div className="flex-1 space-y-6 text-center lg:text-left">
            {/* Status Pills */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>{t("hero.availableForWork")}</span>
              </span>

              <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-mono bg-slate-200/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
                <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                <span>{t("hero.badge")}</span>
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <p className="text-sm font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                {t("hero.greeting")}
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-slate-100 leading-tight">
                {profile.fullName} <span className="text-emerald-500 font-extrabold">("{profile.displayName}")</span>
              </h1>
              <p className="text-xl sm:text-2xl font-medium text-slate-600 dark:text-slate-300 max-w-2xl">
                {t("hero.tagline")}
              </p>
            </div>

            {/* Quick Domain Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2 text-xs font-mono">
              <span className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                <Code className="w-4 h-4 text-emerald-500" />
                <span>Web Dev</span>
              </span>
              <span className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                <Gamepad2 className="w-4 h-4 text-purple-500" />
                <span>Fabric Modding</span>
              </span>
              <span className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                <TrendingUp className="w-4 h-4 text-amber-500" />
                <span>Stock & Crypto Spot</span>
              </span>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="#projects"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-950 font-bold text-sm hover:bg-slate-800 dark:hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/10 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <FolderGit2 className="w-4 h-4" />
                <span>{t("hero.viewProjects")}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 text-slate-800 dark:text-slate-200 font-semibold text-sm hover:border-emerald-500 dark:hover:border-emerald-400 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <Mail className="w-4 h-4 text-emerald-500" />
                <span>{t("hero.contactMe")}</span>
              </a>
            </div>
          </div>

          {/* Decorative Terminal / Hero Graphic */}
          <div className="w-full max-w-md lg:max-w-md">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-200 p-5 shadow-2xl space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-slate-400 text-[11px]">farel@ponorogo:~</span>
              </div>

              <div className="space-y-2 text-slate-300">
                <p>
                  <span className="text-emerald-400">farel@dev</span>:<span className="text-blue-400">~</span>$ cat profile.json
                </p>
                <pre className="p-3 rounded-lg bg-slate-950/80 text-emerald-400 overflow-x-auto text-[11px] leading-relaxed">
{`{
  "name": "${profile.fullName}",
  "handle": "${profile.displayName}",
  "age": ${profile.age},
  "location": "Ponorogo, East Java",
  "focus": ["Web", "Fabric", "Trading"]
}`}
                </pre>
                <p>
                  <span className="text-emerald-400">farel@dev</span>:<span className="text-blue-400">~</span>$ status --live
                </p>
                <div className="flex items-center space-x-2 text-slate-400">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
                  <span>Building web apps & analyzing markets...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
