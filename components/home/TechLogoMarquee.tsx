"use client";

import { useState } from "react";
import { Cpu, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import MobileSwipeStack, { type SwipeCardSlide } from "@/components/ui/MobileSwipeStack";

type TechCategory = "AI & LLMS" | "AUTOMATION" | "FULL-STACK" | "INFRA & DATA";

interface TechKeycap {
    name: string;
    category: TechCategory;
    bg: string;
    role: string;
}

const techKeycaps: TechKeycap[] = [
    { name: "Google Gemini", category: "AI & LLMS", bg: "bg-acid text-ink", role: "Multimodal LLM & structured JSON generation" },
    { name: "Claude", category: "AI & LLMS", bg: "bg-acid text-ink", role: "Long-context reasoning & prompt engineering" },
    { name: "AI Agents", category: "AI & LLMS", bg: "bg-acid text-ink", role: "Domain-specific conversational & RAG workflows" },
    { name: "Prompt Gates", category: "AI & LLMS", bg: "bg-acid text-ink", role: "Deterministic schema & hallucination checks" },
    { name: "n8n", category: "AUTOMATION", bg: "bg-electric text-cream", role: "Visual webhook orchestration & conditional routing" },
    { name: "Twilio API", category: "AUTOMATION", bg: "bg-electric text-cream", role: "WhatsApp & SMS conversational commerce hooks" },
    { name: "Webhooks", category: "AUTOMATION", bg: "bg-electric text-cream", role: "Real-time event triggers & payload ingestion" },
    { name: "REST APIs", category: "AUTOMATION", bg: "bg-electric text-cream", role: "Cross-service integration & tool execution" },
    { name: "Next.js", category: "FULL-STACK", bg: "bg-[#FF2A6D] text-cream", role: "App Router SSR, routing & full-stack web apps" },
    { name: "React", category: "FULL-STACK", bg: "bg-[#FF2A6D] text-cream", role: "Interactive component architecture & state" },
    { name: "Tailwind CSS", category: "FULL-STACK", bg: "bg-[#FF2A6D] text-cream", role: "Neo-brutalist design systems & responsive layout" },
    { name: "JavaScript / TS", category: "FULL-STACK", bg: "bg-[#FF2A6D] text-cream", role: "Type-safe frontend & backend application logic" },
    { name: "Python", category: "INFRA & DATA", bg: "bg-[#FFD60A] text-ink", role: "AI pipeline scripting, OCR & backend services" },
    { name: "Streamlit", category: "INFRA & DATA", bg: "bg-[#FFD60A] text-ink", role: "Rapid interactive AI application deployment" },
    { name: "SQL", category: "INFRA & DATA", bg: "bg-[#FFD60A] text-ink", role: "Relational data modeling & structured queries" },
    { name: "Git & GitHub", category: "INFRA & DATA", bg: "bg-[#FFD60A] text-ink", role: "Version control, CI/CD & open-source repos" },
];

const categories: TechCategory[] = ["AI & LLMS", "AUTOMATION", "FULL-STACK", "INFRA & DATA"];

const catColors: Record<TechCategory, string> = {
    "AI & LLMS": "bg-acid text-ink",
    "AUTOMATION": "bg-electric text-cream",
    "FULL-STACK": "bg-[#FF2A6D] text-cream",
    "INFRA & DATA": "bg-[#FFD60A] text-ink",
};

export function TechLogoMarquee() {
    const [desktopCat, setDesktopCat] = useState<"ALL" | TechCategory>("ALL");
    const [selectedKey, setSelectedKey] = useState<TechKeycap>(techKeycaps[0]);

    const mobileSlides: SwipeCardSlide[] = categories.map((cat, idx) => {
        const items = techKeycaps.filter((k) => k.category === cat);
        return {
            id: `0${idx + 1}`,
            tabLabel: `[0${idx + 1}] ${cat.split(" ")[0]}`,
            headerBg: catColors[cat],
            badgeText: `STACK // 0${idx + 1}`,
            statusText: cat,
            content: (
                <div className="space-y-2.5">
                    <div className="grid grid-cols-2 gap-2">
                        {items.map((item) => (
                            <div
                                key={item.name}
                                className="p-2.5 bg-[#F4F0E4] border-[2px] border-ink shadow-[2px_2px_0px_#1A1A1A]"
                            >
                                <div className="font-heading font-bold text-sm uppercase tracking-tight text-ink">
                                    {item.name}
                                </div>
                                <div className="font-mono text-[10px] text-ink/80 leading-snug mt-0.5">
                                    {item.role}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="pt-2 border-t border-ink/15 flex items-center justify-between">
                        <span className="font-mono text-[10px] font-extrabold uppercase text-ink/70">
                            4 CORE CARTRIDGES
                        </span>
                        <Link
                            href="/stack"
                            className="font-mono text-[10px] font-extrabold uppercase text-electric underline inline-flex items-center gap-1"
                        >
                            <span>Full Stack Matrix</span>
                            <ArrowUpRight size={11} />
                        </Link>
                    </div>
                </div>
            ),
        };
    });

    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-10 lg:mb-24 reveal-up">
            {/* ─── MOBILE ONLY (< lg): 4-Card Tinder Swipe Stack ─── */}
            <div className="lg:hidden">
                <div className="flex items-end justify-between gap-2 mb-4">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-ink text-acid font-mono text-[10px] font-extrabold uppercase tracking-widest mb-1.5">
                            <Cpu size={12} /> HARDWARE STACK
                        </div>
                        <h2 className="font-heading font-bold text-3xl uppercase tracking-tight text-ink">
                            Tools &amp; Cartridges
                        </h2>
                    </div>
                    <Link
                        href="/stack"
                        className="px-2.5 py-1.5 font-mono text-[10px] font-extrabold uppercase tracking-wider border-[2px] border-ink bg-acid text-ink inline-flex items-center gap-1 shadow-[2px_2px_0px_#1A1A1A]"
                    >
                        <span>All (22)</span>
                        <ArrowUpRight size={12} />
                    </Link>
                </div>

                <MobileSwipeStack
                    slides={mobileSlides}
                    instructionLabel="SWIPE STACK [01–04] ↔"
                />
            </div>

            {/* ─── DESKTOP ONLY (lg+): 8-Column 3D Mechanical Keycap Grid (Unchanged) ─── */}
            <div className="hidden lg:block bg-cream border-[3px] border-ink shadow-[6px_6px_0px_#1A1A1A] p-8">
                {/* Header */}
                <div className="flex items-center justify-between gap-4 pb-4 mb-5 border-b-[3px] border-ink">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-ink text-acid font-mono text-[10px] font-extrabold uppercase tracking-widest mb-1.5">
                            <Cpu size={12} /> HARDWARE KEYCAP STACK MATRIX
                        </div>
                        <h3 className="font-heading font-bold text-3xl uppercase tracking-tight text-ink">
                            Tools &amp; Cartridges
                        </h3>
                    </div>

                    <div className="flex flex-wrap gap-1.5 items-center">
                        {(["ALL", ...categories] as const).map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setDesktopCat(cat)}
                                className={`px-3 py-1.5 font-mono text-[10px] font-extrabold uppercase tracking-wider border-[2px] border-ink transition-all ${
                                    desktopCat === cat
                                        ? "bg-ink text-acid shadow-[2px_2px_0px_#CCFF00] -translate-y-0.5"
                                        : "bg-[#F4F0E4] text-ink hover:bg-acid"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                        <Link
                            href="/stack"
                            className="px-3 py-1.5 font-mono text-[10px] font-extrabold uppercase tracking-wider border-[2px] border-ink bg-acid text-ink inline-flex items-center gap-1 shadow-[2px_2px_0px_#1A1A1A]"
                        >
                            <span>Full Stack</span>
                            <ArrowUpRight size={12} />
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-8 gap-3 mb-5">
                    {techKeycaps.map((item) => {
                        const isDimmed = desktopCat !== "ALL" && item.category !== desktopCat;
                        const isSelected = selectedKey.name === item.name;
                        return (
                            <button
                                key={item.name}
                                type="button"
                                onClick={() => setSelectedKey(item)}
                                className={`p-3 text-left border-[2.5px] border-ink transition-all ${
                                    isDimmed
                                        ? "opacity-25 bg-[#F4F0E4] text-ink"
                                        : isSelected
                                        ? `${item.bg} shadow-[1px_1px_0px_#1A1A1A] translate-y-0.5 ring-2 ring-ink`
                                        : `${item.bg} shadow-[4px_4px_0px_#1A1A1A] hover:-translate-y-0.5 active:translate-y-0.5`
                                }`}
                            >
                                <div className="font-mono text-[8px] font-extrabold uppercase tracking-widest opacity-80 truncate">
                                    {item.category}
                                </div>
                                <div className="font-heading font-bold text-sm uppercase tracking-tight mt-1 truncate">
                                    {item.name}
                                </div>
                            </button>
                        );
                    })}
                </div>

                <div className="p-3.5 bg-ink text-cream border-[2.5px] border-ink flex items-center justify-between gap-2 font-mono text-xs">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2 py-0.5 ${selectedKey.bg} font-extrabold text-[10px] uppercase`}>
                            KEYCAP // {selectedKey.name}
                        </span>
                        <span className="text-cream/90 font-bold">{selectedKey.role}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
