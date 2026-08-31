"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface CommandItem {
    prompt: string;
    statusSymbol: string;
    statusText: string;
    details: string;
    delay: number;
    href?: string;
    isExternal?: boolean;
}

const commands: CommandItem[] = [
    {
        prompt: "$ legal-ai-agent",
        statusSymbol: "✓",
        statusText: "LIVE",
        details: "Python · Streamlit · Generative AI",
        delay: 0,
        href: "https://legal-ai-agent-vdypr3xqmd6cvk7tr8d2r9.streamlit.app/",
        isExternal: true,
    },
    {
        prompt: "$ cup-cozy",
        statusSymbol: "✓",
        statusText: "DEPLOYED",
        details: "Web · UI/UX · Vercel",
        delay: 380,
        href: "https://cup-cozy-site.vercel.app/",
        isExternal: true,
    },
    {
        prompt: "$ wearrange",
        statusSymbol: "→",
        statusText: "BUILDING",
        details: "Next.js · React · Wedding platform",
        delay: 760,
        href: "/work/wearrange",
        isExternal: false,
    },
    {
        prompt: "$ ai-pipelines",
        statusSymbol: "→",
        statusText: "EXPERIMENTING",
        details: "Gemini · n8n · APIs · Automation",
        delay: 1140,
        href: "/work/ai-workflow-experiments",
        isExternal: false,
    },
];

export default function LiveTerminal() {
    const prefersReduced = useReducedMotion();
    const [visibleLines, setVisibleLines] = useState(prefersReduced ? commands.length : 0);
    const [typedChars, setTypedChars] = useState<number[]>(
        prefersReduced ? commands.map((c) => c.prompt.length) : []
    );

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
                }, 16);
                intervalIds.push(typeInterval);
            }, cmd.delay);
            timeoutIds.push(timeoutId);
        });

        return () => {
            timeoutIds.forEach(clearTimeout);
            intervalIds.forEach(clearInterval);
        };
    }, [prefersReduced]);

    return (
        <div className="neo-card bg-ink text-cream p-5 md:p-6 font-mono text-xs md:text-sm relative overflow-hidden reveal-up">
            {/* Terminal header */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-cream/10">
                <div className="w-2.5 h-2.5 bg-hotpink" />
                <div className="w-2.5 h-2.5 bg-acid" />
                <div className="w-2.5 h-2.5 bg-electric" />
                <span className="ml-2 text-cream/70 text-xs uppercase tracking-widest font-bold">
                    NANDA@AI-LAB
                </span>
            </div>

            {/* Lines */}
            <div className="space-y-3">
                {commands.slice(0, visibleLines).map((cmd, i) => {
                    const chars = typedChars[i] || 0;
                    const promptText = cmd.prompt.slice(0, chars);
                    const isComplete = chars >= cmd.prompt.length;

                    return (
                        <div key={i} className="group/line">
                            {/* Command prompt */}
                            <div className="flex items-start gap-0">
                                {cmd.href ? (
                                    <a
                                        href={cmd.href}
                                        target={cmd.isExternal ? "_blank" : undefined}
                                        rel={cmd.isExternal ? "noopener noreferrer" : undefined}
                                        className="text-acid font-bold hover:underline inline-flex items-center gap-1"
                                    >
                                        <span>{promptText}</span>
                                    </a>
                                ) : (
                                    <span className="text-acid font-bold select-none">{promptText}</span>
                                )}

                                {!isComplete && (
                                    <span className="inline-block w-2 h-4 bg-acid animate-blink ml-0.5" />
                                )}
                            </div>

                            {/* Status result line */}
                            {isComplete && (
                                <motion.div
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2, delay: 0.1 }}
                                    className="text-cream/80 mt-1 pl-3 border-l-2 border-cream/20 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs sm:text-sm"
                                >
                                    <span
                                        className={`font-bold ${
                                            cmd.statusSymbol === "✓" ? "text-acid" : "text-electric"
                                        }`}
                                    >
                                        {cmd.statusSymbol} {cmd.statusText}
                                    </span>
                                    <span className="text-cream/40 hidden sm:inline">·</span>
                                    <span className="text-cream/70">{cmd.details}</span>
                                </motion.div>
                            )}
                        </div>
                    );
                })}

                {/* Final prompt and blinking cursor */}
                {visibleLines >= commands.length &&
                    (typedChars[commands.length - 1] || 0) >= commands[commands.length - 1].prompt.length && (
                        <div className="flex items-center gap-1 pt-1">
                            <span className="text-acid font-bold">$</span>
                            <span className="inline-block w-2 h-4 bg-acid animate-blink" />
                        </div>
                    )}
            </div>
        </div>
    );
}
