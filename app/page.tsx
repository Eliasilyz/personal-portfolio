import React, { Suspense, lazy } from "react";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Skills from "../components/sections/Skills";
import Projects from "../components/sections/Projects";
import Journey from "../components/sections/Journey";

const MinigameSection = lazy(() => import("../components/sections/Minigame"));
const LinksTree = lazy(() => import("../components/sections/LinksTree"));
const Contact = lazy(() => import("../components/sections/Contact"));

const SectionFallback = () => <div className="h-24 md:h-32" aria-hidden="true" />;

export default function HomePage() {
  return (
    <div>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Journey />
      <Suspense fallback={<SectionFallback />}>
        <MinigameSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <LinksTree />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Contact />
      </Suspense>
    </div>
  );
}
