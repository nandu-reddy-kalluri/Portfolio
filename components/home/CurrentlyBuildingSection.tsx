"use client";

import { Activity, Bot, Cpu, Layers } from "lucide-react";

const buildingItems = [
    {
        title: "AI Systems",
        description: "Exploring practical applications of Generative AI, conversational systems, and AI agents.",
        icon: <Bot size={20} className="text-acid" />,
        tag: "Active R&D",
    },
    {
        title: "AI Pipelines",
        description: "Building automated data, image, and AI-processing workflows with validation stages.",
        icon: <Activity size={20} className="text-electric" />,
        tag: "Pipelines",
    },
    {
        title: "Intelligent Automation",
        description: "Experimenting with n8n, APIs, webhooks, AI models, and agent-based workflows.",
        icon: <Cpu size={20} className="text-hotpink" />,
        tag: "Workflows",
    },
    {
        title: "Full-Stack Products",
        description: "Continuing to build modern web applications with strong frontend experiences and backend integrations.",
        icon: <Layers size={20} className="text-vivid" />,
        tag: "Products",
    },
];

export function CurrentlyBuildingSection() {
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20 reveal-up">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/60 mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 bg-acid rounded-full animate-pulse-dot" />
                        Live Engineering Tracker
                    </div>
                    <h2 className="font-heading font-bold text-3xl md:text-4xl uppercase tracking-tight text-ink">
                        Currently Building
                    </h2>
                </div>
                <div className="hidden sm:flex items-center gap-2 bg-ink text-acid px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider border-[2px] border-ink">
                    <span className="w-2 h-2 bg-acid rounded-full animate-pulse-dot" />
                    IN PROGRESS
                </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {buildingItems.map((item, idx) => (
                    <div
                        key={item.title}
                        className="neo-card bg-cream p-5 flex flex-col justify-between h-full group hover:bg-ink hover:text-cream transition-all reveal-up"
                        style={{ animationDelay: `${idx * 0.06}s` }}
                    >
                        <div>
                            <div className="flex items-center justify-between gap-2 mb-3">
                                <div>{item.icon}</div>
                                <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border border-current/20">
                                    {item.tag}
                                </span>
                            </div>
                            <h3 className="font-heading font-bold text-lg uppercase tracking-tight mb-2 group-hover:text-acid transition-colors">
                                {item.title}
                            </h3>
                            <p className="font-mono text-xs opacity-80 leading-relaxed">
                                {item.description}
                            </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-current/10 flex items-center justify-between font-mono text-[10px] uppercase font-bold opacity-60">
                            <span>Status</span>
                            <span className="text-acid">Active</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
