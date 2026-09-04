#!/usr/bin/env node
/**
 * Build-time GitHub stats fetcher — static export safe.
 * Fetches users/{username} + repos?per_page=100, sums stars/forks, computes years_on_github.
 * Writes to public/data/github-stats.json (for runtime fetch) and src/data/github-stats.json (for import fallback).
 * Uses GITHUB_TOKEN if available (5000 req/h), else unauthenticated 60 req/h.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const USERNAME = process.env.GITHUB_USERNAME || 'eliasilyz';
const TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || '';

const headers = {
  'Accept': 'application/vnd.github.v3+json',
  'User-Agent': 'personal-portfolio-stats-fetch',
};
if (TOKEN) headers['Authorization'] = `Bearer ${TOKEN}`;

async function fetchJson(url) {
  const res = await fetch(url, { headers });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`GitHub API ${res.status} for ${url}: ${text.slice(0,200)}`);
  }
  return res.json();
}

async function main() {
  console.log(`Fetching GitHub stats for @${USERNAME} ...`);
  let user, repos;
  try {
    user = await fetchJson(`https://api.github.com/users/${USERNAME}`);
  } catch (e) {
    console.error('Failed to fetch user:', e.message);
    // graceful fallback — keep existing file or write defaults
    writeFallback(e.message);
    process.exit(0);
  }

  try {
    // Handle pagination if >100 repos (Link header)
    repos = [];
    let page = 1;
    let hasNext = true;
    while (hasNext) {
      const batch = await fetchJson(`https://api.github.com/users/${USERNAME}/repos?per_page=100&page=${page}&sort=updated`);
      repos.push(...batch);
      hasNext = batch.length === 100;
      page++;
      if (page > 5) break; // safety: max 500 repos
      if (hasNext) await new Promise(r => setTimeout(r, 200));
    }
  } catch (e) {
    console.error('Failed to fetch repos:', e.message);
    repos = [];
  }

  const totalStars = repos.reduce((s, r) => s + (r.stargazers_count ?? 0), 0);
  const totalForks = repos.reduce((s, r) => s + (r.forks_count ?? 0), 0);
  const createdAt = user.created_at;
  const yearsOnGithub = (() => {
    if (!createdAt) return null;
    const start = new Date(createdAt).getTime();
    const now = Date.now();
    const years = (now - start) / (365.25 * 24 * 3600 * 1000);
    return Math.max(0, Math.floor(years));
  })();

  const payload = {
    username: USERNAME,
    public_repos: user.public_repos ?? repos.length,
    followers: user.followers ?? 0,
    following: user.following ?? 0,
    total_stars: totalStars,
    total_forks: totalForks,
    years_on_github: yearsOnGithub,
    created_at: createdAt,
    fetched_at: new Date().toISOString(),
  };

  const outPaths = [
    path.join(ROOT, 'public', 'data', 'github-stats.json'),
    path.join(ROOT, 'src', 'data', 'github-stats.json'),
  ];

  for (const p of outPaths) {
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, JSON.stringify(payload, null, 2) + '\n', 'utf8');
    console.log(`Wrote ${path.relative(ROOT, p)}:`, payload);
  }
}

function writeFallback(reason) {
  const fallback = {
    username: USERNAME,
    public_repos: 0,
    followers: 0,
    following: 0,
    total_stars: 0,
    total_forks: 0,
    years_on_github: 0,
    created_at: null,
    fetched_at: new Date().toISOString(),
    _fallback: true,
    _reason: String(reason).slice(0, 300),
  };
  const outPaths = [
    path.join(ROOT, 'public', 'data', 'github-stats.json'),
    path.join(ROOT, 'src', 'data', 'github-stats.json'),
  ];
  for (const p of outPaths) {
    try {
      if (fs.existsSync(p)) {
        console.log(`Keeping existing ${path.relative(ROOT, p)} (fallback, not overwriting)`);
        continue;
      }
      fs.mkdirSync(path.dirname(p), { recursive: true });
      fs.writeFileSync(p, JSON.stringify(fallback, null, 2) + '\n', 'utf8');
      console.log(`Wrote fallback ${path.relative(ROOT, p)}`);
    } catch {}
  }
}

main().catch(e => {
  console.error(e);
  writeFallback(e.message);
});
