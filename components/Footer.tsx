import React from "react";
import { ArrowUp, Sun, Moon, Globe, Terminal, Heart } from "lucide-react";
import { profile } from "../content/profile";
import { useTheme } from "../lib/ThemeProvider";
import { useLanguage } from "../lib/LanguageProvider";

export default function Footer() {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Tagline */}
          <div className="flex items-center space-x-3 text-center md:text-left">
            <div className="p-2.5 rounded-xl bg-slate-900 dark:bg-emerald-500 text-emerald-400 dark:text-slate-950">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                {profile.fullName} ({profile.displayName})
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {profile.tagline} • {profile.location}
              </p>
            </div>
          </div>

          {/* Controls: Language, Theme, Back-to-Top */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-mono hover:border-emerald-500 transition-colors"
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-500" />
              <span>{language.toUpperCase()}</span>
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-500 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-emerald-400 transition-all shadow-md"
              aria-label={t("footer.backToTop")}
              title={t("footer.backToTop")}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-500 gap-4">
          <p>
            © {new Date().getFullYear()} {profile.fullName}. {t("footer.rights")}
          </p>

          <p className="flex items-center space-x-1">
            <span>{t("footer.builtWith")}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
