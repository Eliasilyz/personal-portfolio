import React from "react";
import { Milestone, journey } from "../../content/journey";
import { Calendar, CheckCircle2, Flame, Award, TrendingUp, Code, Gamepad2 } from "lucide-react";
import { useLanguage } from "../../lib/LanguageProvider";

export default function Journey() {
  const { language, t } = useLanguage();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Coding":
        return Code;
      case "Game Engineering":
        return Gamepad2;
      case "Trading":
        return TrendingUp;
      default:
        return Award;
    }
  };

  return (
    <section id="journey" className="py-16 md:py-24 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-100/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Title */}
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <Calendar className="w-4 h-4" />
            <span>{t("journey.title")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Timeline & Experience
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            {t("journey.subtitle")}
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-emerald-500/30 ml-4 md:ml-32 space-y-10 pl-6 md:pl-8">
          {journey.map((item: Milestone) => {
            const title = item.title[language] || item.title.en;
            const description = item.description[language] || item.description.en;
            const highlights = item.highlights[language] || item.highlights.en;
            const IconComp = getCategoryIcon(item.category);

            return (
              <div key={item.id} className="relative group">
                {/* Year Marker on Left for Desktop */}
                <div className="hidden md:block absolute -left-36 top-1 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm text-center w-28">
                  {item.year}
                </div>

                {/* Node Icon on Timeline Line */}
                <div className="absolute -left-[35px] top-1.5 p-1.5 rounded-full bg-emerald-500 text-slate-950 ring-4 ring-white dark:ring-slate-950 shadow-md">
                  <IconComp className="w-4 h-4" />
                </div>

                {/* Card Container */}
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500/50 transition-all space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="md:hidden text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      {item.year}
                    </span>
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    {title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {description}
                  </p>

                  {/* Highlights */}
                  {highlights && highlights.length > 0 && (
                    <ul className="pt-2 space-y-1.5 border-t border-slate-100 dark:border-slate-800/80">
                      {highlights.map((h, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-xs text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
