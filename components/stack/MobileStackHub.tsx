"use client";

import React, { useState } from "react";
import Link from "next/link";
import { categories, learning } from "./StackPageContent";
import { Sparkles, ArrowUpRight, Check, ChevronDown, ChevronUp, Bot, Cpu, Code2, Wrench, Flame } from "lucide-react";

export function MobileStackHub() {
    const [selectedCat, setSelectedCat] = useState<string>("all");
    const [expandedTool, setExpandedTool] = useState<string | null>(null);

    const buzz = (ms = 12) => {
        try {
            if (typeof navigator !== "undefined" && "vibrate" in navigator) {
                navigator.vibrate(ms);
            }
        } catch {}
    };

    const handleSelectCat = (id: string) => {
        buzz();
        setSelectedCat(id);
        setExpandedTool(null);
    };

    const toggleTool = (toolName: string) => {
        buzz(15);
        setExpandedTool((prev) => (prev === toolName ? null : toolName));
    };

    // Filter tools
    const allTools = categories.flatMap((c) =>
        c.tools.map((t) => ({ ...t, catCode: c.code, catName: c.name, pillBg: c.pillBg }))
    );

    const displayedTools =
        selectedCat === "all"
            ? allTools
            : allTools.filter((t) => t.catCode === selectedCat);

    const totalCount = allTools.length;

    const depthColor = (depth: string) => {
        switch (depth) {
            case "daily":
                return "bg-acid text-ink";
            case "frequent":
                return "bg-[#FFD60A] text-ink";
            default:
                return "bg-cream text-ink";
        }
    };

    return (
        <div className="lg:hidden max-w-7xl mx-auto px-4 mb-10">
            {/* ─── 1. CATEGORY FILTER TABS (High-Density Hub) ─── */}
            <div className="flex flex-wrap gap-1.5 mb-3.5">
                <button
                    type="button"
                    onClick={() => handleSelectCat("all")}
                    className={`px-2.5 py-1.5 font-mono text-[10px] font-extrabold uppercase border-[2px] border-ink transition-all ${
                        selectedCat === "all"
                            ? "bg-acid text-ink shadow-[2px_2px_0px_#1A1A1A] -translate-y-0.5"
                            : "bg-cream text-ink/75"
                    }`}
                >
                    All ({totalCount})
                </button>
                {categories.map((c) => (
                    <button
                        key={c.code}
                        type="button"
                        onClick={() => handleSelectCat(c.code)}
                        className={`px-2 py-1.5 font-mono text-[10px] font-extrabold uppercase border-[2px] border-ink transition-all ${
                            selectedCat === c.code
                                ? `${c.jacketBg} shadow-[2px_2px_0px_#1A1A1A] -translate-y-0.5`
                                : "bg-cream text-ink/75"
                        }`}
                    >
                        {c.code}. {c.shortTab.split(" ")[1]} ({c.tools.length})
                    </button>
                ))}
                <button
                    type="button"
                    onClick={() => handleSelectCat("learning")}
                    className={`px-2.5 py-1.5 font-mono text-[10px] font-extrabold uppercase border-[2px] border-ink transition-all ${
                        selectedCat === "learning"
                            ? "bg-[#FF2A6D] text-cream shadow-[2px_2px_0px_#1A1A1A] -translate-y-0.5"
                            : "bg-cream text-ink/75"
                    }`}
                >
                    🔥 R&amp;D ({learning.length})
                </button>
            </div>

            {/* ─── 2. ACTIVE TOOLS GRID (Keycaps with Tap-to-Inspect Spec) ─── */}
            {selectedCat !== "learning" ? (
                <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between px-1 text-[10px] font-mono font-bold text-ink/70">
                        <span>TAP ANY KEYCAP TO INSPECT SPEC</span>
                        <span>{displayedTools.length} TOOLS LISTED</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        {displayedTools.map((t) => {
                            const isExpanded = expandedTool === t.name;
                            return (
                                <div
                                    key={t.name}
                                    onClick={() => toggleTool(t.name)}
                                    className={`cursor-pointer border-[2.5px] border-ink p-2.5 flex flex-col justify-between transition-all select-none ${
                                        isExpanded
                                            ? "bg-[#FFE14D] shadow-[3px_3px_0px_#1A1A1A] col-span-2"
                                            : "bg-cream hover:bg-[#F4F0E4] shadow-[2px_2px_0px_#1A1A1A]"
                                    }`}
                                >
                                    <div className="flex items-center justify-between gap-1 mb-1.5">
                                        <span className={`px-1.5 py-0.5 border border-ink font-mono text-[8.5px] font-black uppercase ${depthColor(t.depth)}`}>
                                            {t.depth}
                                        </span>
                                        <span className="font-mono text-[8px] font-bold text-ink/60">
                                            {t.catCode}
                                        </span>
                                    </div>

                                    <div className="font-heading font-extrabold text-xs uppercase text-ink leading-tight truncate">
                                        {t.name}
                                    </div>

                                    {/* Expanded Spec Detail */}
                                    {isExpanded && (
                                        <div className="mt-2 pt-2 border-t border-ink/20 animate-in fade-in duration-150">
                                            <p className="font-mono text-[10.5px] text-ink/90 leading-snug">
                                                {t.detail}
                                            </p>
                                            <div className="mt-2 flex items-center justify-between text-[9px] font-mono font-bold text-ink/70">
                                                <span>Pillar: {t.catName}</span>
                                                <span className="bg-ink text-acid px-1.5 py-0.5 font-bold uppercase">
                                                    Verified in Code
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                /* ─── R&D / CURRENTLY LEARNING GRID ─── */
                <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between px-1 text-[10px] font-mono font-bold text-ink/70">
                        <span>ACTIVE R&amp;D EXPLORATIONS</span>
                        <span>4 AREAS</span>
                    </div>

                    <div className="space-y-2">
                        {learning.map((item, idx) => (
                            <div
                                key={item.name}
                                className="border-[2.5px] border-ink p-3 bg-cream shadow-[3px_3px_0px_#1A1A1A]"
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-mono text-[9px] font-extrabold uppercase bg-ink text-acid px-1.5 py-0.5">
                                        R&amp;D // 0{idx + 1}
                                    </span>
                                    <span className={`px-2 py-0.5 font-mono text-[8.5px] font-black uppercase border border-ink ${item.bg}`}>
                                        ACTIVE RESEARCH
                                    </span>
                                </div>
                                <div className="font-heading font-extrabold text-sm uppercase text-ink mt-1">
                                    {item.name}
                                </div>
                                <p className="font-mono text-[10.5px] text-ink/80 leading-snug mt-1">
                                    {item.reason}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ─── 3. QUICK CTA STRIP (1 Screen Friendly) ─── */}
            <div className="bg-ink text-cream border-[2.5px] border-ink p-3.5 shadow-[4px_4px_0px_#CCFF00] flex items-center justify-between gap-3">
                <div className="min-w-0">
                    <div className="font-mono text-[9px] font-extrabold uppercase text-acid">
                        HAVE A TECH QUERY?
                    </div>
                    <div className="font-heading font-bold text-xs uppercase text-cream truncate">
                        See Stack in Action in Case Files
                    </div>
                </div>
                <Link
                    href="/work"
                    className="flex-shrink-0 bg-acid text-ink px-3 py-1.5 font-mono text-[10px] font-black uppercase tracking-wider border border-ink shadow-[2px_2px_0px_#FFFDF5] inline-flex items-center gap-1 active:translate-y-0.5"
                >
                    <span>View Builds</span>
                    <ArrowUpRight size={12} />
                </Link>
            </div>
        </div>
    );
}

