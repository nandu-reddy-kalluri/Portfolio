"use client";

import { Zap, Bot, ArrowUpRight, Cpu, Layers, Sparkles, Database, Workflow } from "lucide-react";
import { CircuitPattern, CrossHatch } from "@/components/ui/Decorative";
import Link from "next/link";

const aiCapabilities = [
    { icon: <Bot size={20} />, label: "Conversational AI", desc: "Structured prompt systems & interactive chat agents" },
    { icon: <Zap size={20} />, label: "Multi-Modal Reasoning", desc: "Google Gemini & Claude vision / text integrations" },
    { icon: <Sparkles size={20} />, label: "Prompt Engineering", desc: "Structured output validation & quality gates" },
    { icon: <Database size={20} />, label: "Data Pipelines", desc: "Automated ingestion, parsing & dataset normalization" },
];

const engineeringCapabilities = [
    { icon: <Workflow size={20} />, label: "n8n Automation", desc: "Visual orchestration, webhook triggers & node pipelines" },
    { icon: <Cpu size={20} />, label: "API Integrations", desc: "Twilio WhatsApp, REST services, event-driven webhooks" },
    { icon: <Layers size={20} />, label: "Full-Stack Web", desc: "React, Next.js, TypeScript & Tailwind CSS builds" },
    { icon: <Zap size={20} />, label: "Rapid Prototyping", desc: "Streamlit applications & fast iterative MVP development" },
];

export function ServicePackages() {
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20">
            <div className="grid md:grid-cols-2 gap-6">
                {/* Generative AI & Intelligent Systems */}
                <div className="reveal-up">
                    <div className="neo-card bg-acid text-ink p-6 md:p-8 h-full relative overflow-hidden group gradient-top-accent flex flex-col justify-between">
                        <CrossHatch className="absolute top-0 right-0 w-32 h-32 text-ink opacity-[0.06]" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <Bot size={28} />
                                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] opacity-80">Capability Pillar 01</span>
                            </div>
                            <h2 className="font-heading font-bold text-3xl md:text-4xl uppercase tracking-tight mb-3">
                                Generative AI &amp; Agents
                            </h2>
                            <p className="font-mono text-sm opacity-85 leading-relaxed mb-6">
                                Developing practical conversational interfaces, domain-focused AI tools, and structured prompt pipelines designed for real utility.
                            </p>

                            <div className="space-y-4 mb-6">
                                {aiCapabilities.map((f) => (
                                    <div key={f.label} className="flex items-start gap-3 group/item">
                                        <div className="text-ink mt-0.5">{f.icon}</div>
                                        <div>
                                            <div className="font-heading font-bold text-sm uppercase tracking-tight">{f.label}</div>
                                            <div className="font-mono text-xs opacity-80">{f.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative z-10 pt-4 border-t border-ink/20">
                            <Link
                                href="/work#ai"
                                className="inline-flex items-center gap-2 bg-ink text-cream px-5 py-3 font-heading font-bold text-sm uppercase tracking-wider border-[3px] border-ink hover:bg-cream hover:text-ink transition-all group"
                            >
                                Explore AI Projects
                                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Automation & Software Engineering */}
                <div className="reveal-up" style={{ animationDelay: "0.1s" }}>
                    <div className="neo-card bg-electric text-cream p-6 md:p-8 h-full relative overflow-hidden group gradient-top-accent neo-glow-blue flex flex-col justify-between">
                        <CircuitPattern className="absolute bottom-0 left-0 w-40 h-40 text-cream/5" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <Workflow size={28} className="text-acid" />
                                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-cream/80">Capability Pillar 02</span>
                            </div>
                            <h2 className="font-heading font-bold text-3xl md:text-4xl uppercase tracking-tight mb-3">
                                Automation &amp; Full-Stack
                            </h2>
                            <p className="font-mono text-sm text-cream/90 leading-relaxed mb-6">
                                Connecting event-driven webhooks, external APIs, and modern frontend interfaces into robust, responsive products.
                            </p>

                            <div className="space-y-4 mb-6">
                                {engineeringCapabilities.map((f) => (
                                    <div key={f.label} className="flex items-start gap-3 group/item">
                                        <div className="text-acid mt-0.5">{f.icon}</div>
                                        <div>
                                            <div className="font-heading font-bold text-sm uppercase tracking-tight">{f.label}</div>
                                            <div className="font-mono text-xs text-cream/80">{f.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative z-10 pt-4 border-t border-cream/20">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 bg-acid text-ink px-5 py-3 font-heading font-bold text-sm uppercase tracking-wider border-[3px] border-ink hover:bg-cream transition-all group"
                            >
                                Collaborate On A Build
                                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
