// TODO: replace with real data

export interface Project {
  id: string;
  title: string;
  category: "Web App" | "Game Server" | "Trading Tool" | "Utility";
  description: {
    en: string;
    id: string;
  };
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  image: string;
}

export const projects: Project[] = [
  {
    id: "portfolio-website",
    title: "Advanced Personal Portfolio",
    category: "Web App",
    description: {
      en: "High-performance, dual-target personal portfolio built with Next.js 14, TypeScript, Tailwind CSS, persistent YouTube player, and custom canvas minigame.",
      id: "Portfolio pribadi performa tinggi dengan target ganda yang dibangun menggunakan Next.js 14, TypeScript, Tailwind CSS, pemutar YouTube persisten, dan minigame canvas kustom.",
    },
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Canvas API", "i18n"],
    githubUrl: "https://github.com/Eliasilyz/personal-portfolio",
    liveUrl: "https://farelhanafi.my.id",
    featured: true,
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "eliasdex-anime-streaming",
    title: "Eliasdex - Anime Streaming Platform",
    category: "Web App",
    description: {
      en: "A modern, fast, and responsive anime streaming web platform featuring episode tracking, custom video player integration, bookmarking, and seamless API integration.",
      id: "Platform web streaming anime modern, cepat, dan responsif dengan fitur pelacakan episode, integrasi pemutar video kustom, penanda buku, dan integrasi API yang lancar.",
    },
    tags: ["React", "Next.js", "Tailwind CSS", "Node.js", "REST API"],
    githubUrl: "https://github.com/Eliasilyz/Eliasdex-2",
    featured: true,
    image: "https://camo.githubusercontent.com/34e50d97d5df788785521ef6373c0292b6647d66f3def01b875e9363f6440b6e/68747470733a2f2f66696c65732e636174626f782e6d6f652f66726b6b61362e706e67",
  },
  {
    id: "market-tracker",
    title: "Market Analytics Dashboard",
    category: "Trading Tool",
    description: {
      en: "Personal trading journal and spot market analysis dashboard aggregating data from Stockbit with technical indicator calculations.",
      id: "Jurnal trading pribadi dan dashboard analisis pasar spot yang mengagregasikan data dari Stockbit dengan kalkulasi indikator teknis.",
    },
    tags: ["Trading", "Stockbit", "Technical Analysis", "React"],
    githubUrl: "https://github.com/Eliasilyz/VaLuLens",
    liveUrl: "https://spot-market-tracker.demo.app",
    featured: true,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "digital-content-toolkit",
    title: "Creative Content & Branding Presets",
    category: "Utility",
    description: {
      en: "Curated collection of Canva graphic templates, Lightroom color grading presets, and CapCut video editing motion overlays for digital media.",
      id: "Koleksi kurasi templat grafis Canva, preset pewarnaan Lightroom, dan templat animasi CapCut untuk media digital.",
    },
    tags: ["Canva", "CapCut", "Lightroom", "Content Creation"],
    featured: false,
    image: "https://images.unsplash.com/photo-1542744094-3a3121699318?auto=format&fit=crop&q=80&w=800",
  },
];
