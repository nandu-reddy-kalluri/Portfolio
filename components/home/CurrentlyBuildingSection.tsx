"use client";

import { Activity, Bot, Cpu, Layers } from "lucide-react";
import MobileSwipeStack, { type SwipeCardSlide } from "@/components/ui/MobileSwipeStack";

const buildingItems = [
    {
        id: "LAB-01",
        tabLabel: "[01] AI Systems",
        title: "AI Systems",
        description:
            "Exploring practical applications of Generative AI, domain-specific conversational systems, and autonomous AI agents.",
        icon: <Bot size={18} className="text-ink" />,
        tag: "Active R&D",
        ribbonBg: "bg-acid text-ink",
        barColor: "bg-acid",
        progress: "85%",
    },
    {
        id: "LAB-02",
        tabLabel: "[02] Pipelines",
        title: "AI Pipelines",
        description:
            "Building automated data, image, and AI-processing workflows with strict schema validation and quality gates.",
        icon: <Activity size={18} className="text-cream" />,
        tag: "Pipelines",
        ribbonBg: "bg-electric text-cream",
        barColor: "bg-electric",
        progress: "90%",
    },
    {
        id: "LAB-03",
        tabLabel: "[03] Automation",
        title: "Intelligent Automation",
        description:
            "Experimenting with n8n orchestration, REST APIs, real-time webhooks, and multi-step agentic tool loops.",
        icon: <Cpu size={18} className="text-cream" />,
        tag: "Workflows",
        ribbonBg: "bg-[#FF2A6D] text-cream",
        barColor: "bg-[#FF2A6D]",
        progress: "80%",
    },
    {
        id: "LAB-04",
        tabLabel: "[04] Products",
        title: "Full-Stack Products",
        description:
            "Shipping modern web applications with high-contrast Neo-Brutalist interfaces and scalable backend services.",
        icon: <Layers size={18} className="text-ink" />,
        tag: "Products",
        ribbonBg: "bg-vivid text-ink",
        barColor: "bg-vivid",
        progress: "75%",
    },
];

export function CurrentlyBuildingSection() {
    const mobileSlides: SwipeCardSlide[] = buildingItems.map((item) => ({
        id: item.id,
        tabLabel: item.tabLabel,
        headerBg: item.ribbonBg,
        badgeText: `${item.id} // ${item.tag}`,
        statusText: `ACTIVE ${item.progress}`,
        content: (
            <div className="flex flex-col justify-between gap-3">
                <div>
                    <h3 className="font-heading font-extrabold text-xl uppercase tracking-tight text-ink mb-1.5">
                        {item.title}
                    </h3>
                    <p className="font-mono text-xs text-ink/85 leading-relaxed">
                        {item.description}
                    </p>
                </div>

                <div className="pt-3 border-t-[2px] border-dashed border-ink/15">
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase font-extrabold text-ink mb-1.5">
                        <span>Pipeline Maturity</span>
                        <span>● Active ({item.progress})</span>
                    </div>
                    <div className="w-full h-2.5 bg-ink/10 border border-ink overflow-hidden">
                        <div
                            className={`h-full ${item.barColor} border-r border-ink`}
                            style={{ width: item.progress }}
                        />
                    </div>
                </div>
            </div>
        ),
    }));

    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-10 lg:mb-24 reveal-up">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5 lg:mb-7">
                <div>
                    <div className="font-mono text-xs font-extrabold uppercase tracking-[0.25em] text-ink/65 mb-1.5 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 bg-vivid border border-ink rounded-full animate-pulse" />
                        Live R&amp;D Workbench
                    </div>
                    <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-ink">
                        Currently Building
                    </h2>
                </div>
                <div className="inline-flex items-center gap-2 bg-ink text-acid px-3.5 py-1.5 font-mono text-xs font-extrabold uppercase tracking-wider border-[2px] border-ink shadow-neo-sm self-start sm:self-auto">
                    <span className="w-2 h-2 bg-acid rounded-full animate-pulse" />
                    4 ACTIVE STREAMS
                </div>
            </div>

            {/* ─── MOBILE ONLY (< lg): 3D Tinder Swipe Stack for LAB 01–04 ─── */}
            <div className="lg:hidden">
                <MobileSwipeStack
                    slides={mobileSlides}
                    instructionLabel="SWIPE R&D STREAM [01–04] ↔"
                />
            </div>

            {/* ─── DESKTOP ONLY (lg+): Original 4-Column Grid (Unchanged) ─── */}
            <div className="hidden lg:grid lg:grid-cols-4 gap-5">
                {buildingItems.map((item, idx) => (
                    <div
                        key={item.title}
                        className="neo-card bg-cream text-ink flex flex-col justify-between h-full overflow-hidden group reveal-up"
                        style={{ animationDelay: `${idx * 0.06}s` }}
                    >
                        {/* Colored Ticket Header */}
                        <div className={`${item.ribbonBg} border-b-[3px] border-ink px-4 py-2.5 flex items-center justify-between`}>
                            <span className="font-mono text-[10px] font-extrabold uppercase tracking-widest">
                                {item.id} {"//"} {item.tag}
                            </span>
                            <div className="group-hover:scale-110 transition-transform">
                                {item.icon}
                            </div>
                        </div>

                        {/* Ticket Body */}
                        <div className="p-5 flex-1 flex flex-col justify-between bg-cream">
                            <div>
                                <h3 className="font-heading font-extrabold text-lg sm:text-xl uppercase tracking-tight text-ink mb-2 group-hover:text-electric transition-colors">
                                    {item.title}
                                </h3>
                                <p className="font-mono text-xs text-ink/85 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>

                            {/* Tactile Progress Meter */}
                            <div className="mt-5 pt-3 border-t-[2px] border-dashed border-ink/15">
                                <div className="flex items-center justify-between font-mono text-[10px] uppercase font-extrabold text-ink mb-1.5">
                                    <span>Pipeline Maturity</span>
                                    <span>● Active ({item.progress})</span>
                                </div>
                                <div className="w-full h-2.5 bg-ink/10 border border-ink overflow-hidden">
                                    <div
                                        className={`h-full ${item.barColor} border-r border-ink`}
                                        style={{ width: item.progress }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
