"use client";

import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects, Project } from "../../content/projects";
import { useLanguage } from "../../lib/LanguageProvider";

export default function Projects() {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Web App", "Trading Tool", "Utility"];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-16 md:py-24 border-b border-[#d4cfc6] dark:border-[#2a2620]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#d4cfc6] dark:border-[#2a2620]">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-widest text-[#c8860a] dark:text-[#e8a020]">
              [03] / {t("projects.title")}
            </div>
            <h2 className="text-3xl sm:text-4xl font-['Newsreader',Georgia,serif] italic font-normal text-[#0f0d0a] dark:text-[#f0ece4]">
              Selected Works & Releases
            </h2>
          </div>

          {/* Minimal Monospace Filters */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 border transition-colors uppercase tracking-wider ${
                  selectedCategory === cat
                    ? "bg-[#0f0d0a] dark:bg-[#f0ece4] text-[#f7f4ef] dark:text-[#100e0b] border-[#0f0d0a] dark:border-[#f0ece4]"
                    : "border-[#d4cfc6] dark:border-[#2a2620] text-[#7a7368] dark:text-[#8a8278] hover:text-[#0f0d0a] dark:hover:text-[#f0ece4]"
                }`}
              >
                {cat === "All" ? t("projects.all") : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project: Project, idx: number) => {
            const description =
              project.description[language] || project.description.en;

            return (
              <article
                key={project.id}
                className="border border-[#d4cfc6] dark:border-[#2a2620] bg-[#f7f4ef] dark:bg-[#100e0b] p-6 flex flex-col justify-between space-y-6 group hover:border-[#c8860a] dark:hover:border-[#e8a020] transition-colors"
              >
                {/* Visual / Frame */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#7a7368] dark:text-[#8a8278] border-b border-[#d4cfc6] dark:border-[#2a2620] pb-2">
                    <span className="uppercase">{project.category}</span>
                    <span>NO. 0{idx + 1}</span>
                  </div>

                  <div className="aspect-[16/9] w-full overflow-hidden border border-[#d4cfc6] dark:border-[#2a2620] bg-[#ebe8e1] dark:bg-[#1a1714]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300"
                      loading="lazy"
                    />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-['Newsreader',Georgia,serif] font-semibold text-[#0f0d0a] dark:text-[#f0ece4]">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-[#7a7368] dark:text-[#8a8278] leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>

                {/* Footer / Specs & Actions */}
                <div className="space-y-4 pt-4 border-t border-[#d4cfc6] dark:border-[#2a2620]">
                  <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 border border-[#d4cfc6] dark:border-[#2a2620] text-[#7a7368] dark:text-[#8a8278]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center space-x-4 text-xs font-mono uppercase tracking-wider">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-[#0f0d0a] dark:text-[#f0ece4] hover:text-[#c8860a] dark:hover:text-[#e8a020] transition-colors"
                      >
                        <span>{t("projects.viewCode")}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-[#c8860a] dark:text-[#e8a020] hover:underline"
                      >
                        <span>{t("projects.viewLive")}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
