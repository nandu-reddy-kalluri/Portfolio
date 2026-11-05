"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, FolderOpen, Sparkles } from "lucide-react";
import Link from "next/link";
import { projects, divisions, getProjectsByDivision, type Project, type DivisionId } from "@/lib/projects";
import MobileTinderDeck, { type TinderCardItem } from "@/components/ui/MobileTinderDeck";

const divisionThemes: Record<DivisionId, { jacket: string; tabText: string; pill: string; badge: string }> = {
    ai: { jacket: "bg-acid", tabText: "text-ink", pill: "bg-acid text-ink", badge: "GEN-AI" },
    automation: { jacket: "bg-electric", tabText: "text-cream", pill: "bg-acid text-ink", badge: "AUTOMATION" },
    products: { jacket: "bg-[#FF2A6D]", tabText: "text-cream", pill: "bg-[#FFD60A] text-ink", badge: "FULL-STACK" },
    web: { jacket: "bg-vivid", tabText: "text-ink", pill: "bg-[#FFD60A] text-ink", badge: "WEB CRAFT" },
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const theme = divisionThemes[project.division] || divisionThemes.ai;

    return (
        <div className="reveal-up h-full" style={{ animationDelay: `${Math.min(index * 0.06, 0.4)}s` }}>
            <article className="h-full flex flex-col group">
                <div className="flex items-end justify-between pr-2 -mb-[3px] relative z-10">
                    <div
                        className={`${theme.jacket} ${theme.tabText} border-[3px] border-ink rounded-t-xl px-4 py-1.5 flex items-center gap-2 shadow-neo-sm`}
                    >
                        <span className="font-mono text-xs font-extrabold uppercase tracking-wider">
                            FILE // {project.id}
                        </span>
                        <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                    </div>
                    <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 bg-ink text-acid border-[2px] border-ink mb-1">
                        ● {project.status}
                    </span>
                </div>

                <div className={`neo-card ${theme.jacket} p-3.5 flex-1 flex flex-col justify-between relative z-20`}>
                    <div className="bg-cream text-ink border-[3px] border-ink p-5 md:p-6 flex-1 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                                <span className="font-mono text-xs font-extrabold uppercase tracking-wider text-ink/65">
                                    {project.category}
                                </span>
                                <Sparkles size={14} className="text-vivid flex-shrink-0" />
                            </div>

                            <h3 className="font-heading font-bold text-2xl md:text-3xl uppercase tracking-tight text-ink mb-2.5 group-hover:text-electric transition-colors">
                                <Link href={`/work/${project.slug}`} className="hover:underline underline-offset-4">
                                    {project.title}
                                </Link>
                            </h3>

                            <p className="font-mono text-xs sm:text-sm text-ink/85 leading-relaxed mb-4">
                                {project.description}
                            </p>

                            {project.architecture && (
                                <div className="p-2.5 bg-ink text-cream border-[2px] border-ink mb-4">
                                    <div className="font-mono text-[9px] font-extrabold uppercase tracking-widest text-acid mb-0.5">
                                        ARCHITECTURE FLOW:
                                    </div>
                                    <div className="font-mono text-[11px] font-bold text-cream leading-snug">
                                        {project.architecture}
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-wrap gap-1.5 mb-5">
                                {project.tech.slice(0, 5).map((t) => (
                                    <span
                                        key={t}
                                        className={`px-2.5 py-0.5 border-[2px] border-ink font-mono text-[10px] font-extrabold uppercase ${theme.pill}`}
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="pt-3.5 border-t-[2px] border-ink/15 flex flex-wrap items-center justify-between gap-2">
                            <Link
                                href={`/work/${project.slug}`}
                                className="bg-ink text-cream hover:bg-acid hover:text-ink border-[2px] border-ink px-3.5 py-2 font-mono text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors"
                            >
                                <span>Case Study</span>
                                <ArrowUpRight size={14} />
                            </Link>

                            <div className="flex items-center gap-2">
                                {project.liveDemo && (
                                    <a
                                        href={project.liveDemo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-acid text-ink hover:bg-[#FFD60A] border-[2px] border-ink px-3 py-2 font-mono text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-1 transition-colors"
                                    >
                                        <span>Live Demo</span>
                                        <ExternalLink size={12} />
                                    </a>
                                )}
                                {project.link && (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`${project.title} GitHub Source`}
                                        className="bg-cream text-ink hover:bg-ink hover:text-cream border-[2px] border-ink p-2 inline-flex items-center justify-center transition-colors"
                                    >
                                        <Github size={15} />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
}

export default function WorkPage() {
    const [mobileFilter, setMobileFilter] = useState<"all" | DivisionId>("all");
    const [mobileView, setMobileView] = useState<"cards" | "list">("cards");

    const filteredMobileProjects =
        mobileFilter === "all"
            ? projects
            : projects.filter((p) => p.division === mobileFilter);

    const tinderItems: TinderCardItem[] = filteredMobileProjects.map((p) => {
        const theme = divisionThemes[p.division] || divisionThemes.ai;
        return {
            id: p.id,
            slug: p.slug,
            status: p.status,
            category: p.category,
            title: p.title,
            description: p.description,
            architectureFlow: p.architecture,
            tags: p.tech,
            headerBg: `${theme.jacket} ${theme.tabText}`,
            pillBg: theme.pill,
            liveUrl: p.liveDemo,
            repoUrl: p.link,
        };
    });

    return (
        <div className="min-h-screen bg-cream pb-24">
            {/* Top Status Bar */}
            <div className="w-full bg-ink border-b-[3px] border-ink py-2 px-4 md:px-8 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-acid animate-pulse-dot" />
                    <span className="font-mono text-xs font-extrabold text-cream uppercase tracking-widest">
                        {"/// selected work archive"}
                    </span>
                </div>
                <span className="font-mono text-xs font-extrabold text-acid tracking-widest uppercase">
                    {projects.length} Builds &amp; Experiments
                </span>
            </div>

            {/* Header */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 mt-5 md:mt-14 mb-5 md:mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFD60A] text-ink border-[2px] border-ink shadow-[3px_3px_0px_#1A1A1A] font-mono text-[10px] font-extrabold uppercase tracking-[0.22em] mb-2.5">
                        <FolderOpen size={12} /> PORTFOLIO DOSSIER // ALL CASE FILES
                    </div>
                    <h1 className="text-3xl sm:text-6xl md:text-[6.5rem] font-heading font-extrabold text-ink leading-[0.9] tracking-tighter uppercase mb-3">
                        Selected Work
                    </h1>
                    <p className="font-mono text-xs sm:text-sm md:text-base text-ink/85 max-w-xl leading-relaxed mb-4">
                        A curated archive of engineering builds across Generative AI, n8n workflow automation, full-stack web products, and experimental pipelines.
                    </p>

                    <div className="hidden lg:flex flex-wrap gap-3">
                        {divisions.map((d) => {
                            const theme = divisionThemes[d.id];
                            return (
                                <a
                                    key={d.id}
                                    href={`#${d.id}`}
                                    className={`neo-pill ${theme.jacket} ${theme.tabText} border-[2px] border-ink shadow-[3px_3px_0px_#1A1A1A]`}
                                >
                                    <span className="font-extrabold">[{d.index}]</span> {d.title}
                                    <span className="opacity-80">· {getProjectsByDivision(d.id).length}</span>
                                </a>
                            );
                        })}
                    </div>
                </motion.div>
            </section>

            {/* ─── MOBILE ONLY (< lg): Organized Hub with Fast Index Switcher ─── */}
            <section className="lg:hidden max-w-7xl mx-auto px-4 mb-8">
                {/* View Mode Toggle: Cards vs Fast Index */}
                <div className="flex items-center justify-between gap-2 p-1 bg-ink border-[2px] border-ink rounded-lg mb-3 shadow-[2px_2px_0px_#1A1A1A]">
                    <div className="font-mono text-[9px] font-extrabold uppercase text-acid px-2">
                        VIEW MODE:
                    </div>
                    <div className="flex gap-1">
                        <button
                            type="button"
                            onClick={() => setMobileView("cards")}
                            className={`px-3 py-1 font-mono text-[10px] font-extrabold uppercase rounded transition-all ${
                                mobileView === "cards"
                                    ? "bg-acid text-ink font-black shadow-[2px_2px_0px_#FFFDF5]"
                                    : "text-cream/70"
                            }`}
                        >
                            🎴 Cards Deck
                        </button>
                        <button
                            type="button"
                            onClick={() => setMobileView("list")}
                            className={`px-3 py-1 font-mono text-[10px] font-extrabold uppercase rounded transition-all ${
                                mobileView === "list"
                                    ? "bg-[#FFD60A] text-ink font-black shadow-[2px_2px_0px_#FFFDF5]"
                                    : "text-cream/70"
                            }`}
                        >
                            📑 Fast Index ({filteredMobileProjects.length})
                        </button>
                    </div>
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                    {[
                        { id: "all" as const, label: `All (${projects.length})`, color: "bg-acid text-ink" },
                        { id: "ai" as const, label: "Gen-AI", color: "bg-[#FFD60A] text-ink" },
                        { id: "automation" as const, label: "Automation", color: "bg-electric text-cream" },
                        { id: "products" as const, label: "Full-Stack", color: "bg-[#FF2A6D] text-cream" },
                        { id: "web" as const, label: "Web UI", color: "bg-vivid text-ink" },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setMobileFilter(tab.id)}
                            className={`px-2.5 py-1 font-mono text-[10px] font-extrabold uppercase border-[2px] border-ink transition-all ${
                                mobileFilter === tab.id
                                    ? `${tab.color} shadow-[2px_2px_0px_#1A1A1A] -translate-y-0.5`
                                    : "bg-cream text-ink"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Mode 1: Swipe Cards Deck */}
                {mobileView === "cards" && (
                    <MobileTinderDeck items={tinderItems} />
                )}

                {/* Mode 2: Ultra-Compact Fast Index List (1 Screen Glanceable) */}
                {mobileView === "list" && (
                    <div className="space-y-2">
                        {filteredMobileProjects.map((p) => {
                            const theme = divisionThemes[p.division] || divisionThemes.ai;
                            return (
                                <div
                                    key={p.id}
                                    className="border-[2.5px] border-ink bg-cream p-3 shadow-[3px_3px_0px_#1A1A1A] flex flex-col gap-2"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1.5">
                                            <span className={`px-1.5 py-0.5 font-mono text-[8px] font-black uppercase border border-ink ${theme.jacket} ${theme.tabText}`}>
                                                {p.id}
                                            </span>
                                            <span className="font-mono text-[9px] font-bold text-ink/70 uppercase">
                                                {p.category}
                                            </span>
                                        </div>
                                        <span className="font-mono text-[8px] font-extrabold uppercase bg-ink text-acid px-1.5 py-0.5">
                                            ● {p.status}
                                        </span>
                                    </div>

                                    <div>
                                        <h3 className="font-heading font-extrabold text-base uppercase text-ink leading-tight">
                                            <Link href={`/work/${p.slug}`} className="hover:underline">
                                                {p.title}
                                            </Link>
                                        </h3>
                                        <p className="font-mono text-[10.5px] text-ink/80 leading-snug line-clamp-2 mt-0.5">
                                            {p.description}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between pt-2 border-t border-ink/15">
                                        <div className="flex flex-wrap gap-1 max-w-[65%] truncate">
                                            {p.tech.slice(0, 3).map((t) => (
                                                <span key={t} className="px-1.5 py-0.2 bg-[#F4F0E4] border border-ink font-mono text-[8px] font-bold uppercase text-ink">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            {p.liveDemo && (
                                                <a
                                                    href={p.liveDemo}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="bg-acid text-ink border border-ink px-2 py-1 font-mono text-[9px] font-extrabold uppercase inline-flex items-center gap-0.5"
                                                >
                                                    <span>Demo</span>
                                                    <ExternalLink size={9} />
                                                </a>
                                            )}
                                            <Link
                                                href={`/work/${p.slug}`}
                                                className="bg-ink text-cream border border-ink px-2 py-1 font-mono text-[9px] font-extrabold uppercase inline-flex items-center gap-0.5"
                                            >
                                                <span>Case</span>
                                                <ArrowUpRight size={10} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* ─── DESKTOP ONLY (lg+): Division Sections ─── */}
            <div className="hidden lg:block max-w-7xl mx-auto px-4 md:px-8 mb-16 space-y-20">
                {divisions.map((division) => {
                    const items = getProjectsByDivision(division.id);
                    if (items.length === 0) return null;
                    const theme = divisionThemes[division.id];
                    return (
                        <section key={division.id} id={division.id} className="scroll-mt-8">
                            <div className="mb-8 flex flex-wrap items-end justify-between gap-4 pb-4 border-b-[3px] border-ink">
                                <div>
                                    <span
                                        className={`inline-block px-2.5 py-0.5 ${theme.jacket} ${theme.tabText} border-[2px] border-ink font-mono text-xs font-extrabold uppercase mb-2`}
                                    >
                                        DIVISION // {division.index}
                                    </span>
                                    <h2 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-tight text-ink">
                                        {division.title}
                                    </h2>
                                </div>
                                <p className="font-mono text-xs sm:text-sm text-ink/75 max-w-md">
                                    {division.tagline}
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {items.map((project, index) => (
                                    <ProjectCard key={project.id} project={project} index={index} />
                                ))}
                            </div>
                        </section>
                    );
                })}
            </div>

            {/* GitHub CTA */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12 reveal-up">
                {/* Mobile Compact 1-Line Strip */}
                <div className="lg:hidden bg-ink text-cream border-[2.5px] border-ink p-3 shadow-[3px_3px_0px_#CCFF00] flex items-center justify-between gap-2">
                    <div className="min-w-0">
                        <span className="font-mono text-[8px] font-black uppercase bg-acid text-ink px-1.5 py-0.5">
                            PUBLIC REPOS
                        </span>
                        <div className="font-heading font-extrabold text-xs uppercase text-cream truncate mt-0.5">
                            Source code on GitHub
                        </div>
                    </div>
                    <a
                        href="https://github.com/nandu-reddy-kalluri"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-acid text-ink px-2.5 py-1 font-mono text-[9.5px] font-black uppercase border border-ink shadow-[2px_2px_0px_#FFFDF5] inline-flex items-center gap-1 flex-shrink-0"
                    >
                        <Github size={12} />
                        <span>Inspect ↗</span>
                    </a>
                </div>

                {/* Desktop Full Card (Unchanged) */}
                <div className="hidden lg:block neo-card bg-vivid text-ink p-4 sm:p-6">
                    <div className="bg-ink text-cream border-[3px] border-ink p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                        <div>
                            <span className="inline-block px-2.5 py-0.5 bg-acid text-ink font-mono text-[10px] font-extrabold uppercase mb-2">
                                PUBLIC CODE ARCHIVE
                            </span>
                            <h3 className="font-heading font-bold text-2xl md:text-3xl uppercase tracking-tight text-cream mb-1">
                                Explore Source Code on GitHub
                            </h3>
                            <p className="font-mono text-xs sm:text-sm text-cream/80 max-w-md leading-relaxed">
                                Inspect public repositories, commit histories, and ongoing AI &amp; automation experiments.
                            </p>
                        </div>
                        <a
                            href="https://github.com/nandu-reddy-kalluri"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-acid text-ink hover:bg-[#FFD60A] px-5 py-3 font-heading font-bold text-xs sm:text-sm uppercase tracking-wider border-[2.5px] border-cream shadow-[4px_4px_0px_#FFFDF5] inline-flex items-center gap-2 transition-colors flex-shrink-0"
                        >
                            <Github size={18} />
                            <span>github.com/nandu-reddy-kalluri</span>
                            <ArrowUpRight size={14} />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
