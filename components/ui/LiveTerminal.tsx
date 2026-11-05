"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Terminal, Sparkles, RotateCcw, ArrowUpRight } from "lucide-react";

interface CommandItem {
    prompt: string;
    statusSymbol: string;
    statusText: string;
    badgeBg: string;
    details: string;
    delay: number;
    href?: string;
    isExternal?: boolean;
}

interface InteractiveLog {
    id: number;
    cmd: string;
    badge: string;
    badgeBg: string;
    output: string;
    linkLabel?: string;
    linkHref?: string;
    isExternal?: boolean;
}

const commands: CommandItem[] = [
    {
        prompt: "$ legal-ai-agent --status",
        statusSymbol: "✓",
        statusText: "LIVE [200 OK]",
        badgeBg: "bg-acid text-ink",
        details: "Python · Streamlit · Generative AI Clause Engine",
        delay: 0,
        href: "https://legal-ai-agent-vdypr3xqmd6cvk7tr8d2r9.streamlit.app/",
        isExternal: true,
    },
    {
        prompt: "$ cup-cozy --edge",
        statusSymbol: "✓",
        statusText: "DEPLOYED [VERCEL]",
        badgeBg: "bg-[#FFD60A] text-ink",
        details: "Responsive Web · Tactile UI/UX · Production",
        delay: 320,
        href: "https://cup-cozy-site.vercel.app/",
        isExternal: true,
    },
    {
        prompt: "$ wearrange --build",
        statusSymbol: "→",
        statusText: "ACTIVE BUILD",
        badgeBg: "bg-[#FF2A6D] text-cream",
        details: "Next.js · React · Full-Stack Wedding Venue Platform",
        delay: 640,
        href: "/work/wearrange",
        isExternal: false,
    },
    {
        prompt: "$ ai-pipelines --inspect",
        statusSymbol: "→",
        statusText: "ORCHESTRATING",
        badgeBg: "bg-electric text-cream",
        details: "Google Gemini · Claude · n8n Webhooks · Twilio APIs",
        delay: 960,
        href: "/work/ai-workflow-experiments",
        isExternal: false,
    },
];

const quickCommands: Omit<InteractiveLog, "id">[] = [
    {
        cmd: "whoami --vibe",
        badge: "IDENTITY",
        badgeBg: "bg-acid text-ink",
        output: "K. Nanda Kishore // B.Tech @ Aurora × NIAT (Hyderabad, IN). Shipping practical Generative AI agents, n8n automations, and high-craft Next.js web systems.",
    },
    {
        cmd: "test whatsapp-bot",
        badge: "WEBHOOK 200",
        badgeBg: "bg-electric text-cream",
        output: "Simulated Twilio inbound message → n8n webhook router → Gemini 2.0 Flash recommendation → validated JSON reply in 554ms.",
        linkLabel: "VIEW BOT ARCHITECTURE ↗",
        linkHref: "/work/whatsapp-ai-chatbot",
        isExternal: false,
    },
    {
        cmd: "launch legal-ai",
        badge: "STREAMLIT",
        badgeBg: "bg-[#FFD60A] text-ink",
        output: "Legal AI Agent is live and accepting queries on Streamlit Cloud.",
        linkLabel: "OPEN LIVE APP ↗",
        linkHref: "https://legal-ai-agent-vdypr3xqmd6cvk7tr8d2r9.streamlit.app/",
        isExternal: true,
    },
    {
        cmd: "stack --matrix",
        badge: "ARSENAL",
        badgeBg: "bg-[#FF2A6D] text-cream",
        output: "AI: Gemini, Claude, Prompt Gates | AUTO: n8n, Twilio, Webhooks, REST | WEB: Next.js, React, Tailwind CSS, Python, Streamlit, SQL.",
    },
    {
        cmd: "hire --direct",
        badge: "OPEN NOW",
        badgeBg: "bg-vivid text-ink",
        output: "Direct dispatch ready → nandureddy817.kalluri@gmail.com | Phone/WhatsApp: +91 6309718153",
        linkLabel: "SEND EMAIL DISPATCH ↗",
        linkHref: "mailto:nandureddy817.kalluri@gmail.com",
        isExternal: false,
    },
];

export default function LiveTerminal() {
    const prefersReduced = useReducedMotion();
    const [visibleLines, setVisibleLines] = useState(prefersReduced ? commands.length : 0);
    const [typedChars, setTypedChars] = useState<number[]>(
        prefersReduced ? commands.map((c) => c.prompt.length) : []
    );
    const [customLogs, setCustomLogs] = useState<InteractiveLog[]>([]);

    useEffect(() => {
        if (prefersReduced) {
            setVisibleLines(commands.length);
            setTypedChars(commands.map((c) => c.prompt.length));
            return;
        }

        const timeoutIds: ReturnType<typeof setTimeout>[] = [];
        const intervalIds: ReturnType<typeof setInterval>[] = [];

        commands.forEach((cmd, i) => {
            const timeoutId = setTimeout(() => {
                setVisibleLines(i + 1);
                let charIndex = 0;
                const typeInterval = setInterval(() => {
                    charIndex++;
                    setTypedChars((prev) => {
                        const newArr = [...prev];
                        newArr[i] = charIndex;
                        return newArr;
                    });
                    if (charIndex >= cmd.prompt.length) {
                        clearInterval(typeInterval);
                    }
                }, 14);
                intervalIds.push(typeInterval);
            }, cmd.delay);
            timeoutIds.push(timeoutId);
        });

        return () => {
            timeoutIds.forEach(clearTimeout);
            intervalIds.forEach(clearInterval);
        };
    }, [prefersReduced]);

    const runQuickCommand = (qc: Omit<InteractiveLog, "id">) => {
        setCustomLogs((prev) => [
            ...prev.slice(-2),
            { ...qc, id: Date.now() + Math.random() },
        ]);
    };

    return (
        <div className="bg-acid p-3 sm:p-4 border-[3px] border-ink shadow-[7px_7px_0px_#1A1A1A] reveal-up">
            {/* Inner Obsidian Cyber Deck */}
            <div className="bg-ink text-cream border-[3px] border-ink p-4 sm:p-6 font-mono text-xs md:text-sm relative overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b-[2px] border-cream/15">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-[#FF2A6D] border border-cream/40" />
                        <div className="w-3 h-3 bg-[#FFD60A] border border-cream/40" />
                        <div className="w-3 h-3 bg-acid border border-cream/40" />
                        <span className="ml-1.5 text-cream font-extrabold text-xs uppercase tracking-widest flex items-center gap-1.5">
                            <Terminal size={13} className="text-acid" /> NANDA@AI-LAB // COMMAND SHELL
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-acid text-ink text-[10px] font-extrabold uppercase">
                            ● TTY1 ONLINE
                        </span>
                        {customLogs.length > 0 && (
                            <button
                                type="button"
                                onClick={() => setCustomLogs([])}
                                className="px-2 py-0.5 bg-[#FF2A6D] text-cream text-[10px] font-extrabold uppercase inline-flex items-center gap-1"
                            >
                                <RotateCcw size={10} /> CLEAR
                            </button>
                        )}
                    </div>
                </div>

                {/* Auto-Typed Boot Telemetry */}
                <div className="space-y-3">
                    {commands.slice(0, visibleLines).map((cmd, i) => {
                        const chars = typedChars[i] || 0;
                        const promptText = cmd.prompt.slice(0, chars);
                        const isComplete = chars >= cmd.prompt.length;

                        return (
                            <div key={i} className="group/line">
                                <div className="flex items-start gap-0">
                                    {cmd.href ? (
                                        <a
                                            href={cmd.href}
                                            target={cmd.isExternal ? "_blank" : undefined}
                                            rel={cmd.isExternal ? "noopener noreferrer" : undefined}
                                            className="text-acid font-extrabold hover:underline inline-flex items-center gap-1"
                                        >
                                            <span>{promptText}</span>
                                        </a>
                                    ) : (
                                        <span className="text-acid font-extrabold select-none">{promptText}</span>
                                    )}

                                    {!isComplete && (
                                        <span className="inline-block w-2 h-4 bg-acid animate-blink ml-0.5" />
                                    )}
                                </div>

                                {isComplete && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -6 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.18 }}
                                        className="text-cream/85 mt-1 pl-3 border-l-2 border-cream/25 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs"
                                    >
                                        <span className={`font-extrabold px-2 py-0.5 text-[10px] ${cmd.badgeBg}`}>
                                            {cmd.statusSymbol} {cmd.statusText}
                                        </span>
                                        <span className="text-cream/80">{cmd.details}</span>
                                    </motion.div>
                                )}
                            </div>
                        );
                    })}

                    {/* User-Triggered Interactive Command Outputs */}
                    <AnimatePresence>
                        {customLogs.map((log) => (
                            <motion.div
                                key={log.id}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="pt-2 border-t border-cream/10"
                            >
                                <div className="text-[#FFD60A] font-extrabold">
                                    $ {log.cmd}
                                </div>
                                <div className="mt-1 pl-3 border-l-2 border-[#FFD60A] space-y-1.5">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className={`px-2 py-0.5 text-[10px] font-extrabold uppercase ${log.badgeBg}`}>
                                            {log.badge}
                                        </span>
                                        <span className="text-cream/90 text-xs leading-relaxed">
                                            {log.output}
                                        </span>
                                    </div>
                                    {log.linkHref && (
                                        <div>
                                            <a
                                                href={log.linkHref}
                                                target={log.isExternal ? "_blank" : undefined}
                                                rel={log.isExternal ? "noopener noreferrer" : undefined}
                                                className="inline-flex items-center gap-1 px-2.5 py-1 bg-acid text-ink font-extrabold text-[10px] uppercase tracking-wider hover:bg-[#FFD60A]"
                                            >
                                                <span>{log.linkLabel}</span>
                                                <ArrowUpRight size={11} />
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Clickable Tactile Command Chips Deck */}
                <div className="mt-5 pt-4 border-t-[2px] border-cream/15">
                    <div className="text-[10px] font-extrabold uppercase tracking-widest text-acid mb-2.5 flex items-center gap-1.5">
                        <Sparkles size={11} /> TAP A COMMAND CHIP TO EXECUTE:
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {quickCommands.map((qc) => (
                            <button
                                key={qc.cmd}
                                type="button"
                                onClick={() => runQuickCommand(qc)}
                                className="px-3 py-1.5 bg-cream/10 hover:bg-acid hover:text-ink text-cream border border-cream/30 font-mono text-[11px] font-extrabold uppercase tracking-wider transition-all active:translate-y-0.5"
                            >
                                $ {qc.cmd}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
