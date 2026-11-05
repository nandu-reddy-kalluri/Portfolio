"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { ArrowUpRight, Sparkles, Terminal, Cpu, Layers, CheckCircle2, Mail, Github } from "lucide-react";
import Link from "next/link";

// Defer heavy canvas initialization to keep LCP instant
const InteractiveConstellation = dynamic(
    () => import("@/components/ui/InteractiveConstellation"),
    { ssr: false }
);

type DossierTab = "identity" | "telemetry" | "stack";

export function HeroSection() {
    const [activeTab, setActiveTab] = useState<DossierTab>("identity");

    return (
        <section className="relative min-h-0 md:min-h-[90vh] flex items-center overflow-hidden py-8 sm:py-14 md:py-20 border-b-[3px] border-ink bg-cream">
            {/* Subtle Architectural Blueprint Grid */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.35]"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, rgba(26,26,26,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(26,26,26,0.06) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            {/* Interactive Neural Constellation Background (Desktop) */}
            <InteractiveConstellation density={28} className="z-0" />

            {/* Decorative Ambient Color Glows */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
                <div className="absolute -top-24 -right-24 w-[420px] h-[420px] bg-vivid/15 rounded-full blur-3xl" />
                <div className="absolute bottom-10 -left-20 w-[380px] h-[380px] bg-acid/25 rounded-full blur-3xl" />
                <div className="absolute top-1/3 left-1/2 w-[300px] h-[300px] bg-electric/10 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 w-full relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

                    {/* ═══════════════════════════════════════════════════════════
                        LEFT COLUMN (7 COLS): MONUMENTAL EDITORIAL TYPOGRAPHY
                       ═══════════════════════════════════════════════════════════ */}
                    <div className="lg:col-span-7 w-full">
                        {/* Top Tactile Status Pill Bar */}
                        <div className="flex flex-wrap items-center gap-2 mb-4 sm:mb-6">
                            <span className="inline-flex items-center gap-2 bg-ink text-acid border-[2px] border-ink px-3 py-1 font-mono text-[10px] sm:text-xs font-extrabold uppercase tracking-widest shadow-neo-sm">
                                <span className="w-2 h-2 rounded-full bg-acid animate-pulse" />
                                AVAILABLE FOR ROLES &amp; BUILDS
                            </span>
                            <span className="inline-flex items-center gap-1.5 bg-vivid text-ink border-[2px] border-ink px-2.5 py-1 font-mono text-[10px] sm:text-xs font-extrabold uppercase tracking-wider shadow-neo-sm">
                                AURORA × NIAT · B.TECH
                            </span>
                        </div>

                        {/* Primary Headline (LCP Target - Instant Paint) */}
                        <div className="relative inline-block w-full">
                            <h1 className="text-[2.75rem] sm:text-6xl md:text-[5.5rem] xl:text-[6.8rem] font-heading font-extrabold text-ink leading-[0.88] tracking-tighter uppercase cursor-default break-words">
                                K. Nanda
                                <br />
                                <span className="relative inline-block mt-1">
                                    Kishore
                                    {/* Tactile Vivid Orange & Acid Corner Stamp */}
                                    <span className="inline-flex items-center justify-center align-top ml-2 sm:ml-3 w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-acid border-[2px] sm:border-[3px] border-ink shadow-neo-sm rotate-6 hover:rotate-180 transition-transform duration-500">
                                        <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-ink" />
                                    </span>
                                </span>
                            </h1>
                        </div>

                        {/* Animated SVG Vector Stroke Accent + Role Title (Two26 Studio Inspired) */}
                        <div className="mt-4 sm:mt-5 relative">
                            <div className="inline-flex flex-wrap items-center gap-2 bg-electric text-cream border-[2px] sm:border-[3px] border-ink px-3.5 py-1.5 sm:px-4 sm:py-2 shadow-neo-sm">
                                <Terminal size={18} className="text-acid flex-shrink-0" />
                                <span className="font-heading font-bold text-base sm:text-xl md:text-2xl uppercase tracking-tight">
                                    Generative AI &amp; Software Engineer
                                </span>
                            </div>

                            {/* Decorative Vector Curve Line */}
                            <svg
                                viewBox="0 0 360 18"
                                fill="none"
                                className="w-56 sm:w-80 h-4 mt-2 overflow-visible"
                                aria-hidden="true"
                            >
                                <path
                                    d="M2 12 C 90 2, 180 20, 356 6"
                                    stroke="#FF6600"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M2 12 C 90 2, 180 20, 356 6"
                                    stroke="#1A1A1A"
                                    strokeWidth="1.5"
                                    strokeDasharray="4 4"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>

                        {/* Editorial Bio Narrative */}
                        <p className="font-mono text-xs sm:text-sm md:text-base text-ink/90 mt-3 sm:mt-4 max-w-xl leading-relaxed font-medium">
                            Engineering practical <strong className="bg-acid px-1 border border-ink text-ink">Generative AI systems</strong>, multi-stage <strong className="bg-[#FFD60A] px-1 border border-ink text-ink">n8n automation pipelines</strong>, and high-craft full-stack web products tested in real code.
                        </p>

                        {/* Multi-Color Collectible Sticker Pills (uimaven.art Inspired) */}
                        <div className="mt-5 flex flex-wrap gap-2 max-w-xl">
                            <span className="inline-flex items-center gap-1.5 bg-[#FFD60A] border-[2px] border-ink px-3 py-1 font-mono text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-ink shadow-[2px_2px_0px_0px_#1A1A1A] hover:-translate-y-0.5 transition-transform">
                                <span className="w-2 h-2 rounded-full bg-ink" />
                                Gemini · Claude · Agents
                            </span>
                            <span className="inline-flex items-center gap-1.5 bg-[#00F5D4] border-[2px] border-ink px-3 py-1 font-mono text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-ink shadow-[2px_2px_0px_0px_#1A1A1A] hover:-translate-y-0.5 transition-transform">
                                <span className="w-2 h-2 rounded-full bg-ink" />
                                n8n · Twilio · Webhooks
                            </span>
                            <span className="inline-flex items-center gap-1.5 bg-[#FF7EB6] border-[2px] border-ink px-3 py-1 font-mono text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-ink shadow-[2px_2px_0px_0px_#1A1A1A] hover:-translate-y-0.5 transition-transform">
                                <span className="w-2 h-2 rounded-full bg-ink" />
                                Next.js 14 · Python · React
                            </span>
                        </div>

                        {/* Mobile-Only Compact Telemetry Strip (replaces tall stacked right column on < lg) */}
                        <div className="mt-5 grid grid-cols-3 gap-2 lg:hidden">
                            <div className="bg-acid border-[2px] border-ink p-2 text-center shadow-[2px_2px_0px_#1A1A1A]">
                                <div className="font-heading font-extrabold text-xl text-ink leading-none">06</div>
                                <div className="font-mono text-[9px] font-extrabold uppercase text-ink/85 mt-0.5">Live Builds</div>
                            </div>
                            <div className="bg-[#FFD60A] border-[2px] border-ink p-2 text-center shadow-[2px_2px_0px_#1A1A1A]">
                                <div className="font-heading font-extrabold text-xl text-ink leading-none">22</div>
                                <div className="font-mono text-[9px] font-extrabold uppercase text-ink/85 mt-0.5">Core Tools</div>
                            </div>
                            <div className="bg-electric text-cream border-[2px] border-ink p-2 text-center shadow-[2px_2px_0px_#1A1A1A]">
                                <div className="font-heading font-extrabold text-xl leading-none">04</div>
                                <div className="font-mono text-[9px] font-extrabold uppercase opacity-90 mt-0.5">AI Pillars</div>
                            </div>
                        </div>

                        {/* Primary CTA Action Bar */}
                        <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                            <Link
                                href="/work"
                                className="neo-card bg-acid text-ink px-6 py-3.5 sm:py-4 font-heading font-extrabold text-center uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-vivid hover:text-ink transition-colors group min-h-[46px]"
                            >
                                <span>Explore Selected Work (06)</span>
                                <ArrowUpRight size={17} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </Link>

                            <Link
                                href="/contact"
                                className="neo-card bg-ink text-cream px-6 py-3.5 sm:py-4 font-heading font-extrabold text-center uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-electric hover:text-cream transition-colors group min-h-[46px]"
                            >
                                <span>Start A Collaboration</span>
                                <ArrowUpRight size={17} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* ═══════════════════════════════════════════════════════════
                        RIGHT COLUMN (5 COLS): INTERACTIVE TABBED ENGINEER DOSSIER (Desktop lg+ Only)
                       ═══════════════════════════════════════════════════════════ */}
                    <div className="hidden lg:block lg:col-span-5 w-full">
                        <div className="relative mx-auto max-w-md lg:max-w-none">

                            {/* Floating Collectible Corner Stamp */}
                            <div className="hidden sm:flex absolute -top-6 -right-4 z-30 w-20 h-20 rounded-full bg-vivid border-[3px] border-ink shadow-neo items-center justify-center rotate-12 hover:rotate-45 transition-transform select-none">
                                <div className="text-center font-mono text-[8px] font-extrabold uppercase leading-tight text-ink">
                                    <div>SHIPPED</div>
                                    <div className="text-xs font-heading">100%</div>
                                    <div>IN CODE</div>
                                </div>
                            </div>

                            {/* Interactive File Folder Tabs */}
                            <div className="flex items-end pr-4 -mb-[3px] relative z-10">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("identity")}
                                    className={`px-3.5 sm:px-4 py-2 font-mono text-[10px] sm:text-xs font-extrabold uppercase tracking-wider border-[3px] border-ink rounded-t-xl transition-all ${
                                        activeTab === "identity"
                                            ? "bg-[#FFD60A] text-ink -translate-y-1 shadow-neo-sm z-20"
                                            : "bg-cream text-ink/70 hover:bg-acid/40"
                                    }`}
                                >
                                    01. ID Pass
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("telemetry")}
                                    className={`px-3.5 sm:px-4 py-2 -ml-[3px] font-mono text-[10px] sm:text-xs font-extrabold uppercase tracking-wider border-[3px] border-ink rounded-t-xl transition-all ${
                                        activeTab === "telemetry"
                                            ? "bg-electric text-cream -translate-y-1 shadow-neo-sm z-20"
                                            : "bg-cream text-ink/70 hover:bg-electric/20"
                                    }`}
                                >
                                    02. Pipelines
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("stack")}
                                    className={`px-3.5 sm:px-4 py-2 -ml-[3px] font-mono text-[10px] sm:text-xs font-extrabold uppercase tracking-wider border-[3px] border-ink rounded-t-xl transition-all ${
                                        activeTab === "stack"
                                            ? "bg-hotpink text-ink -translate-y-1 shadow-neo-sm z-20"
                                            : "bg-cream text-ink/70 hover:bg-hotpink/20"
                                    }`}
                                >
                                    03. Direct
                                </button>
                            </div>

                            {/* Outer Colored Folder Jacket */}
                            <div
                                className={`relative z-20 border-[3px] border-ink p-3 sm:p-4 shadow-[8px_8px_0px_0px_#1A1A1A] transition-colors duration-300 ${
                                    activeTab === "identity"
                                        ? "bg-[#FFD60A]"
                                        : activeTab === "telemetry"
                                        ? "bg-electric"
                                        : "bg-vivid"
                                }`}
                            >
                                {/* Inner High-Contrast Spec Sheet (17.5:1 Contrast Guarantee) */}
                                <div className="bg-cream text-ink border-[3px] border-ink p-4 sm:p-5 relative">
                                    {/* Top Dossier Serial Header */}
                                    <div className="flex items-center justify-between pb-3 mb-4 border-b-[2px] border-ink/15">
                                        <span className="font-mono text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 bg-ink text-acid">
                                            DOSSIER // KNK-2026
                                        </span>
                                        <span className="font-mono text-[10px] font-bold uppercase text-ink/70">
                                            HYDERABAD, IN (IST)
                                        </span>
                                    </div>

                                    {activeTab === "identity" && (
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3.5 sm:gap-4">
                                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-hotpink border-[2px] border-ink shadow-neo-sm overflow-hidden flex-shrink-0">
                                                    <img
                                                        src="/headshot.png"
                                                        alt="K. Nanda Kishore"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <div className="font-mono text-[10px] font-extrabold uppercase text-electric tracking-wider">
                                                        VERIFIED BUILDER
                                                    </div>
                                                    <h2 className="font-heading font-extrabold text-lg sm:text-xl uppercase tracking-tight text-ink">
                                                        K. Nanda Kishore
                                                    </h2>
                                                    <p className="font-mono text-xs text-ink/80 mt-0.5">
                                                        B.Tech @ Aurora × NIAT (2025–Present)
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Metrics Grid */}
                                            <div className="grid grid-cols-3 gap-2 pt-1">
                                                <div className="bg-acid/35 border-[2px] border-ink p-2.5 text-center">
                                                    <div className="font-heading font-extrabold text-xl sm:text-2xl text-ink">06</div>
                                                    <div className="font-mono text-[9px] font-extrabold uppercase text-ink/80">AI &amp; Web Builds</div>
                                                </div>
                                                <div className="bg-[#00F5D4]/30 border-[2px] border-ink p-2.5 text-center">
                                                    <div className="font-heading font-extrabold text-xl sm:text-2xl text-ink">22</div>
                                                    <div className="font-mono text-[9px] font-extrabold uppercase text-ink/80">Core Tools</div>
                                                </div>
                                                <div className="bg-[#FF7EB6]/35 border-[2px] border-ink p-2.5 text-center">
                                                    <div className="font-heading font-extrabold text-xl sm:text-2xl text-ink">04</div>
                                                    <div className="font-mono text-[9px] font-extrabold uppercase text-ink/80">Tech Pillars</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === "telemetry" && (
                                        <div className="space-y-2.5">
                                            <div className="font-mono text-xs font-extrabold uppercase text-ink mb-2">
                                                Active Production &amp; Pipeline Builds:
                                            </div>
                                            {[
                                                { name: "Legal AI Agent", tag: "LIVE · STREAMLIT", bg: "bg-acid text-ink" },
                                                { name: "Cup Cozy Web", tag: "LIVE · VERCEL", bg: "bg-[#00F5D4] text-ink" },
                                                { name: "WeArrange Platform", tag: "BUILDING · NEXT.JS", bg: "bg-[#FFD60A] text-ink" },
                                                { name: "WhatsApp Gemini Bot", tag: "AUTOMATION · N8N", bg: "bg-[#FF7EB6] text-ink" },
                                            ].map((p) => (
                                                <div
                                                    key={p.name}
                                                    className="flex items-center justify-between p-2 bg-ink/[0.04] border-[2px] border-ink"
                                                >
                                                    <span className="font-heading font-bold text-xs sm:text-sm uppercase text-ink flex items-center gap-1.5">
                                                        <CheckCircle2 size={14} className="text-electric flex-shrink-0" />
                                                        {p.name}
                                                    </span>
                                                    <span className={`font-mono text-[9px] font-extrabold px-2 py-0.5 border border-ink ${p.bg}`}>
                                                        {p.tag}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {activeTab === "stack" && (
                                        <div className="space-y-3">
                                            <p className="font-mono text-xs text-ink/85 leading-relaxed">
                                                Direct engineering communication lines for internships, AI product builds, and automation workflows:
                                            </p>
                                            <div className="space-y-2">
                                                <a
                                                    href="mailto:nandureddy817.kalluri@gmail.com"
                                                    className="w-full flex items-center justify-between p-2.5 bg-acid border-[2px] border-ink font-mono text-xs font-extrabold text-ink hover:bg-ink hover:text-acid transition-colors"
                                                >
                                                    <span className="flex items-center gap-2 truncate">
                                                        <Mail size={14} className="flex-shrink-0" />
                                                        <span className="truncate">nandureddy817.kalluri@gmail.com</span>
                                                    </span>
                                                    <ArrowUpRight size={14} className="flex-shrink-0" />
                                                </a>
                                                <a
                                                    href="https://github.com/nandu-reddy-kalluri"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-full flex items-center justify-between p-2.5 bg-ink text-cream border-[2px] border-ink font-mono text-xs font-extrabold hover:bg-electric transition-colors"
                                                >
                                                    <span className="flex items-center gap-2">
                                                        <Github size={14} />
                                                        github.com/nandu-reddy-kalluri
                                                    </span>
                                                    <ArrowUpRight size={14} />
                                                </a>
                                            </div>
                                        </div>
                                    )}

                                    {/* Bottom Barcode / Stamp Footer */}
                                    <div className="mt-4 pt-3 border-t-[2px] border-dashed border-ink/20 flex items-center justify-between font-mono text-[10px] font-bold text-ink/60">
                                        <span>CLICK TABS ABOVE TO INSPECT</span>
                                        <span className="text-ink font-extrabold">{"/// PASS_OK"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
