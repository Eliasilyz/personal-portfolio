"use client";
import { useEffect, useState } from "react";

export type GithubStats = {
  username: string;
  public_repos: number;
  followers: number;
  total_stars: number;
  years_on_github: number;
  fetched_at?: string;
};

const FALLBACK: GithubStats = {
  username: "eliasilyz",
  public_repos: 92,
  followers: 201,
  total_stars: 104,
  years_on_github: 3,
};

export function useGithubStats() {
  const [stats, setStats] = useState<GithubStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const candidates: string[] = [
        "data/github-stats.json",
        "./data/github-stats.json",
        "/personal-portfolio/data/github-stats.json",
        "/data/github-stats.json",
      ];
      try {
        const base = (import.meta as any).env?.BASE_URL || "/";
        if (base && !candidates.includes(`${base}data/github-stats.json`)) {
          candidates.unshift(`${base}data/github-stats.json`);
        }
      } catch {}
      for (const url of candidates) {
        try {
          const res = await fetch(url, { cache: "no-store" });
          if (!res.ok) continue;
          const json = (await res.json()) as GithubStats;
          if (!cancelled && json && typeof json.public_repos === "number") {
            setStats(json);
            setLoading(false);
            return;
          }
        } catch {}
      }
      if (!cancelled) {
        setStats(FALLBACK);
        setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { stats: stats ?? FALLBACK, loading, isFallback: !stats };
}
