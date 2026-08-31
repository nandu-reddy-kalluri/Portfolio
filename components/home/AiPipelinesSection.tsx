"use client";

import { ArrowRight, Database, Image as ImageIcon, Cpu, CheckCircle2, Bot, Layers, Sparkles } from "lucide-react";
import { CircuitPattern } from "@/components/ui/Decorative";

const pipelineStages = [
    { name: "Input", desc: "Data / Media / Webhooks" },
    { name: "Data", desc: "Ingestion & Parsing" },
    { name: "Processing", desc: "Normalization & Prep" },
    { name: "AI Model", desc: "Gemini / Claude / Agents" },
    { name: "Validation", desc: "Schema & Quality Gates" },
    { name: "Decision", desc: "Conditional Routing" },
    { name: "Output", desc: "Action / UI / API Delivery" },
];

const pipelineCategories = [
    {
        title: "AI Data Pipelines",
        icon: <Database size={24} className="text-acid" />,
        color: "bg-ink",
        textColor: "text-cream",
        items: [
            "Data ingestion from structured & unstructured sources",
            "Dataset normalization, cleaning & parsing",
            "Structured response schemas & quality checks",
            "Automated processing & fault-tolerant retries",
        ],
    },
    {
        title: "AI Image Pipelines",
        icon: <ImageIcon size={24} className="text-electric" />,
        color: "bg-ink",
        textColor: "text-cream",
        items: [
            "Image ingestion & preprocessing workflows",
            "OCR-assisted parsing and text extraction",
            "Visual validation & confidence scoring",
            "Automated metadata tagging & asset organization",
        ],
    },
    {
        title: "AI Automation Pipelines",
        icon: <Cpu size={24} className="text-hotpink" />,
        color: "bg-ink",
        textColor: "text-cream",
        items: [
            "n8n visual workflow orchestration & webhooks",
            "Google Gemini & Claude prompt pipelines",
            "REST API integrations & external tool actions",
            "Context-aware triggers & automated notifications",
        ],
    },
];

export function AiPipelinesSection() {
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20 reveal-up">
            <div className="neo-card bg-ink text-cream p-6 md:p-12 relative overflow-hidden">
                <CircuitPattern className="absolute top-0 right-0 w-48 h-48 text-cream/5" />

                <div className="relative z-10">
                    <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-acid mb-2">
                        System Architecture
                    </div>
                    <h2 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-tight text-cream mb-4">
                        AI Pipelines
                    </h2>
                    <p className="font-mono text-sm md:text-base text-cream/80 max-w-2xl leading-relaxed mb-8">
                        Building automated workflows that connect data, models, processing, validation, and actions into practical AI systems.
                    </p>

                    {/* Visual Interactive Pipeline Diagram */}
                    <div className="mb-12 p-4 md:p-6 bg-ink/80 border-[3px] border-cream/20 relative overflow-hidden">
                        <div className="font-mono text-xs font-bold uppercase tracking-widest text-acid mb-4 flex items-center gap-2">
                            <Sparkles size={14} /> Pipeline Execution Architecture
                        </div>

                        {/* Stages Flow */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                            {pipelineStages.map((stage, idx) => (
                                <div key={stage.name} className="flex flex-col">
                                    <div className="p-3 bg-cream/5 border border-cream/15 text-center flex-1 flex flex-col justify-center">
                                        <div className="font-mono text-[10px] text-acid font-bold uppercase">
                                            0{idx + 1}
                                        </div>
                                        <div className="font-heading font-bold text-sm uppercase tracking-tight text-cream mt-0.5">
                                            {stage.name}
                                        </div>
                                        <div className="font-mono text-[9px] text-cream/60 mt-1">
                                            {stage.desc}
                                        </div>
                                    </div>
                                    {idx < pipelineStages.length - 1 && (
                                        <div className="hidden lg:flex justify-center -my-1 text-acid/40">
                                            ↓
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 3 Pipeline Pillars */}
                    <div className="grid md:grid-cols-3 gap-5">
                        {pipelineCategories.map((cat) => (
                            <div
                                key={cat.title}
                                className="p-6 bg-cream/5 border-[2px] border-cream/15 flex flex-col justify-between hover:border-acid/60 transition-colors group"
                            >
                                <div>
                                    <div className="mb-4 group-hover:scale-110 transition-transform">
                                        {cat.icon}
                                    </div>
                                    <h3 className="font-heading font-bold text-xl uppercase tracking-tight text-cream mb-4">
                                        {cat.title}
                                    </h3>
                                    <ul className="space-y-2.5">
                                        {cat.items.map((item) => (
                                            <li key={item} className="flex items-start gap-2 font-mono text-xs text-cream/75 leading-relaxed">
                                                <CheckCircle2 size={13} className="text-acid mt-0.5 flex-shrink-0" />
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
