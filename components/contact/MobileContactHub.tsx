"use client";

import React, { useState } from "react";
import { ContactForm } from "./ContactForm";
import {
    Mail,
    Phone,
    Github,
    MapPin,
    Copy,
    Check,
    MessageSquare,
    HelpCircle,
    ChevronDown,
    ChevronUp,
    GraduationCap,
    Send,
} from "lucide-react";

interface MobileContactHubProps {
    contactInfo: Array<{
        icon: React.ReactNode;
        label: string;
        value: string;
        href?: string;
        bg: string;
    }>;
    faqs: Array<{
        q: string;
        a: string;
    }>;
}

export function MobileContactHub({ contactInfo, faqs }: MobileContactHubProps) {
    const [activeTab, setActiveTab] = useState<"quick" | "form" | "faq">("quick");
    const [copiedEmail, setCopiedEmail] = useState(false);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const buzz = (ms = 12) => {
        try {
            if (typeof navigator !== "undefined" && "vibrate" in navigator) {
                navigator.vibrate(ms);
            }
        } catch {}
    };

    const copyEmail = async () => {
        buzz(20);
        try {
            await navigator.clipboard.writeText("nandureddy817.kalluri@gmail.com");
        } catch {}
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 1800);
    };

    const handleTabChange = (t: "quick" | "form" | "faq") => {
        buzz();
        setActiveTab(t);
    };

    return (
        <div className="lg:hidden mb-10">
            {/* ─── 1. TOP SEGMENTED CONTROL ─── */}
            <div className="flex items-center gap-1.5 p-1 bg-ink border-[2.5px] border-ink rounded-xl mb-4 shadow-[3px_3px_0px_#1A1A1A]">
                <button
                    type="button"
                    onClick={() => handleTabChange("quick")}
                    className={`flex-1 py-2 font-mono text-[10px] font-extrabold uppercase tracking-wider rounded-lg transition-all ${
                        activeTab === "quick"
                            ? "bg-acid text-ink font-black shadow-[2px_2px_0px_#FFFDF5]"
                            : "text-cream/80 hover:text-acid"
                    }`}
                >
                    ⚡ Quick Channels
                </button>
                <button
                    type="button"
                    onClick={() => handleTabChange("form")}
                    className={`flex-1 py-2 font-mono text-[10px] font-extrabold uppercase tracking-wider rounded-lg transition-all ${
                        activeTab === "form"
                            ? "bg-[#FFD60A] text-ink font-black shadow-[2px_2px_0px_#FFFDF5]"
                            : "text-cream/80 hover:text-[#FFD60A]"
                    }`}
                >
                    📝 Brief Form
                </button>
                <button
                    type="button"
                    onClick={() => handleTabChange("faq")}
                    className={`flex-1 py-2 font-mono text-[10px] font-extrabold uppercase tracking-wider rounded-lg transition-all ${
                        activeTab === "faq"
                            ? "bg-[#00F5D4] text-ink font-black shadow-[2px_2px_0px_#FFFDF5]"
                            : "text-cream/80 hover:text-[#00F5D4]"
                    }`}
                >
                    💡 FAQs ({faqs.length})
                </button>
            </div>

            {/* ─── TAB 1: QUICK CHANNELS ─── */}
            {activeTab === "quick" && (
                <div className="space-y-3">
                    {/* Copy Email Strip */}
                    <button
                        type="button"
                        onClick={copyEmail}
                        className="w-full flex items-center justify-between gap-2 bg-cream text-ink border-[2.5px] border-ink p-3 shadow-[3px_3px_0px_#1A1A1A] active:scale-[0.99] transition-transform"
                    >
                        <div className="min-w-0 text-left">
                            <span className="font-mono text-[9px] font-extrabold uppercase text-ink/65 block">
                                EMAIL DIRECT // 1-TAP COPY
                            </span>
                            <span className="font-mono text-xs font-bold text-ink truncate block">
                                nandureddy817.kalluri@gmail.com
                            </span>
                        </div>
                        <span
                            className={`flex-shrink-0 px-2.5 py-1 font-mono text-[9px] font-black uppercase border-[2px] border-ink inline-flex items-center gap-1 ${
                                copiedEmail ? "bg-acid text-ink" : "bg-ink text-acid"
                            }`}
                        >
                            {copiedEmail ? <Check size={11} /> : <Copy size={11} />}
                            {copiedEmail ? "COPIED ✓" : "COPY"}
                        </span>
                    </button>

                    {/* 2x2 Keycap Speed Dial */}
                    <div className="grid grid-cols-2 gap-2">
                        <a
                            href="mailto:nandureddy817.kalluri@gmail.com"
                            className="p-3 bg-acid text-ink border-[2.5px] border-ink shadow-[3px_3px_0px_#1A1A1A] flex flex-col justify-between h-20 active:translate-y-0.5"
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-mono text-[9px] font-black">01 // EMAIL</span>
                                <Mail size={15} />
                            </div>
                            <span className="font-heading font-extrabold text-sm uppercase">
                                Open Mail ↗
                            </span>
                        </a>

                        <a
                            href="tel:6309718153"
                            className="p-3 bg-[#FFD60A] text-ink border-[2.5px] border-ink shadow-[3px_3px_0px_#1A1A1A] flex flex-col justify-between h-20 active:translate-y-0.5"
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-mono text-[9px] font-black">02 // PHONE</span>
                                <Phone size={15} />
                            </div>
                            <span className="font-heading font-extrabold text-sm uppercase">
                                Call Direct ↗
                            </span>
                        </a>

                        <a
                            href="https://github.com/nandu-reddy-kalluri"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-electric text-cream border-[2.5px] border-ink shadow-[3px_3px_0px_#1A1A1A] flex flex-col justify-between h-20 active:translate-y-0.5"
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-mono text-[9px] font-black">03 // GITHUB</span>
                                <Github size={15} />
                            </div>
                            <span className="font-heading font-extrabold text-sm uppercase">
                                Code Repos ↗
                            </span>
                        </a>

                        <button
                            type="button"
                            onClick={() => handleTabChange("form")}
                            className="p-3 bg-[#FF2A6D] text-cream border-[2.5px] border-ink shadow-[3px_3px_0px_#1A1A1A] flex flex-col justify-between h-20 active:translate-y-0.5 text-left"
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-mono text-[9px] font-black">04 // BRIEF</span>
                                <Send size={15} />
                            </div>
                            <span className="font-heading font-extrabold text-sm uppercase">
                                Send Brief ↗
                            </span>
                        </button>
                    </div>

                    {/* Education Plate */}
                    <div className="p-3 bg-cream border-[2px] border-ink flex items-center justify-between shadow-[2px_2px_0px_#1A1A1A]">
                        <div className="flex items-center gap-2">
                            <GraduationCap size={16} className="text-electric" />
                            <div>
                                <div className="font-mono text-[8px] font-extrabold uppercase text-ink/60">
                                    EDUCATION // BUILDER BACKGROUND
                                </div>
                                <div className="font-heading font-extrabold text-xs uppercase text-ink">
                                    Aurora × NIAT · B.Tech (2025–Present)
                                </div>
                            </div>
                        </div>
                        <span className="font-mono text-[8px] font-black bg-ink text-acid px-1.5 py-0.5">
                            HYD-IN
                        </span>
                    </div>
                </div>
            )}

            {/* ─── TAB 2: BRIEF FORM ─── */}
            {activeTab === "form" && (
                <div className="border-[3px] border-ink bg-cream p-4 shadow-[5px_5px_0px_#1A1A1A]">
                    <div className="font-mono text-[9px] font-extrabold uppercase text-ink/70 mb-2">
                        STRUCTURED PROJECT INTAKE
                    </div>
                    <ContactForm />
                </div>
            )}

            {/* ─── TAB 3: FAQS ─── */}
            {activeTab === "faq" && (
                <div className="border-[3px] border-ink bg-cream p-4 shadow-[5px_5px_0px_#1A1A1A] space-y-2">
                    <div className="font-mono text-[9px] font-extrabold uppercase text-ink/70 mb-2">
                        FREQUENTLY ASKED QUESTIONS
                    </div>
                    {faqs.map((faq, idx) => {
                        const isOpen = openFaq === idx;
                        return (
                            <div
                                key={idx}
                                className="border-[2px] border-ink bg-[#F4F0E4] overflow-hidden"
                            >
                                <button
                                    type="button"
                                    onClick={() => {
                                        buzz();
                                        setOpenFaq(isOpen ? null : idx);
                                    }}
                                    className="w-full p-2.5 flex items-center justify-between gap-2 text-left"
                                >
                                    <span className="font-heading font-extrabold text-xs uppercase text-ink">
                                        {faq.q}
                                    </span>
                                    {isOpen ? (
                                        <ChevronUp size={14} className="flex-shrink-0" />
                                    ) : (
                                        <ChevronDown size={14} className="flex-shrink-0" />
                                    )}
                                </button>
                                {isOpen && (
                                    <div className="px-2.5 pb-2.5 pt-1 border-t border-ink/15 font-mono text-[10.5px] text-ink/85 leading-snug">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

