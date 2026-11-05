"use client";

import { Mail, Phone, Github, ArrowUpRight, ArrowUp, Sparkles, MessageSquare, Copy, Check, ArrowRight, MessageCircle, Contact2, Download } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate, PanInfo } from "framer-motion";

const EMAIL = "nandureddy817.kalluri@gmail.com";

/* ═════════════════════════════════════════════════════════════════════
   MOBILE DISPATCH CONSOLE (< lg only)
   - Single frame (no double jacket) → more breathing room
   - Headline + spinning stamp share one row
   - 2×2 tactile keycap speed-dial instead of 4 tall stacked cards
   - Copy-email ticket strip with instant "COPIED ✓" feedback
   - "Slide to start a project" launcher (iOS slide-to-unlock style)
═════════════════════════════════════════════════════════════════════ */
type ContactAction = "whatsapp" | "call" | "email";

function MobileDispatchConsole({ onTop }: { onTop: () => void }) {
    const router = useRouter();
    const [copied, setCopied] = useState(false);
    const [vcardSaved, setVcardSaved] = useState(false);
    const [contactMode, setContactMode] = useState<ContactAction>("whatsapp");
    const [launched, setLaunched] = useState(false);
    const trackRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const fillWidth = useTransform(x, (v) => v + 56);
    const hintOpacity = useTransform(x, [0, 100], [1, 0]);

    const buzz = (pattern: number | number[] = 14) => {
        try {
            if (typeof navigator !== "undefined" && "vibrate" in navigator) {
                navigator.vibrate(pattern);
            }
        } catch {}
    };

    const triggerDirectContact = (mode: ContactAction = contactMode) => {
        buzz([35, 45, 55]);
        setLaunched(true);
        setTimeout(() => {
            if (mode === "whatsapp") {
                window.location.href =
                    "https://wa.me/916309718153?text=Hi%20Nanda%20Kishore%2C%20I%20saw%20your%20portfolio%20and%20want%20to%20connect!";
            } else if (mode === "call") {
                window.location.href = "tel:6309718153";
            } else if (mode === "email") {
                window.location.href = `mailto:${EMAIL}?subject=Project%20Inquiry%20via%20Portfolio`;
            }
            setTimeout(() => {
                setLaunched(false);
                animate(x, 0, { type: "spring", stiffness: 450, damping: 30 });
            }, 1800);
        }, 260);
    };

    const copyEmail = async () => {
        buzz();
        try {
            await navigator.clipboard.writeText(EMAIL);
        } catch {}
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
    };

    const downloadVCard = () => {
        buzz([20, 30]);
        const vcardData = `BEGIN:VCARD
VERSION:3.0
N:Kishore;K.;Nanda;;
FN:K. Nanda Kishore
ORG:Aurora × NIAT
TITLE:Generative AI & Software Engineer
TEL;TYPE=CELL,VOICE:+916309718153
EMAIL;TYPE=PREF,INTERNET:nandureddy817.kalluri@gmail.com
URL:https://github.com/nandu-reddy-kalluri
NOTE:B.Tech (2025-Present) · Generative AI, n8n Automation, Multi-Stage Pipelines & Full-Stack Systems
END:VCARD`;

        const blob = new Blob([vcardData], { type: "text/vcard;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "K_Nanda_Kishore_Contact.vcf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        setVcardSaved(true);
        setTimeout(() => setVcardSaved(false), 2400);
    };

    const maxDrag = () => (trackRef.current ? trackRef.current.offsetWidth - 56 - 8 : 240);

    const onDragEnd = (_: unknown, info: PanInfo) => {
        const max = maxDrag();
        // Dragging past 55% or flicking with velocity directly fires the chosen contact channel!
        if (x.get() > max * 0.55 || info.velocity.x > 450) {
            animate(x, max, { type: "spring", stiffness: 500, damping: 34 });
            triggerDirectContact(contactMode);
        } else {
            animate(x, 0, { type: "spring", stiffness: 500, damping: 30 });
        }
    };

    const keys = [
        { n: "01", label: "Email", sub: "Inbox", icon: Mail, href: `mailto:${EMAIL}`, bg: "#CCFF00", fg: "#1A1A1A" },
        { n: "02", label: "Call", sub: "+91 63097…", icon: Phone, href: "tel:6309718153", bg: "#FFD60A", fg: "#1A1A1A" },
        { n: "03", label: "GitHub", sub: "Source", icon: Github, href: "https://github.com/nandu-reddy-kalluri", bg: "#0055FF", fg: "#FFFDF5", external: true },
        { n: "04", label: "Brief", sub: "Form", icon: MessageSquare, href: "/contact", bg: "#FF2A6D", fg: "#FFFDF5" },
    ];

    const channelConfig = {
        whatsapp: {
            label: "Slide to Chat on WhatsApp",
            launchedText: "Opening WhatsApp Chat…",
            knobBg: "bg-[#25D366]",
            fillBg: "bg-[#25D366]",
            activeTabBg: "bg-[#25D366] text-ink",
        },
        call: {
            label: "Slide to Call +91 6309718153",
            launchedText: "Calling Direct Line…",
            knobBg: "bg-[#FFD60A]",
            fillBg: "bg-[#FFD60A]",
            activeTabBg: "bg-[#FFD60A] text-ink",
        },
        email: {
            label: "Slide to Open Email Inbox",
            launchedText: "Opening Email Composer…",
            knobBg: "bg-[#00F5D4]",
            fillBg: "bg-[#00F5D4]",
            activeTabBg: "bg-[#00F5D4] text-ink",
        },
    };

    const currentConfig = channelConfig[contactMode];

    return (
        <div className="lg:hidden relative bg-ink text-cream border-[3px] border-ink shadow-[5px_5px_0px_#FF6600] overflow-hidden">
            {/* Orange ribbed header tape */}
            <div
                className="flex items-center justify-between px-3 py-1.5 border-b-[3px] border-ink"
                style={{
                    backgroundColor: "#FF6600",
                    backgroundImage:
                        "repeating-linear-gradient(90deg, rgba(26,26,26,0.16) 0px, rgba(26,26,26,0.16) 3px, transparent 3px, transparent 18px)",
                }}
            >
                <span className="inline-flex items-center gap-1.5 bg-ink text-acid px-2 py-0.5 font-mono text-[9px] font-extrabold uppercase tracking-widest">
                    <span className="relative flex w-1.5 h-1.5">
                        <span className="absolute inset-0 rounded-full bg-acid animate-ping" />
                        <span className="relative w-1.5 h-1.5 rounded-full bg-acid" />
                    </span>
                    Available now
                </span>
                <span className="font-mono text-[9px] font-extrabold uppercase tracking-widest text-ink">
                    HYD → Remote
                </span>
            </div>

            {/* Grid texture */}
            <div
                className="absolute inset-0 top-8 opacity-[0.06] pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, #CCFF00 1px, transparent 1px), linear-gradient(to bottom, #CCFF00 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                }}
            />

            <div className="relative p-4 pt-5">
                {/* Headline row with stamp */}
                <div className="relative pr-[76px] mb-3">
                    <h2 className="font-heading font-extrabold uppercase text-[1.95rem] leading-[0.9] tracking-tight text-cream">
                        Let&apos;s build
                        <br />
                        something{" "}
                        <span className="relative inline-block text-ink bg-acid px-1.5 -rotate-2 mt-1 border-[2px] border-ink shadow-[3px_3px_0px_#FF6600]">
                            impactful.
                        </span>
                    </h2>
                    <Link
                        href="/contact"
                        aria-label="Start a project"
                        className="absolute right-0 top-0 w-[70px] h-[70px] rounded-full bg-[#FFD60A] border-[2.5px] border-ink shadow-[3px_3px_0px_#CCFF00] flex items-center justify-center active:scale-95 transition-transform"
                    >
                        <svg viewBox="0 0 120 120" className="absolute inset-0 w-full h-full animate-spin-slow">
                            <defs>
                                <path id="cta-stamp-mob" d="M 60, 60 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0" />
                            </defs>
                            <text fill="#1A1A1A" fontSize="12" fontWeight="900" fontFamily="monospace" letterSpacing="1.5px">
                                <textPath href="#cta-stamp-mob">OPEN TO ROLES • LET&apos;S SHIP • </textPath>
                            </text>
                        </svg>
                        <span className="relative w-8 h-8 rounded-full bg-ink text-acid flex items-center justify-center">
                            <ArrowUpRight size={16} />
                        </span>
                    </Link>
                </div>

                <p className="font-mono text-[11px] leading-relaxed text-cream/75 mb-4">
                    GenAI · n8n automation · pipelines · full-stack. Tap a key ↓
                </p>

                {/* 2×2 Keycap speed-dial */}
                <div className="grid grid-cols-2 gap-2.5 mb-3.5">
                    {keys.map((k) => {
                        const Icon = k.icon;
                        const cls =
                            "group relative h-[88px] border-[2.5px] border-ink rounded-lg p-2.5 flex flex-col justify-between shadow-[0_5px_0_0_#FFFDF5] active:translate-y-[5px] active:shadow-none transition-all duration-75";
                        const inner = (
                            <>
                                <div className="flex items-start justify-between">
                                    <span className="font-mono text-[9px] font-black opacity-70">{k.n}</span>
                                    <span className="w-8 h-8 rounded-md bg-ink flex items-center justify-center" style={{ color: k.bg }}>
                                        <Icon size={16} />
                                    </span>
                                </div>
                                <div>
                                    <div className="font-heading font-extrabold text-[15px] uppercase leading-none tracking-tight">
                                        {k.label}
                                    </div>
                                    <div className="font-mono text-[9px] font-bold opacity-75 mt-0.5 truncate">{k.sub}</div>
                                </div>
                            </>
                        );
                        return k.href.startsWith("/") ? (
                            <Link key={k.n} href={k.href} onClick={() => buzz()} className={cls} style={{ backgroundColor: k.bg, color: k.fg }}>
                                {inner}
                            </Link>
                        ) : (
                            <a
                                key={k.n}
                                href={k.href}
                                onClick={() => buzz()}
                                {...(k.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                className={cls}
                                style={{ backgroundColor: k.bg, color: k.fg }}
                            >
                                {inner}
                            </a>
                        );
                    })}
                </div>

                {/* Copy-email ticket */}
                <button
                    type="button"
                    onClick={copyEmail}
                    className="w-full flex items-center justify-between gap-2 bg-cream text-ink border-[2.5px] border-ink border-dashed rounded-md pl-3 pr-1 py-1 mb-3.5 active:scale-[0.99] transition-transform"
                    aria-label="Copy email address"
                >
                    <span className="font-mono text-[10.5px] font-bold truncate">{EMAIL}</span>
                    <span
                        className={`flex-shrink-0 inline-flex items-center gap-1 px-2 py-1 font-mono text-[9px] font-black uppercase border-[2px] border-ink rounded transition-colors ${
                            copied ? "bg-acid text-ink" : "bg-ink text-acid"
                        }`}
                    >
                        {copied ? <Check size={11} /> : <Copy size={11} />}
                        {copied ? "Copied" : "Copy"}
                    </span>
                </button>

                {/* Direct Action Channel Selector Pills */}
                <div className="flex items-center justify-between gap-1 mb-2 px-0.5">
                    <span className="font-mono text-[9px] font-black uppercase text-cream/70 tracking-wider">
                        DIRECT DISPATCH:
                    </span>
                    <div className="flex gap-1">
                        <button
                            type="button"
                            onClick={() => {
                                buzz(10);
                                setContactMode("whatsapp");
                            }}
                            className={`px-2 py-1 font-mono text-[9px] font-black uppercase rounded border transition-all ${
                                contactMode === "whatsapp"
                                    ? "bg-[#25D366] text-ink border-ink shadow-[2px_2px_0px_#FFFDF5]"
                                    : "bg-ink text-cream/65 border-cream/20"
                            }`}
                        >
                            💬 WhatsApp
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                buzz(10);
                                setContactMode("call");
                            }}
                            className={`px-2 py-1 font-mono text-[9px] font-black uppercase rounded border transition-all ${
                                contactMode === "call"
                                    ? "bg-[#FFD60A] text-ink border-ink shadow-[2px_2px_0px_#FFFDF5]"
                                    : "bg-ink text-cream/65 border-cream/20"
                            }`}
                        >
                            📞 Call
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                buzz(10);
                                setContactMode("email");
                            }}
                            className={`px-2 py-1 font-mono text-[9px] font-black uppercase rounded border transition-all ${
                                contactMode === "email"
                                    ? "bg-[#00F5D4] text-ink border-ink shadow-[2px_2px_0px_#FFFDF5]"
                                    : "bg-ink text-cream/65 border-cream/20"
                            }`}
                        >
                            ✉️ Email
                        </button>
                    </div>
                </div>

                {/* Direct Contact Slider (Moving arrow directly triggers contact!) */}
                <div
                    ref={trackRef}
                    className="relative h-[64px] rounded-full bg-[#2A2A2A] border-[2.5px] border-cream/25 p-1 overflow-hidden mb-3 select-none"
                >
                    <motion.div
                        className={`absolute left-1 top-1 bottom-1 rounded-full ${currentConfig.fillBg}`}
                        style={{ width: fillWidth }}
                    />
                    <motion.span
                        style={{ opacity: hintOpacity }}
                        className="absolute inset-0 flex items-center justify-center pl-10 font-mono text-[10px] font-black uppercase tracking-[0.14em] text-cream/90 pointer-events-none"
                    >
                        <span className="knk-shimmer">{currentConfig.label}</span>
                    </motion.span>
                    {launched && (
                        <span className="absolute inset-0 flex items-center justify-center font-mono text-[11px] font-black uppercase tracking-widest text-ink pointer-events-none z-20">
                            {currentConfig.launchedText}
                        </span>
                    )}
                    <motion.div
                        drag="x"
                        dragConstraints={trackRef}
                        dragElastic={0}
                        dragMomentum={false}
                        onDragEnd={onDragEnd}
                        onClick={() => triggerDirectContact(contactMode)}
                        style={{ x }}
                        whileTap={{ scale: 0.94 }}
                        className={`relative z-10 w-[52px] h-[52px] rounded-full ${currentConfig.knobBg} border-[2.5px] border-ink flex items-center justify-center text-ink cursor-grab active:cursor-grabbing touch-none shadow-[2px_2px_0px_#1A1A1A]`}
                        aria-label={`Slide or tap to contact via ${contactMode}`}
                    >
                        {launched ? (
                            <Check size={22} strokeWidth={3} className="text-ink animate-scale-up" />
                        ) : (
                            <ArrowRight size={22} strokeWidth={3} className="text-ink" />
                        )}
                    </motion.div>
                </div>

                {/* Mobile-Only Feature: 1-Tap Save to Phone Contacts (vCard .vcf) */}
                <button
                    type="button"
                    onClick={downloadVCard}
                    className="w-full flex items-center justify-between gap-2 bg-[#FFE14D] text-ink border-[2.5px] border-ink p-2.5 rounded-lg mb-4 shadow-[3px_3px_0px_#1A1A1A] active:translate-y-0.5 transition-transform"
                    aria-label="Save K. Nanda Kishore to phone contacts"
                >
                    <div className="flex items-center gap-2 text-left min-w-0">
                        <span className="w-8 h-8 rounded-md bg-ink text-acid flex items-center justify-center flex-shrink-0">
                            <Contact2 size={16} />
                        </span>
                        <div className="min-w-0">
                            <div className="font-heading font-black text-xs uppercase leading-tight truncate">
                                Save Contact Card to Phone
                            </div>
                            <div className="font-mono text-[9px] font-bold text-ink/75 truncate">
                                +91 6309718153 · nandureddy817.kalluri@gmail.com
                            </div>
                        </div>
                    </div>
                    <span
                        className={`flex-shrink-0 px-2 py-1 font-mono text-[8.5px] font-black uppercase border-[2px] border-ink rounded transition-colors ${
                            vcardSaved ? "bg-acid text-ink" : "bg-ink text-acid"
                        }`}
                    >
                        {vcardSaved ? "SAVED ✓" : "SAVE VCARD ⬇"}
                    </span>
                </button>

                {/* Footer row */}
                <div className="flex items-center justify-between pt-3 border-t-[2px] border-cream/10">
                    <span className="flex items-center gap-1.5 font-mono text-[9.5px] font-bold uppercase tracking-wider text-cream/60">
                        <Sparkles size={12} className="text-acid" />
                        K. Nanda Kishore · Aurora × NIAT
                    </span>
                    <button
                        type="button"
                        onClick={onTop}
                        aria-label="Back to top"
                        className="w-10 h-10 rounded-full bg-cream text-ink border-[2.5px] border-ink flex items-center justify-center shadow-[2px_2px_0px_#CCFF00] active:translate-y-0.5"
                    >
                        <ArrowUp size={16} strokeWidth={3} />
                    </button>
                </div>
            </div>

            <style>{`
                .knk-shimmer {
                    background: linear-gradient(90deg, rgba(255,253,245,0.45) 0%, #FFFDF5 50%, rgba(255,253,245,0.45) 100%);
                    background-size: 200% 100%;
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                    animation: knkShimmer 2.2s linear infinite;
                }
                @keyframes knkShimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }
            `}</style>
        </div>
    );
}

export function CtaSection() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-14 reveal-up">
            {/* ═══ MOBILE (< lg): Compact Dispatch Console ═══ */}
            <MobileDispatchConsole onTop={scrollToTop} />

            {/* ═══ DESKTOP (lg+): Original layout, unchanged ═══ */}
            {/* Outer Vivid Tangerine Ribbed Jacket Frame */}
            <div
                className="hidden lg:block neo-card p-3 sm:p-5 md:p-7 relative overflow-hidden"
                style={{
                    backgroundColor: "#FF6600",
                    backgroundImage: `
                        repeating-linear-gradient(
                            90deg,
                            rgba(26, 26, 26, 0.14) 0px,
                            rgba(26, 26, 26, 0.14) 4px,
                            transparent 4px,
                            transparent 28px
                        )
                    `,
                }}
            >
                {/* Inner High-Contrast Obsidian & Cream Dispatch Deck */}
                <div className="bg-ink text-cream border-[3px] border-ink p-6 sm:p-10 md:p-12 relative overflow-hidden">
                    <div
                        className="absolute inset-0 opacity-[0.07] pointer-events-none"
                        style={{
                            backgroundImage:
                                "linear-gradient(to right, #CCFF00 1px, transparent 1px), linear-gradient(to bottom, #CCFF00 1px, transparent 1px)",
                            backgroundSize: "32px 32px",
                        }}
                    />

                    {/* Top Dispatch Status Bar */}
                    <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-6 mb-8 border-b-[2px] border-cream/15">
                        <div className="inline-flex items-center gap-2 bg-acid text-ink border-[2px] border-ink px-3 py-1 font-mono text-[10px] sm:text-xs font-extrabold uppercase tracking-widest">
                            <span className="w-2 h-2 rounded-full bg-ink animate-ping" />
                            DISPATCH // READY FOR COLLABORATION
                        </div>

                        <div className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-cream/70">
                            HYDERABAD, INDIA · REMOTE WORLDWIDE
                        </div>
                    </div>

                    {/* Main Headline + Rotating Circular Stamp */}
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
                        <div className="lg:col-span-8">
                            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight leading-[0.92] text-cream mb-4">
                                Let&apos;s Engineer<br />
                                Something <span className="text-acid underline decoration-vivid decoration-4 underline-offset-8">Impactful.</span>
                            </h2>
                            <p className="font-mono text-xs sm:text-sm md:text-base text-cream/85 max-w-xl leading-relaxed">
                                Looking for a driven builder in Generative AI, n8n workflow automation, multi-stage pipelines, or modern full-stack web products? Pick a channel below.
                            </p>
                        </div>

                        <div className="lg:col-span-4 flex lg:justify-end">
                            <Link
                                href="/contact"
                                className="group relative w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-[#FFD60A] border-[3px] border-ink shadow-[5px_5px_0px_0px_#CCFF00] flex items-center justify-center hover:scale-105 transition-transform"
                                aria-label="Start a project via contact page"
                            >
                                <svg viewBox="0 0 120 120" className="w-full h-full p-1.5 animate-spin-slow">
                                    <defs>
                                        <path
                                            id="cta-stamp-circle"
                                            d="M 60, 60 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
                                        />
                                    </defs>
                                    <text
                                        fill="#1A1A1A"
                                        fontSize="8.5"
                                        fontWeight="800"
                                        fontFamily="monospace"
                                        letterSpacing="1.4px"
                                    >
                                        <textPath href="#cta-stamp-circle" startOffset="0%">
                                            OPEN FOR AI &amp; SWE ROLES • LET&apos;S SHIP •
                                        </textPath>
                                    </text>
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-14 h-14 rounded-full bg-ink text-acid border-[2px] border-ink flex items-center justify-center group-hover:bg-electric group-hover:text-cream transition-colors">
                                        <ArrowUpRight size={24} />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* 4 Tactile Color-Coded Action Tickets */}
                    <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                        <a
                            href="mailto:nandureddy817.kalluri@gmail.com"
                            className="bg-acid text-ink border-[3px] border-ink p-4 shadow-[4px_4px_0px_0px_#FFFDF5] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex flex-col justify-between group"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span className="font-mono text-[10px] font-extrabold uppercase bg-ink text-acid px-2 py-0.5">
                                    01 // EMAIL
                                </span>
                                <Mail size={18} className="group-hover:scale-110 transition-transform" />
                            </div>
                            <div>
                                <div className="font-heading font-extrabold text-base uppercase tracking-tight">
                                    Email Direct
                                </div>
                                <div className="font-mono text-[11px] font-bold opacity-85 truncate mt-0.5">
                                    nandureddy817.kalluri@gmail.com
                                </div>
                            </div>
                        </a>

                        <a
                            href="https://wa.me/916309718153?text=Hi%20Nanda%20Kishore%2C%20I%20saw%20your%20portfolio%20and%20want%20to%20connect%20with%20you!"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#25D366] text-ink border-[3px] border-ink p-4 shadow-[4px_4px_0px_0px_#FFFDF5] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex flex-col justify-between group"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span className="font-mono text-[10px] font-extrabold uppercase bg-ink text-[#25D366] px-2 py-0.5">
                                    02 // WHATSAPP
                                </span>
                                <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
                            </div>
                            <div>
                                <div className="font-heading font-extrabold text-base uppercase tracking-tight flex items-center gap-1.5">
                                    WhatsApp Direct <ArrowUpRight size={14} className="opacity-70 group-hover:opacity-100" />
                                </div>
                                <div className="font-mono text-xs font-bold opacity-90 mt-0.5">
                                    +91 6309718153 · Instant Chat ↗
                                </div>
                            </div>
                        </a>

                        <a
                            href="https://github.com/nandu-reddy-kalluri"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-electric text-cream border-[3px] border-ink p-4 shadow-[4px_4px_0px_0px_#FFFDF5] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex flex-col justify-between group"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span className="font-mono text-[10px] font-extrabold uppercase bg-ink text-acid px-2 py-0.5">
                                    03 // GITHUB
                                </span>
                                <Github size={18} className="group-hover:scale-110 transition-transform" />
                            </div>
                            <div>
                                <div className="font-heading font-extrabold text-base uppercase tracking-tight">
                                    Source Archive
                                </div>
                                <div className="font-mono text-xs font-bold text-cream/90 truncate mt-0.5">
                                    @nandu-reddy-kalluri
                                </div>
                            </div>
                        </a>

                        <Link
                            href="/contact"
                            className="bg-[#FF2A6D] text-cream border-[3px] border-ink p-4 shadow-[4px_4px_0px_0px_#FFFDF5] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex flex-col justify-between group"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span className="font-mono text-[10px] font-extrabold uppercase bg-ink text-cream px-2 py-0.5">
                                    04 // BRIEF
                                </span>
                                <MessageSquare size={18} className="group-hover:scale-110 transition-transform" />
                            </div>
                            <div>
                                <div className="font-heading font-extrabold text-base uppercase tracking-tight">
                                    Project Form
                                </div>
                                <div className="font-mono text-xs font-bold text-cream/90 mt-0.5">
                                    Send a structured brief →
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Bottom Colophon Bar */}
                    <div className="relative z-10 pt-6 border-t-[2px] border-cream/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-2 font-mono text-xs text-cream/75">
                            <Sparkles size={14} className="text-acid" />
                            <span>CRAFTED BY K. NANDA KISHORE · AURORA × NIAT</span>
                        </div>

                        <button
                            type="button"
                            onClick={scrollToTop}
                            className="bg-cream text-ink hover:bg-acid border-[2px] border-ink px-4 py-2 font-mono text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-2 transition-colors"
                        >
                            <span>Back to Top</span>
                            <ArrowUp size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
