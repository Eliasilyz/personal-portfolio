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
    url: "https://github.com/farel-dev",
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
    url: "https://stockbit.com/#/farel",
    iconName: "trending-up",
    description: {
      en: "Indonesian stock market community analysis, stream posts, and spot watchlists",
      id: "Analisis komunitas pasar saham Indonesia, postingan stream, dan daftar pantau",
    },
    badge: "IHSG Spot",
  },
  {
    id: "binance",
    title: "Binance Spot Profile",
    category: "Trading Platforms",
    url: "https://www.binance.com",
    iconName: "coins",
    description: {
      en: "Cryptocurrency spot market portfolio analysis and major coin tracking",
      id: "Analisis portofolio pasar spot kripto dan pelacakan koin utama",
    },
    badge: "Crypto Spot",
  },
  {
    id: "pintu",
    title: "Pintu Crypto App",
    category: "Trading Platforms",
    url: "https://pintu.co.id",
    iconName: "coins",
    description: {
      en: "Indonesian licensed crypto spot exchange for IDR fiat liquidity & trading",
      id: "Aplikasi pertukaran kripto terlisensi Indonesia untuk likuiditas IDR",
    },
    badge: "IDR Fiat",
  },
  {
    id: "bank-jago",
    title: "Bank Jago Pocket",
    category: "Trading Platforms",
    url: "https://www.jago.com",
    iconName: "globe",
    description: {
      en: "Digital banking liquidity management & direct integration with Stockbit",
      id: "Pengelolaan likuiditas perbankan digital & integrasi langsung Stockbit",
    },
    badge: "Banking",
  },
  {
    id: "twitter",
    title: "X (Twitter)",
    category: "Social & Code",
    url: "https://x.com/farel_dev",
    iconName: "twitter",
    description: {
      en: "Tech updates, market thoughts, game server news, and daily observations",
      id: "Pembaruan teknologi, pemikiran pasar, kabar server game, dan catatan harian",
    },
  },
  {
    id: "minecraft-server",
    title: "Minecraft Community Server",
    category: "Game & Media",
    url: "https://github.com/farel-dev/fabric-server-configs",
    iconName: "gamepad",
    description: {
      en: "Fabric server IP, client modpacks, and custom NBT item wiki",
      id: "IP server Fabric, modpack klien, dan wiki item NBT kustom",
    },
    badge: "Online",
  },
];
