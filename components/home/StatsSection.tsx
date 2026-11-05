"use client";

import { Brain, Cpu, Layers, Sparkles, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import MobileSwipeStack, { type SwipeCardSlide } from "@/components/ui/MobileSwipeStack";

const signals = [
    {
        id: "01",
        tabLabel: "[01] Gen-AI",
        title: "Generative AI",
        badge: "LLM · AGENTS",
        description: "Conversational AI apps, structured prompt gates & multi-modal reasoning.",
        icon: <Brain size={20} className="text-ink" />,
        headerBg: "bg-acid text-ink",
        pillBg: "bg-acid text-ink",
        href: "/work#ai",
    },
    {
        id: "02",
        tabLabel: "[02] Auto",
        title: "Automation",
        badge: "N8N · WEBHOOKS",
        description: "End-to-end n8n orchestration, Twilio WhatsApp bots & REST API workflows.",
        icon: <Cpu size={20} className="text-cream" />,
        headerBg: "bg-electric text-cream",
        pillBg: "bg-[#FFD60A] text-ink",
        href: "/work#automation",
    },
    {
        id: "03",
        tabLabel: "[03] Full-Stack",
        title: "Full-Stack Web",
        badge: "NEXT.JS · REACT",
        description: "Modern responsive web products, clean UI/UX & scalable frontend systems.",
        icon: <Layers size={20} className="text-ink" />,
        headerBg: "bg-vivid text-ink",
        pillBg: "bg-vivid text-ink",
        href: "/work#products",
    },
    {
        id: "04",
        tabLabel: "[04] Pipelines",
        title: "AI Pipelines",
        badge: "DATA · VISION",
        description: "Multi-stage ingestion, validation schemas, OCR & automated action routing.",
        icon: <Sparkles size={20} className="text-ink" />,
        headerBg: "bg-[#FFD60A] text-ink",
        pillBg: "bg-[#FFD60A] text-ink",
        href: "/stack",
    },
];

export function StatsSection() {
    const mobileSlides: SwipeCardSlide[] = signals.map((s) => ({
        id: s.id,
        tabLabel: s.tabLabel,
        headerBg: s.headerBg,
        badgeText: `PILLAR // [${s.id}]`,
        statusText: s.badge,
        content: (
            <div className="flex flex-col justify-between gap-3">
                <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                        <h3 className="font-heading font-extrabold text-xl uppercase tracking-tight text-ink">
                            [{s.id}] {s.title}
                        </h3>
                        <div className="w-8 h-8 bg-[#F4F0E4] border-[2px] border-ink flex items-center justify-center">
                            <span className="text-ink">{s.icon}</span>
                        </div>
                    </div>
                    <p className="font-mono text-xs text-ink/85 leading-relaxed">
                        {s.description}
                    </p>
                </div>

                <div className="pt-3 border-t-[2px] border-dashed border-ink/15 flex items-center justify-between">
                    <span className={`font-mono text-[10px] font-extrabold uppercase px-2.5 py-0.5 border-[1.5px] border-ink ${s.pillBg}`}>
                        {s.badge}
                    </span>
                    <Link
                        href={s.href}
                        className="px-3 py-1 bg-ink text-acid border-[2px] border-ink font-mono text-[11px] font-extrabold uppercase inline-flex items-center gap-1"
                    >
                        <span>Inspect</span>
                        <ArrowUpRight size={13} />
                    </Link>
                </div>
            </div>
        ),
    }));

    return (
        <section
            aria-label="Core Engineering Pillars"
            className="max-w-7xl mx-auto px-4 md:px-8 mt-6 lg:mt-12 mb-10 lg:mb-20 relative z-20"
        >
            {/* ─── MOBILE ONLY (< lg): 3D Tinder Swipe Stack for [01]–[04] ─── */}
            <div className="lg:hidden">
                <MobileSwipeStack
                    slides={mobileSlides}
                    instructionLabel="SWIPE PILLAR [01–04] ↔"
                />
            </div>

            {/* ─── DESKTOP ONLY (lg+): Original 4-Column Tactile Grid (Unchanged) ─── */}
            <div className="hidden lg:grid lg:grid-cols-4 gap-5">
                {signals.map((signal, i) => (
                    <Link
                        key={signal.title}
                        href={signal.href}
                        className="neo-card bg-cream text-ink flex flex-col justify-between overflow-hidden group reveal-up"
                        style={{ animationDelay: `${i * 0.06}s` }}
                    >
                        {/* Colored Tactile Folder Header Bar */}
                        <div className={`${signal.headerBg} border-b-[3px] border-ink px-4 py-2.5 flex items-center justify-between`}>
                            <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-extrabold uppercase tracking-wider">
                                    [{signal.id}]
                                </span>
                                <span className="font-heading font-extrabold text-sm sm:text-base uppercase tracking-tight">
                                    {signal.title}
                                </span>
                            </div>
                            <div className="group-hover:rotate-12 group-hover:scale-110 transition-transform">
                                {signal.icon}
                            </div>
                        </div>

                        {/* Crisp High-Contrast Body */}
                        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-cream">
                            <p className="font-mono text-xs text-ink/85 leading-relaxed mb-4">
                                {signal.description}
                            </p>

                            <div className="pt-3 border-t-[2px] border-dashed border-ink/15 flex items-center justify-between">
                                <span className={`font-mono text-[10px] font-extrabold uppercase px-2 py-0.5 border border-ink ${signal.pillBg}`}>
                                    {signal.badge}
                                </span>
                                <span className="font-mono text-[11px] font-extrabold uppercase text-ink group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
                                    Inspect <ArrowUpRight size={13} />
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
