"use client";

import { useState } from "react";
import { ArrowUpRight, ExternalLink, Github, FolderOpen, Sparkles } from "lucide-react";
import Link from "next/link";
import { projects } from "@/lib/projects";
import TiltCard from "@/components/ui/TiltCard";
import MobileTinderDeck, { type TinderCardItem } from "@/components/ui/MobileTinderDeck";

type FilterKey = "all" | "ai" | "automation" | "products" | "web";

interface FeaturedFolderData {
    id: string;
    slug: string;
    division: FilterKey;
    status: string;
    category: string;
    title: string;
    description: string;
    architectureFlow: string;
    tags: string[];
    jacketBg: string;
    tabBg: string;
    tabText: string;
    accentPillBg: string;
    liveUrl?: string;
    repoUrl?: string;
}

const featuredFolders: FeaturedFolderData[] = [
    {
        id: "001",
        slug: "legal-ai-agent",
        division: "ai",
        status: "LIVE ON STREAMLIT",
        category: "Generative AI · Conversational",
        title: "Legal AI Agent",
        description:
            "Experimental conversational AI assistant engineered with Python and Streamlit for structured legal query synthesis and prompt-guarded reasoning.",
        architectureFlow: "Query → Prompt Guard → LLM Reasoning → Structured Output",
        tags: ["Python", "Streamlit", "Generative AI", "Prompt Engineering"],
        jacketBg: "bg-acid text-ink",
        tabBg: "bg-acid",
        tabText: "text-ink",
        accentPillBg: "bg-acid text-ink",
        liveUrl: "https://legal-ai-agent-vdypr3xqmd6cvk7tr8d2r9.streamlit.app/",
        repoUrl: "https://github.com/nandu-reddy-kalluri/legal-ai-agent",
    },
    {
        id: "002",
        slug: "wearrange",
        division: "products",
        status: "BUILDING · FULL-STACK",
        category: "Full-Stack Product · Next.js",
        title: "WeArrange",
        description:
            "End-to-end wedding venue discovery and comparison platform featuring transparent pricing breakdowns, multi-attribute filtering, and planning workflows.",
        architectureFlow: "Next.js Client → API Routes → Venue Engine → Comparison UI",
        tags: ["Next.js 14", "React", "TypeScript", "Tailwind CSS"],
        jacketBg: "bg-[#FF2A6D] text-cream",
        tabBg: "bg-[#FF2A6D]",
        tabText: "text-cream",
        accentPillBg: "bg-[#FFD60A] text-ink",
    },
    {
        id: "003",
        slug: "whatsapp-ai-chatbot",
        division: "automation",
        status: "WORKFLOW AUTOMATION",
        category: "AI Automation · n8n + Gemini",
        title: "AI WhatsApp Product Bot",
        description:
            "Automated conversational commerce pipeline connecting Twilio WhatsApp webhooks, n8n workflow nodes, and Google Gemini AI for instant product matching.",
        architectureFlow: "WhatsApp → Twilio Webhook → n8n Node → Gemini AI → Reply",
        tags: ["Google Gemini", "Twilio API", "n8n", "Webhooks"],
        jacketBg: "bg-electric text-cream",
        tabBg: "bg-electric",
        tabText: "text-cream",
        accentPillBg: "bg-acid text-ink",
    },
    {
        id: "004",
        slug: "cup-cozy",
        division: "web",
        status: "LIVE ON VERCEL",
        category: "Frontend Craft · Web UI/UX",
        title: "Cup Cozy",
        description:
            "Polished responsive web product demonstrating high-contrast visual storytelling, fluid mobile-to-desktop grid layouts, and fast edge performance.",
        architectureFlow: "Semantic DOM → Fluid Grid Engine → Interactive UI → Vercel Edge",
        tags: ["HTML5", "CSS3", "JavaScript", "Responsive UI/UX"],
        jacketBg: "bg-vivid text-ink",
        tabBg: "bg-[#FFD60A]",
        tabText: "text-ink",
        accentPillBg: "bg-[#FFD60A] text-ink",
        liveUrl: "https://cup-cozy-site.vercel.app/",
        repoUrl: "https://github.com/nandu-reddy-kalluri/CUP-COZY",
    },
];

const filterButtons: { key: FilterKey; label: string; color: string }[] = [
    { key: "all", label: "All Files (04)", color: "bg-acid text-ink" },
    { key: "ai", label: "Gen-AI", color: "bg-[#FFD60A] text-ink" },
    { key: "automation", label: "Automation", color: "bg-electric text-cream" },
    { key: "products", label: "Full-Stack", color: "bg-[#FF2A6D] text-cream" },
    { key: "web", label: "Frontend Web", color: "bg-vivid text-ink" },
];

export function ProjectsSection() {
    const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

    const visibleProjects =
        activeFilter === "all"
            ? featuredFolders
            : featuredFolders.filter((p) => p.division === activeFilter);

    const mobileTinderItems: TinderCardItem[] = visibleProjects.map((p) => ({
        id: p.id,
        slug: p.slug,
        status: p.status,
        category: p.category,
        title: p.title,
        description: p.description,
        architectureFlow: p.architectureFlow,
        tags: p.tags,
        headerBg: p.jacketBg,
        pillBg: p.accentPillBg,
        liveUrl: p.liveUrl,
        repoUrl: p.repoUrl,
    }));

    return (
        <section id="projects" className="max-w-7xl mx-auto px-4 md:px-8 mb-10 lg:mb-24">
            {/* Section Header + Interactive Folder Filter Tabs */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3 mb-5 lg:mb-8 reveal-up">
                <div className="flex items-end justify-between gap-2">
                    <div>
                        <div className="inline-flex items-center gap-2 font-mono text-xs font-extrabold uppercase tracking-[0.25em] text-ink/70 mb-1.5">
                            <FolderOpen size={15} className="text-vivid" />
                            <span>Selected Engineering Dossiers</span>
                        </div>
                        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-ink">
                            Featured Case Files
                        </h2>
                    </div>

                    <Link
                        href="/work"
                        className="lg:hidden font-mono text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1.5 border-[2px] border-ink bg-ink text-acid inline-flex items-center gap-1 flex-shrink-0"
                    >
                        <span>All ({projects.length})</span>
                        <ArrowUpRight size={12} />
                    </Link>
                </div>

                {/* Interactive Filter Switcher (Desktop lg+) */}
                <div className="hidden lg:flex flex-wrap items-center gap-2">
                    {filterButtons.map((btn) => {
                        const isActive = activeFilter === btn.key;
                        return (
                            <button
                                key={btn.key}
                                type="button"
                                onClick={() => setActiveFilter(btn.key)}
                                className={`font-mono text-xs font-extrabold uppercase tracking-wider px-3 py-1.5 border-[2px] border-ink transition-all ${
                                    isActive
                                        ? `${btn.color} shadow-[3px_3px_0px_0px_#1A1A1A] -translate-y-0.5`
                                        : "bg-cream text-ink hover:bg-ink/5"
                                }`}
                            >
                                {btn.label}
                            </button>
                        );
                    })}

                    <Link
                        href="/work"
                        className="font-mono text-xs font-extrabold uppercase tracking-wider px-3 py-1.5 border-[2px] border-ink bg-ink text-acid hover:bg-acid hover:text-ink transition-colors inline-flex items-center gap-1"
                    >
                        <span>All Archive ({projects.length})</span>
                        <ArrowUpRight size={13} />
                    </Link>
                </div>
            </div>

            {/* ─── MOBILE ONLY (< lg): Tinder-Style Sliding / Swiping Card Deck ─── */}
            <div className="lg:hidden">
                <MobileTinderDeck items={mobileTinderItems} />
            </div>

            {/* ─── DESKTOP ONLY (lg+): 2x2 Tactile File Folder Grid ─── */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-6 md:gap-8">
                {visibleProjects.map((item) => (
                    <TiltCard key={item.slug} intensity={6} glare={false} className="h-full">
                        <article className="h-full flex flex-col group">
                            <div className="flex items-end justify-between pr-2 -mb-[3px] relative z-10">
                                <div
                                    className={`${item.tabBg} ${item.tabText} border-[3px] border-ink rounded-t-xl px-4 py-1.5 flex items-center gap-2 shadow-neo-sm`}
                                >
                                    <span className="font-mono text-xs font-extrabold uppercase tracking-wider">
                                        FILE // {item.id}
                                    </span>
                                    <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                                </div>

                                <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 bg-ink text-acid border-[2px] border-ink mb-1">
                                    ● {item.status}
                                </span>
                            </div>

                            <div
                                className={`neo-card ${item.jacketBg} p-3 sm:p-4 flex-1 flex flex-col justify-between relative z-20`}
                            >
                                <div className="bg-cream text-ink border-[3px] border-ink p-4 sm:p-6 flex-1 flex flex-col justify-between relative">
                                    <div>
                                        <div className="flex items-center justify-between gap-2 mb-2">
                                            <span className="font-mono text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-ink/70">
                                                {item.category}
                                            </span>
                                            <Sparkles size={14} className="text-vivid flex-shrink-0" />
                                        </div>

                                        <h3 className="font-heading font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-ink mb-2.5 group-hover:text-electric transition-colors">
                                            <Link href={`/work/${item.slug}`} className="hover:underline underline-offset-4">
                                                {item.title}
                                            </Link>
                                        </h3>

                                        <p className="font-mono text-xs sm:text-sm text-ink/85 leading-relaxed mb-4">
                                            {item.description}
                                        </p>

                                        <div className="bg-ink text-cream border-[2px] border-ink p-2.5 mb-4">
                                            <div className="font-mono text-[9px] font-extrabold uppercase tracking-widest text-acid mb-1">
                                                SYSTEM PIPELINE FLOW:
                                            </div>
                                            <div className="font-mono text-[11px] font-bold text-cream break-words">
                                                {item.architectureFlow}
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-1.5 mb-5">
                                            {item.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className={`px-2.5 py-0.5 border-[2px] border-ink font-mono text-[10px] font-extrabold uppercase ${item.accentPillBg}`}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-3.5 border-t-[2px] border-ink/15 flex flex-wrap items-center justify-between gap-2">
                                        <Link
                                            href={`/work/${item.slug}`}
                                            className="bg-ink text-cream hover:bg-acid hover:text-ink border-[2px] border-ink px-3.5 py-2 font-mono text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors"
                                        >
                                            <span>Open Case Study</span>
                                            <ArrowUpRight size={14} />
                                        </Link>

                                        <div className="flex items-center gap-2">
                                            {item.liveUrl && (
                                                <a
                                                    href={item.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="bg-acid text-ink hover:bg-vivid border-[2px] border-ink px-3 py-2 font-mono text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-1 transition-colors"
                                                >
                                                    <span>Live Demo</span>
                                                    <ExternalLink size={12} />
                                                </a>
                                            )}
                                            {item.repoUrl && (
                                                <a
                                                    href={item.repoUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label={`${item.title} GitHub Source`}
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
                    </TiltCard>
                ))}
            </div>
        </section>
    );
}
