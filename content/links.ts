export interface LinkItem {
  id: string;
  title: string;
  category: "Social & Code" | "Game & Media";
  url: string;
  iconName: "github" | "twitter" | "linkedin" | "mail" | "trending-up" | "coins" | "gamepad" | "globe" | "share-2";
  description: {
    en: string;
    id: string;
  };
  badge?: string;
}

export const links: LinkItem[] = [
  {
    id: "github",
    title: "GitHub Repository",
    category: "Social & Code",
    url: "https://github.com/Eliasilyz",
    iconName: "github",
    description: {
      en: "Explore my open-source web projects, Fabric mod configs, and repositories",
      id: "Jelajahi proyek web open-source, konfigurasi mod Fabric, dan repositori saya",
    },
    badge: "Active",
  },
  {
    id: "portfolio",
    title: "Portfolio Website",
    category: "Social & Code",
    url: "https://www.farelhanafi.my.id",
    iconName: "globe",
    description: {
      en: "Personal portfolio — web experiments, writing, and project showcase",
      id: "Portfolio pribadi — eksperimen web, tulisan, dan showcase proyek",
    },
    badge: "Live",
  },
  {
    id: "linkedin",
    title: "LinkedIn Profile",
    category: "Social & Code",
    url: "https://www.linkedin.com/in/farel-hanafi/",
    iconName: "linkedin",
    description: {
      en: "Professional updates, engineering notes, and collaboration inquiries",
      id: "Update profesional, catatan engineering, dan inquiry kolaborasi",
    },
  },
];
