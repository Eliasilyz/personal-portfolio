import React from "react";
import { Code, Gamepad2, TrendingUp, Palette, Check } from "lucide-react";
import { profile } from "../../content/profile";
import { useLanguage } from "../../lib/LanguageProvider";

export default function Skills() {
  const { t } = useLanguage();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Web Development":
        return Code;
      case "Game Server Engineering":
        return Gamepad2;
      case "Trading & Financial Markets":
        return TrendingUp;
      default:
        return Palette;
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "Web Development":
        return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
      case "Game Server Engineering":
        return "text-purple-500 bg-purple-500/10 border-purple-500/20";
      case "Trading & Financial Markets":
        return "text-amber-500 bg-amber-500/10 border-amber-500/20";
      default:
        return "text-blue-500 bg-blue-500/10 border-blue-500/20";
    }
  };

  return (
    <section id="skills" className="py-16 md:py-24 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-100/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <Code className="w-4 h-4" />
            <span>{t("skills.title")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Capabilities & Stack
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            {t("skills.subtitle")}
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(profile.skills).map(([category, items]) => {
            const IconComp = getCategoryIcon(category);
            const badgeStyle = getCategoryBadgeColor(category);

            return (
              <div
                key={category}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow space-y-4"
              >
                <div className="flex items-center space-x-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className={`p-2.5 rounded-xl border ${badgeStyle}`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    {category}
                  </h3>
                </div>

                <ul className="space-y-2.5">
                  {items.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5 text-sm text-slate-700 dark:text-slate-300">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
