"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Radio, Cpu, Sparkles, X, ChevronUp } from "lucide-react";

export default function TelemetryHUD() {
    const [isOpen, setIsOpen] = useState(false);
    const [time, setTime] = useState("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const updateClock = () => {
            const now = new Date();
            setTime(
                now.toLocaleTimeString("en-IN", {
                    timeZone: "Asia/Kolkata",
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                })
            );
        };
        updateClock();
        const timer = setInterval(updateClock, 1000);
        return () => clearInterval(timer);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed bottom-16 right-4 z-[90] hidden lg:block font-mono">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="mb-2 w-72 neo-card bg-cream border-[3px] border-ink p-4 shadow-neo text-ink text-xs"
                    >
                        <div className="flex items-center justify-between border-b-[2px] border-ink/20 pb-2 mb-3">
                            <span className="font-heading font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5 text-electric">
                                <Cpu size={14} /> System Telemetry
                            </span>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-5 h-5 flex items-center justify-center hover:bg-ink hover:text-cream transition-colors"
                            >
                                <X size={12} />
                            </button>
                        </div>

                        <div className="space-y-2 font-mono text-[11px]">
                            <div className="flex justify-between items-center">
                                <span className="opacity-60">Status:</span>
                                <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-acid font-bold">
                                    <span className="w-1.5 h-1.5 bg-emerald-500 dark:bg-acid rounded-full animate-pulse" />
                                    ONLINE (PROD)
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="opacity-60">Engineers Hub:</span>
                                <span className="font-bold">Hyderabad, IN</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="opacity-60">Time (IST):</span>
                                <span className="font-bold bg-ink/5 px-1.5 py-0.5 border border-ink/10">{time}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="opacity-60">Active Agents:</span>
                                <span className="text-electric font-bold">6 Pipelines Live</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="opacity-60">Tech Stack:</span>
                                <span className="font-bold">Gemini · n8n · Next.js</span>
                            </div>
                        </div>

                        <div className="mt-3 pt-2 border-t-[2px] border-ink/10 flex items-center justify-between text-[10px] text-ink/50 uppercase tracking-widest font-bold">
                            <span>K. NANDA KISHORE</span>
                            <span className="text-acid bg-ink px-1 py-0.5">V2.4</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Collapsed Pill Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="neo-card bg-ink text-cream hover:bg-acid hover:text-ink px-3 py-1.5 border-[2px] border-ink shadow-neo-sm flex items-center gap-2 text-xs font-bold transition-all group"
            >
                <span className="w-2 h-2 rounded-full bg-acid group-hover:bg-ink animate-pulse-dot" />
                <span className="text-[11px] tracking-wider uppercase">SYS · {time || "LIVE"}</span>
                {isOpen ? <X size={12} /> : <ChevronUp size={12} className="group-hover:-translate-y-0.5 transition-transform" />}
            </button>
        </div>
    );
}
