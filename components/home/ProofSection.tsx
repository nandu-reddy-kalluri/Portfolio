"use client";

import { ArrowUpRight, Github, ExternalLink, Bot, Globe, Workflow, Layers, Cpu } from "lucide-react";
import Link from "next/link";

interface ActionLink {
    label: string;
    href: string;
    isExternal?: boolean;
}

interface ReceiptCard {
    title: string;
    subtitle: string;
    description: string;
    status: "LIVE" | "BUILDING" | "AUTOMATION" | "EXPERIMENTING" | "PUBLIC SOURCE";
    statusColor: string;
    accent: string;
    icon: React.ReactNode;
    links: ActionLink[];
}

const receiptCards: ReceiptCard[] = [
    {
        title: "LEGAL AI AGENT",
        subtitle: "LIVE APP · STREAMLIT CLOUD",
        description: "Conversational AI assistant for exploring legal information workflows.",
        status: "LIVE",
        statusColor: "bg-acid text-ink",
        accent: "bg-acid",
        icon: <Bot size={20} />,
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
        title: "CUP COZY",
        subtitle: "LIVE WEBSITE · VERCEL",
        description: "Responsive web experience focused on frontend design and polished UI/UX.",
        status: "LIVE",
        statusColor: "bg-acid text-ink",
        accent: "bg-vivid",
        icon: <Globe size={20} />,
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
        title: "WEARRANGE",
        subtitle: "BUILDING · PRODUCT CASE STUDY",
        description: "Wedding venue discovery and planning platform currently under development.",
        status: "BUILDING",
        statusColor: "bg-hotpink text-cream",
        accent: "bg-hotpink",
        icon: <Layers size={20} />,
        links: [
            {
                label: "CASE STUDY ↗",
                href: "/work/wearrange",
                isExternal: false,
            },
        ],
    },
    {
        title: "WHATSAPP AI BOT",
        subtitle: "AI + AUTOMATION · ARCHITECTURE",
        description: "Conversational product recommendation workflow connecting WhatsApp, Gemini, and automation.",
        status: "AUTOMATION",
        statusColor: "bg-electric text-cream",
        accent: "bg-electric",
        icon: <Workflow size={20} />,
        links: [
            {
                label: "ARCHITECTURE ↗",
                href: "/work/whatsapp-ai-chatbot",
                isExternal: false,
            },
        ],
    },
    {
        title: "AI PIPELINES",
        subtitle: "EXPERIMENTS · WORKFLOWS",
        description: "Explorations in data processing, AI models, validation, and automated workflows.",
        status: "EXPERIMENTING",
        statusColor: "bg-ink text-acid border border-acid/40",
        accent: "bg-acid",
        icon: <Cpu size={20} />,
        links: [
            {
                label: "EXPLORE ↗",
                href: "/work/ai-workflow-experiments",
                isExternal: false,
            },
        ],
    },
    {
        title: "GITHUB PROFILE",
        subtitle: "PUBLIC REPOSITORIES · SOURCE CODE",
        description: "Explore my public projects, experiments, and source code.",
        status: "PUBLIC SOURCE",
        statusColor: "bg-ink text-cream",
        accent: "bg-ink",
        icon: <Github size={20} />,
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
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20">
            <div className="reveal-up">
                <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/60 mb-2">
                    Verifiable Builds
                </div>
                <h2 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-tight text-ink mb-2">
                    The Receipts
                </h2>
                <p className="font-mono text-sm text-ink/70 max-w-xl leading-relaxed mb-8">
                    Public demos, source code, and project architectures behind the work.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {receiptCards.map((card, i) => (
                    <div
                        key={card.title}
                        className="neo-card bg-cream p-6 group relative overflow-hidden flex flex-col justify-between reveal-up hover:border-ink transition-all"
                        style={{ animationDelay: `${Math.min(i * 0.06, 0.4)}s` }}
                    >
                        {/* Top accent strip */}
                        <div className={`absolute top-0 left-0 w-full h-1.5 ${card.accent}`} />

                        <div>
                            {/* Card top bar */}
                            <div className="flex items-center justify-between gap-2 mb-4">
                                <div className="text-ink group-hover:scale-110 transition-transform">
                                    {card.icon}
                                </div>
                                <span
                                    className={`font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 ${card.statusColor}`}
                                >
                                    ● {card.status}
                                </span>
                            </div>

                            {/* Title & Subtitle */}
                            <h3 className="font-heading font-bold text-lg md:text-xl uppercase tracking-tight text-ink leading-tight mb-1 group-hover:text-electric transition-colors">
                                {card.title}
                            </h3>
                            <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-ink/60 mb-3">
                                {card.subtitle}
                            </div>

                            {/* Description */}
                            <p className="font-mono text-xs text-ink/80 leading-relaxed mb-6">
                                {card.description}
                            </p>
                        </div>

                        {/* Compact Action Links */}
                        <div className="pt-4 border-t-[2px] border-ink/10 flex flex-wrap items-center gap-2">
                            {card.links.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target={link.isExternal ? "_blank" : undefined}
                                    rel={link.isExternal ? "noopener noreferrer" : undefined}
                                    className="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1.5 bg-ink text-cream hover:bg-acid hover:text-ink transition-colors inline-flex items-center gap-1 border border-ink"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
