"use client";

import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects, Project } from "../../content/projects";
import { useLanguage } from "../../lib/LanguageProvider";

export default function Projects() {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const categories = ["All", "Web App", "Dev Tool", "Utility"];

  const filteredProjects =
    selectedCategory === "All" ? projects : projects.filter((p) => p.category === selectedCategory);

  // Variable ratios per thumbnail asli — masonry illusion, not equal-height
  const ratioClass = (idx: number) => {
    if (idx === 0) return "aspect-[16/10]";
    if (idx === 1) return "aspect-[4/3]";
    if (idx === 2) return "aspect-[5/4]";
    return "aspect-[16/11]";
  };

  return (
    <section id="projects" className="section-cream py-16 md:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex px-3 py-1 rounded-full bg-[#e8a020] text-black text-xs font-mono font-bold tracking-widest">[03] / {t("projects.title")}</div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-[0.9] text-[#0f0d0a]" style={{ fontFamily: "var(--font-display)" }}>
              Selected<br />Works<span className="text-[#e8a020]">.</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Project categories">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                role="tab"
                aria-selected={selectedCategory === cat}
                className={`touch-hit px-4 py-2 rounded-full text-xs font-mono transition-colors ${selectedCategory === cat ? "bg-[#0f0d0a] text-[#f7f4ef]" : "bg-[#ebe8e1] text-[#0f0d0a] hover:bg-[#0f0d0a] hover:text-[#f7f4ef]"}`}
              >
                {cat === "All" ? t("projects.all") : cat}
              </button>
            ))}
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="rounded-[24px] border border-dashed border-[#d4cfc6] bg-[#ebe8e1] p-12 text-center space-y-3">
            <p className="text-sm font-mono text-[#6b6560]">No projects in this category.</p>
            <button onClick={() => setSelectedCategory("All")} className="px-4 py-2 rounded-full bg-[#e8a020] text-black text-xs font-mono">Show all</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 auto-rows-fr">
            {filteredProjects.map((project: Project, idx: number) => {
              const description = project.description[language] || project.description.en;
              // Masonry/offset: variatif span + overlap negative margin for depth (VARIANCE 7)
              const span = idx === 0 ? "md:col-span-7" : idx === 1 ? "md:col-span-5 md:mt-8 md:-ml-4" : idx === 2 ? "md:col-span-5" : "md:col-span-7 md:-mt-6";
              const rotate = idx === 0 ? "hand-rotate-1" : idx === 1 ? "hand-rotate-2" : idx === 2 ? "hand-rotate-3" : "hand-rotate-1";
              const isHighlighted = idx === 0; // only first gets mustard accent

              return (
                <article
                  key={project.id}
                  className={`${span} ${rotate} group relative rounded-[32px] overflow-hidden p-3 flex flex-col ${isHighlighted ? "bg-[#e8a020] shadow-[0_16px_40px_rgba(232,160,32,0.22)]" : "bg-[#ebe8e1]"}`}
                >
                  <div className={`relative overflow-hidden rounded-[24px] bg-[#f7f4ef] ${ratioClass(idx)}`}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className={`w-full h-full object-cover ${idx % 2 === 1 ? "grayscale contrast-125" : ""} group-hover:grayscale-0 transition-all duration-500`}
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-3 py-1 rounded-full bg-[#f7f4ef]/95 backdrop-blur-sm text-black text-xs font-mono border border-black/10 shadow-sm">{project.category}</span>
                      {isHighlighted && <span className="hidden sm:inline px-3 py-1 rounded-full bg-[#0f0d0a] text-white text-xs font-mono shadow-sm">Featured</span>}
                    </div>
                  </div>

                  <div className="p-4 space-y-3 flex-1 flex flex-col">
                    <h3 className={`text-xl font-bold tracking-tight leading-tight ${isHighlighted ? "text-black" : "text-[#0f0d0a]"}`}>{project.title}</h3>
                    <p className={`text-sm leading-relaxed line-clamp-2 ${isHighlighted ? "text-black/70" : "text-[#4a4640]"}`}>{description}</p>

                    {/* Varied chips: only highlighted card gets solid mustard, rest neutral/outline */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.slice(0, 4).map((tag, tIdx) => {
                        const chipSolid = isHighlighted && tIdx === 0;
                        const chipOutline = !isHighlighted;
                        return (
                          <span
                            key={tag}
                            className={`px-2.5 py-1 rounded-full text-[11px] font-mono ${chipSolid ? "bg-black text-white" : chipOutline ? "bg-transparent border border-dashed border-[#b8b2a6] text-[#0f0d0a]" : "bg-[#f7f4ef] text-[#0f0d0a]"}`}
                          >
                            {tag}
                          </span>
                        );
                      })}
                    </div>

                    {/* CTA pinned to bottom */}
                    <div className="flex items-center gap-3 pt-3 mt-auto">
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={`touch-hit inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono transition-colors ${isHighlighted ? "bg-black text-white hover:bg-[#0f0d0a]" : "bg-[#0f0d0a] text-[#f7f4ef] hover:bg-black"}`}>
                          <span>{t("projects.viewCode")}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={`touch-hit inline-flex items-center gap-1 text-xs font-mono underline underline-offset-4 ${isHighlighted ? "decoration-black/40 hover:text-black" : "decoration-[#e8a020] hover:text-[#e8a020]"}`}>
                          <span>{t("projects.viewLive")}</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* bleed divider kept intact */}
      <div className="mt-12 border-y border-[#d4cfc6] overflow-hidden py-3 bg-[#f7f4ef]" aria-hidden>
        <div className="flex gap-6 animate-bleed" style={{ width: "200%" }}>
          <span className="bleed-text text-[#0f0d0a]">projects . projects . projects . projects . projects .</span>
          <span className="bleed-text text-[#0f0d0a]">projects . projects . projects . projects . projects .</span>
        </div>
      </div>
    </section>
  );
}
