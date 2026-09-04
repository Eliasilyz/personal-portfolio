import React, { Suspense, lazy } from "react";
import { Loader2 } from "lucide-react";
import { useLanguage } from "../../lib/LanguageProvider";

const MinigameCanvas = lazy(() => import("../game/MinigameCanvas"));

export default function MinigameSection() {
  const { t } = useLanguage();

  return (
    <section id="play" className="section-cream py-16 md:py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex px-3 py-1 rounded-full bg-[#e8a020] text-black text-xs font-mono font-bold tracking-widest">[—] / {t("nav.play")}</div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-none text-[#0f0d0a]" style={{ fontFamily: "var(--font-display)" }}>Code Dodger</h2>
          </div>
          <p className="text-sm font-mono text-[#6b6560] max-w-md md:text-right">{t("game.subtitle")}</p>
        </div>

        <div className="rounded-[32px] p-3 bg-[#ebe8e1] border border-[#d4cfc6]">
          <Suspense
            fallback={
              <div className="w-full h-72 rounded-[24px] bg-[#f7f4ef] border border-[#d4cfc6] flex flex-col items-center justify-center gap-3 text-[#6b6560] font-mono text-xs">
                <Loader2 className="w-6 h-6 text-[#e8a020] animate-spin" />
                <span>Loading Code Dodger…</span>
              </div>
            }
          >
            <MinigameCanvas />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
