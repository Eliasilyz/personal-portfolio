import React from "react";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Skills from "../components/sections/Skills";
import Projects from "../components/sections/Projects";
import Journey from "../components/sections/Journey";
import MinigameSection from "../components/sections/Minigame";
import LinksTree from "../components/sections/LinksTree";
import Contact from "../components/sections/Contact";

export default function HomePage() {
  return (
    <div className="space-y-4">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Journey />
      <MinigameSection />
      <LinksTree />
      <Contact />
    </div>
  );
}
