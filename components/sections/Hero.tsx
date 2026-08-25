import React from "react";
import { ArrowUpRight } from "lucide-react";
import { profile } from "../../content/profile";
import { useLanguage } from "../../lib/LanguageProvider";

export default function Hero() {
  const { language, t } = useLanguage();

  return (
    <section id="hero" className="pt-16 pb-20 md:pt-24 md:pb-28 border-b border-[#d4cfc6] dark:border-[#2a2620]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Column: Editorial Statement */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-widest text-[#c8860a] dark:text-[#e8a020]">
                {profile.location} — {profile.age} y/o
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-['Newsreader',Georgia,serif] font-normal leading-[1.08] tracking-tight text-[#0f0d0a] dark:text-[#f0ece4]">
                Building software, tuning game servers, and reading <em className="italic font-normal text-[#c8860a] dark:text-[#e8a020]">market candles</em>.
              </h1>
            </div>

            <p className="text-base sm:text-lg text-[#7a7368] dark:text-[#8a8278] leading-relaxed max-w-xl font-normal">
              {profile.bio[language] || profile.bio.en}
            </p>

            {/* Direct Index Links */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-mono uppercase tracking-wider">
              <a
                href="#projects"
                className="inline-flex items-center space-x-1.5 pb-0.5 border-b border-[#0f0d0a] dark:border-[#f0ece4] text-[#0f0d0a] dark:text-[#f0ece4] hover:text-[#c8860a] dark:hover:text-[#e8a020] hover:border-[#c8860a] dark:hover:border-[#e8a020] transition-colors"
              >
                <span>{t("hero.viewProjects")}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center space-x-1.5 pb-0.5 border-b border-[#7a7368] text-[#7a7368] dark:text-[#8a8278] hover:text-[#0f0d0a] dark:hover:text-[#f0ece4] hover:border-[#0f0d0a] dark:hover:border-[#f0ece4] transition-colors"
              >
                <span>{t("hero.contactMe")}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <span className="text-[#7a7368] dark:text-[#8a8278] hidden sm:inline">
                • {t("hero.availableForWork")}
              </span>
            </div>
          </div>

          {/* Right Column: Signature Workstation Artifact */}
          <div className="lg:col-span-5">
            <div className="border border-[#d4cfc6] dark:border-[#2a2620] bg-[#ebe8e1] dark:bg-[#1a1714] p-5 font-mono text-xs text-[#0f0d0a] dark:text-[#f0ece4] space-y-4">
              <div className="flex items-center justify-between border-b border-[#d4cfc6] dark:border-[#2a2620] pb-2 text-[11px] text-[#7a7368] dark:text-[#8a8278]">
                <span>INDEX / SUMMARY</span>
                <span>STATUS: ACTIVE</span>
              </div>

              {/* Data Spec Grid */}
              <dl className="grid grid-cols-3 gap-y-3 gap-x-2 text-[11px]">
                <dt className="text-[#7a7368] dark:text-[#8a8278]">IDENTITY</dt>
                <dd className="col-span-2 font-medium">{profile.fullName}</dd>

                <dt className="text-[#7a7368] dark:text-[#8a8278]">HANDLE</dt>
                <dd className="col-span-2">{profile.displayName} (@stepech)</dd>

                <dt className="text-[#7a7368] dark:text-[#8a8278]">STACK</dt>
                <dd className="col-span-2">Next.js, TypeScript, React</dd>

                <dt className="text-[#7a7368] dark:text-[#8a8278]">SYSTEMS</dt>
                <dd className="col-span-2">Fabric, JVM, Linux Ports</dd>

                <dt className="text-[#7a7368] dark:text-[#8a8278]">MARKETS</dt>
                <dd className="col-span-2">Stockbit (IDX), Binance Spot</dd>
              </dl>

              {/* Candlestick ASCII Signature */}
              <div className="border-t border-[#d4cfc6] dark:border-[#2a2620] pt-3 space-y-2">
                <div className="text-[10px] text-[#7a7368] dark:text-[#8a8278] tracking-widest">
                  LIVE SNAPSHOT
                </div>
                <div className="p-3 bg-[#f7f4ef] dark:bg-[#100e0b] border border-[#d4cfc6] dark:border-[#2a2620] text-[11px] leading-tight space-y-1 select-none">
                  <div className="flex justify-between text-[#7a7368] dark:text-[#8a8278]">
                    <span>BTC/USDT 1D</span>
                    <span className="text-[#c8860a] dark:text-[#e8a020] font-semibold">+4.82%</span>
                  </div>
                  <div className="text-[#7a7368] dark:text-[#8a8278] font-mono text-[10px] pt-1">
                    {'  |     |       |       |       |  '}
                    <br />
                    {' [ ]   [ ]     [■]     [■]     [■] '}
                    <br />
                    {'  |      |       |       |       |  '}
                  </div>
                  <div className="text-[10px] text-[#7a7368] dark:text-[#8a8278] pt-1 border-t border-[#d4cfc6]/50 dark:border-[#2a2620]/50 flex justify-between">
                    <span>BUILD: PRODUCTION</span>
                    <span>PING: 14ms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
