"use client";

import { CrossHatch, CircuitPattern } from "@/components/ui/Decorative";
import { ArrowUpRight, Bot, Cpu, Layers, Sparkles } from "lucide-react";
import Link from "next/link";

const capabilities = [
    {
        title: "AI Applications",
        tagline: "Conversational systems & structured LLM tools",
        description: "Building practical AI-powered applications, structured prompt pipelines, and conversational interfaces that solve domain-specific tasks.",
        tags: ["Gemini", "Claude", "Streamlit", "Prompt Engineering"],
        icon: <Bot size={28} className="text-acid" />,
        color: "bg-ink",
        textColor: "text-cream",
        accent: "border-acid",
    },
    {
        title: "Intelligent Automation",
        tagline: "API orchestration & webhook pipelines",
        description: "Connecting APIs, workflows, webhooks, and AI models via tools like n8n to automate manual processes and message triage.",
        tags: ["n8n", "Twilio", "Webhooks", "REST APIs"],
        icon: <Cpu size={28} className="text-electric" />,
        color: "bg-ink",
        textColor: "text-cream",
        accent: "border-electric",
    },
    {
        title: "Modern Web Products",
        tagline: "Responsive full-stack & frontend design",
        description: "Developing responsive web applications with clean visual presentation, smooth performance, and thoughtful UX architecture.",
        tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
        icon: <Layers size={28} className="text-hotpink" />,
        color: "bg-ink",
        textColor: "text-cream",
        accent: "border-hotpink",
    },
    {
        title: "AI Prototypes & Agents",
        tagline: "Fast experimental builds & research concepts",
        description: "Rapid experimentation exploring agentic loops, multi-modal ingestion, and automated decision flows for emerging concepts.",
        tags: ["AI Agents", "Workflows", "Pipelines", "Prototypes"],
        icon: <Sparkles size={28} className="text-acid" />,
        color: "bg-ink",
        textColor: "text-cream",
        accent: "border-acid",
    },
];

export function ServicesSection() {
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20 reveal-up">
            <div className="flex items-end justify-between mb-8">
                <div>
                    <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/60 mb-2">
                        Core Capabilities
                    </div>
                    <h2 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-tight text-ink">
                        What I Build
                    </h2>
                </div>
                <Link
                    href="/services"
                    className="font-mono text-sm font-bold uppercase tracking-wider text-ink hover:text-electric transition-colors flex items-center gap-1 group"
                >
                    View Capabilities <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
                {capabilities.map((cap, i) => (
                    <div key={cap.title} className="reveal-up" style={{ animationDelay: `${i * 0.06}s` }}>
                        <div className={`neo-card ${cap.color} ${cap.textColor} p-6 md:p-8 h-full relative overflow-hidden flex flex-col justify-between group hover:border-acid transition-colors`}>
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-4">
                                    {cap.icon}
                                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-acid">
                                        0{i + 1}
                                    </span>
                                </div>
                                <h3 className="font-heading font-bold text-2xl md:text-3xl uppercase tracking-tight mb-1">
                                    {cap.title}
                                </h3>
                                <div className="font-mono text-xs font-bold text-acid uppercase tracking-wider mb-3">
                                    {cap.tagline}
                                </div>
                                <p className="font-mono text-sm text-cream/80 leading-relaxed mb-6">
                                    {cap.description}
                                </p>
                            </div>

                            <div className="relative z-10 pt-4 border-t border-cream/15">
                                <div className="flex flex-wrap gap-2">
                                    {cap.tags.map((t) => (
                                        <span key={t} className="px-2 py-0.5 border border-cream/20 font-mono text-[11px] font-bold uppercase text-cream/90 bg-cream/5">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
