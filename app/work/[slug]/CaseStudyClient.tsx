"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Github, ExternalLink, Bot, CheckCircle2, Workflow, Cpu, Layers } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, type Project } from "@/lib/projects";
import { CircuitPattern, GridDots, CrossHatch } from "@/components/ui/Decorative";

export default function CaseStudyClient({ slug }: { slug: string }) {
    const project = getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-cream pb-24">
            {/* Status bar */}
            <div className="w-full bg-ink border-b-[3px] border-ink py-2 px-4 md:px-8 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-acid animate-pulse-dot" />
                    <span className="font-mono text-xs font-bold text-cream/70 uppercase tracking-widest">
                        {"/// case study " + project.id}
                    </span>
                </div>
                <span className="font-mono text-xs font-bold text-acid tracking-widest uppercase">
                    ● {project.status}
                </span>
            </div>

            {/* Back nav */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 mt-6">
                <Link
                    href="/work"
                    className="inline-flex items-center gap-2 font-mono text-xs font-bold text-ink/60 uppercase tracking-wider hover:text-ink transition-colors group"
                >
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Work
                </Link>
            </div>

            {/* Header */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 mt-6 mb-8 md:mb-12">
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <span className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/60">
                            Project {project.id}
                        </span>
                        <span className="font-mono text-xs font-bold uppercase tracking-wider px-2 py-0.5 bg-ink text-acid">
                            {project.category}
                        </span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl md:text-[6.5rem] font-heading font-bold text-ink leading-[0.88] tracking-tighter uppercase mb-6">
                        {project.title}
                    </h1>

                    <p className="font-mono text-sm md:text-base text-ink/85 max-w-2xl leading-relaxed">
                        {project.longDescription}
                    </p>

                    {/* Action buttons */}
                    <div className="flex flex-wrap gap-3 mt-6">
                        {project.liveDemo && (
                            <a
                                href={project.liveDemo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="neo-card bg-acid text-ink px-6 py-3 font-heading font-bold text-sm uppercase tracking-wider flex items-center gap-2 hover:bg-cream transition-colors group"
                            >
                                <ExternalLink size={16} />
                                Live Application
                                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                        )}
                        {project.link && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="neo-card bg-ink text-cream px-6 py-3 font-heading font-bold text-sm uppercase tracking-wider flex items-center gap-2 hover:bg-electric hover:text-cream transition-colors group"
                            >
                                <Github size={16} />
                                View Source Code
                                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                        )}
                    </div>
                </motion.div>
            </section>

            {/* Architecture Flow Box (if available) */}
            {project.architecture && (
                <section className="max-w-7xl mx-auto px-4 md:px-8 mb-8 reveal-up">
                    <div className="neo-card bg-ink text-cream p-5 md:p-6 border-[3px] border-ink">
                        <div className="font-mono text-xs font-bold uppercase tracking-widest text-acid mb-2 flex items-center gap-2">
                            <Workflow size={14} /> System Architecture Flow
                        </div>
                        <div className="font-mono text-xs sm:text-sm text-cream/90 bg-cream/5 p-4 border border-cream/15 overflow-x-auto whitespace-nowrap">
                            {project.architecture}
                        </div>
                    </div>
                </section>
            )}

            {/* Signals grid */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 mb-8 md:mb-12">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {project.signals.map((s, idx) => (
                        <div
                            key={s.label}
                            className="neo-card bg-cream p-5 border-[3px] border-ink"
                        >
                            <div className="font-mono text-xs font-bold uppercase tracking-widest text-ink/60 mb-1">
                                {s.label}
                            </div>
                            <div className="font-heading font-bold text-xl md:text-2xl text-ink">
                                {s.value}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Problem & Approach */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12">
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Problem */}
                    <div className="neo-card bg-cream p-6 md:p-8 border-[3px] border-ink">
                        <div className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-ink/60 mb-2">
                            The Challenge
                        </div>
                        <h2 className="font-heading font-bold text-2xl uppercase tracking-tight text-ink mb-4">
                            Problem
                        </h2>
                        <p className="font-mono text-sm text-ink/85 leading-relaxed">
                            {project.problem}
                        </p>
                    </div>

                    {/* Approach */}
                    <div className="neo-card bg-ink text-cream p-6 md:p-8">
                        <div className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-acid mb-2">
                            The Engineering
                        </div>
                        <h2 className="font-heading font-bold text-2xl uppercase tracking-tight text-cream mb-4">
                            Approach
                        </h2>
                        <p className="font-mono text-sm text-cream/85 leading-relaxed">
                            {project.approach}
                        </p>
                    </div>
                </div>
            </section>

            {/* Key Deliverables & Outcomes */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12">
                <div className="neo-card bg-cream p-6 md:p-8 border-[3px] border-ink">
                    <div className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-ink/60 mb-2">
                        Deliverables &amp; Focus
                    </div>
                    <h2 className="font-heading font-bold text-2xl md:text-3xl uppercase tracking-tight text-ink mb-6">
                        Outcomes
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {project.outcomes.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-3 bg-ink/[0.02] border border-ink/10">
                                <CheckCircle2 size={16} className="text-electric mt-0.5 flex-shrink-0" />
                                <p className="font-mono text-xs text-ink/85 leading-relaxed">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12">
                <div className="neo-card bg-ink text-cream p-6 md:p-8">
                    <div className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-acid mb-4">
                        Technologies &amp; Tools Used
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {project.technologies.map((t) => (
                            <span
                                key={t}
                                className="px-3 py-1.5 border-[2px] border-cream/20 bg-cream/5 font-mono text-xs font-bold uppercase tracking-wider text-cream"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
