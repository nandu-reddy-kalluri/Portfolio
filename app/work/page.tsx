"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, Bot, Layers, Workflow, Globe } from "lucide-react";
import Link from "next/link";
import { projects, divisions, getProjectsByDivision, type Project } from "@/lib/projects";
import { CircuitPattern, GridDots } from "@/components/ui/Decorative";

function ProjectCard({ project, index }: { project: Project; index: number }) {
    return (
        <div className="reveal-up" style={{ animationDelay: `${Math.min(index * 0.06, 0.4)}s` }}>
            <Link href={`/work/${project.slug}`} className="block h-full group">
                <div className={`neo-card ${project.color} ${project.textColor} h-full flex flex-col justify-between min-h-[19rem] md:min-h-[21rem] relative overflow-hidden neo-glow`}>
                    <div className="p-6 md:p-7 flex flex-col justify-between flex-1 relative">
                        <CircuitPattern className="absolute top-0 right-0 w-32 h-32 opacity-[0.08]" />

                        <div className="absolute top-4 right-4 font-heading font-bold text-[3.5rem] md:text-[5rem] leading-none opacity-[0.08] select-none tracking-tighter">
                            {project.id}
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-3 flex-wrap">
                                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] opacity-90">
                                    {project.category}
                                </span>
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-black/15 border border-current/30 font-mono text-[10px] font-bold uppercase tracking-wider">
                                    ● {project.status}
                                </span>
                                {project.liveDemo && (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-black/15 border border-current/30 font-mono text-[10px] font-bold uppercase tracking-wider">
                                        <ExternalLink size={10} /> Live
                                    </span>
                                )}
                            </div>

                            <h3 className="font-heading font-bold text-2xl md:text-3xl uppercase tracking-tight mb-3 group-hover:translate-x-1 transition-transform">
                                {project.title}
                            </h3>

                            <p className="font-mono text-sm opacity-90 leading-relaxed max-w-md">
                                {project.description}
                            </p>
                        </div>

                        <div className="relative z-10 mt-6">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tech.slice(0, 4).map((t) => (
                                    <span key={t} className="px-2 py-1 border-2 border-current/30 font-mono text-xs font-bold uppercase tracking-wider bg-black/10">
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-4 flex-wrap">
                                {project.signals.slice(0, 2).map((m) => (
                                    <div key={m.label}>
                                        <div className="font-heading font-bold text-sm md:text-base">{m.value}</div>
                                        <div className="font-mono text-[10px] font-bold uppercase tracking-wider opacity-75">{m.label}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="absolute bottom-0 right-0 w-10 h-10 border-[3px] border-current/30 flex items-center justify-center group-hover:bg-current/10 transition-colors">
                                <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default function WorkPage() {
    return (
        <div className="min-h-screen bg-cream pb-24">
            {/* Status bar */}
            <div className="w-full bg-ink border-b-[3px] border-ink py-2 px-4 md:px-8 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-acid animate-pulse-dot" />
                    <span className="font-mono text-xs font-bold text-cream/70 uppercase tracking-widest">{"/// selected work"}</span>
                </div>
                <span className="font-mono text-xs font-bold text-cream/60 tracking-widest uppercase">{projects.length} Projects &amp; Experiments</span>
            </div>

            {/* Header */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 mt-8 md:mt-16 mb-8 md:mb-12">
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/60 mb-3">Portfolio</div>
                    <h1 className="text-4xl sm:text-6xl md:text-[7rem] font-heading font-bold text-ink leading-[0.85] tracking-tighter uppercase mb-6">
                        Selected<br />Work
                    </h1>
                    <p className="font-mono text-sm md:text-base text-ink/85 max-w-xl leading-relaxed mb-8">
                        A curated body of engineering work across Generative AI, intelligent automation workflows, full-stack web applications, and experimental pipelines.
                    </p>

                    {/* Division index */}
                    <div className="flex flex-wrap gap-3">
                        {divisions.map((d) => (
                            <a
                                key={d.id}
                                href={`#${d.id}`}
                                className="neo-pill bg-cream text-ink hover:bg-ink hover:text-cream border-[2px] border-ink"
                            >
                                <span className="opacity-60">{d.index}</span> {d.title}
                                <span className="opacity-60">· {getProjectsByDivision(d.id).length}</span>
                            </a>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Division sections */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20 space-y-14 md:space-y-24">
                {divisions.map((division) => {
                    const items = getProjectsByDivision(division.id);
                    if (items.length === 0) return null;
                    return (
                        <section key={division.id} id={division.id} className="scroll-mt-8">
                            {/* Division header */}
                            <div className="mb-6 md:mb-8">
                                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
                                    <span className="font-heading font-bold text-5xl md:text-7xl text-ink/10 leading-none tracking-tighter select-none">
                                        {division.index}
                                    </span>
                                    <h2 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-tight text-ink">
                                        {division.title}
                                    </h2>
                                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-ink/60 ml-auto">
                                        {items.length} {items.length === 1 ? "item" : "items"}
                                    </span>
                                </div>
                                <p className="font-mono text-sm text-ink/70 max-w-xl leading-relaxed border-l-[3px] border-acid pl-4">
                                    {division.tagline}
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-5">
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
                <div className="neo-card bg-ink text-cream p-6 md:p-10 relative overflow-hidden gradient-top-accent">
                    <GridDots className="absolute inset-0 w-full h-full text-cream/5" />
                    <div className="absolute top-0 left-1/4 w-1/2 h-20 bg-acid/10 blur-3xl pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="font-heading font-bold text-2xl md:text-3xl uppercase tracking-tight mb-2">
                                Explore Source Code
                            </h3>
                            <p className="font-mono text-sm text-cream/80 max-w-md leading-relaxed">
                                Check out public repositories, commit histories, and experiment branches on GitHub.
                            </p>
                        </div>
                        <a
                            href="https://github.com/nandu-reddy-kalluri"
                            target="_blank" rel="noopener noreferrer"
                            className="neo-card bg-acid text-ink px-6 py-3 font-heading font-bold text-sm uppercase tracking-wider flex items-center gap-2 hover:bg-cream transition-colors group flex-shrink-0"
                        >
                            <Github size={18} />
                            github.com/nandu-reddy-kalluri
                            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
