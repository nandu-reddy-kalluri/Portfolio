"use client";

import { Brain, Cpu, Layers, Sparkles } from "lucide-react";

interface SignalCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    index: number;
}

const signals = [
    {
        title: "Generative AI",
        description: "AI applications, agents & conversational systems",
        icon: <Brain size={22} className="text-acid" />,
    },
    {
        title: "Automation",
        description: "n8n, APIs, webhooks & intelligent workflows",
        icon: <Cpu size={22} className="text-acid" />,
    },
    {
        title: "Full-Stack",
        description: "Modern web products & responsive interfaces",
        icon: <Layers size={22} className="text-acid" />,
    },
    {
        title: "Currently Building",
        description: "AI pipelines & new experimental workflows",
        icon: <Sparkles size={22} className="text-acid" />,
    },
];

export function StatsSection() {
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 -mt-4 mb-12 md:mb-20 relative z-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {signals.map((signal, i) => (
                    <div
                        key={signal.title}
                        className="neo-card bg-ink text-cream p-5 flex flex-col justify-between min-h-[120px] relative overflow-hidden reveal-up group hover:border-acid transition-colors"
                        style={{ animationDelay: `${i * 0.08}s` }}
                    >
                        <div className="flex items-center justify-between gap-2 mb-3">
                            <div className="font-mono text-xs font-bold uppercase tracking-widest text-acid">
                                {signal.title}
                            </div>
                            <div className="text-acid/70 group-hover:text-acid group-hover:scale-110 transition-all">
                                {signal.icon}
                            </div>
                        </div>
                        <p className="font-mono text-xs text-cream/75 leading-relaxed">
                            {signal.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
