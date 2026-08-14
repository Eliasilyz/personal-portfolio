"use client"

import React, { createContext, useContext, useState, useEffect } from "react";
import en from "../content/i18n/en.json";
import id from "../content/i18n/id.json";

export type Language = "en" | "id";

type Translations = typeof en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (keyPath: string) => string;
  dict: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("language") as Language | null;
      if (stored === "en" || stored === "id") {
        return stored;
      }
      const navLang = navigator.language.toLowerCase();
      if (navLang.startsWith("id")) {
        return "id";
      }
    }
    return "en";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("language", language);
      document.documentElement.lang = language;
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === "en" ? "id" : "en"));
  };

  const currentDict = language === "id" ? id : en;

  const t = React.useCallback(
    (keyPath: string): string => {
      const keys = keyPath.split(".");
      let current: any = currentDict;
      for (const key of keys) {
        if (current && typeof current === "object" && key in current) {
          current = current[key];
        } else {
          // Fallback to English if missing in ID
          let fallback: any = en;
          for (const fk of keys) {
            if (fallback && typeof fallback === "object" && fk in fallback) {
              fallback = fallback[fk];
            } else {
              return keyPath;
            }
          }
          return typeof fallback === "string" ? fallback : keyPath;
        }
      }
      return typeof current === "string" ? current : keyPath;
    },
    [currentDict]
  );

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        dict: currentDict as Translations,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

