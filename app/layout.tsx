import React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "../lib/ThemeProvider";
import { LanguageProvider } from "../lib/LanguageProvider";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MusicPlayer from "../components/MusicPlayer";
import { profile } from "../content/profile";

export const metadata: Metadata = {
  title: `${profile.fullName} (${profile.displayName}) — Software Developer & Trader | Ponorogo`,
  description: `${profile.fullName} (Farel) is an 18-year-old software developer, crypto & spot trader, and multiplayer game server engineer based in Ponorogo, East Java, Indonesia. Portofolio pengembang perangkat lunak dan trader.`,
  keywords: [
    "Irvan Farael Hanafi",
    "Irvan Farael",
    "Farel",
    "Farel Ponorogo",
    "Software Developer Indonesia",
    "Programmer Ponorogo",
    "Next.js Developer",
    "TypeScript Specialist",
    "Fabric Modding",
    "Minecraft Modder",
    "Stockbit Trader",
    "Crypto Spot Trader",
    "Web Developer Jawa Timur",
  ],
  authors: [{ name: profile.fullName }],
  alternates: {
    canonical: "https://www.farelhanafi.my.id",
    languages: {
      "en-US": "https://www.farelhanafi.my.id",
      "id-ID": "https://www.farelhanafi.my.id",
    },
  },
  openGraph: {
    title: `${profile.fullName} — Software Developer & Trader`,
    description: `${profile.fullName} is an 18-year-old self-directed software developer, crypto trader, & Minecraft Fabric modder based in Ponorogo, East Java, Indonesia.`,
    url: "https://www.farelhanafi.my.id",
    siteName: `${profile.fullName} Portfolio`,
    images: [
      {
        url: profile.avatarUrl,
        width: 800,
        height: 800,
        alt: profile.fullName,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.fullName} — Software Developer & Trader`,
    description: profile.bio.en,
    images: [profile.avatarUrl],
  },
};

const jsonLdPerson = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://www.farelhanafi.my.id/#person",
      name: profile.fullName,
      alternateName: [profile.displayName, "Irvan Farael", "Farel Ponorogo"],
      description: profile.bio.en,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ponorogo",
        addressRegion: "East Java",
        addressCountry: "Indonesia",
      },
      jobTitle: "Software Developer & Trader",
      knowsLanguage: ["Indonesian", "English"],
      knowsAbout: [
        "Web Development",
        "TypeScript",
        "Next.js",
        "Minecraft Fabric Modding",
        "Stockbit Stock Trading",
        "Binance Crypto Spot Trading",
      ],
      sameAs: [
        "https://github.com/stepech",
        "https://instagram.com/farel_hanafi",
        "https://t.me/farel_hanafi",
      ],
      url: "https://www.farelhanafi.my.id",
    },
    {
      "@type": "WebSite",
      "@id": "https://www.farelhanafi.my.id/#website",
      url: "https://www.farelhanafi.my.id",
      name: `${profile.fullName} Portfolio`,
      description: `Official portfolio website of ${profile.fullName} — Software Developer & Trader from Ponorogo, Indonesia.`,
      inLanguage: ["en", "id"],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-slate-950 transition-colors duration-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
      />
      <LanguageProvider>
        <ThemeProvider>
          <Header />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
          <MusicPlayer />
          <Analytics />
        </ThemeProvider>
      </LanguageProvider>
    </div>
  );
}
