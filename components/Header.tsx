"use client";

import React, { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "../lib/LanguageProvider";
import { profile } from "../content/profile";

export default function Header() {
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "#about", label: t("nav.about") },
    { href: "#skills", label: t("nav.skills") },
    { href: "#projects", label: t("nav.projects") },
    { href: "#journey", label: t("nav.journey") },
    { href: "#play", label: t("nav.play") },
    { href: "#links", label: t("nav.links") },
    { href: "#contact", label: t("nav.contact") },
  ];

  return (
    <header className="sticky top-0 z-40 w-full pt-4 px-4 sm:px-6 pointer-events-none">
      <a href="#main-content" className="skip-link pointer-events-auto">Skip to content</a>
      {/* Pill floating container */}
      <div className="max-w-6xl mx-auto pointer-events-auto">
        <div className="flex items-center justify-between gap-3 bg-[#0f0d0a] text-[#f7f4ef] rounded-full px-3 sm:px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.22)] border border-white/10">
          {/* Logo mark */}
          <a href="#" className="flex items-center gap-2.5 shrink-0 group">
            <span className="w-7 h-7 rounded-full bg-[#e8a020] flex items-center justify-center text-[11px] font-mono font-bold text-[#0f0d0a] leading-none">
              F
            </span>
            <span className="hidden sm:inline font-[var(--font-display)] font-bold tracking-tight text-sm">
              {profile.displayName.toLowerCase()}
            </span>
            <span className="hidden lg:inline text-[10px] font-mono tracking-widest uppercase opacity-60">/ ponorogo</span>
          </a>

          {/* Center nav - desktop */}
          <nav aria-label="Primary" className="hidden md:flex items-center gap-1 text-xs font-mono">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="touch-hit px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors duration-150"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Utility right */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleLanguage}
              className="touch-hit inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-xs font-mono transition-colors"
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5 opacity-70" />
              <span>{language.toUpperCase()}</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="touch-hit md:hidden w-8 h-8 rounded-full bg-white/10 hover:bg-white/15 flex items-center justify-center transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown pill */}
        {mobileMenuOpen && (
          <nav aria-label="Mobile" className="md:hidden mt-2 bg-[#0f0d0a] text-[#f7f4ef] rounded-[24px] p-2 border border-white/10 animate-fadeIn">
            <div className="grid grid-cols-2 gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-full bg-white/[0.06] hover:bg-white/10 text-xs font-mono text-center transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
