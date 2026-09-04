import React from "react";
import { ArrowUp, Globe } from "lucide-react";
import { profile } from "../content/profile";
import { useLanguage } from "../lib/LanguageProvider";

export default function Footer() {
  const { language, toggleLanguage, t } = useLanguage();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="section-ink border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white rounded-full px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-mono text-xs font-bold">F</span>
            <div>
              <div className="text-sm font-bold tracking-tight text-black leading-none">{profile.fullName}</div>
              <div className="text-[11px] font-mono text-black/60">{profile.location}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggleLanguage} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black text-white text-xs font-mono hover:bg-[var(--amber)] hover:text-black transition-colors">
              <Globe className="w-3 h-3" /> {language.toUpperCase()}
            </button>
            <button onClick={scrollToTop} className="w-8 h-8 rounded-full bg-[var(--amber)] text-black flex items-center justify-center hover:bg-black hover:text-white transition-colors" aria-label={t("footer.backToTop")}>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-6 text-xs font-mono text-white/60">
          <p>© {new Date().getFullYear()} {profile.fullName}. {t("footer.rights")}</p>
          <p className="text-[11px]">{t("footer.builtWith")}</p>
        </div>
      </div>
    </footer>
  );
}
