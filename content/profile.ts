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
    en: "Self-directed backend & web developer from Ponorogo, East Java. Building automated stock analysis tools, scalable web applications, and contributing to open source. Focused on clean TypeScript architecture, performant systems, and developer tooling.",
    id: "Pengembang backend & web mandiri dari Ponorogo, Jawa Timur. Membangun tools analisis saham otomatis, aplikasi web skalabel, dan berkontribusi ke open source. Fokus pada arsitektur TypeScript yang bersih, sistem performan, dan tooling pengembang.",
  },
  highlights: {
    en: [
      "Passionate about clean TypeScript architecture and scalable backend systems",
      "Building automated stock analysis tools and financial data pipelines",
      "Active open source contributor with focus on developer tooling",
    ],
    id: [
      "Fokus pada arsitektur TypeScript yang bersih dan sistem backend skalabel",
      "Membangun tools analisis saham otomatis dan pipeline data keuangan",
      "Kontributor open source aktif dengan fokus pada tooling pengembang",
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
