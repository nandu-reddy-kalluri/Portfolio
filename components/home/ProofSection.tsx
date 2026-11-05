"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Github,
    Bot,
    Globe,
    Workflow,
    Layers,
    Cpu,
    Stamp,
    Receipt,
} from "lucide-react";
import MobileSwipeStack, { type SwipeCardSlide } from "@/components/ui/MobileSwipeStack";

interface ActionLink {
    label: string;
    href: string;
    isExternal?: boolean;
}

interface ReceiptCard {
    serial: string;
    title: string;
    subtitle: string;
    description: string;
    host: string;
    stackLine: string;
    status: "LIVE" | "BUILDING" | "AUTOMATION" | "EXPERIMENTING" | "PUBLIC SOURCE";
    headerBg: string;
    icon: React.ReactNode;
    links: ActionLink[];
}

const receiptCards: ReceiptCard[] = [
    {
        serial: "RCPT // 001-LGL",
        title: "LEGAL AI AGENT",
        subtitle: "LIVE APP · STREAMLIT CLOUD",
        description: "Conversational AI assistant for exploring legal information workflows and statutory clause analysis.",
        host: "STREAMLIT CLOUD",
        stackLine: "PYTHON · GEMINI · PROMPT GATES",
        status: "LIVE",
        headerBg: "bg-acid text-ink",
        icon: <Bot size={18} className="text-ink" />,
        links: [
            {
                label: "LIVE DEMO ↗",
                href: "https://legal-ai-agent-vdypr3xqmd6cvk7tr8d2r9.streamlit.app/",
                isExternal: true,
            },
            {
                label: "SOURCE ↗",
                href: "https://github.com/nandu-reddy-kalluri/legal-ai-agent",
                isExternal: true,
            },
        ],
    },
    {
        serial: "RCPT // 002-CUP",
        title: "CUP COZY",
        subtitle: "LIVE WEBSITE · VERCEL EDGE",
        description: "Responsive web experience focused on tactile frontend craft, product storytelling, and polished UI/UX.",
        host: "VERCEL PRODUCTION",
        stackLine: "FRONTEND · UI/UX · RESPONSIVE",
        status: "LIVE",
        headerBg: "bg-[#FFD60A] text-ink",
        icon: <Globe size={18} className="text-ink" />,
        links: [
            {
                label: "LIVE SITE ↗",
                href: "https://cup-cozy-site.vercel.app/",
                isExternal: true,
            },
            {
                label: "SOURCE ↗",
                href: "https://github.com/nandu-reddy-kalluri/CUP-COZY",
                isExternal: true,
            },
        ],
    },
    {
        serial: "RCPT // 003-WRA",
        title: "WEARRANGE",
        subtitle: "BUILDING · PRODUCT CASE STUDY",
        description: "Full-stack wedding venue discovery, filtering, and event planning platform under active development.",
        host: "NEXT.JS APP ROUTER",
        stackLine: "REACT · TAILWIND · FULL-STACK",
        status: "BUILDING",
        headerBg: "bg-[#FF2A6D] text-cream",
        icon: <Layers size={18} className="text-ink" />,
        links: [
            {
                label: "CASE STUDY ↗",
                href: "/work/wearrange",
                isExternal: false,
            },
        ],
    },
    {
        serial: "RCPT // 004-WAB",
        title: "WHATSAPP AI BOT",
        subtitle: "AI + AUTOMATION · ARCHITECTURE",
        description: "Conversational product recommendation workflow connecting WhatsApp, Google Gemini, and n8n webhooks.",
        host: "TWILIO × N8N CLOUD",
        stackLine: "GEMINI · TWILIO · WEBHOOKS",
        status: "AUTOMATION",
        headerBg: "bg-electric text-cream",
        icon: <Workflow size={18} className="text-ink" />,
        links: [
            {
                label: "ARCHITECTURE ↗",
                href: "/work/whatsapp-ai-chatbot",
                isExternal: false,
            },
        ],
    },
    {
        serial: "RCPT // 005-PIP",
        title: "AI PIPELINES",
        subtitle: "EXPERIMENTS · WORKFLOWS",
        description: "Multi-stage explorations in data ingestion, LLM validation gates, OCR parsing, and automated routing.",
        host: "MULTI-MODEL LAB",
        stackLine: "GEMINI · CLAUDE · SCHEMAS",
        status: "EXPERIMENTING",
        headerBg: "bg-vivid text-ink",
        icon: <Cpu size={18} className="text-ink" />,
        links: [
            {
                label: "EXPLORE ↗",
                href: "/work/ai-workflow-experiments",
                isExternal: false,
            },
        ],
    },
    {
        serial: "RCPT // 006-GIT",
        title: "GITHUB PROFILE",
        subtitle: "PUBLIC REPOSITORIES · SOURCE CODE",
        description: "Direct access to all public repositories, commit histories, architectures, and ongoing code experiments.",
        host: "GITHUB.COM",
        stackLine: "OPEN SOURCE · REPOSITORIES",
        status: "PUBLIC SOURCE",
        headerBg: "bg-ink text-acid",
        icon: <Github size={18} className="text-ink" />,
        links: [
            {
                label: "GITHUB ↗",
                href: "https://github.com/nandu-reddy-kalluri",
                isExternal: true,
            },
        ],
    },
];

export function ProofSection() {
    const [stampedIds, setStampedIds] = useState<Record<string, boolean>>({
        "RCPT // 001-LGL": true,
        "RCPT // 002-CUP": true,
    });

    const toggleStamp = (serial: string) => {
        setStampedIds((prev) => ({
            ...prev,
            [serial]: !prev[serial],
        }));
    };

    const stampAll = () => {
        const allStamped = receiptCards.every((c) => stampedIds[c.serial]);
        if (allStamped) {
            setStampedIds({});
        } else {
            const next: Record<string, boolean> = {};
            receiptCards.forEach((c) => {
                next[c.serial] = true;
            });
            setStampedIds(next);
        }
    };

    const mobileReceiptSlides: SwipeCardSlide[] = receiptCards.map((card, idx) => {
        const isStamped = !!stampedIds[card.serial];
        return {
            id: `0${idx + 1}`,
            tabLabel: `[0${idx + 1}] ${card.title.split(" ").slice(0, 2).join(" ")}`,
            headerBg: card.headerBg,
            badgeText: card.serial,
            statusText: `● ${card.status}`,
            content: (
                <div className="flex flex-col justify-between gap-3 relative">
                    {isStamped && (
                        <div className="self-start px-2 py-0.5 border-[2px] border-ink bg-acid text-ink font-mono text-[9px] font-extrabold uppercase tracking-widest">
                            ✓ VERIFIED BUILD
                        </div>
                    )}
                    <div>
                        <h3 className="font-heading font-bold text-xl uppercase tracking-tight text-ink leading-tight">
                            {card.title}
                        </h3>
                        <div className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-electric mb-2">
                            {card.subtitle}
                        </div>
                        <p className="font-mono text-xs text-ink/85 leading-relaxed mb-3">
                            {card.description}
                        </p>

                        <div className="border-t-[2px] border-b-[2px] border-dashed border-ink/25 py-2 space-y-1 font-mono text-[10px]">
                            <div className="flex items-center justify-between gap-2">
                                <span className="font-bold text-ink/60 uppercase">HOST</span>
                                <span className="font-extrabold text-ink uppercase">{card.host}</span>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <span className="font-bold text-ink/60 uppercase">STACK</span>
                                <span className="font-extrabold text-ink uppercase truncate max-w-[180px]">
                                    {card.stackLine}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                            {card.links.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target={link.isExternal ? "_blank" : undefined}
                                    rel={link.isExternal ? "noopener noreferrer" : undefined}
                                    className="font-mono text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1.5 bg-ink text-acid border-[2px] border-ink inline-flex items-center gap-1"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={() => toggleStamp(card.serial)}
                            className={`px-2 py-1 font-mono text-[9px] font-extrabold uppercase border-[1.5px] border-ink ${
                                isStamped ? "bg-acid text-ink" : "bg-[#F4F0E4] text-ink/70"
                            }`}
                        >
                            {isStamped ? "STAMPED ✓" : "STAMP ?"}
                        </button>
                    </div>
                </div>
            ),
        };
    });

    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-10 lg:mb-24">
            {/* Header Row */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-5 lg:mb-10 reveal-up">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-acid text-ink border-[2px] border-ink shadow-[3px_3px_0px_#1A1A1A] font-mono text-[10px] font-extrabold uppercase tracking-[0.22em] mb-2.5">
                        <Receipt size={12} /> VERIFIABLE BUILDS // THERMAL PROOF LOG
                    </div>
                    <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-6xl uppercase tracking-tight text-ink leading-[0.95]">
                        The Receipts
                    </h2>
                    <p className="hidden lg:block font-mono text-xs sm:text-sm text-ink/75 max-w-xl leading-relaxed mt-2">
                        Public demos, live URLs, and source repositories. Tap <span className="font-extrabold underline">STAMP ✓</span> on any voucher to mark it verified.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={stampAll}
                    className="hidden lg:inline-flex self-start md:self-auto px-4 py-2.5 bg-ink text-acid hover:bg-acid hover:text-ink border-[2.5px] border-ink shadow-[4px_4px_0px_#1A1A1A] active:translate-y-0.5 font-mono text-xs font-extrabold uppercase tracking-wider items-center gap-2 transition-colors"
                >
                    <Stamp size={14} />
                    <span>STAMP ALL RECEIPTS ✓</span>
                </button>
            </div>

            {/* ─── MOBILE ONLY (< lg): 6-Card Tinder Receipt Swipe Deck ─── */}
            <div className="lg:hidden">
                <MobileSwipeStack
                    slides={mobileReceiptSlides}
                    instructionLabel="SWIPE RECEIPT [01–06] ↔"
                />
            </div>

            {/* ─── DESKTOP ONLY (lg+): Perforated Thermal Receipt Grid (Unchanged) ─── */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-6">
                {receiptCards.map((card, i) => {
                    const isStamped = !!stampedIds[card.serial];
                    return (
                        <div
                            key={card.serial}
                            className="bg-cream border-[3px] border-ink shadow-[6px_6px_0px_#1A1A1A] flex flex-col justify-between relative overflow-hidden reveal-up group"
                            style={{ animationDelay: `${Math.min(i * 0.06, 0.4)}s` }}
                        >
                            {/* Top Perforated Sawtooth Edge */}
                            <div
                                className="w-full h-2.5 bg-ink"
                                style={{
                                    clipPath:
                                        "polygon(0% 0%, 100% 0%, 100% 100%, 96% 35%, 92% 100%, 88% 35%, 84% 100%, 80% 35%, 76% 100%, 72% 35%, 68% 100%, 64% 35%, 60% 100%, 56% 35%, 52% 100%, 48% 35%, 44% 100%, 40% 35%, 36% 100%, 32% 35%, 28% 100%, 24% 35%, 20% 100%, 16% 35%, 12% 100%, 8% 35%, 4% 100%, 0% 35%)",
                                }}
                            />

                            {/* Colored Thermal Header Band */}
                            <div
                                className={`${card.headerBg} px-5 py-3 border-b-[3px] border-ink flex items-center justify-between gap-2`}
                            >
                                <div className="flex items-center gap-2 font-mono text-[10px] font-extrabold uppercase tracking-widest">
                                    <span className="p-1 bg-cream border-[1.5px] border-ink">
                                        {card.icon}
                                    </span>
                                    <span>{card.serial}</span>
                                </div>
                                <span className="px-2 py-0.5 bg-ink text-acid font-mono text-[9px] font-extrabold uppercase tracking-wider border border-cream/20">
                                    ● {card.status}
                                </span>
                            </div>

                            {/* Receipt Body */}
                            <div className="p-5 flex-1 flex flex-col justify-between relative">
                                {isStamped && (
                                    <motion.div
                                        initial={{ scale: 1.5, opacity: 0, rotate: -18 }}
                                        animate={{ scale: 1, opacity: 1, rotate: -12 }}
                                        className="
                                            absolute top-3 right-3 z-20 pointer-events-none
                                            px-2.5 py-1 border-[2.5px] border-ink bg-acid text-ink
                                            shadow-[2px_2px_0px_#1A1A1A] font-mono text-[9px] font-extrabold uppercase tracking-widest
                                        "
                                    >
                                        ✓ VERIFIED BUILD
                                    </motion.div>
                                )}

                                <div>
                                    <div className="flex items-start justify-between gap-2 mb-1">
                                        <h3 className="font-heading font-bold text-xl uppercase tracking-tight text-ink leading-tight">
                                            {card.title}
                                        </h3>
                                    </div>
                                    <div className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-electric mb-3">
                                        {card.subtitle}
                                    </div>

                                    <p className="font-mono text-xs text-ink/85 leading-relaxed mb-4">
                                        {card.description}
                                    </p>

                                    <div className="border-t-[2px] border-b-[2px] border-dashed border-ink/25 py-2.5 my-3 space-y-1.5 font-mono text-[10px]">
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="font-bold text-ink/60 uppercase">HOST</span>
                                            <span className="font-extrabold text-ink uppercase">{card.host}</span>
                                        </div>
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="font-bold text-ink/60 uppercase">STACK</span>
                                            <span className="font-extrabold text-ink uppercase truncate max-w-[180px]">
                                                {card.stackLine}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                                        <div className="flex flex-wrap items-center gap-2">
                                            {card.links.map((link) => (
                                                <a
                                                    key={link.label}
                                                    href={link.href}
                                                    target={link.isExternal ? "_blank" : undefined}
                                                    rel={link.isExternal ? "noopener noreferrer" : undefined}
                                                    className="font-mono text-[11px] font-extrabold uppercase tracking-wider px-3 py-1.5 bg-ink text-cream hover:bg-acid hover:text-ink transition-colors inline-flex items-center gap-1 border-[2px] border-ink shadow-[2px_2px_0px_#1A1A1A]"
                                                >
                                                    {link.label}
                                                </a>
                                            ))}
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => toggleStamp(card.serial)}
                                            className={`px-2 py-1 font-mono text-[9px] font-extrabold uppercase border-[1.5px] border-ink transition-colors ${
                                                isStamped
                                                    ? "bg-acid text-ink"
                                                    : "bg-[#F4F0E4] text-ink/70 hover:text-ink"
                                            }`}
                                            title="Stamp or unstamp this build receipt"
                                        >
                                            {isStamped ? "STAMPED ✓" : "STAMP ?"}
                                        </button>
                                    </div>

                                    <div className="pt-2 border-t border-ink/15 flex items-center justify-between">
                                        <div
                                            className="w-28 h-3.5 opacity-80"
                                            style={{
                                                backgroundImage:
                                                    "repeating-linear-gradient(90deg, #1A1A1A 0px, #1A1A1A 2px, transparent 2px, transparent 4px, #1A1A1A 4px, #1A1A1A 5px, transparent 5px, transparent 7px)",
                                            }}
                                        />
                                        <span className="font-mono text-[9px] font-bold text-ink/55 uppercase">
                                            AUTH // 200 OK
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
