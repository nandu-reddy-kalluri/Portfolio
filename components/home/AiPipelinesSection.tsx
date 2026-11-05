"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Database,
    Image as ImageIcon,
    Cpu,
    CheckCircle2,
    Sparkles,
    Play,
    Terminal,
    Activity,
    ArrowRight,
} from "lucide-react";
import MobileSwipeStack, { type SwipeCardSlide } from "@/components/ui/MobileSwipeStack";

interface StageSpec {
    code: string;
    name: string;
    role: string;
    latency: string;
    payload: string;
}

interface PipelinePreset {
    id: string;
    badge: string;
    title: string;
    accentBg: string;
    stages: StageSpec[];
}

const pipelinePresets: PipelinePreset[] = [
    {
        id: "whatsapp",
        badge: "PRESET 01 // CONVERSATIONAL COMMERCE",
        title: "WhatsApp × Gemini × n8n Bot",
        accentBg: "bg-acid text-ink",
        stages: [
            { code: "01", name: "Input", role: "Twilio Webhook", latency: "18ms", payload: `{ "from": "whatsapp:+9198***", "body": "Desk lamp under ₹2500" }` },
            { code: "02", name: "Data", role: "n8n Parser", latency: "12ms", payload: `{ "intent": "product_search", "budget_max": 2500, "currency": "INR" }` },
            { code: "03", name: "Process", role: "Catalog Lookup", latency: "34ms", payload: `{ "candidates_found": 4, "context_tokens": 612 }` },
            { code: "04", name: "AI Model", role: "Gemini 2.0 Flash", latency: "410ms", payload: `{ "top_pick": "Lumina Pro LED", "score": 0.96, "reason": "CRI>95" }` },
            { code: "05", name: "Validate", role: "JSON Schema Gate", latency: "9ms", payload: `{ "schema_valid": true, "price_in_budget": true }` },
            { code: "06", name: "Decision", role: "Route Node", latency: "6ms", payload: `{ "route": "SEND_CAROUSEL_REPLY", "fallback": false }` },
            { code: "07", name: "Output", role: "Twilio Dispatch", latency: "65ms", payload: `{ "status": "200_DELIVERED", "total_pipeline_ms": 554 }` },
        ],
    },
    {
        id: "legal",
        badge: "PRESET 02 // DOMAIN RAG ASSISTANT",
        title: "Legal AI Clause Analyzer",
        accentBg: "bg-[#FFD60A] text-ink",
        stages: [
            { code: "01", name: "Input", role: "Streamlit Query", latency: "22ms", payload: `{ "query": "Check indemnity clause liability cap in NDA" }` },
            { code: "02", name: "Data", role: "Clause Chunker", latency: "48ms", payload: `{ "chunks_extracted": 18, "target": "Section 9.2" }` },
            { code: "03", name: "Process", role: "Context Builder", latency: "39ms", payload: `{ "relevant_clauses": [9.1, 9.2], "act": "IN_CONTRACT" }` },
            { code: "04", name: "AI Model", role: "Legal Prompt Engine", latency: "520ms", payload: `{ "risk_level": "HIGH", "finding": "Uncapped damages in §9.2" }` },
            { code: "05", name: "Validate", role: "Citation Gate", latency: "14ms", payload: `{ "quote_verified": true, "schema": "LegalBriefV2" }` },
            { code: "06", name: "Decision", role: "Redline Branch", latency: "8ms", payload: `{ "action": "GENERATE_SAFE_REDLINE", "cap": "12M_FEES" }` },
            { code: "07", name: "Output", role: "Streamlit Brief", latency: "28ms", payload: `{ "ui_render": "COMPLETE", "total_pipeline_ms": 679 }` },
        ],
    },
    {
        id: "vision",
        badge: "PRESET 03 // COMPUTER VISION R&D",
        title: "AI Public Safety Monitor",
        accentBg: "bg-vivid text-ink",
        stages: [
            { code: "01", name: "Input", role: "Camera Feed", latency: "16ms", payload: `{ "cam_id": "SECTOR_04", "resolution": "1080p", "fps": 30 }` },
            { code: "02", name: "Data", role: "Frame Pre-Proc", latency: "19ms", payload: `{ "resize": "640x640", "motion_delta": 0.42 }` },
            { code: "03", name: "Process", role: "Temporal Window", latency: "24ms", payload: `{ "sliding_window_frames": 5, "zone": "GATE_2" }` },
            { code: "04", name: "AI Model", role: "Anomaly Detector", latency: "115ms", payload: `{ "event": "CROWD_SURGE", "confidence": 0.93 }` },
            { code: "05", name: "Validate", role: "Consensus Gate", latency: "11ms", payload: `{ "frames_confirmed": "4/5", "filter": "PASS" }` },
            { code: "06", name: "Decision", role: "Severity Router", latency: "7ms", payload: `{ "priority": "P1_IMMEDIATE", "notify": "WEBHOOK" }` },
            { code: "07", name: "Output", role: "Alert Dispatch", latency: "42ms", payload: `{ "incident_id": "INC-089", "status": "DISPATCHED" }` },
        ],
    },
];

const pipelineCategories = [
    {
        badge: "PILLAR // 01",
        title: "AI Data Pipelines",
        jacketBg: "bg-acid text-ink",
        icon: <Database size={20} className="text-ink" />,
        items: [
            "Data ingestion from structured & unstructured sources",
            "Dataset normalization, cleaning & chunk parsing",
            "Strict JSON response schemas & quality gates",
        ],
    },
    {
        badge: "PILLAR // 02",
        title: "AI Image Pipelines",
        jacketBg: "bg-electric text-cream",
        icon: <ImageIcon size={20} className="text-ink" />,
        items: [
            "Image & video frame ingestion workflows",
            "OCR-assisted parsing and structured extraction",
            "Multi-frame visual validation & confidence scoring",
        ],
    },
    {
        badge: "PILLAR // 03",
        title: "AI Automation Pipelines",
        jacketBg: "bg-[#FF2A6D] text-cream",
        icon: <Cpu size={20} className="text-ink" />,
        items: [
            "n8n visual workflow orchestration & webhooks",
            "Google Gemini & Claude chained prompt gates",
            "Twilio, REST API & database tool actions",
        ],
    },
];

export function AiPipelinesSection() {
    const [activePresetIdx, setActivePresetIdx] = useState(0);
    const [activeStageIdx, setActiveStageIdx] = useState(3);
    const [isSimulating, setIsSimulating] = useState(false);

    const currentPreset = pipelinePresets[activePresetIdx];
    const currentStage = currentPreset.stages[activeStageIdx] || currentPreset.stages[0];

    useEffect(() => {
        if (!isSimulating) return;
        const interval = setInterval(() => {
            setActiveStageIdx((prev) => {
                if (prev >= currentPreset.stages.length - 1) {
                    setIsSimulating(false);
                    return prev;
                }
                return prev + 1;
            });
        }, 600);
        return () => clearInterval(interval);
    }, [isSimulating, currentPreset.stages.length]);

    const handleRunSimulation = () => {
        setActiveStageIdx(0);
        setIsSimulating(true);
    };

    const mobilePipelineSlides: SwipeCardSlide[] = pipelinePresets.map((preset, idx) => {
        const pillar = pipelineCategories[idx] || pipelineCategories[0];
        const stagePreview = preset.stages[activeStageIdx] || preset.stages[3];
        return {
            id: `0${idx + 1}`,
            tabLabel: `[0${idx + 1}] ${preset.title.split(" ").slice(0, 2).join(" ")}`,
            headerBg: preset.accentBg,
            badgeText: preset.badge,
            statusText: "7-STAGE FLOW",
            content: (
                <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                        <div>
                            <h3 className="font-heading font-bold text-xl uppercase tracking-tight text-ink leading-tight">
                                {preset.title}
                            </h3>
                            <p className="font-mono text-[11px] font-bold text-electric uppercase mt-0.5">
                                {pillar.title}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setActivePresetIdx(idx);
                                handleRunSimulation();
                            }}
                            className="px-2.5 py-1 bg-acid text-ink border-[2px] border-ink shadow-[2px_2px_0px_#1A1A1A] font-mono text-[10px] font-extrabold uppercase inline-flex items-center gap-1 flex-shrink-0"
                        >
                            <Play size={10} className="fill-ink" />
                            <span>{isSimulating && activePresetIdx === idx ? "RUNNING" : "SIMULATE"}</span>
                        </button>
                    </div>

                    {/* Compact 7-Stage Pill Strip */}
                    <div className="grid grid-cols-7 gap-1">
                        {preset.stages.map((st, sIdx) => {
                            const isCur = sIdx === activeStageIdx;
                            return (
                                <button
                                    key={st.code}
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsSimulating(false);
                                        setActiveStageIdx(sIdx);
                                    }}
                                    className={`py-1.5 text-center border-[1.5px] border-ink font-mono text-[9px] font-extrabold transition-all ${
                                        isCur
                                            ? "bg-ink text-acid -translate-y-0.5"
                                            : "bg-[#F4F0E4] text-ink/75"
                                    }`}
                                >
                                    {st.code}
                                </button>
                            );
                        })}
                    </div>

                    {/* Live Stage JSON Output */}
                    <div className="p-2.5 bg-ink text-cream border-[2px] border-ink">
                        <div className="flex items-center justify-between font-mono text-[9px] font-extrabold text-acid uppercase mb-1">
                            <span>
                                [{stagePreview.code}] {stagePreview.name} · {stagePreview.role}
                            </span>
                            <span>{stagePreview.latency}</span>
                        </div>
                        <pre className="font-mono text-[10px] text-cream font-bold overflow-x-auto whitespace-pre-wrap break-all">
                            {stagePreview.payload}
                        </pre>
                    </div>

                    <ul className="space-y-1 pt-1 border-t-[2px] border-dashed border-ink/15">
                        {pillar.items.slice(0, 2).map((it) => (
                            <li key={it} className="flex items-start gap-1.5 font-mono text-[11px] text-ink/85">
                                <CheckCircle2 size={12} className="text-ink mt-0.5 flex-shrink-0" />
                                <span>{it}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ),
        };
    });

    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-10 lg:mb-24 reveal-up">
            {/* High-Contrast Obsidian & Acid Console Frame */}
            <div className="bg-ink text-cream border-[3px] border-ink shadow-[8px_8px_0px_#CCFF00] p-4 sm:p-7 md:p-11 relative overflow-hidden">
                <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                        backgroundImage: "radial-gradient(#CCFF00 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                    }}
                />

                {/* ─── MOBILE ONLY (< lg): Compact 3-Card Tinder Pipeline Deck ─── */}
                <div className="relative z-10 lg:hidden">
                    <div className="mb-4">
                        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-acid text-ink font-mono text-[10px] font-extrabold uppercase tracking-[0.2em] mb-2 border border-ink">
                            <Sparkles size={11} /> SYSTEM ARCHITECTURE
                        </div>
                        <h2 className="font-heading font-bold text-3xl uppercase tracking-tight text-cream leading-[0.95]">
                            AI Pipeline Playground
                        </h2>
                    </div>

                    <MobileSwipeStack
                        slides={mobilePipelineSlides}
                        instructionLabel="SWIPE PIPELINE [01–03] ↔"
                        darkStage
                    />
                </div>

                {/* ─── DESKTOP ONLY (lg+): Full 7-Node Graph & 3 Pillars (Unchanged) ─── */}
                <div className="relative z-10 hidden lg:block">
                    {/* Top Header + Live Simulation Button */}
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6 pb-5 border-b-[2px] border-cream/15">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-acid text-ink font-mono text-[10px] font-extrabold uppercase tracking-[0.22em] mb-2.5 border border-ink">
                                <Sparkles size={12} /> INTERACTIVE SYSTEM ARCHITECTURE
                            </div>
                            <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-cream leading-[0.95]">
                                AI Pipeline Playground
                            </h2>
                            <p className="font-mono text-xs sm:text-sm text-cream/80 max-w-2xl leading-relaxed mt-2">
                                Pick a pipeline preset, tap <span className="text-acid font-extrabold">SIMULATE PACKET ▶</span>, or tap any stage (<span className="text-acid font-extrabold">01–07</span>) to inspect its live JSON output.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={handleRunSimulation}
                            className="self-start lg:self-auto px-5 py-3 bg-acid text-ink hover:bg-[#FFD60A] border-[2.5px] border-cream shadow-[4px_4px_0px_#FF6600] active:translate-y-0.5 font-mono text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-2 transition-all flex-shrink-0"
                        >
                            <Play size={13} className="fill-ink" />
                            <span>{isSimulating ? "SIMULATING..." : "SIMULATE PACKET ▶"}</span>
                        </button>
                    </div>

                    {/* 3 Preset Tabs */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-5">
                        {pipelinePresets.map((preset, idx) => {
                            const isSelected = idx === activePresetIdx;
                            return (
                                <button
                                    key={preset.id}
                                    type="button"
                                    onClick={() => {
                                        setIsSimulating(false);
                                        setActivePresetIdx(idx);
                                    }}
                                    className={`text-left p-3 sm:p-3.5 border-[2.5px] transition-all ${
                                        isSelected
                                            ? `${preset.accentBg} border-cream shadow-[4px_4px_0px_#FFFDF5] -translate-y-0.5`
                                            : "bg-cream/5 text-cream border-cream/20 hover:border-cream/50"
                                    }`}
                                >
                                    <div
                                        className={`font-mono text-[9px] font-extrabold uppercase tracking-widest mb-0.5 ${
                                            isSelected ? "text-ink/80" : "text-acid"
                                        }`}
                                    >
                                        {preset.badge}
                                    </div>
                                    <div className="font-heading font-bold text-sm sm:text-base uppercase tracking-tight">
                                        {preset.title}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Interactive 7-Node Execution Graph */}
                    <div className="p-4 sm:p-5 bg-[#111111] border-[2.5px] border-cream/25 mb-6">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                            <div className="font-mono text-xs font-extrabold uppercase tracking-wider text-cream flex items-center gap-1.5">
                                <Activity size={14} className="text-acid" />
                                <span>FLOW: {currentPreset.title}</span>
                            </div>
                            <span className="font-mono text-[10px] font-extrabold uppercase tracking-widest text-acid">
                                TAP NODE [01–07]
                            </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                            {currentPreset.stages.map((stage, idx) => {
                                const isCurrent = idx === activeStageIdx;
                                const isPassed = isSimulating && idx < activeStageIdx;
                                return (
                                    <button
                                        key={stage.code}
                                        type="button"
                                        onClick={() => {
                                            setIsSimulating(false);
                                            setActiveStageIdx(idx);
                                        }}
                                        className={`p-2.5 text-left border-[2px] transition-all flex flex-col justify-between min-h-[84px] ${
                                            isCurrent
                                                ? `${currentPreset.accentBg} border-cream shadow-[3px_3px_0px_#FFFDF5] -translate-y-0.5`
                                                : isPassed
                                                ? "bg-acid/25 text-cream border-acid"
                                                : "bg-cream/5 text-cream border-cream/15 hover:border-acid/60"
                                        }`}
                                    >
                                        <div className="flex items-center justify-between w-full mb-1">
                                            <span
                                                className={`font-mono text-[10px] font-extrabold uppercase px-1.5 py-0.5 ${
                                                    isCurrent
                                                        ? "bg-ink text-acid"
                                                        : "bg-cream/10 text-acid"
                                                }`}
                                            >
                                                {stage.code}
                                            </span>
                                            <span
                                                className={`font-mono text-[9px] font-bold ${
                                                    isCurrent ? "text-ink/80" : "text-cream/60"
                                                }`}
                                            >
                                                {stage.latency}
                                            </span>
                                        </div>

                                        <div>
                                            <div className="font-heading font-bold text-xs sm:text-sm uppercase tracking-tight leading-tight">
                                                {stage.name}
                                            </div>
                                            <div
                                                className={`font-mono text-[10px] mt-0.5 truncate ${
                                                    isCurrent ? "text-ink/85 font-bold" : "text-cream/70"
                                                }`}
                                            >
                                                {stage.role}
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Live Node Payload Inspector */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${currentPreset.id}-${currentStage.code}`}
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -4 }}
                                transition={{ duration: 0.15 }}
                                className="mt-3.5 p-3.5 bg-ink border-[2px] border-acid/60 flex flex-col md:flex-row md:items-center justify-between gap-3"
                            >
                                <div className="space-y-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] font-extrabold uppercase tracking-wider text-acid">
                                        <Terminal size={12} />
                                        <span>
                                            STAGE [{currentStage.code}] {currentStage.name} · {currentStage.role}
                                        </span>
                                        <span className="px-1.5 py-0.5 bg-acid text-ink">
                                            {currentStage.latency}
                                        </span>
                                    </div>
                                    <pre className="font-mono text-xs text-cream font-bold overflow-x-auto whitespace-pre-wrap break-all">
                                        {currentStage.payload}
                                    </pre>
                                </div>

                                <div className="flex items-center gap-2 self-end md:self-center flex-shrink-0">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setActiveStageIdx((prev) =>
                                                prev > 0 ? prev - 1 : currentPreset.stages.length - 1
                                            )
                                        }
                                        className="px-2.5 py-1.5 bg-cream/10 hover:bg-acid hover:text-ink text-cream font-mono text-[10px] font-extrabold uppercase border border-cream/25"
                                    >
                                        ← PREV
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setActiveStageIdx((prev) =>
                                                prev < currentPreset.stages.length - 1 ? prev + 1 : 0
                                            )
                                        }
                                        className="px-2.5 py-1.5 bg-acid hover:bg-[#FFD60A] text-ink font-mono text-[10px] font-extrabold uppercase border border-ink inline-flex items-center gap-1"
                                    >
                                        NEXT <ArrowRight size={11} />
                                    </button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* 3 Bold Color-Jacket Pipeline Pillars */}
                    <div className="grid md:grid-cols-3 gap-5">
                        {pipelineCategories.map((cat) => (
                            <div
                                key={cat.title}
                                className={`${cat.jacketBg} p-3.5 border-[3px] border-cream shadow-[5px_5px_0px_#FFFDF5] flex flex-col justify-between`}
                            >
                                <div className="flex items-center justify-between gap-2 pb-2.5 mb-3 border-b-[2px] border-current/25">
                                    <span className="font-mono text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 bg-ink text-acid">
                                        {cat.badge}
                                    </span>
                                    <div className="p-1.5 bg-cream border-[2px] border-ink">
                                        {cat.icon}
                                    </div>
                                </div>

                                <div className="bg-cream text-ink border-[2.5px] border-ink p-4 flex-1">
                                    <h3 className="font-heading font-bold text-lg uppercase tracking-tight text-ink mb-2">
                                        {cat.title}
                                    </h3>
                                    <ul className="space-y-1.5">
                                        {cat.items.map((item) => (
                                            <li
                                                key={item}
                                                className="flex items-start gap-2 font-mono text-xs text-ink/85 leading-relaxed"
                                            >
                                                <CheckCircle2
                                                    size={13}
                                                    className="text-ink mt-0.5 flex-shrink-0"
                                                />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
