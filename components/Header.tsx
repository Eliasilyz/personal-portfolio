"use client";

import React, { useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "../lib/ThemeProvider";
import { useLanguage } from "../lib/LanguageProvider";
import { profile } from "../content/profile";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
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
    <header className="sticky top-0 z-40 w-full bg-[#f7f4ef]/90 dark:bg-[#100e0b]/90 backdrop-blur border-b border-[#d4cfc6] dark:border-[#2a2620] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#"
          className="group flex items-baseline space-x-2 focus:outline-none"
        >
          <span className="font-['Newsreader',Georgia,serif] text-xl italic font-semibold text-[#0f0d0a] dark:text-[#f0ece4] tracking-tight group-hover:text-[#c8860a] dark:group-hover:text-[#e8a020] transition-colors">
            {profile.displayName.toLowerCase()}
          </span>
          <span className="text-[11px] font-mono text-[#7a7368] dark:text-[#8a8278] tracking-widest uppercase">
            / ponorogo
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 text-xs font-mono uppercase tracking-wider text-[#7a7368] dark:text-[#8a8278]">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-[#0f0d0a] dark:hover:text-[#f0ece4] transition-colors relative py-1 hover:underline underline-offset-4 decoration-[#c8860a]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Controls */}
        <div className="flex items-center space-x-3 text-xs font-mono">
          <button
            onClick={toggleLanguage}
            className="px-2 py-1 border border-[#d4cfc6] dark:border-[#2a2620] hover:border-[#c8860a] dark:hover:border-[#e8a020] rounded text-[#0f0d0a] dark:text-[#f0ece4] transition-colors uppercase tracking-wider"
            aria-label="Toggle language"
          >
            {language === "id" ? "EN" : "ID"}
          </button>

          <button
            onClick={toggleTheme}
            className="p-1.5 border border-[#d4cfc6] dark:border-[#2a2620] hover:border-[#c8860a] dark:hover:border-[#e8a020] rounded text-[#7a7368] dark:text-[#8a8278] hover:text-[#0f0d0a] dark:hover:text-[#f0ece4] transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-[#0f0d0a] dark:text-[#f0ece4]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-b border-[#d4cfc6] dark:border-[#2a2620] bg-[#f7f4ef] dark:bg-[#100e0b] px-6 py-4 space-y-2 text-xs font-mono uppercase tracking-wider">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 text-[#7a7368] dark:text-[#8a8278] hover:text-[#0f0d0a] dark:hover:text-[#f0ece4]"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
