"use client";

import React, { useEffect, useRef, useId } from "react";

export interface CurvedPathMarqueeProps {
    items?: string[];
    secondaryItems?: string[];
    speed?: number;
    direction?: "left" | "right";
    variant?: "acid" | "electric" | "hotpink" | "vivid";
    className?: string;
}

const DEFAULT_ITEMS = [
    "BUILDING PRACTICAL AI SYSTEMS",
    "N8N & INTELLIGENT AUTOMATION",
    "MULTI-STAGE AI PIPELINES",
    "CONVERSATIONAL AI & AGENTS",
    "FULL-STACK NEXT.JS & PYTHON",
    "OPEN TO ENGINEERING COLLABORATION",
];

const DEFAULT_SECONDARY_ITEMS = [
    "K. NANDA KISHORE",
    "AURORA × NIAT · B.TECH",
    "GOOGLE GEMINI · CLAUDE · N8N",
    "REACT · NEXT.JS · TYPESCRIPT",
    "STREAMLIT · TWILIO · WEBHOOKS",
    "HYDERABAD, IN · PROD READY",
];

const VARIANT_STYLES = {
    acid: {
        railColor: "#CCFF00",
        textColor: "#CCFF00",
        secondaryColor: "#0055FF",
        badgeBg: "bg-acid text-ink",
        dotColor: "bg-acid",
    },
    electric: {
        railColor: "#0055FF",
        textColor: "#FFFDF5",
        secondaryColor: "#CCFF00",
        badgeBg: "bg-electric text-cream",
        dotColor: "bg-electric",
    },
    hotpink: {
        railColor: "#FF2A6D",
        textColor: "#CCFF00",
        secondaryColor: "#FFD60A",
        badgeBg: "bg-[#FF2A6D] text-cream",
        dotColor: "bg-[#FF2A6D]",
    },
    vivid: {
        railColor: "#FF6600",
        textColor: "#CCFF00",
        secondaryColor: "#0055FF",
        badgeBg: "bg-vivid text-ink",
        dotColor: "bg-vivid",
    },
};

export default function CurvedPathMarquee({
    items = DEFAULT_ITEMS,
    secondaryItems = DEFAULT_SECONDARY_ITEMS,
    speed = 95,
    direction = "left",
    variant = "acid",
    className = "",
}: CurvedPathMarqueeProps) {
    const rawId = useId().replace(/:/g, "");
    const primaryPathId = `cyber-wave-primary-${rawId}`;
    const secondaryPathId = `cyber-wave-secondary-${rawId}`;

    const primaryTextPathRef = useRef<SVGTextPathElement | null>(null);
    const secondaryTextPathRef = useRef<SVGTextPathElement | null>(null);

    const palette = VARIANT_STYLES[variant];

    const primaryUnit = items.map((item) => ` /// ${item.trim()} `).join("") + " ";
    const secondaryUnit = secondaryItems.map((item) => ` :: ${item.trim()} `).join("") + " ";

    const REPEAT_COUNT = 6;
    const primaryFullText = primaryUnit.repeat(REPEAT_COUNT);
    const secondaryFullText = secondaryUnit.repeat(REPEAT_COUNT);

    useEffect(() => {
        const primaryEl = primaryTextPathRef.current;
        const secondaryEl = secondaryTextPathRef.current;
        if (!primaryEl) return;

        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReduced) {
            primaryEl.setAttribute("startOffset", "0px");
            if (secondaryEl) secondaryEl.setAttribute("startOffset", "0px");
            return;
        }

        let rafId: number;
        let lastTime = performance.now();

        let primaryUnitLen = primaryEl.getComputedTextLength() / REPEAT_COUNT;
        let secondaryUnitLen = secondaryEl
            ? secondaryEl.getComputedTextLength() / REPEAT_COUNT
            : 600;

        let primaryOffset = direction === "left" ? 0 : -primaryUnitLen;
        let secondaryOffset = direction === "left" ? -secondaryUnitLen : 0;

        let scrollBoost = 0;
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentY = window.scrollY;
            const delta = Math.abs(currentY - lastScrollY);
            lastScrollY = currentY;
            scrollBoost = Math.min(delta * 3.2, 260);
        };

        const handleResize = () => {
            if (primaryEl) {
                const measured = primaryEl.getComputedTextLength() / REPEAT_COUNT;
                if (measured > 0) primaryUnitLen = measured;
            }
            if (secondaryEl) {
                const measuredSec = secondaryEl.getComputedTextLength() / REPEAT_COUNT;
                if (measuredSec > 0) secondaryUnitLen = measuredSec;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleResize);

        const tick = (now: number) => {
            const dt = Math.min((now - lastTime) / 1000, 0.1);
            lastTime = now;

            scrollBoost *= 0.92;
            const currentSpeed = speed + scrollBoost;

            if (primaryUnitLen <= 0) {
                primaryUnitLen = primaryEl.getComputedTextLength() / REPEAT_COUNT || 800;
            }

            if (direction === "left") {
                primaryOffset -= currentSpeed * dt;
                if (primaryOffset <= -primaryUnitLen) {
                    primaryOffset += primaryUnitLen;
                }
                secondaryOffset += currentSpeed * 0.65 * dt;
                if (secondaryOffset >= 0) {
                    secondaryOffset -= secondaryUnitLen;
                }
            } else {
                primaryOffset += currentSpeed * dt;
                if (primaryOffset >= 0) {
                    primaryOffset -= primaryUnitLen;
                }
                secondaryOffset -= currentSpeed * 0.65 * dt;
                if (secondaryOffset <= -secondaryUnitLen) {
                    secondaryOffset += secondaryUnitLen;
                }
            }

            primaryEl.setAttribute("startOffset", `${primaryOffset.toFixed(2)}px`);
            if (secondaryEl) {
                secondaryEl.setAttribute("startOffset", `${secondaryOffset.toFixed(2)}px`);
            }

            rafId = requestAnimationFrame(tick);
        };

        rafId = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, [speed, direction, primaryFullText, secondaryFullText]);

    const primaryWaveD =
        "M -240,125 C 120,15 440,235 760,125 C 1080,15 1400,235 1720,125";
    const secondaryWaveD =
        "M -240,125 C 120,235 440,15 760,125 C 1080,235 1400,15 1720,125";

    return (
        <section
            className={`relative w-full max-w-full bg-[#0D0D0D] border-y-[3px] border-ink overflow-hidden select-none py-3 sm:py-5 md:py-6 ${className}`}
            aria-label="Engineering capabilities ribbon marquee"
        >
            <div
                className="absolute inset-0 opacity-[0.12] pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, #CCFF00 1px, transparent 1px), linear-gradient(to bottom, #CCFF00 1px, transparent 1px)",
                    backgroundSize: "36px 36px",
                }}
            />

            <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between mb-1 relative z-10">
                <div className="inline-flex items-center gap-2 font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.25em] text-cream/60">
                    <span className={`w-1.5 h-1.5 rounded-full ${palette.dotColor} animate-pulse`} />
                    <span>SYS.RIBBON // PATH_STREAM</span>
                </div>
                <span className={`px-2 py-0.5 font-mono text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider border border-ink ${palette.badgeBg}`}>
                    LIVE TELEMETRY
                </span>
            </div>

            <div className="relative w-full overflow-hidden">
                <svg
                    viewBox="0 0 1440 250"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[135%] -ml-[17.5%] sm:w-[115%] sm:-ml-[7.5%] md:w-full md:ml-0 h-[110px] sm:h-[155px] md:h-[200px] lg:h-[225px] block overflow-visible"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <defs>
                        <path id={primaryPathId} d={primaryWaveD} />
                        <path id={secondaryPathId} d={secondaryWaveD} />
                    </defs>

                    <g className="opacity-35">
                        <use
                            href={`#${secondaryPathId}`}
                            stroke={palette.secondaryColor}
                            strokeWidth="36"
                            strokeLinecap="round"
                            opacity="0.18"
                        />
                        <use
                            href={`#${secondaryPathId}`}
                            stroke={palette.secondaryColor}
                            strokeWidth="1.5"
                            strokeDasharray="6 6"
                        />
                        <text
                            fill="#FFFDF5"
                            className="font-mono font-bold uppercase text-[15px] tracking-[0.22em]"
                            dominantBaseline="central"
                        >
                            <textPath
                                ref={secondaryTextPathRef}
                                href={`#${secondaryPathId}`}
                                startOffset="0px"
                            >
                                {secondaryFullText}
                            </textPath>
                        </text>
                    </g>

                    <g>
                        <use
                            href={`#${primaryPathId}`}
                            stroke="#000000"
                            strokeWidth="62"
                            transform="translate(0, 7)"
                        />
                        <use
                            href={`#${primaryPathId}`}
                            stroke={palette.railColor}
                            strokeWidth="58"
                        />
                        <use
                            href={`#${primaryPathId}`}
                            stroke="#0D0D0D"
                            strokeWidth="50"
                        />
                        <text
                            fill={palette.textColor}
                            className="font-mono font-extrabold uppercase text-[21px] sm:text-[22px] tracking-[0.16em]"
                            dominantBaseline="central"
                        >
                            <textPath
                                ref={primaryTextPathRef}
                                href={`#${primaryPathId}`}
                                startOffset="0px"
                            >
                                {primaryFullText}
                            </textPath>
                        </text>
                    </g>
                </svg>
            </div>
        </section>
    );
}
