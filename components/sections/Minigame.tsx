import React, { Suspense, lazy } from "react";
import { Gamepad2, Sparkles, Loader2 } from "lucide-react";
import { useLanguage } from "../../lib/LanguageProvider";

// Dynamic code-split lazy loading for MinigameCanvas to preserve initial paint metrics
const MinigameCanvas = lazy(() => import("../game/MinigameCanvas"));

export default function MinigameSection() {
  const { t } = useLanguage();

  return (
    <section id="play" className="py-16 md:py-24 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <Gamepad2 className="w-4 h-4" />
            <span>{t("nav.play")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Interactive Minigame
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-xl">
            {t("game.subtitle")}
          </p>
        </div>

        {/* Minigame Mount with Suspense */}
        <Suspense
          fallback={
            <div className="w-full h-72 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center space-y-3 text-slate-400 font-mono text-xs">
              <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
              <span>Loading Market Dodger Game Engine...</span>
            </div>
          }
        >
          <MinigameCanvas />
        </Suspense>
      </div>
    </section>
  );
}
