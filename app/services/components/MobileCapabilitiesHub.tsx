"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Bot,
    Cpu,
    Zap,
    Sparkles,
    Database,
    Workflow,
    Layers,
    ArrowUpRight,
    CheckCircle2,
    Check,
    Clock,
    PhoneCall,
    FolderGit2,
} from "lucide-react";

type ServiceTab = "packages" | "process" | "standards";

export function MobileCapabilitiesHub() {
    const [activeTab, setActiveTab] = useState<ServiceTab>("packages");
    const [activePackage, setActivePackage] = useState<"ai" | "engineering">("ai");

    const buzz = (ms = 12) => {
        try {
            if (typeof navigator !== "undefined" && "vibrate" in navigator) {
                navigator.vibrate(ms);
            }
        } catch {}
    };

    const handleTabChange = (tab: ServiceTab) => {
        buzz();
        setActiveTab(tab);
    };

    const aiCapabilities = [
        { icon: <Bot size={15} />, label: "Conversational AI", desc: "Structured prompt systems & interactive chat agents" },
        { icon: <Zap size={15} />, label: "Multi-Modal Reasoning", desc: "Google Gemini & Claude vision / text integrations" },
        { icon: <Sparkles size={15} />, label: "Prompt Engineering", desc: "Structured output validation & quality gates" },
        { icon: <Database size={15} />, label: "Data Pipelines", desc: "Automated ingestion, parsing & dataset normalization" },
    ];

    const engineeringCapabilities = [
        { icon: <Workflow size={15} />, label: "n8n Automation", desc: "Visual orchestration, webhook triggers & node pipelines" },
        { icon: <Cpu size={15} />, label: "API Integrations", desc: "Twilio WhatsApp, REST services, event-driven webhooks" },
        { icon: <Layers size={15} />, label: "Full-Stack Web", desc: "React, Next.js, TypeScript & Tailwind CSS builds" },
        { icon: <Zap size={15} />, label: "Rapid Prototyping", desc: "Streamlit applications & fast iterative MVP development" },
    ];

    const steps = [
        { num: "01", title: "Scope & Framing", desc: "Define data models, API interfaces & clear validation gates.", bg: "bg-acid text-ink" },
        { num: "02", title: "Model & Pipeline", desc: "Structured prompts, tool calling & automated n8n graphs.", bg: "bg-electric text-cream" },
        { num: "03", title: "Frontend & Logic", desc: "Next.js App Router, reactive state & high-contrast UI/UX.", bg: "bg-[#FF2A6D] text-cream" },
        { num: "04", title: "Deploy & Refine", desc: "Production release, public GitHub repos & live testing.", bg: "bg-[#FFD60A] text-ink" },
    ];

    const standards = [
        { id: "01", area: "Architecture", standard: "Generic boilerplate", mine: "Purpose-built prompt schemas & validation gates", color: "bg-acid text-ink" },
        { id: "02", area: "AI Integration", standard: "Unvalidated wrappers", mine: "Strict JSON validation & graceful fallback handling", color: "bg-electric text-cream" },
        { id: "03", area: "Automation", standard: "Isolated scripts", mine: "End-to-end n8n orchestrations & event webhooks", color: "bg-[#FF2A6D] text-cream" },
        { id: "04", area: "Code Quality", standard: "Opaque black-box", mine: "Clean modular code & public GitHub case studies", color: "bg-[#FFD60A] text-ink" },
    ];

    return (
        <div className="lg:hidden max-w-7xl mx-auto px-4 mb-10">
            {/* ─── 1. SEGMENTED PILL SWITCHER (Organized 1-Screen Hub) ─── */}
            <div className="flex items-center gap-1.5 p-1 bg-ink border-[2.5px] border-ink rounded-xl mb-4 shadow-[3px_3px_0px_#1A1A1A]">
                <button
                    type="button"
                    onClick={() => handleTabChange("packages")}
                    className={`flex-1 py-2 font-mono text-[10px] font-extrabold uppercase tracking-wider rounded-lg transition-all ${
                        activeTab === "packages"
                            ? "bg-acid text-ink shadow-[2px_2px_0px_#FFFDF5]"
                            : "text-cream/80 hover:text-acid"
                    }`}
                >
                    [01] Domains
                </button>
                <button
                    type="button"
                    onClick={() => handleTabChange("process")}
                    className={`flex-1 py-2 font-mono text-[10px] font-extrabold uppercase tracking-wider rounded-lg transition-all ${
                        activeTab === "process"
                            ? "bg-[#FFD60A] text-ink shadow-[2px_2px_0px_#FFFDF5]"
                            : "text-cream/80 hover:text-[#FFD60A]"
                    }`}
                >
                    [02] Process
                </button>
                <button
                    type="button"
                    onClick={() => handleTabChange("standards")}
                    className={`flex-1 py-2 font-mono text-[10px] font-extrabold uppercase tracking-wider rounded-lg transition-all ${
                        activeTab === "standards"
                            ? "bg-[#00F5D4] text-ink shadow-[2px_2px_0px_#FFFDF5]"
                            : "text-cream/80 hover:text-[#00F5D4]"
                    }`}
                >
                    [03] Standards
                </button>
            </div>

            {/* ─── TAB 1: DOMAINS & PACKAGES ─── */}
            {activeTab === "packages" && (
                <div className="space-y-3">
                    {/* Sub-Switch for 2 Core Domains */}
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => {
                                buzz();
                                setActivePackage("ai");
                            }}
                            className={`flex-1 py-1.5 px-2 border-[2px] border-ink font-heading font-extrabold text-xs uppercase tracking-tight transition-all ${
                                activePackage === "ai"
                                    ? "bg-acid text-ink shadow-[2px_2px_0px_#1A1A1A] -translate-y-0.5"
                                    : "bg-cream text-ink/70"
                            }`}
                        >
                            ⚡ Gen-AI &amp; Agents
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                buzz();
                                setActivePackage("engineering");
                            }}
                            className={`flex-1 py-1.5 px-2 border-[2px] border-ink font-heading font-extrabold text-xs uppercase tracking-tight transition-all ${
                                activePackage === "engineering"
                                    ? "bg-electric text-cream shadow-[2px_2px_0px_#1A1A1A] -translate-y-0.5"
                                    : "bg-cream text-ink/70"
                            }`}
                        >
                            ⚙️ Automation &amp; Web
                        </button>
                    </div>

                    {/* Active Package Card */}
                    <div className="border-[3px] border-ink bg-cream p-4 shadow-[5px_5px_0px_#1A1A1A]">
                        <div className="flex items-center justify-between pb-2 mb-3 border-b-[2px] border-ink/15">
                            <div>
                                <span className="font-mono text-[9px] font-extrabold uppercase bg-ink text-acid px-1.5 py-0.5">
                                    {activePackage === "ai" ? "DOMAIN // 01" : "DOMAIN // 02"}
                                </span>
                                <h3 className="font-heading font-black text-xl text-ink uppercase mt-1">
                                    {activePackage === "ai"
                                        ? "Generative AI Systems"
                                        : "Automation & Full-Stack"}
                                </h3>
                            </div>
                            <span className="font-mono text-[9px] font-bold text-ink/70 bg-[#F4F0E4] px-2 py-1 border border-ink">
                                4 CORE CAPABILITIES
                            </span>
                        </div>

                        {/* 4 Capabilities Matrix */}
                        <div className="space-y-2 mb-4">
                            {(activePackage === "ai" ? aiCapabilities : engineeringCapabilities).map((c) => (
                                <div
                                    key={c.label}
                                    className="p-2.5 bg-[#F4F0E4] border-[2px] border-ink flex items-start gap-2.5 shadow-sm"
                                >
                                    <div
                                        className={`p-1.5 border border-ink flex-shrink-0 ${
                                            activePackage === "ai" ? "bg-acid text-ink" : "bg-[#FFD60A] text-ink"
                                        }`}
                                    >
                                        {c.icon}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="font-heading font-extrabold text-xs text-ink uppercase tracking-tight">
                                            {c.label}
                                        </div>
                                        <div className="font-mono text-[10px] text-ink/80 leading-snug">
                                            {c.desc}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Quick Action Links */}
                        <div className="flex gap-2">
                            <Link
                                href="/work"
                                className="flex-1 bg-ink text-acid border-[2px] border-ink py-2 text-center font-heading font-bold text-xs uppercase tracking-wider shadow-[2px_2px_0px_#FFFDF5] inline-flex items-center justify-center gap-1 active:translate-y-0.5"
                            >
                                <span>See Projects</span>
                                <ArrowUpRight size={13} />
                            </Link>
                            <Link
                                href="/contact"
                                className="flex-1 bg-acid text-ink border-[2px] border-ink py-2 text-center font-heading font-bold text-xs uppercase tracking-wider shadow-[2px_2px_0px_#1A1A1A] inline-flex items-center justify-center gap-1 active:translate-y-0.5"
                            >
                                <span>Start Build</span>
                                <ArrowUpRight size={13} />
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* ─── TAB 2: PROCESS TIMELINE (4 Steps in 1 Screen) ─── */}
            {activeTab === "process" && (
                <div className="border-[3px] border-ink bg-cream p-4 shadow-[5px_5px_0px_#1A1A1A]">
                    <div className="flex items-center justify-between pb-2 mb-3 border-b-[2px] border-ink/15">
                        <span className="font-mono text-[9px] font-extrabold uppercase bg-ink text-[#FFD60A] px-1.5 py-0.5">
                            WORKFLOW // 4-STEP LOOP
                        </span>
                        <span className="font-mono text-[9px] font-bold text-ink/70">
                            SPEC → SHIPPED
                        </span>
                    </div>

                    <div className="space-y-2 mb-4">
                        {steps.map((st) => (
                            <div
                                key={st.num}
                                className="p-2.5 bg-[#F4F0E4] border-[2px] border-ink flex items-start gap-2.5 shadow-sm"
                            >
                                <span className={`px-2 py-1 font-mono text-[11px] font-black border border-ink ${st.bg} flex-shrink-0`}>
                                    {st.num}
                                </span>
                                <div>
                                    <div className="font-heading font-extrabold text-xs text-ink uppercase tracking-tight">
                                        {st.title}
                                    </div>
                                    <div className="font-mono text-[10px] text-ink/80 leading-snug">
                                        {st.desc}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Link
                        href="/contact"
                        className="w-full bg-[#FFD60A] text-ink border-[2px] border-ink py-2.5 text-center font-heading font-bold text-xs uppercase tracking-wider shadow-[2px_2px_0px_#1A1A1A] flex items-center justify-center gap-1 active:translate-y-0.5"
                    >
                        <span>Collaborate on a Workflow →</span>
                    </Link>
                </div>
            )}

            {/* ─── TAB 3: ENGINEERING STANDARDS ─── */}
            {activeTab === "standards" && (
                <div className="border-[3px] border-ink bg-cream p-4 shadow-[5px_5px_0px_#1A1A1A]">
                    <div className="flex items-center justify-between pb-2 mb-3 border-b-[2px] border-ink/15">
                        <span className="font-mono text-[9px] font-extrabold uppercase bg-ink text-[#00F5D4] px-1.5 py-0.5">
                            STANDARDS // PROD GRADE
                        </span>
                        <span className="font-mono text-[9px] font-bold text-ink/70">
                            ZERO FLUFF
                        </span>
                    </div>

                    <div className="space-y-2 mb-4">
                        {standards.map((s) => (
                            <div key={s.id} className="p-2.5 bg-[#F4F0E4] border-[2px] border-ink shadow-sm">
                                <div className="flex items-center justify-between gap-1 mb-1">
                                    <span className="font-heading font-extrabold text-xs text-ink uppercase">
                                        {s.id} {"//"} {s.area}
                                    </span>
                                    <span className="font-mono text-[8.5px] text-ink/50 line-through">
                                        {s.standard}
                                    </span>
                                </div>
                                <div className="flex items-start gap-1.5 font-mono text-[10px] font-bold text-ink bg-cream p-1.5 border border-ink">
                                    <CheckCircle2 size={13} className="text-electric flex-shrink-0 mt-0.5" />
                                    <span>{s.mine}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Link
                        href="/work"
                        className="w-full bg-[#00F5D4] text-ink border-[2px] border-ink py-2.5 text-center font-heading font-bold text-xs uppercase tracking-wider shadow-[2px_2px_0px_#1A1A1A] flex items-center justify-center gap-1 active:translate-y-0.5"
                    >
                        <span>Inspect Receipts in Case Files →</span>
                    </Link>
                </div>
            )}
        </div>
    );
}
