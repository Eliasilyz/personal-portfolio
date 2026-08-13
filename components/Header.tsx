import React, { useState } from "react";
import { Sun, Moon, Menu, X, Terminal } from "lucide-react";
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
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-50/80 dark:bg-slate-950/80 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo / Brand */}
        <a
          href="#"
          className="flex items-center space-x-2.5 group focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg p-1"
        >
          <div className="p-2 rounded-xl bg-slate-900 dark:bg-emerald-500 text-emerald-400 dark:text-slate-950 transition-transform group-hover:scale-105">
            <Terminal className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-slate-900 dark:text-slate-100 tracking-tight text-base sm:text-lg group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              {profile.displayName} <span className="text-emerald-500 font-normal">.dev</span>
            </span>
            <span className="text-[10px] uppercase font-mono text-slate-500 dark:text-slate-400 tracking-wider hidden sm:inline">
              Portfolio
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Actions: Language Switcher & Theme Toggle */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100/80 dark:bg-slate-900/80 text-xs font-mono font-bold text-slate-800 dark:text-slate-200 hover:border-emerald-500 dark:hover:border-emerald-400 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 flex items-center space-x-1"
            aria-label={`Switch language to ${language === "en" ? "Indonesian" : "English"}`}
            title={`Switch language to ${language === "en" ? "Indonesian" : "English"}`}
          >
            <span className={language === "id" ? "text-emerald-500 font-extrabold" : "opacity-60"}>ID</span>
            <span className="opacity-40">/</span>
            <span className={language === "en" ? "text-emerald-500 font-extrabold" : "opacity-60"}>EN</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:border-emerald-500 dark:hover:border-emerald-400 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-slate-100/95 dark:bg-slate-900/95 px-4 pt-2 pb-4 space-y-1 transition-all">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
