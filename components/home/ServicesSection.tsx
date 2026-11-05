"use client";

import { ArrowUpRight, Bot, Cpu, Layers, Sparkles, Check } from "lucide-react";
import Link from "next/link";
import MobileSwipeStack, { type SwipeCardSlide } from "@/components/ui/MobileSwipeStack";

const capabilities = [
    {
        index: "01",
        shortTab: "[01] AI Apps",
        title: "AI Applications",
        tagline: "Conversational systems & structured LLM tools",
        description:
            "Building practical AI-powered applications, structured prompt pipelines, and conversational interfaces that solve domain-specific tasks.",
        deliverables: [
            "Prompt-guarded conversational agents",
            "Multi-modal Gemini & Claude reasoning",
            "Interactive Streamlit & web deployments",
        ],
        tags: ["Gemini", "Claude", "Streamlit", "Prompt Engineering"],
        icon: <Bot size={22} className="text-ink" />,
        bannerBg: "bg-acid text-ink",
        pillBg: "bg-acid text-ink",
    },
    {
        index: "02",
        shortTab: "[02] Auto",
        title: "Intelligent Automation",
        tagline: "API orchestration & webhook pipelines",
        description:
            "Connecting APIs, workflows, webhooks, and AI models via tools like n8n to automate manual processes and real-time message triage.",
        deliverables: [
            "End-to-end n8n workflow orchestration",
            "Twilio WhatsApp & webhook ingestion",
            "Automated error recovery & retries",
        ],
        tags: ["n8n", "Twilio", "Webhooks", "REST APIs"],
        icon: <Cpu size={22} className="text-ink" />,
        bannerBg: "bg-electric text-cream",
        pillBg: "bg-[#FFD60A] text-ink",
    },
    {
        index: "03",
        shortTab: "[03] Web",
        title: "Modern Web Products",
        tagline: "Responsive full-stack & frontend craft",
        description:
            "Developing responsive web applications with high-contrast Neo-Brutalist presentation, smooth performance, and thoughtful UX architecture.",
        deliverables: [
            "Next.js 14 App Router full-stack builds",
            "Mobile-first responsive design systems",
            "Interactive SVG & motion physics",
        ],
        tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
        icon: <Layers size={22} className="text-ink" />,
        bannerBg: "bg-vivid text-ink",
        pillBg: "bg-vivid text-ink",
    },
    {
        index: "04",
        shortTab: "[04] Agents",
        title: "AI Prototypes & Agents",
        tagline: "Fast experimental builds & R&D concepts",
        description:
            "Rapid experimentation exploring autonomous agentic loops, multi-modal ingestion, and automated decision flows for emerging concepts.",
        deliverables: [
            "Multi-step agentic tool-calling loops",
            "OCR & computer-vision safety concepts",
            "Schema-validated JSON output gates",
        ],
        tags: ["AI Agents", "Workflows", "Pipelines", "Prototypes"],
        icon: <Sparkles size={22} className="text-ink" />,
        bannerBg: "bg-[#FF2A6D] text-cream",
        pillBg: "bg-[#FFD60A] text-ink",
    },
];

export function ServicesSection() {
    const mobileSlides: SwipeCardSlide[] = capabilities.map((cap) => ({
        id: cap.index,
        tabLabel: cap.shortTab,
        headerBg: cap.bannerBg,
        badgeText: `PILLAR // ${cap.index} OF 04`,
        statusText: "SWIPE ↔",
        content: (
            <div className="flex flex-col justify-between gap-3">
                <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="font-heading font-extrabold text-xl uppercase tracking-tight text-ink">
                            {cap.title}
                        </h3>
                        <div className="w-8 h-8 bg-[#F4F0E4] border-[2px] border-ink flex items-center justify-center flex-shrink-0">
                            {cap.icon}
                        </div>
                    </div>
                    <div className="font-mono text-[10px] font-extrabold text-electric uppercase tracking-wider mb-1.5">
                        {cap.tagline}
                    </div>
                    <p className="font-mono text-xs text-ink/85 leading-relaxed mb-3">
                        {cap.description}
                    </p>

                    <ul className="space-y-1.5 pt-2.5 border-t-[2px] border-dashed border-ink/15">
                        {cap.deliverables.map((d) => (
                            <li key={d} className="font-mono text-xs text-ink/90 flex items-center gap-2">
                                <span className="w-4 h-4 bg-acid border border-ink flex items-center justify-center flex-shrink-0">
                                    <Check size={11} className="text-ink stroke-[3]" />
                                </span>
                                <span>{d}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="pt-2.5 border-t-[2px] border-ink/15 flex flex-wrap gap-1.5">
                    {cap.tags.map((t) => (
                        <span
                            key={t}
                            className={`px-2 py-0.5 border-[1.5px] border-ink font-mono text-[10px] font-extrabold uppercase ${cap.pillBg}`}
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        ),
    }));

    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-10 lg:mb-24 reveal-up">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5 lg:mb-8">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFD60A] text-ink border-[2px] border-ink shadow-[3px_3px_0px_#1A1A1A] font-mono text-[10px] font-extrabold uppercase tracking-[0.22em] mb-2.5">
                        CORE CAPABILITIES // WHAT I ENGINEER
                    </div>
                    <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-ink">
                        What I Build
                    </h2>
                </div>
                <Link
                    href="/services"
                    className="neo-pill bg-ink text-acid hover:bg-acid hover:text-ink transition-colors inline-flex items-center gap-1.5 self-start sm:self-auto"
                >
                    <span>Full Capabilities Matrix</span>
                    <ArrowUpRight size={15} />
                </Link>
            </div>

            {/* ─── MOBILE ONLY (< lg): 3D Tinder Swipe Stack for Pillars [01]–[04] ─── */}
            <div className="lg:hidden">
                <MobileSwipeStack
                    slides={mobileSlides}
                    instructionLabel="SWIPE CAPABILITY [01–04] ↔"
                />
            </div>

            {/* ─── DESKTOP ONLY (lg+): 2x2 Capability Grid (Unchanged) ─── */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-6">
                {capabilities.map((cap, i) => (
                    <div key={cap.title} className="reveal-up" style={{ animationDelay: `${i * 0.06}s` }}>
                        <div className="neo-card bg-cream text-ink h-full flex flex-col justify-between overflow-hidden group">
                            <div className={`${cap.bannerBg} border-b-[3px] border-ink px-5 py-4 flex items-center justify-between`}>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-cream text-ink border-[2px] border-ink flex items-center justify-center shadow-neo-sm group-hover:rotate-6 transition-transform">
                                        {cap.icon}
                                    </div>
                                    <div>
                                        <span className="font-mono text-[10px] font-extrabold uppercase tracking-widest block opacity-85">
                                            PILLAR // {cap.index}
                                        </span>
                                        <h3 className="font-heading font-extrabold text-xl sm:text-2xl uppercase tracking-tight leading-none">
                                            {cap.title}
                                        </h3>
                                    </div>
                                </div>

                                <span className="font-heading font-extrabold text-2xl sm:text-3xl opacity-25 select-none">
                                    {cap.index}
                                </span>
                            </div>

                            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-cream">
                                <div>
                                    <div className="font-mono text-xs font-extrabold text-electric uppercase tracking-wider mb-2.5">
                                        {cap.tagline}
                                    </div>
                                    <p className="font-mono text-xs sm:text-sm text-ink/85 leading-relaxed mb-4">
                                        {cap.description}
                                    </p>

                                    <ul className="space-y-1.5 mb-5 pt-3 border-t-[2px] border-dashed border-ink/15">
                                        {cap.deliverables.map((d) => (
                                            <li key={d} className="font-mono text-xs text-ink/90 flex items-center gap-2">
                                                <span className="w-4 h-4 bg-acid border border-ink flex items-center justify-center flex-shrink-0">
                                                    <Check size={11} className="text-ink stroke-[3]" />
                                                </span>
                                                <span>{d}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="pt-3 border-t-[2px] border-ink/15 flex flex-wrap gap-1.5">
                                    {cap.tags.map((t) => (
                                        <span
                                            key={t}
                                            className={`px-2.5 py-0.5 border-[2px] border-ink font-mono text-[10px] font-extrabold uppercase ${cap.pillBg}`}
                                        >
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
