export interface Milestone {
  id: string;
  year: string;
  title: {
    en: string;
    id: string;
  };
  category: "Coding" | "Game Engineering" | "Milestone";
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
      en: "Advanced Web Apps & Frontend Architecture",
      id: "Aplikasi Web Lanjutan & Arsitektur Frontend",
    },
    category: "Coding",
    description: {
      en: "Scaling personal web projects with modern frontend stacks (Next.js, TypeScript, Tailwind) and a strong focus on performance, accessibility, and maintainable architecture.",
      id: "Mengembangkan proyek web pribadi dengan stack modern (Next.js, TypeScript, Tailwind) dengan fokus pada performa, aksesibilitas, dan arsitektur yang terawat.",
    },
    highlights: {
      en: [
        "Built modular Next.js application architectures",
        "Improved Core Web Vitals and accessibility scores across projects",
        "Developed reusable component labs and API utilities",
      ],
      id: [
        "Membuat arsitektur aplikasi Next.js yang modular",
        "Meningkatkan Core Web Vitals dan skor aksesibilitas di berbagai proyek",
        "Mengembangkan lab komponen reusable dan utilitas API",
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
      en: "Deepening Frontend Fundamentals & Open Source",
      id: "Memperdalam Fundamental Frontend & Open Source",
    },
    category: "Coding",
    description: {
      en: "Focused on deepening JavaScript/TypeScript fundamentals, React patterns, and contributing to open-source web tooling while shipping personal products.",
      id: "Fokus memperdalam fundamental JavaScript/TypeScript, pola React, dan berkontribusi pada tooling web open-source sambil merilis produk pribadi.",
    },
    highlights: {
      en: [
        "Mastered modern React patterns and TypeScript architecture",
        "Published utilities and documented component APIs",
      ],
      id: [
        "Menguasai pola React modern dan arsitektur TypeScript",
        "Merilis utilitas dan mendokumentasikan API komponen",
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
