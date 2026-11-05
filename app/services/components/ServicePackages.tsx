"use client";

import { Zap, Bot, ArrowUpRight, Cpu, Layers, Sparkles, Database, Workflow } from "lucide-react";
import Link from "next/link";
import MobileSwipeStack, { type SwipeCardSlide } from "@/components/ui/MobileSwipeStack";

const aiCapabilities = [
    { icon: <Bot size={18} />, label: "Conversational AI", desc: "Structured prompt systems & interactive chat agents" },
    { icon: <Zap size={18} />, label: "Multi-Modal Reasoning", desc: "Google Gemini & Claude vision / text integrations" },
    { icon: <Sparkles size={18} />, label: "Prompt Engineering", desc: "Structured output validation & quality gates" },
    { icon: <Database size={18} />, label: "Data Pipelines", desc: "Automated ingestion, parsing & dataset normalization" },
];

const engineeringCapabilities = [
    { icon: <Workflow size={18} />, label: "n8n Automation", desc: "Visual orchestration, webhook triggers & node pipelines" },
    { icon: <Cpu size={18} />, label: "API Integrations", desc: "Twilio WhatsApp, REST services, event-driven webhooks" },
    { icon: <Layers size={18} />, label: "Full-Stack Web", desc: "React, Next.js, TypeScript & Tailwind CSS builds" },
    { icon: <Zap size={18} />, label: "Rapid Prototyping", desc: "Streamlit applications & fast iterative MVP development" },
];

export function ServicePackages() {
    const mobileSlides: SwipeCardSlide[] = [
        {
            id: "01",
            tabLabel: "[01] Gen-AI & Agents",
            headerBg: "bg-acid text-ink",
            badgeText: "PILLAR // 01",
            statusText: "4 DOMAINS",
            content: (
                <div className="space-y-3">
                    <div>
                        <h2 className="font-heading font-bold text-xl uppercase tracking-tight text-ink mb-1">
                            Generative AI &amp; Agents
                        </h2>
                        <p className="font-mono text-xs text-ink/80 leading-relaxed mb-2.5">
                            Practical conversational interfaces, domain AI tools, and structured prompt pipelines.
                        </p>
                        <div className="space-y-2">
                            {aiCapabilities.map((f) => (
                                <div key={f.label} className="flex items-start gap-2.5 p-2 bg-[#F4F0E4] border-[2px] border-ink">
                                    <div className="p-1 bg-acid border border-ink text-ink mt-0.5 flex-shrink-0">
                                        {f.icon}
                                    </div>
                                    <div>
                                        <div className="font-heading font-bold text-xs uppercase tracking-tight text-ink">
                                            {f.label}
                                        </div>
                                        <div className="font-mono text-[11px] text-ink/80">{f.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="pt-2 border-t border-ink/15">
                        <Link
                            href="/work"
                            className="inline-flex items-center gap-1.5 bg-ink text-acid px-4 py-2 font-heading font-bold text-xs uppercase tracking-wider border-[2px] border-ink"
                        >
                            <span>Explore AI Projects</span>
                            <ArrowUpRight size={13} />
                        </Link>
                    </div>
                </div>
            ),
        },
        {
            id: "02",
            tabLabel: "[02] Auto & Web",
            headerBg: "bg-electric text-cream",
            badgeText: "PILLAR // 02",
            statusText: "4 DOMAINS",
            content: (
                <div className="space-y-3">
                    <div>
                        <h2 className="font-heading font-bold text-xl uppercase tracking-tight text-ink mb-1">
                            Automation &amp; Full-Stack
                        </h2>
                        <p className="font-mono text-xs text-ink/80 leading-relaxed mb-2.5">
                            Connecting event-driven webhooks, external APIs, and modern frontend interfaces.
                        </p>
                        <div className="space-y-2">
                            {engineeringCapabilities.map((f) => (
                                <div key={f.label} className="flex items-start gap-2.5 p-2 bg-[#F4F0E4] border-[2px] border-ink">
                                    <div className="p-1 bg-[#FFD60A] border border-ink text-ink mt-0.5 flex-shrink-0">
                                        {f.icon}
                                    </div>
                                    <div>
                                        <div className="font-heading font-bold text-xs uppercase tracking-tight text-ink">
                                            {f.label}
                                        </div>
                                        <div className="font-mono text-[11px] text-ink/80">{f.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="pt-2 border-t border-ink/15">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-1.5 bg-acid text-ink px-4 py-2 font-heading font-bold text-xs uppercase tracking-wider border-[2px] border-ink"
                        >
                            <span>Collaborate On A Build</span>
                            <ArrowUpRight size={13} />
                        </Link>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-10 lg:mb-20">
            {/* ─── MOBILE ONLY (< lg): 3D Tinder Swipe Stack [01]–[02] ─── */}
            <div className="lg:hidden">
                <MobileSwipeStack
                    slides={mobileSlides}
                    instructionLabel="SWIPE PILLAR [01–02] ↔"
                />
            </div>

            {/* ─── DESKTOP ONLY (lg+): 2-Column Package Grid (Unchanged) ─── */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-6">
                {/* Pillar 01: Generative AI & Agents */}
                <div className="reveal-up">
                    <div className="neo-card bg-acid text-ink p-3.5 sm:p-5 h-full flex flex-col justify-between">
                        <div className="bg-cream text-ink border-[3px] border-ink p-5 sm:p-6 h-full flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between gap-2 mb-3">
                                    <span className="px-2.5 py-0.5 bg-ink text-acid font-mono text-[10px] font-extrabold uppercase tracking-wider">
                                        PILLAR // 01
                                    </span>
                                    <Bot size={22} className="text-ink" />
                                </div>
                                <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight mb-2">
                                    Generative AI &amp; Agents
                                </h2>
                                <p className="font-mono text-xs sm:text-sm text-ink/80 leading-relaxed mb-5">
                                    Developing practical conversational interfaces, domain-focused AI tools, and structured prompt pipelines designed for real utility.
                                </p>

                                <div className="space-y-2.5 mb-6">
                                    {aiCapabilities.map((f) => (
                                        <div key={f.label} className="flex items-start gap-3 p-2.5 bg-[#F4F0E4] border-[2px] border-ink">
                                            <div className="p-1.5 bg-acid border border-ink text-ink mt-0.5 flex-shrink-0">
                                                {f.icon}
                                            </div>
                                            <div>
                                                <div className="font-heading font-bold text-sm uppercase tracking-tight text-ink">
                                                    {f.label}
                                                </div>
                                                <div className="font-mono text-xs text-ink/80">{f.desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 border-t-[2px] border-ink/15">
                                <Link
                                    href="/work"
                                    className="inline-flex items-center gap-2 bg-ink text-acid px-5 py-2.5 font-heading font-bold text-xs sm:text-sm uppercase tracking-wider border-[2px] border-ink hover:bg-acid hover:text-ink transition-all"
                                >
                                    <span>Explore AI Projects</span>
                                    <ArrowUpRight size={14} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pillar 02: Automation & Full-Stack */}
                <div className="reveal-up">
                    <div className="neo-card bg-electric text-cream p-3.5 sm:p-5 h-full flex flex-col justify-between">
                        <div className="bg-cream text-ink border-[3px] border-ink p-5 sm:p-6 h-full flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between gap-2 mb-3">
                                    <span className="px-2.5 py-0.5 bg-electric text-cream border-[2px] border-ink font-mono text-[10px] font-extrabold uppercase tracking-wider">
                                        PILLAR // 02
                                    </span>
                                    <Workflow size={22} className="text-ink" />
                                </div>
                                <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight mb-2">
                                    Automation &amp; Full-Stack
                                </h2>
                                <p className="font-mono text-xs sm:text-sm text-ink/80 leading-relaxed mb-5">
                                    Connecting event-driven webhooks, external APIs, and modern frontend interfaces into robust, responsive products.
                                </p>

                                <div className="space-y-2.5 mb-6">
                                    {engineeringCapabilities.map((f) => (
                                        <div key={f.label} className="flex items-start gap-3 p-2.5 bg-[#F4F0E4] border-[2px] border-ink">
                                            <div className="p-1.5 bg-[#FFD60A] border border-ink text-ink mt-0.5 flex-shrink-0">
                                                {f.icon}
                                            </div>
                                            <div>
                                                <div className="font-heading font-bold text-sm uppercase tracking-tight text-ink">
                                                    {f.label}
                                                </div>
                                                <div className="font-mono text-xs text-ink/80">{f.desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 border-t-[2px] border-ink/15">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 bg-acid text-ink px-5 py-2.5 font-heading font-bold text-xs sm:text-sm uppercase tracking-wider border-[2px] border-ink hover:bg-[#FFD60A] transition-all"
                                >
                                    <span>Collaborate On A Build</span>
                                    <ArrowUpRight size={14} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
