export interface ContactInfo {
  email: string;
  location: string;
  formActionUrl?: string;
  socials: {
    platform: string;
    username: string;
    url: string;
  }[];
}

export const contact: ContactInfo = {
  email: "farellh12@gmail.com",
  location: "Ponorogo, East Java, Indonesia",
  formActionUrl: "https://formspree.io/f/xnpavyle",
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
      platform: "Website",
      username: "farelhanafi.my.id",
      url: "https://www.farelhanafi.my.id",
    },
    {
      platform: "Telegram",
      username: "@ffarelh",
      url: "https://t.me/ffarelh",
    },
  ],
};
