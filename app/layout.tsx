import React, { Suspense, lazy, useEffect, useState } from "react";

export interface Metadata {
  title?: string;
  description?: string;
  keywords?: string[];
  authors?: Array<{ name: string }>;
  creator?: string;
  publisher?: string;
  robots?: {
    index?: boolean;
    follow?: boolean;
    googleBot?: {
      index?: boolean;
      follow?: boolean;
      "max-image-preview"?: string;
      "max-snippet"?: number;
    };
  };
  alternates?: {
    canonical?: string;
    languages?: Record<string, string>;
  };
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    siteName?: string;
    images?: Array<{
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }>;
    locale?: string;
    type?: string;
  };
  twitter?: {
    card?: string;
    title?: string;
    description?: string;
    images?: string[];
  };
  icons?: {
    icon?: Array<{ url: string; sizes?: string; type?: string }>;
    apple?: Array<{ url: string }>;
  };
}

import { ThemeProvider } from "../lib/ThemeProvider";
import { LanguageProvider } from "../lib/LanguageProvider";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { profile } from "../content/profile";

const MusicPlayer = lazy(() => import("../components/MusicPlayer"));

const AnalyticsWrapper = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  return import("@vercel/analytics/react").then(m => <m.Analytics />);
};

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/icon.svg" }],
  },
  title: `${profile.fullName} — Software Developer, Ponorogo`,
  description: `Farel (${profile.fullName}) — Software Developer in Ponorogo, Indonesia building fast, accessible web apps.`,
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
  creator: profile.fullName,
  publisher: profile.fullName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://farelhanafi.my.id",
    languages: {
      "en-US": "https://farelhanafi.my.id",
      "id-ID": "https://farelhanafi.my.id",
    },
  },
  openGraph: {
    title: `${profile.fullName} — Software Developer`,
    description: `Farel (${profile.fullName}) — Software Developer in Ponorogo, Indonesia building fast, accessible web apps.`,
    url: "https://farelhanafi.my.id",
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
    description: `Farel (${profile.fullName}) — Software Developer in Ponorogo, Indonesia building fast, accessible web apps.`,
    images: [profile.avatarUrl],
  },
};

const jsonLdPerson = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://farelhanafi.my.id/#person",
      name: profile.fullName,
      alternateName: [profile.displayName, "Irvan Farael", "Farel Ponorogo"],
      description: `Farel (${profile.fullName}) — Software Developer in Ponorogo, Indonesia building fast, accessible web apps.`,
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
      url: "https://farelhanafi.my.id",
    },
    {
      "@type": "WebSite",
      "@id": "https://farelhanafi.my.id/#website",
      url: "https://farelhanafi.my.id",
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
          <Suspense fallback={null}>
            <MusicPlayer />
          </Suspense>
          <Suspense fallback={null}>
            <AnalyticsWrapper />
          </Suspense>
        </ThemeProvider>
      </LanguageProvider>
    </div>
  );
}
