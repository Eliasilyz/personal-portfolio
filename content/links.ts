// TODO: replace with real data

export interface LinkItem {
  id: string;
  title: string;
  category: "Social & Code" | "Trading Platforms" | "Game & Media";
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
    id: "stockbit",
    title: "Stockbit Profile",
    category: "Trading Platforms",
    url: "https://stockbit.com/FarelHanafi",
    iconName: "trending-up",
    description: {
      en: "Indonesian stock market community analysis, stream posts, and spot watchlists",
      id: "Analisis komunitas pasar saham Indonesia, postingan stream, dan daftar pantau",
    },
    badge: "IHSG Spot",
  },
  {
    id: "linkedin",
    title: "LinkedIn Profile",
    category: "Social & Code",
    url: "https://www.linkedin.com/in/farel-hanafi/",
    iconName: "linkedin",
    description: {
      en: "Tech updates, market thoughts, game server news, and daily observations",
      id: "Pembaruan teknologi, pemikiran pasar, kabar server game, dan catatan harian",
    },
  },
];
