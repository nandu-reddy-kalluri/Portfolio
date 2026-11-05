"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, CheckCircle2, Sparkles } from "lucide-react";
import MobileSwipeStack, { type SwipeCardSlide } from "@/components/ui/MobileSwipeStack";

interface BlueprintStep {
    num: string;
    title: string;
    badge: string;
    accentBg: string;
    desc: string;
    deliverables: string[];
    codeSnippet: string;
}

const blueprintSteps: BlueprintStep[] = [
    {
        num: "01",
        title: "Problem Framing & Constraints",
        badge: "STAGE 01 // DISCOVERY & SCHEMA",
        accentBg: "bg-acid text-ink",
        desc: "Mapping the exact user bottleneck, latency budget, and structured input/output data contracts before writing code.",
        deliverables: [
            "Strict JSON input/output schema definitions",
            "Edge-case & failure-mode catalog",
            "Latency & token-cost budget target",
        ],
        codeSnippet: `// 01_schema_contract.ts
export interface AgentContract {
  intent: "legal_clause" | "product_match";
  confidenceGate: 0.85;
}`,
    },
    {
        num: "02",
        title: "Pipeline & Model Architecture",
        badge: "STAGE 02 // LLM & PROMPT GATES",
        accentBg: "bg-[#FFD60A] text-ink",
        desc: "Selecting the right models (Google Gemini, Claude), crafting deterministic prompt gates, and adding validation checks.",
        deliverables: [
            "Multi-step system prompt & few-shot anchors",
            "Hallucination & schema validation gate",
            "Context window chunking & retrieval logic",
        ],
        codeSnippet: `# 02_gemini_gate.py
res = gemini.generate_content(
    model="gemini-2.0-flash",
    config={"response_mime_type": "application/json"}
)`,
    },
    {
        num: "03",
        title: "Automation & Webhook Routing",
        badge: "STAGE 03 // N8N & API ROUTING",
        accentBg: "bg-electric text-cream",
        desc: "Wiring external APIs, Twilio messaging hooks, and n8n automation nodes into resilient, event-driven execution paths.",
        deliverables: [
            "n8n webhook triggers & conditional routers",
            "Twilio / WhatsApp / REST API integrations",
            "Automated retries & status telemetry logging",
        ],
        codeSnippet: `// 03_n8n_webhook_router.json
{
  "trigger": "POST /webhook/whatsapp",
  "nodes": ["Parse", "Gemini", "TwilioReply"]
}`,
    },
    {
        num: "04",
        title: "Tactile Frontend & Production",
        badge: "STAGE 04 // NEXT.JS & STREAMLIT UI",
        accentBg: "bg-[#FF2A6D] text-cream",
        desc: "Building responsive, high-craft user interfaces in Next.js, React, and Streamlit and deploying live verifiable builds.",
        deliverables: [
            "Mobile-first neo-brutalist UI & smooth motion",
            "Sub-second LCP & WCAG AA contrast compliance",
            "Live production deployment (Vercel / Streamlit)",
        ],
        codeSnippet: `// 04_production_deploy.tsx
export default function ShippedSystem() {
  return <InteractiveDeck status="200_LIVE" />;
}`,
    },
];

export function PhilosophySection() {
    const [activeStepIdx, setActiveStepIdx] = useState(0);
    const currentStep = blueprintSteps[activeStepIdx];

    const mobileStageSlides: SwipeCardSlide[] = blueprintSteps.map((step) => ({
        id: step.num,
        tabLabel: `[${step.num}] ${step.title.split(" ")[0]}`,
        headerBg: step.accentBg,
        badgeText: step.badge,
        statusText: `STAGE ${step.num} / 04`,
        content: (
            <div className="space-y-3">
                <div>
                    <h3 className="font-heading font-bold text-xl uppercase tracking-tight text-ink mb-1">
                        {step.title}
                    </h3>
                    <p className="font-mono text-xs text-ink/85 leading-relaxed">
                        {step.desc}
                    </p>
                </div>

                <div className="p-2.5 bg-[#F4F0E4] border-[2px] border-ink space-y-1">
                    {step.deliverables.map((item) => (
                        <div key={item} className="flex items-start gap-1.5 font-mono text-[11px] font-bold text-ink">
                            <CheckCircle2 size={13} className="text-ink mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                        </div>
                    ))}
                </div>

                <div className="bg-ink text-cream p-2.5 border-[2px] border-ink">
                    <div className="flex items-center justify-between pb-1 mb-1 border-b border-cream/15 font-mono text-[9px] text-acid font-extrabold uppercase">
                        <span className="flex items-center gap-1">
                            <Terminal size={11} /> SPEC
                        </span>
                        <span>VERIFIED</span>
                    </div>
                    <pre className="font-mono text-[10px] text-cream overflow-x-auto whitespace-pre-wrap leading-snug">
                        {step.codeSnippet}
                    </pre>
                </div>
            </div>
        ),
    }));

    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-10 lg:mb-24 reveal-up">
            {/* Vivid Orange Outer Frame */}
            <div className="bg-vivid text-ink border-[3px] border-ink shadow-[8px_8px_0px_#1A1A1A] p-3.5 sm:p-5 md:p-7">
                {/* Inner Obsidian Console Deck */}
                <div className="bg-ink text-cream border-[3px] border-ink p-4 sm:p-7 md:p-9 relative overflow-hidden">
                    {/* ─── MOBILE ONLY (< lg): 3D Tinder Swipe Stack for Stages [01]–[04] ─── */}
                    <div className="lg:hidden relative z-10">
                        <div className="mb-3">
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-acid text-ink font-mono text-[10px] font-extrabold uppercase tracking-[0.2em] mb-2 border border-ink">
                                <Sparkles size={11} /> METHODOLOGY
                            </div>
                            <h2 className="font-heading font-bold text-2xl sm:text-3xl uppercase tracking-tight text-cream leading-[0.98]">
                                Ideas into systems,{" "}
                                <span className="text-acid underline decoration-vivid decoration-4">
                                    tested in code.
                                </span>
                            </h2>
                        </div>

                        <MobileSwipeStack
                            slides={mobileStageSlides}
                            instructionLabel="SWIPE STAGE [01–04] ↔"
                            darkStage
                        />
                    </div>

                    {/* ─── DESKTOP ONLY (lg+): Full 12-Col Blueprint Console (Unchanged) ─── */}
                    <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start relative z-10">
                        {/* Left Column (6 cols): Editorial Headline + 4-Step Selector */}
                        <div className="lg:col-span-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-acid text-ink font-mono text-[10px] font-extrabold uppercase tracking-[0.22em] mb-3 border border-ink">
                                <Sparkles size={12} /> ENGINEERING METHODOLOGY
                            </div>
                            <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-cream mb-3 leading-[0.98]">
                                Ideas into working systems,{" "}
                                <span className="text-acid underline decoration-vivid decoration-4">
                                    tested in code.
                                </span>
                            </h2>
                            <p className="font-mono text-xs sm:text-sm text-cream/80 leading-relaxed mb-5">
                                Tap any of the 4 stages below to inspect the live blueprint, deliverables, and execution pattern.
                            </p>

                            {/* Desktop 4-Stage Selector Cards */}
                            <div className="space-y-2.5">
                                {blueprintSteps.map((step, idx) => {
                                    const isSelected = idx === activeStepIdx;
                                    return (
                                        <button
                                            key={step.num}
                                            type="button"
                                            onClick={() => setActiveStepIdx(idx)}
                                            className={`w-full text-left p-3.5 border-[2.5px] transition-all flex items-start gap-3 ${
                                                isSelected
                                                    ? `${step.accentBg} border-cream shadow-[4px_4px_0px_#FFFDF5] -translate-y-0.5`
                                                    : "bg-cream/5 text-cream border-cream/20 hover:border-acid/60"
                                            }`}
                                        >
                                            <span className="font-heading font-bold text-xl px-2 py-0.5 bg-ink text-acid border-[2px] border-cream/30 flex-shrink-0">
                                                {step.num}
                                            </span>
                                            <div className="min-w-0 flex-1">
                                                <div className="font-heading font-bold text-base uppercase tracking-tight">
                                                    {step.title}
                                                </div>
                                                <div className="font-mono text-xs opacity-85 mt-0.5 leading-relaxed">
                                                    {step.desc}
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Right Column (6 cols): Dynamic Cream & Obsidian Blueprint Card */}
                        <div className="lg:col-span-6 lg:sticky lg:top-24">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentStep.num}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.18 }}
                                    className="bg-cream text-ink border-[3px] border-cream shadow-[6px_6px_0px_#CCFF00] overflow-hidden"
                                >
                                    <div
                                        className={`${currentStep.accentBg} px-4 sm:px-5 py-3 border-b-[3px] border-ink flex items-center justify-between gap-2`}
                                    >
                                        <span className="font-mono text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 bg-ink text-acid">
                                            {currentStep.badge}
                                        </span>
                                        <span className="font-mono text-xs font-extrabold uppercase">
                                            STEP {currentStep.num} / 04
                                        </span>
                                    </div>

                                    <div className="p-4 sm:p-6 space-y-4">
                                        <div>
                                            <h3 className="font-heading font-bold text-xl sm:text-2xl uppercase tracking-tight text-ink mb-1.5">
                                                {currentStep.title}
                                            </h3>
                                            <p className="font-mono text-xs sm:text-sm text-ink/80 leading-relaxed">
                                                {currentStep.desc}
                                            </p>
                                        </div>

                                        <div className="p-3.5 bg-[#F4F0E4] border-[2px] border-ink space-y-1.5">
                                            <div className="font-mono text-[10px] font-extrabold uppercase tracking-widest text-ink/60 mb-1">
                                                STAGE DELIVERABLES:
                                            </div>
                                            {currentStep.deliverables.map((item) => (
                                                <div
                                                    key={item}
                                                    className="flex items-start gap-2 font-mono text-xs font-bold text-ink"
                                                >
                                                    <CheckCircle2
                                                        size={14}
                                                        className="text-ink mt-0.5 flex-shrink-0"
                                                    />
                                                    <span>{item}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="bg-ink text-cream p-3.5 border-[2.5px] border-ink">
                                            <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-cream/15 font-mono text-[10px] text-acid font-extrabold uppercase">
                                                <span className="flex items-center gap-1.5">
                                                    <Terminal size={12} /> BLUEPRINT SPEC
                                                </span>
                                                <span>VERIFIED</span>
                                            </div>
                                            <pre className="font-mono text-xs text-cream overflow-x-auto whitespace-pre-wrap leading-relaxed">
                                                {currentStep.codeSnippet}
                                            </pre>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
