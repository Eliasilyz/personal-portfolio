export interface Profile {
  fullName: string;
  displayName: string;
  age: number;
  location: string;
  tagline: string;
  avatarUrl: string;
  bio: {
    en: string;
    id: string;
  };
  highlights: {
    en: string[];
    id: string[];
  };
  skills: Record<string, string[]>;
}

export const profile: Profile = {
  fullName: "Irvan Farael Hanafi",
  displayName: "Farel",
  age: 18,
  location: "Ponorogo, East Java, Indonesia",
  tagline: "Self-directed developer, trader, and builder",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=65&fm=webp",
  bio: {
    en: "18-year-old self-directed software developer, crypto & spot trader, and multiplayer game server engineer based in Ponorogo, East Java. Dedicated to building performant web applications, customizing high-throughput Minecraft Fabric servers, and analyzing stock and cryptocurrency market dynamics.",
    id: "Pengembang perangkat lunak mandiri, saham & kripto spot, serta insinyur server game multiplayer berusia 18 tahun yang berdomisili di Ponorogo, Jawa Timur. Berdedikasi untuk membangun aplikasi web cepat, mengkustomisasi server Minecraft Fabric performa tinggi, dan menganalisis dinamika pasar saham & kripto.",
  },
  highlights: {
    en: [
      "Passionate about clean TypeScript architecture and responsive web UI",
      "Experienced in Fabric modding, JVM tuning, and multiplayer server setups",
      "Active daily market analyst across Stockbit, Binance, and Pintu",
      "Creator of custom digital assets, audio edits, and technical documentation",
    ],
    id: [
      "Fokus pada arsitektur TypeScript yang bersih dan antarmuka web responsif",
      "Berpengalaman dalam modding Fabric, optimasi JVM, dan penyiapan server multiplayer",
      "Analis pasar harian aktif di Stockbit, Binance, dan Pintu",
      "Pembuat aset digital kustom, edit audio, dan dokumentasi teknis",
    ],
  },
  skills: {
    "Web Development": [
      "Builds and maintains personal web projects",
      "Active GitHub repositories",
      "React & Next.js App Router",
      "TypeScript & Tailwind CSS",
      "RESTful API Integration",
    ],
    "Game Server Engineering": [
      "Custom multiplayer Minecraft server setup",
      "Advanced Fabric modding",
      "Minecraft NBT data configuration",
      "Linux Server Administration & Ports",
      "Plugin & DataPack Engineering",
    ],
    "Trading & Financial Markets": [
      "Daily/spot stock and crypto trading",
      "Platforms: Stockbit, Binance, Pintu, Bank Jago",
      "Technical Analysis & Charting",
      "Risk Management & Portfolio Allocation",
    ],
    "Content & Digital Tools": [
      "Canva",
      "CapCut",
      "Lightroom",
      "Digital Branding & Media Asset Creation",
    ],
  },
};
