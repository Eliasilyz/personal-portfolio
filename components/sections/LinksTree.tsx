import React from "react";
import { Share2, Github, Twitter, TrendingUp, Coins, Gamepad, Globe, ExternalLink, ArrowUpRight } from "lucide-react";
import { links, LinkItem } from "../../content/links";
import { useLanguage } from "../../lib/LanguageProvider";

export default function LinksTree() {
  const { language, t } = useLanguage();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "github":
        return Github;
      case "twitter":
        return Twitter;
      case "trending-up":
        return TrendingUp;
      case "coins":
        return Coins;
      case "gamepad":
        return Gamepad;
      default:
        return Globe;
    }
  };

  return (
    <section id="links" className="py-16 md:py-24 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-100/50 dark:bg-slate-900/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="space-y-2 text-center">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <Share2 className="w-4 h-4" />
            <span>{t("links.title")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Links & Digital Ecosystem
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
            {t("links.subtitle")}
          </p>
        </div>

        {/* Links Tree Container */}
        <div className="space-y-3">
          {links.map((link: LinkItem) => {
            const IconComp = getIcon(link.iconName);
            const desc = link.description[language] || link.description.en;

            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500/60 dark:hover:border-emerald-500/60 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors text-base">
                        {link.title}
                      </span>
                      {link.badge && (
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                          {link.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                      {desc}
                    </p>
                  </div>
                </div>

                <div className="text-slate-400 group-hover:text-emerald-500 transition-colors p-2">
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
