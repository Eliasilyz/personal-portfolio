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
  tagline: "Self-directed developer and builder",
  avatarUrl: "https://raw.githubusercontent.com/Eliasilyz/Eliasilyz.github.io/refs/heads/main/1773843467975%7E2%20(1).jpg",
  bio: {
    en: "18-year-old self-directed software developer and multiplayer game server engineer based in Ponorogo, East Java. Dedicated to building performant, accessible web applications and customizing high-throughput Minecraft Fabric servers with clean, maintainable code.",
    id: "Pengembang perangkat lunak mandiri dan insinyur server game multiplayer berusia 18 tahun yang berdomisili di Ponorogo, Jawa Timur. Berdedikasi membangun aplikasi web yang cepat dan aksesibel serta mengkustomisasi server Minecraft Fabric performa tinggi dengan kode yang bersih dan terawat.",
  },
  highlights: {
    en: [
      "Passionate about clean TypeScript architecture and responsive web UI",
      "Experienced in Fabric modding, JVM tuning, and multiplayer server setups",
      "Shipped 15+ web projects focused on performance and accessibility",
    ],
    id: [
      "Fokus pada arsitektur TypeScript yang bersih dan antarmuka web responsif",
      "Berpengalaman dalam modding Fabric, optimasi JVM, dan penyiapan server multiplayer",
      "Telah merilis 15+ proyek web dengan fokus performa dan aksesibilitas",
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
    "Engineering Practices": [
      "Clean architecture & component design",
      "Performance profiling & accessibility (a11y)",
      "Git workflows & CI/CD",
      "Testing & code quality automation",
    ],
  },
};
