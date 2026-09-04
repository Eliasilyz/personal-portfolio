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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/icon.svg" }],
  },
  title: `${profile.fullName} (${profile.displayName}) — Software Developer | Ponorogo`,
  description: `${profile.fullName} (Farel) is an 18-year-old self-directed software developer and multiplayer game server engineer based in Ponorogo, East Java, Indonesia. Focused on building performant, accessible web applications.`,
  keywords: [
    "Irvan Farael Hanafi",
    "Irvan Farael",
    "Farel",
    "Farel Ponorogo",
    "Software Developer Indonesia",
    "Programmer Ponorogo",
    "Next.js Developer",
    "TypeScript Specialist",
    "React Developer",
    "Fabric Modding",
    "Minecraft Modder",
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
    title: `${profile.fullName} — Software Developer`,
    description: `${profile.fullName} is an 18-year-old self-directed software developer & Minecraft Fabric engineer based in Ponorogo, East Java, Indonesia, focused on performant web apps.`,
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
    title: `${profile.fullName} — Software Developer`,
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
      jobTitle: "Software Developer",
      knowsLanguage: ["Indonesian", "English"],
      knowsAbout: [
        "Web Development",
        "TypeScript",
        "Next.js",
        "React",
        "Minecraft Fabric Modding",
        "Frontend Architecture",
      ],
      sameAs: [
        "https://github.com/Eliasilyz",
        "https://www.linkedin.com/in/farel-hanafi/",
        "https://t.me/ffarelh",
      ],
      url: "https://www.farelhanafi.my.id",
    },
    {
      "@type": "WebSite",
      "@id": "https://www.farelhanafi.my.id/#website",
      url: "https://www.farelhanafi.my.id",
      name: `${profile.fullName} Portfolio`,
      description: `Official portfolio website of ${profile.fullName} — Software Developer from Ponorogo, Indonesia.`,
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
    <div className="min-h-screen flex flex-col bg-[var(--paper)] text-[var(--ink)] font-sans antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
      />
      <LanguageProvider>
        <ThemeProvider>
          <Header />
          <main id="main-content" className="flex-1 w-full">{children}</main>
          <Footer />
          <MusicPlayer />
          <Analytics />
        </ThemeProvider>
      </LanguageProvider>
    </div>
  );
}
