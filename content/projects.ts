export interface Project {
  id: string;
  title: string;
  category: "Web App" | "Game Server" | "Dev Tool" | "Utility";
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
    image: "https://files.catbox.moe/gn2mdb.png",
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
    liveUrl: "https://eliasdex.vercel.app",
    featured: true,
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=480&q=60&fm=webp",
  },
  {
    id: "devtoolkit-api",
    title: "Dev Toolkit — API & Component Lab",
    category: "Dev Tool",
    description: {
      en: "Local-first developer toolkit for testing REST APIs, previewing UI components, and profiling web performance with a clean, keyboard-driven workflow.",
      id: "Toolkit pengembang local-first untuk menguji REST API, pratinjau komponen UI, dan profiling performa web dengan alur kerja berbasis keyboard yang bersih.",
    },
    tags: ["TypeScript", "React", "Performance", "DX"],
    githubUrl: "https://github.com/Eliasilyz/DevApi-HUB",
    featured: true,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=480&q=60&fm=webp",
  },
  {
    id: "fundamentals-of-stock-market",
    title: "Fundamentals of Stock Market",
    category: "Web App",
    description: {
      en: "Educational web application for learning the fundamentals of stock market investing.",
      id: "Aplikasi web edukasi untuk mempelajari dasar-dasar investasi saham.",
    },
    tags: ["TypeScript", "React", "Performance", "DX"],
    githubUrl: "https://github.com/Eliasilyz/VaLuLens",
    liveUrl: "https://funda.farelhanafi.my.id/",
    featured: true,
    image: "https://files.catbox.moe/uca0jw.png",
  },

];
