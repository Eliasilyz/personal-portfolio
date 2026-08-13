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
    githubUrl: "https://github.com/farel-dev/portfolio",
    liveUrl: "https://farel-portfolio.vercel.app",
    featured: true,
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "minecraft-fabric-server",
    title: "Custom Fabric Multiplayer Server",
    category: "Game Server",
    description: {
      en: "High-throughput Minecraft server network powered by Fabric modloader, custom NBT data items, optimized JVM flags, and automated backup scripts.",
      id: "Jaringan server Minecraft performa tinggi bertenaga modloader Fabric, item data NBT kustom, optimasi JVM flags, dan skrip pencadangan otomatis.",
    },
    tags: ["Minecraft", "Fabric", "NBT Configuration", "Linux Admin", "Java"],
    githubUrl: "https://github.com/farel-dev/fabric-server-configs",
    featured: true,
    image: "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "crypto-market-tracker",
    title: "Spot Market Analytics Dashboard",
    category: "Trading Tool",
    description: {
      en: "Personal trading journal and spot market analysis dashboard aggregating data from Binance, Pintu, and Stockbit with technical indicator calculations.",
      id: "Jurnal trading pribadi dan dashboard analisis pasar spot yang mengagregasikan data dari Binance, Pintu, dan Stockbit dengan kalkulasi indikator teknis.",
    },
    tags: ["Trading", "Binance API", "Stockbit", "Technical Analysis", "React"],
    githubUrl: "https://github.com/farel-dev/spot-market-dashboard",
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
