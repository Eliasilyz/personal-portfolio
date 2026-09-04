import React from "react";
import { Github, Twitter, TrendingUp, Coins, Gamepad, Globe, ArrowUpRight } from "lucide-react";
import { links, LinkItem } from "../../content/links";
import { useLanguage } from "../../lib/LanguageProvider";
import { useGithubStats } from "../../lib/useGithubStats";

function GithubStatsBlock() {
  const { t } = useLanguage();
  const { stats, loading } = useGithubStats();

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="bg-[#ebe8e1] rounded-[20px] px-3 py-4 text-center border border-[#d4cfc6] animate-pulse">
            <div className="h-7 sm:h-8 w-12 mx-auto bg-[#d4cfc6] rounded-full mb-2" />
            <div className="h-3 w-20 mx-auto bg-[#d4cfc6]/60 rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  const items = [
    { value: String(stats.public_repos), label: t("githubStats.publicRepos") },
    { value: String(stats.followers), label: t("githubStats.followers") },
    { value: `${stats.total_stars}`, label: t("githubStats.stars") },
    { value: `${stats.years_on_github}+`, label: t("githubStats.years") },
  ];

  const rotates = ["hand-rotate-1", "hand-rotate-2", "hand-rotate-3", "hand-rotate-1"];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {items.map((s, i) => (
        <div key={s.label} className={`bg-[#ebe8e1] rounded-[20px] px-3 py-4 text-center border border-[#d4cfc6] ${rotates[i]}`}>
          <div className="text-[28px] sm:text-[30px] font-black tracking-tight leading-none text-[#0f0d0a]">{s.value}</div>
          <div className="text-[10px] font-mono leading-tight text-[#6b6560] mt-1">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

export default function LinksTree() {
  const { language, t } = useLanguage();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "github": return Github;
      case "twitter": return Twitter;
      case "trending-up": return TrendingUp;
      case "coins": return Coins;
      case "gamepad": return Gamepad;
      default: return Globe;
    }
  };

  return (
    <section id="links" className="section-cream py-16 md:py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex px-3 py-1 rounded-full bg-[#e8a020] text-black text-xs font-mono font-bold tracking-widest">[05] / {t("links.title")}</div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-none text-[#0f0d0a]" style={{ fontFamily: "var(--font-display)" }}>Links & Ecosystem</h2>
          </div>
          <p className="text-sm font-mono text-[#6b6560] max-w-md md:text-right">{t("links.subtitle")}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          {links.map((link: LinkItem) => {
            const IconComp = getIcon(link.iconName);
            const desc = link.description[language] || link.description.en;
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="touch-hit group inline-flex items-center gap-3 px-4 sm:px-5 py-3 rounded-full bg-[#ebe8e1] border border-[#d4cfc6] hover:border-[#0f0d0a] hover:bg-[#0f0d0a] hover:text-[#f7f4ef] transition-colors duration-150"
                title={desc}
              >
                <span className="w-7 h-7 rounded-full bg-[#f7f4ef] text-[#0f0d0a] group-hover:bg-white/15 group-hover:text-[#f7f4ef] border border-[#d4cfc6] flex items-center justify-center shrink-0 transition-colors">
                  <IconComp className="w-3.5 h-3.5" />
                </span>
                <span className="text-sm font-semibold tracking-tight whitespace-nowrap">{link.title}</span>
                {link.badge && (
                  <span className="text-[10px] font-mono px-2 py-1 rounded-full bg-[#e8a020] text-black whitespace-nowrap">{link.badge}</span>
                )}
                <ArrowUpRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            );
          })}
        </div>

        <div className="pt-2 border-t border-[#d4cfc6]/60">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e8a020]" aria-hidden />
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#6b6560]">{t("githubStats.live")}</span>
            <span className="text-[11px] font-mono text-[#6b6560]/60">eliasilyz</span>
          </div>
          <GithubStatsBlock />
        </div>
      </div>
    </section>
  );
}
