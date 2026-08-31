"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { CircuitPattern, CrossHatch } from "@/components/ui/Decorative";
import TiltCard from "@/components/ui/TiltCard";

interface FeaturedCardData {
    slug: string;
    status: string;
    category: string;
    title: string;
    description: string;
    tags: string[];
    bgClass: string;
    textClass: string;
    tagBgClass: string;
    tagTextClass: string;
    glowClass?: string;
    decorative?: "crosshatch" | "circuit" | null;
}

const featuredList: FeaturedCardData[] = [
    {
        slug: "legal-ai-agent",
        status: "LIVE APPLICATION",
        category: "Generative AI",
        title: "Legal AI Agent",
        description: "Conversational AI assistant for exploring legal information workflows.",
        tags: ["Python", "Streamlit", "Generative AI"],
        bgClass: "bg-acid",
        textClass: "text-ink",
        tagBgClass: "bg-ink/10 border-ink/30",
        tagTextClass: "text-ink",
        glowClass: "neo-glow",
        decorative: "crosshatch",
    },
    {
        slug: "wearrange",
        status: "BUILDING",
        category: "Full-Stack Product",
        title: "WeArrange",
        description: "Wedding venue discovery and planning platform in development.",
        tags: ["Next.js", "React", "TypeScript"],
        bgClass: "bg-hotpink",
        textClass: "text-cream",
        tagBgClass: "bg-ink/20 border-cream/30",
        tagTextClass: "text-cream",
        glowClass: "neo-glow",
        decorative: "circuit",
    },
    {
        slug: "whatsapp-ai-chatbot",
        status: "AUTOMATION",
        category: "Workflows",
        title: "AI WhatsApp Product Bot",
        description: "AI-powered product recommendations through WhatsApp.",
        tags: ["Google Gemini", "Twilio", "n8n"],
        bgClass: "bg-electric",
        textClass: "text-cream",
        tagBgClass: "bg-ink/20 border-cream/30",
        tagTextClass: "text-cream",
        glowClass: "neo-glow-blue",
        decorative: null,
    },
    {
        slug: "cup-cozy",
        status: "LIVE ON VERCEL",
        category: "Frontend Design",
        title: "Cup Cozy",
        description: "Responsive web experience focused on polished frontend design.",
        tags: ["HTML", "CSS", "JavaScript"],
        bgClass: "bg-vivid",
        textClass: "text-cream",
        tagBgClass: "bg-ink/20 border-cream/30",
        tagTextClass: "text-cream",
        glowClass: "",
        decorative: null,
    },
];

export function ProjectsSection() {
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-10 md:mb-16">
            {/* Section Header */}
            <div className="flex items-end justify-between mb-5 md:mb-6 reveal-up">
                <div>
                    <div className="font-mono text-[11px] md:text-xs font-bold uppercase tracking-[0.3em] text-ink/60 mb-1.5">
                        Selected Engineering Work
                    </div>
                    <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-ink">
                        Featured Projects
                    </h2>
                </div>
                <Link
                    href="/work"
                    className="font-mono text-xs md:text-sm font-bold uppercase tracking-wider text-ink hover:text-electric transition-colors flex items-center gap-1 group pb-0.5"
                >
                    View All Work ({projects.length})
                    <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
            </div>

            {/* 2x2 Compact Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                {featuredList.map((item) => (
                    <TiltCard key={item.slug} intensity={8} glare={true} className="h-full">
                        <div
                            className={`neo-card ${item.bgClass} ${item.textClass} p-5 md:p-6 flex flex-col justify-between relative overflow-hidden group ${item.glowClass} reveal-up min-h-[240px] md:min-h-[270px] h-full`}
                        >
                            {item.decorative === "crosshatch" && (
                                <CrossHatch className="absolute top-0 right-0 w-28 h-28 text-ink opacity-10 pointer-events-none" />
                            )}
                            {item.decorative === "circuit" && (
                                <CircuitPattern className="absolute top-0 right-0 w-28 h-28 text-cream opacity-10 pointer-events-none" />
                            )}

                            <div className="relative z-10">
                                {/* 1. Status / Category */}
                                <div className="flex items-center justify-between gap-2 mb-2.5">
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-current animate-pulse-dot" />
                                        <span className="font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 bg-ink text-cream">
                                            ● {item.status}
                                        </span>
                                    </div>
                                    <span className="font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-widest opacity-75">
                                        {item.category}
                                    </span>
                                </div>

                                {/* 2. Project Title */}
                                <h3 className="font-heading font-bold text-xl sm:text-2xl md:text-[1.75rem] uppercase tracking-tight leading-tight mb-2">
                                    <Link
                                        href={`/work/${item.slug}`}
                                        className="hover:underline underline-offset-4 transition-all inline-block"
                                    >
                                        {item.title}
                                    </Link>
                                </h3>

                                {/* 3. Short 1-2 line description */}
                                <p className="font-mono text-xs md:text-sm opacity-90 leading-relaxed max-w-lg mb-4">
                                    {item.description}
                                </p>

                                {/* 4. Limited Tech Tags (3-4 max) */}
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    {item.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className={`px-2 py-0.5 border ${item.tagBgClass} ${item.tagTextClass} font-mono text-[10px] md:text-[11px] font-bold uppercase`}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* 5. Minimal Single Action Link */}
                            <div className="relative z-10 pt-3 border-t border-current/20 flex items-center justify-end">
                                <Link
                                    href={`/work/${item.slug}`}
                                    className="font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 hover:translate-x-0.5 transition-transform"
                                >
                                    <span>View Project</span>
                                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </TiltCard>
                ))}
            </div>
        </section>
    );
}
