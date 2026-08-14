// TODO: replace with real data

export interface ContactInfo {
  email: string;
  location: string;
  formActionUrl?: string; // Formspree or static endpoint URL
  socials: {
    platform: string;
    username: string;
    url: string;
  }[];
}

export const contact: ContactInfo = {
  email: "farellh12@gmail.com",
  location: "Ponorogo, East Java, Indonesia",
  formActionUrl: "https://formspree.io/f/xnpavyle", // Replace with real Formspree endpoint if desired
  socials: [
    {
      platform: "GitHub",
      username: "@Eliasilyz",
      url: "https://github.com/Eliasilyz",
    },
    {
      platform: "Linkedin",
      username: "@farel-hanafi",
      url: "https://www.linkedin.com/in/farel-hanafi/",
    },
    {
      platform: "Stockbit",
      username: "@FarelHanafi",
      url: "https://stockbit.com/FarelHanafi",
    },
    {
      platform: "Telegram",
      username: "@ffarelh",
      url: "https://t.me/ffarelh",
    },
  ],
};
