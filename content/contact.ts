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
  email: "irvanfarael.hanafi@gmail.com",
  location: "Ponorogo, East Java, Indonesia",
  formActionUrl: "https://formspree.io/f/sample_form_id", // Replace with real Formspree endpoint if desired
  socials: [
    {
      platform: "GitHub",
      username: "@farel-dev",
      url: "https://github.com/farel-dev",
    },
    {
      platform: "X / Twitter",
      username: "@farel_dev",
      url: "https://x.com/farel_dev",
    },
    {
      platform: "Stockbit",
      username: "@farel",
      url: "https://stockbit.com/#/farel",
    },
    {
      platform: "Telegram",
      username: "@farel_hanafi",
      url: "https://t.me/farel_hanafi",
    },
  ],
};
