"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Github,
    Mail,
    Phone,
    Code2,
    GraduationCap,
    MapPin,
    Sparkles,
    Shuffle,
    ArrowUpRight,
} from "lucide-react";
import MobileSwipeStack, { type SwipeCardSlide } from "@/components/ui/MobileSwipeStack";

interface StickerItem {
    id: string;
    label: string;
    sub: string;
    bg: string;
    rotate: number;
}

const initialStickers: StickerItem[] = [
    { id: "s1", label: "SHIPPED > HYPE", sub: "PRODUCTION FIRST", bg: "bg-acid text-ink", rotate: -3 },
    { id: "s2", label: "PROMPT ARCHITECT", sub: "GEMINI · CLAUDE", bg: "bg-[#FFD60A] text-ink", rotate: 2 },
    { id: "s3", label: "N8N WIZARD", sub: "WEBHOOK PIPELINES", bg: "bg-electric text-cream", rotate: -2 },
    { id: "s4", label: "FULL-STACK UI", sub: "NEXT.JS · TAILWIND", bg: "bg-[#FF2A6D] text-cream", rotate: 3 },
    { id: "s5", label: "AURORA × NIAT", sub: "B.TECH · HYDERABAD", bg: "bg-vivid text-ink", rotate: -1 },
];

type PassTab = "academic" | "dna" | "metrics";

export function AboutSection() {
    const [activePassTab, setActivePassTab] = useState<PassTab>("academic");
    const [stickers, setStickers] = useState<StickerItem[]>(initialStickers);
    const [activeSticker, setActiveSticker] = useState<string>("s1");
    const [storyMode, setStoryMode] = useState<"story" | "tldr">("story");

    const shuffleStickers = () => {
        setStickers((prev) => {
            const copy = [...prev];
            for (let i = copy.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [copy[i], copy[j]] = [copy[j], copy[i]];
            }
            return copy.map((s, idx) => ({
                ...s,
                rotate: (idx % 2 === 0 ? 1 : -1) * (Math.floor(Math.random() * 4) + 1),
            }));
        });
    };

    const mobileAboutSlides: SwipeCardSlide[] = [
        {
            id: "01",
            tabLabel: "[01] ID Pass",
            headerBg: "bg-[#FFD60A] text-ink",
            badgeText: "PASS // KNK-2025-IN",
            statusText: "AURORA × NIAT",
            content: (
                <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2 border-b-[2px] border-ink/15 pb-2.5">
                        <div>
                            <div className="flex items-center gap-1.5 font-mono text-[10px] font-extrabold uppercase tracking-widest text-electric mb-0.5">
                                <GraduationCap size={13} /> EDUCATION &amp; LAB
                            </div>
                            <h3 className="font-heading font-bold text-2xl uppercase tracking-tight text-ink">
                                Aurora × NIAT
                            </h3>
                        </div>
                        <span className="px-2 py-0.5 bg-acid text-ink border-[1.5px] border-ink font-mono text-[10px] font-extrabold uppercase">
                            2025–NOW
                        </span>
                    </div>

                    <p className="font-mono text-xs font-bold uppercase tracking-wider text-ink/85">
                        B.Tech · Computer Science &amp; Applied AI
                    </p>

                    <div className="space-y-2 font-mono text-xs text-ink/90">
                        <div className="flex items-center gap-2 p-2 bg-[#F4F0E4] border-[2px] border-ink">
                            <Code2 size={14} className="text-electric flex-shrink-0" />
                            <span className="font-bold">Gen-AI, Automation &amp; Full-Stack</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-[#F4F0E4] border-[2px] border-ink">
                            <MapPin size={14} className="text-[#FF2A6D] flex-shrink-0" />
                            <span className="font-bold">Hyderabad, IN · Remote Worldwide</span>
                        </div>
                    </div>

                    <div className="pt-2 border-t-[2px] border-dashed border-ink/20 flex flex-wrap gap-1.5 font-mono text-[9px] font-extrabold uppercase">
                        <span className="px-2 py-0.5 bg-ink text-acid">AI AGENTS</span>
                        <span className="px-2 py-0.5 bg-electric text-cream">PIPELINES</span>
                        <span className="px-2 py-0.5 bg-[#FF2A6D] text-cream">N8N AUTO</span>
                        <span className="px-2 py-0.5 bg-vivid text-ink">NEXT.JS</span>
                    </div>
                </div>
            ),
        },
        {
            id: "02",
            tabLabel: "[02] Skill XP",
            headerBg: "bg-electric text-cream",
            badgeText: "TELEMETRY // 02",
            statusText: "LIVE METRICS",
            content: (
                <div className="space-y-2.5">
                    <div className="font-mono text-[10px] font-extrabold uppercase tracking-widest text-ink/65 border-b-[2px] border-ink/15 pb-1.5">
                        CORE CAPABILITY METERS
                    </div>
                    {[
                        { name: "GenAI & Prompt Gates", pct: 94, color: "bg-acid" },
                        { name: "n8n & Webhook Automation", pct: 92, color: "bg-electric" },
                        { name: "Next.js / React UI Craft", pct: 90, color: "bg-[#FF2A6D]" },
                        { name: "Python & API Pipelines", pct: 88, color: "bg-vivid" },
                    ].map((skill) => (
                        <div key={skill.name} className="space-y-1">
                            <div className="flex justify-between font-mono text-[11px] font-extrabold uppercase text-ink">
                                <span>{skill.name}</span>
                                <span>{skill.pct}%</span>
                            </div>
                            <div className="w-full h-2.5 bg-ink/10 border-[1.5px] border-ink overflow-hidden">
                                <div
                                    className={`h-full ${skill.color} border-r-[1.5px] border-ink`}
                                    style={{ width: `${skill.pct}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            ),
        },
        {
            id: "03",
            tabLabel: "[03] Manifesto",
            headerBg: "bg-acid text-ink",
            badgeText: "MANIFESTO // 03",
            statusText: "SHIPPED > HYPE",
            content: (
                <div className="space-y-3">
                    <h3 className="font-heading font-bold text-xl uppercase tracking-tight text-ink leading-tight">
                        Turning AI Models Into{" "}
                        <span className="bg-[#FFD60A] px-1.5 border border-ink">
                            Working Products.
                        </span>
                    </h3>
                    <p className="font-mono text-xs text-ink/85 leading-relaxed">
                        Instead of isolated demos, I wire end-to-end systems connecting{" "}
                        <strong>Google Gemini &amp; Claude</strong> with{" "}
                        <strong>n8n webhooks, Twilio APIs, Python, and Next.js</strong> that real users can test immediately.
                    </p>
                    <div className="pt-2.5 border-t-[2px] border-ink/15 flex flex-wrap gap-2">
                        <a
                            href="https://github.com/nandu-reddy-kalluri"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-ink text-acid border-[2px] border-ink font-mono text-[10px] font-extrabold uppercase inline-flex items-center gap-1"
                        >
                            <Github size={12} /> GitHub <ArrowUpRight size={11} />
                        </a>
                        <a
                            href="mailto:nandureddy817.kalluri@gmail.com"
                            className="px-3 py-1.5 bg-electric text-cream border-[2px] border-ink font-mono text-[10px] font-extrabold uppercase inline-flex items-center gap-1"
                        >
                            <Mail size={12} /> Email
                        </a>
                        <a
                            href="tel:6309718153"
                            className="px-3 py-1.5 bg-[#FF2A6D] text-cream border-[2px] border-ink font-mono text-[10px] font-extrabold uppercase inline-flex items-center gap-1"
                        >
                            <Phone size={12} /> Call
                        </a>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-10 lg:mb-24 reveal-up">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 lg:mb-10 gap-3">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFD60A] text-ink border-[2px] border-ink shadow-[3px_3px_0px_#1A1A1A] font-mono text-[10px] font-extrabold uppercase tracking-[0.22em] mb-2.5">
                        <Sparkles size={12} /> DOSSIER // 01 · ENGINEER IDENTITY
                    </div>
                    <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-6xl uppercase tracking-tight text-ink leading-[0.95]">
                        About &amp; Builder DNA
                    </h2>
                </div>
                <p className="hidden lg:block font-mono text-xs sm:text-sm text-ink/75 max-w-md leading-relaxed">
                    Interactive identity passbook and tactile sticker board — tap tabs or shuffle badges to inspect background specs.
                </p>
            </div>

            {/* ─── MOBILE ONLY (< lg): Compact 3-Card Tinder Swipe Stack ─── */}
            <div className="lg:hidden">
                <MobileSwipeStack
                    slides={mobileAboutSlides}
                    instructionLabel="SWIPE DOSSIER [01–03] ↔"
                />
            </div>

            {/* ─── DESKTOP ONLY (lg+): Full 12-Column Passbook & Sticker Manifesto (Unchanged) ─── */}
            <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-stretch">
                {/* LEFT COLUMN (5 cols): Tactile Collector Passbook */}
                <div className="lg:col-span-5 flex flex-col">
                    <div
                        className="flex-1 bg-[#FFD60A] text-ink border-[3px] border-ink shadow-[6px_6px_0px_#1A1A1A] p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden"
                        style={{
                            backgroundImage:
                                "repeating-linear-gradient(90deg, transparent, transparent 22px, rgba(26,26,26,0.06) 22px, rgba(26,26,26,0.06) 24px)",
                        }}
                    >
                        <div>
                            <div className="flex items-center justify-between gap-2 mb-4">
                                <span className="font-mono text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 bg-ink text-acid border-[2px] border-ink">
                                    PASS // KNK-2025-IN
                                </span>
                                <div className="w-12 h-3 rounded-full bg-cream border-[2px] border-ink shadow-inner" />
                                <span className="font-mono text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 bg-acid text-ink border-[2px] border-ink">
                                    VERIFIED
                                </span>
                            </div>

                            {/* Interactive 3-Mode Passbook Switcher */}
                            <div className="grid grid-cols-3 gap-1.5 bg-ink p-1.5 border-[2px] border-ink mb-4">
                                {[
                                    { id: "academic" as PassTab, label: "01. CAMPUS" },
                                    { id: "dna" as PassTab, label: "02. SKILL XP" },
                                    { id: "metrics" as PassTab, label: "03. SPECS" },
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => setActivePassTab(tab.id)}
                                        className={`py-2 px-2 font-mono text-[10px] font-extrabold uppercase tracking-wider transition-all ${
                                            activePassTab === tab.id
                                                ? "bg-acid text-ink shadow-[2px_2px_0px_#FFFDF5]"
                                                : "bg-transparent text-cream/75 hover:text-cream"
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* Inner Cream Spec Sheet */}
                            <div className="bg-cream text-ink border-[3px] border-ink p-4 sm:p-5 shadow-[4px_4px_0px_#1A1A1A] min-h-[260px] flex flex-col justify-between">
                                <AnimatePresence mode="wait">
                                    {activePassTab === "academic" && (
                                        <motion.div
                                            key="academic"
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.18 }}
                                            className="space-y-4"
                                        >
                                            <div className="flex items-start justify-between gap-2 border-b-[2px] border-ink/15 pb-3">
                                                <div>
                                                    <div className="flex items-center gap-1.5 font-mono text-[10px] font-extrabold uppercase tracking-widest text-electric mb-1">
                                                        <GraduationCap size={14} /> EDUCATION &amp; LAB
                                                    </div>
                                                    <h3 className="font-heading font-bold text-2xl sm:text-3xl uppercase tracking-tight text-ink">
                                                        Aurora × NIAT
                                                    </h3>
                                                </div>
                                                <span className="px-2 py-1 bg-acid text-ink border-[2px] border-ink font-mono text-[10px] font-extrabold uppercase">
                                                    2025–NOW
                                                </span>
                                            </div>

                                            <p className="font-mono text-xs font-bold uppercase tracking-wider text-ink/80">
                                                Bachelor of Technology (B.Tech) · Computer Science &amp; Applied AI
                                            </p>

                                            <div className="space-y-2.5 pt-1 font-mono text-xs text-ink/90">
                                                <div className="flex items-center gap-2.5 p-2 bg-[#F4F0E4] border-[2px] border-ink">
                                                    <Code2 size={15} className="text-electric flex-shrink-0" />
                                                    <span className="font-bold">Generative AI, Automation &amp; Full-Stack</span>
                                                </div>
                                                <div className="flex items-center gap-2.5 p-2 bg-[#F4F0E4] border-[2px] border-ink">
                                                    <MapPin size={15} className="text-[#FF2A6D] flex-shrink-0" />
                                                    <span className="font-bold">Hyderabad, India · Remote Worldwide</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {activePassTab === "dna" && (
                                        <motion.div
                                            key="dna"
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.18 }}
                                            className="space-y-3"
                                        >
                                            <div className="font-mono text-[10px] font-extrabold uppercase tracking-widest text-ink/60 border-b-[2px] border-ink/15 pb-2">
                                                LIVE CAPABILITY TELEMETRY
                                            </div>
                                            {[
                                                { name: "GenAI & Prompt Gates", pct: 94, color: "bg-acid" },
                                                { name: "n8n & Webhook Automation", pct: 92, color: "bg-electric" },
                                                { name: "Next.js / React UI Craft", pct: 90, color: "bg-[#FF2A6D]" },
                                                { name: "Python & API Pipelines", pct: 88, color: "bg-vivid" },
                                            ].map((skill) => (
                                                <div key={skill.name} className="space-y-1">
                                                    <div className="flex justify-between font-mono text-[11px] font-extrabold uppercase">
                                                        <span>{skill.name}</span>
                                                        <span>{skill.pct}%</span>
                                                    </div>
                                                    <div className="w-full h-3 bg-ink/10 border-[2px] border-ink overflow-hidden">
                                                        <div
                                                            className={`h-full ${skill.color} border-r-[2px] border-ink transition-all duration-500`}
                                                            style={{ width: `${skill.pct}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}

                                    {activePassTab === "metrics" && (
                                        <motion.div
                                            key="metrics"
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.18 }}
                                            className="space-y-3"
                                        >
                                            <div className="font-mono text-[10px] font-extrabold uppercase tracking-widest text-ink/60 border-b-[2px] border-ink/15 pb-2">
                                                BUILDER QUICK TELEMETRY
                                            </div>
                                            <div className="grid grid-cols-2 gap-2.5 font-mono">
                                                <div className="p-2.5 bg-acid text-ink border-[2px] border-ink">
                                                    <div className="text-[10px] font-bold uppercase opacity-75">SHIPPED APPS</div>
                                                    <div className="font-heading font-bold text-xl">04+ LIVE</div>
                                                </div>
                                                <div className="p-2.5 bg-electric text-cream border-[2px] border-ink">
                                                    <div className="text-[10px] font-bold uppercase opacity-80">PRIMARY LLMS</div>
                                                    <div className="font-heading font-bold text-xl">GEMINI / CLAUDE</div>
                                                </div>
                                                <div className="p-2.5 bg-[#FF2A6D] text-cream border-[2px] border-ink">
                                                    <div className="text-[10px] font-bold uppercase opacity-80">ORCHESTRATION</div>
                                                    <div className="font-heading font-bold text-xl">N8N + PYTHON</div>
                                                </div>
                                                <div className="p-2.5 bg-vivid text-ink border-[2px] border-ink">
                                                    <div className="text-[10px] font-bold uppercase opacity-80">AVAILABILITY</div>
                                                    <div className="font-heading font-bold text-xl">OPEN NOW</div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="mt-4 pt-3 border-t-[2px] border-dashed border-ink/25 flex items-center justify-between">
                                    <span className="font-mono text-[10px] font-extrabold uppercase tracking-widest text-ink/70">
                                        AUTH // K. NANDA KISHORE
                                    </span>
                                    <div
                                        className="w-24 h-4"
                                        style={{
                                            backgroundImage:
                                                "repeating-linear-gradient(90deg, #1A1A1A 0px, #1A1A1A 2px, transparent 2px, transparent 4px, #1A1A1A 4px, #1A1A1A 5px, transparent 5px, transparent 8px)",
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 pt-3 border-t-[2px] border-ink flex flex-wrap items-center justify-between gap-2">
                            <span className="font-mono text-[10px] font-extrabold uppercase tracking-widest text-ink">
                                CORE PILLARS:
                            </span>
                            <div className="flex flex-wrap gap-1.5 font-mono text-[10px] font-extrabold uppercase">
                                <span className="px-2 py-0.5 bg-ink text-acid border border-ink">AI AGENTS</span>
                                <span className="px-2 py-0.5 bg-electric text-cream border border-ink">PIPELINES</span>
                                <span className="px-2 py-0.5 bg-[#FF2A6D] text-cream border border-ink">AUTOMATION</span>
                                <span className="px-2 py-0.5 bg-ink text-cream border border-ink">FULL-STACK</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN (7 cols): Interactive Sticker Canvas + Reader Switch + Keycap Links */}
                <div className="lg:col-span-7 flex flex-col">
                    <div className="flex-1 bg-cream border-[3px] border-ink shadow-[6px_6px_0px_#1A1A1A] p-5 sm:p-7 md:p-8 flex flex-col justify-between relative overflow-hidden">
                        <div>
                            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b-[3px] border-ink">
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 bg-vivid border-[2px] border-ink" />
                                    <span className="font-mono text-xs font-extrabold uppercase tracking-widest text-ink">
                                        BUILDER MANIFESTO // 2026
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="inline-flex border-[2px] border-ink bg-[#F4F0E4] p-0.5">
                                        <button
                                            type="button"
                                            onClick={() => setStoryMode("story")}
                                            className={`px-2.5 py-1 font-mono text-[10px] font-extrabold uppercase transition-colors ${
                                                storyMode === "story" ? "bg-ink text-acid" : "text-ink/70 hover:text-ink"
                                            }`}
                                        >
                                            FULL BIO
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setStoryMode("tldr")}
                                            className={`px-2.5 py-1 font-mono text-[10px] font-extrabold uppercase transition-colors ${
                                                storyMode === "tldr" ? "bg-ink text-acid" : "text-ink/70 hover:text-ink"
                                            }`}
                                        >
                                            TL;DR SPECS
                                        </button>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={shuffleStickers}
                                        className="px-2.5 py-1.5 bg-acid text-ink border-[2px] border-ink shadow-[2px_2px_0px_#1A1A1A] hover:bg-[#FFD60A] active:translate-y-0.5 font-mono text-[10px] font-extrabold uppercase inline-flex items-center gap-1 transition-all"
                                        title="Shuffle tactile stickers"
                                    >
                                        <Shuffle size={12} /> SHUFFLE
                                    </button>
                                </div>
                            </div>

                            {/* Interactive Die-Cut Collectible Sticker Strip */}
                            <div className="mb-6">
                                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink/60 mb-2.5">
                                    TAP A COLLECTIBLE STICKER BADGE TO INSPECT:
                                </div>
                                <div className="flex flex-wrap gap-2.5 sm:gap-3">
                                    {stickers.map((s) => {
                                        const isSelected = activeSticker === s.id;
                                        return (
                                            <motion.button
                                                key={s.id}
                                                type="button"
                                                layout
                                                whileHover={{ scale: 1.05, rotate: 0 }}
                                                whileTap={{ scale: 0.96 }}
                                                onClick={() => setActiveSticker(s.id)}
                                                style={{ rotate: `${s.rotate}deg` }}
                                                className={`${s.bg} px-3 py-2 border-[2.5px] border-ink shadow-[3px_3px_0px_#1A1A1A] text-left transition-shadow ${
                                                    isSelected ? "ring-2 ring-ink ring-offset-2 ring-offset-cream" : ""
                                                }`}
                                            >
                                                <div className="font-heading font-bold text-xs sm:text-sm uppercase tracking-tight leading-none">
                                                    {s.label}
                                                </div>
                                                <div className="font-mono text-[9px] font-extrabold uppercase tracking-wider opacity-85 mt-1">
                                                    {s.sub}
                                                </div>
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Narrative Body OR TL;DR Bullet Matrix */}
                            <AnimatePresence mode="wait">
                                {storyMode === "story" ? (
                                    <motion.div
                                        key="story"
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -6 }}
                                        transition={{ duration: 0.18 }}
                                    >
                                        <h3 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-ink mb-4 leading-[1.05]">
                                            Turning Complex AI Models Into{" "}
                                            <span className="bg-acid px-2 border-[2px] border-ink inline-block mt-1">
                                                Tactile Working Products.
                                            </span>
                                        </h3>
                                        <div className="space-y-3 font-mono text-xs sm:text-sm text-ink/85 leading-relaxed">
                                            <p>
                                                I am a B.Tech engineer at <strong>Aurora × NIAT</strong> building at the intersection
                                                of <strong>Generative AI, workflow automation, and high-craft full-stack web software</strong>.
                                            </p>
                                            <p>
                                                Instead of stopping at isolated notebook demos, I wire end-to-end systems — connecting{" "}
                                                <strong>Google Gemini &amp; Claude</strong> with <strong>n8n webhooks, Twilio APIs, Python backends, and Next.js interfaces</strong>{" "}
                                                that real people can click, test, and use immediately.
                                            </p>
                                            <p>
                                                Whether it is an AI legal assistant on Streamlit, a conversational WhatsApp commerce bot,
                                                or a full-stack venue platform like WeArrange, my rule is simple:{" "}
                                                <span className="underline decoration-[2px] decoration-ink font-bold">
                                                    ship verifiable builds with clean UX and resilient pipelines.
                                                </span>
                                            </p>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="tldr"
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -6 }}
                                        transition={{ duration: 0.18 }}
                                        className="grid sm:grid-cols-2 gap-3"
                                    >
                                        {[
                                            {
                                                tag: "01 // AI SYSTEMS",
                                                title: "LLM Agents & RAG",
                                                desc: "Structured prompt pipelines, schema validation, and domain assistants using Gemini & Claude.",
                                                color: "bg-acid text-ink",
                                            },
                                            {
                                                tag: "02 // AUTOMATION",
                                                title: "n8n & Webhook Routing",
                                                desc: "Event-driven multi-step workflows connecting WhatsApp/Twilio, REST APIs, and databases.",
                                                color: "bg-electric text-cream",
                                            },
                                            {
                                                tag: "03 // FRONTEND CRAFT",
                                                title: "Next.js & Tactile UI",
                                                desc: "Responsive, neo-brutalist & motion-rich web interfaces deployed on Vercel and Streamlit.",
                                                color: "bg-[#FF2A6D] text-cream",
                                            },
                                            {
                                                tag: "04 // MINDSET",
                                                title: "Verifiable Execution",
                                                desc: "Public repositories, live interactive deployments, and clear architectural documentation.",
                                                color: "bg-[#FFD60A] text-ink",
                                            },
                                        ].map((item) => (
                                            <div
                                                key={item.tag}
                                                className="p-3.5 bg-[#F4F0E4] border-[2.5px] border-ink shadow-[3px_3px_0px_#1A1A1A]"
                                            >
                                                <span
                                                    className={`inline-block px-2 py-0.5 ${item.color} border border-ink font-mono text-[9px] font-extrabold uppercase mb-1.5`}
                                                >
                                                    {item.tag}
                                                </span>
                                                <h4 className="font-heading font-bold text-base uppercase text-ink">
                                                    {item.title}
                                                </h4>
                                                <p className="font-mono text-xs text-ink/80 mt-1 leading-relaxed">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Bottom Tactile Mechanical Keycap Contact Bar */}
                        <div className="mt-6 pt-5 border-t-[3px] border-ink flex flex-wrap gap-2.5 sm:gap-3 items-center">
                            <a
                                href="https://github.com/nandu-reddy-kalluri"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3.5 py-2 bg-ink text-cream hover:bg-acid hover:text-ink border-[2.5px] border-ink shadow-[3px_3px_0px_#1A1A1A] active:translate-y-0.5 font-mono text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-2 transition-colors"
                            >
                                <Github size={14} className="flex-shrink-0" />
                                <span>GitHub</span>
                                <ArrowUpRight size={13} />
                            </a>
                            <a
                                href="mailto:nandureddy817.kalluri@gmail.com"
                                className="px-3.5 py-2 bg-electric text-cream hover:bg-acid hover:text-ink border-[2.5px] border-ink shadow-[3px_3px_0px_#1A1A1A] active:translate-y-0.5 font-mono text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-2 transition-colors max-w-full"
                            >
                                <Mail size={14} className="flex-shrink-0" />
                                <span className="truncate max-w-[200px] sm:max-w-none">
                                    nandureddy817.kalluri@gmail.com
                                </span>
                            </a>
                            <a
                                href="tel:6309718153"
                                className="px-3.5 py-2 bg-[#FF2A6D] text-cream hover:bg-[#FFD60A] hover:text-ink border-[2.5px] border-ink shadow-[3px_3px_0px_#1A1A1A] active:translate-y-0.5 font-mono text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-2 transition-colors"
                            >
                                <Phone size={14} className="flex-shrink-0" />
                                <span>+91 6309718153</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
