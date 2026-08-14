// TODO: replace with real data

export interface Milestone {
  id: string;
  year: string;
  title: {
    en: string;
    id: string;
  };
  category: "Coding" | "Game Engineering" | "Trading" | "Milestone";
  description: {
    en: string;
    id: string;
  };
  highlights: {
    en: string[];
    id: string[];
  };
}

export const journey: Milestone[] = [
  {
    id: "m4",
    year: "2025 - Present",
    title: {
      en: "Advanced Web Apps & Algorithmic Spot Trading",
      id: "Aplikasi Web Lanjutan & Trading Spot Algoritmik",
    },
    category: "Trading",
    description: {
      en: "Scaling personal web projects with modern frontend tech stacks (Next.js, TypeScript, Tailwind) while actively managing spot stock portfolios on Stockbit and crypto assets on Binance & Pintu.",
      id: "Mengembangkan proyek web pribadi dengan stack modern (Next.js, TypeScript, Tailwind) sembari mengelola portofolio saham spot di Stockbit dan aset kripto di Binance & Pintu secara aktif.",
    },
    highlights: {
      en: [
        "Achieved consistent trading journal tracking across spot markets",
        "Developed custom dashboard utilities for price trend evaluation",
        "Built modular Next.js application architectures",
      ],
      id: [
        "Mencapai pelacakan jurnal trading konsisten di pasar spot",
        "Membangun alat dashboard kustom untuk evaluasi tren harga",
        "Membuat arsitektur aplikasi Next.js modular",
      ],
    },
  },
  {
    id: "m3",
    year: "2024",
    title: {
      en: "Multiplayer Minecraft Server & Fabric Mod Engineering",
      id: "Server Minecraft Multiplayer & Rekayasa Mod Fabric",
    },
    category: "Game Engineering",
    description: {
      en: "Engineered high-performance Minecraft dedicated servers utilizing Fabric loader, custom NBT data items, security configurations, and automated port mapping.",
      id: "Merancang server khusus Minecraft performa tinggi memanfaatkan Fabric loader, item data NBT kustom, konfigurasi keamanan, dan pemetaan port otomatis.",
    },
    highlights: {
      en: [
        "Optimized server TPS to maintain stable 20.0 under heavy player loads",
        "Created custom NBT item sets and server-side DataPacks",
        "Managed Linux system systemd services and backup daemons",
      ],
      id: [
        "Meningkatkan TPS server untuk menjaga stabilitas 20.0 pada beban tinggi",
        "Membuat set item NBT kustom dan DataPack sisi server",
        "Mengelola layanan systemd Linux dan daemon pencadangan",
      ],
    },
  },
  {
    id: "m2",
    year: "2023",
    title: {
      en: "Market Entry: Spot Trading & Financial Analysis",
      id: "Memulai Trading Spot & Analisis Keuangan",
    },
    category: "Trading",
    description: {
      en: "Began deep dive into Indonesian equities on Stockbit and cryptocurrency spot markets on Binance & Pintu with strict risk management discipline.",
      id: "Mulai mendalami saham Indonesia di Stockbit dan pasar spot kripto di Binance & Pintu dengan disiplin manajemen risiko yang ketat.",
    },
    highlights: {
      en: [
        "Learned price action charting, volume profile, and market structure",
        "Integrated Bank Jago digital banking for liquidity & cash management",
      ],
      id: [
        "Mempelajari grafik price action, volume profile, dan struktur pasar",
        "Mengintegrasikan bank digital Bank Jago untuk pengelolaan likuiditas & kas",
      ],
    },
  },
  {
    id: "m1",
    year: "2022",
    title: {
      en: "First Steps in Web Development & Digital Media",
      id: "Langkah Awal Pemrograman Web & Media Digital",
    },
    category: "Coding",
    description: {
      en: "Started self-directed learning journey in web technologies, HTML/CSS/JavaScript fundamentals, Git version control, and media creation tools like Canva & CapCut.",
      id: "Memulai perjalanan belajar mandiri dalam teknologi web, dasar HTML/CSS/JavaScript, kontrol versi Git, serta alat pembuat media seperti Canva & CapCut.",
    },
    highlights: {
      en: [
        "Created first interactive web pages and public GitHub repositories",
        "Mastered graphic design workflows in Canva and photo editing in Lightroom",
      ],
      id: [
        "Membuat halaman web interaktif pertama dan repositori publik di GitHub",
        "Menguasai alur kerja desain grafis di Canva dan edit foto di Lightroom",
      ],
    },
  },
];
