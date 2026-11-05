"use client";

import React, { useEffect, useState } from "react";
import { Mail, Github, Phone, Volume2, VolumeX } from "lucide-react";

/* ═════════════════════════════════════════════════════════════════════════
   MOBILE "X-CROSS SEALED DOSSIER" COVER (< lg only)
   - Screen is split into 4 triangles along the 2 diagonals (an "X").
   - Two caution tapes are slapped across the diagonal seams.
   - A wax seal with the portrait sits at the crossing.
   - Tap the seal / swipe anywhere → tapes tear in half, seal pops,
     and the 4 triangle panels fly out in 4 directions.
   - Content is laid out as pyramids so it never touches the seams.
═════════════════════════════════════════════════════════════════════════ */

interface MobileCrossGateProps {
    progress: number;
    liveTime: string;
    sfxOn: boolean;
    onToggleSfx: () => void;
    onUnzip: () => void;
    onNavigate: (destination: string) => void;
}

const OUTLINE =
    "drop-shadow(2px 0 0 #1A1A1A) drop-shadow(-2px 0 0 #1A1A1A) drop-shadow(0 2px 0 #1A1A1A) drop-shadow(0 -2px 0 #1A1A1A)";

export function MobileCrossGate({
    progress,
    liveTime,
    sfxOn,
    onToggleSfx,
    onUnzip,
    onNavigate,
}: MobileCrossGateProps) {
    const [vp, setVp] = useState({ w: 390, h: 844 });

    useEffect(() => {
        const update = () => setVp({ w: window.innerWidth, h: window.innerHeight });
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    // Diagonal geometry for the X tapes
    const angle = (Math.atan2(vp.h, vp.w) * 180) / Math.PI;
    const diag = Math.sqrt(vp.w * vp.w + vp.h * vp.h) + 60;

    // Phase 1: tapes tear + seal pops (0 → 0.3)
    const tear = Math.min(progress / 0.3, 1);
    // Phase 2: triangles fly out (0.12 → 1)
    const fly = Math.max(0, (progress - 0.12) / 0.88);

    const handleSealTap = () => {
        if (typeof navigator !== "undefined" && "vibrate" in navigator) {
            try {
                navigator.vibrate(18);
            } catch {}
        }
        onUnzip();
    };

    const tapeText = "KNK DOSSIER ✦ DO NOT CROSS ✦ GEN-AI ENGINEER ✦ SEALED 2026 ✦ ";

    const renderTape = (rotation: number, color: string, textColor: string, delay: number) => (
        <div
            className="absolute pointer-events-none"
            style={{
                left: "50%",
                top: "50%",
                width: `${diag}px`,
                height: "30px",
                marginLeft: `${-diag / 2}px`,
                marginTop: "-15px",
                transform: `rotate(${rotation}deg)`,
            }}
        >
            <div
                className="relative w-full h-full flex"
                style={{ animation: `knkTapeSlap 0.45s cubic-bezier(0.2, 1.4, 0.4, 1) ${delay}s both` }}
            >
                {[-1, 1].map((dir) => (
                    <div
                        key={dir}
                        className="relative w-1/2 h-full overflow-hidden border-y-[2.5px] border-ink"
                        style={{
                            backgroundColor: color,
                            transform: `translateX(${dir * tear * 110}%) rotate(${dir * tear * 8}deg)`,
                            opacity: 1 - tear,
                            transformOrigin: dir < 0 ? "right center" : "left center",
                        }}
                    >
                        <div
                            className="absolute inset-y-0 flex items-center whitespace-nowrap font-mono text-[10px] font-black uppercase tracking-[0.18em]"
                            style={{
                                color: textColor,
                                animation: `knkTapeScroll 9s linear infinite`,
                                animationDirection: dir < 0 ? "normal" : "normal",
                            }}
                        >
                            <span className="px-2">{tapeText.repeat(4)}</span>
                            <span className="px-2">{tapeText.repeat(4)}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="lg:hidden relative w-full h-full overflow-hidden">
            <style>{`
                @keyframes knkTapeSlap { 0% { transform: scaleX(0); } 100% { transform: scaleX(1); } }
                @keyframes knkTapeScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
                @keyframes knkSealPop { 0% { transform: scale(0) rotate(-120deg); } 70% { transform: scale(1.12) rotate(8deg); } 100% { transform: scale(1) rotate(0deg); } }
                @keyframes knkSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                @keyframes knkPanelIn { 0% { opacity: 0; } 100% { opacity: 1; } }
                @keyframes knkPulseRing { 0% { transform: scale(1); opacity: 0.7; } 100% { transform: scale(1.55); opacity: 0; } }
            `}</style>

            {/* ─── TOP TRIANGLE (Orange · Headline Pyramid) ─── */}
            <div
                className="absolute inset-0 will-change-transform z-20"
                style={{
                    filter: OUTLINE,
                    transform: `translate3d(0, ${-fly * 75}%, 0) rotate(${-fly * 4}deg)`,
                }}
            >
                <div
                    className="absolute inset-0"
                    style={{
                        clipPath: "polygon(0 0, 100% 0, 50% 50%)",
                        backgroundColor: "#E85D04",
                        backgroundImage: `repeating-linear-gradient(90deg, rgba(26,26,26,0.2) 0px, rgba(26,26,26,0.2) 4px, rgba(255,255,255,0.08) 4px, rgba(255,255,255,0.08) 8px, transparent 8px, transparent 28px)`,
                    }}
                >
                    <div className="absolute left-0 right-0 top-[8.5%] flex flex-col items-center text-center">
                        <span className="font-mono text-[9px] font-extrabold uppercase tracking-[0.2em] text-ink bg-cream border-[2px] border-ink px-2 py-0.5 shadow-[2px_2px_0px_#1A1A1A] mb-2.5">
                            since 2025 · Aurora × NIAT
                        </span>
                        <div className="font-heading font-extrabold uppercase text-ink leading-[0.9] tracking-tight">
                            <div className="text-[2.15rem]">WORKING AI</div>
                            <div className="text-[1.7rem]">&amp; CODE FOR</div>
                            <div
                                className="text-[1.75rem] text-cream inline-block mt-0.5"
                                style={{ WebkitTextStroke: "1.5px #1A1A1A", textShadow: "2.5px 2.5px 0px #1A1A1A" }}
                            >
                                COMPLEX
                            </div>
                            <div className="text-[1.3rem]">SYSTEMS</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── LEFT TRIANGLE (Electric Blue · Role) ─── */}
            <div
                className="absolute inset-0 will-change-transform z-20"
                style={{
                    filter: OUTLINE,
                    transform: `translate3d(${-fly * 80}%, 0, 0) rotate(${fly * 5}deg)`,
                }}
            >
                <div
                    className="absolute inset-0"
                    style={{
                        clipPath: "polygon(0 0, 0 100%, 50% 50%)",
                        backgroundColor: "#0055FF",
                        backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 6px, transparent 6px, transparent 14px)`,
                    }}
                >
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <span
                            className="font-heading font-extrabold text-[1.05rem] uppercase text-cream tracking-tight whitespace-nowrap"
                            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", textShadow: "2px 2px 0 #1A1A1A" }}
                        >
                            GEN-AI ENGINEER
                        </span>
                        <span
                            className="font-mono text-[9px] font-black uppercase bg-acid text-ink border-[2px] border-ink px-0.5 py-1.5 shadow-[2px_2px_0px_#1A1A1A]"
                            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                        >
                            06 BUILDS
                        </span>
                    </div>
                </div>
            </div>

            {/* ─── RIGHT TRIANGLE (Hot Pink · Location) ─── */}
            <div
                className="absolute inset-0 will-change-transform z-20"
                style={{
                    filter: OUTLINE,
                    transform: `translate3d(${fly * 80}%, 0, 0) rotate(${-fly * 5}deg)`,
                }}
            >
                <div
                    className="absolute inset-0"
                    style={{
                        clipPath: "polygon(100% 0, 100% 100%, 50% 50%)",
                        backgroundColor: "#FF2A6D",
                        backgroundImage: `radial-gradient(rgba(26,26,26,0.2) 1.5px, transparent 1.5px)`,
                        backgroundSize: "14px 14px",
                    }}
                >
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <span
                            className="font-mono text-[9px] font-black uppercase bg-cream text-ink border-[2px] border-ink px-0.5 py-1.5 shadow-[2px_2px_0px_#1A1A1A]"
                            style={{ writingMode: "vertical-rl" }}
                        >
                            22 TOOLS
                        </span>
                        <span
                            className="font-heading font-extrabold text-[1.05rem] uppercase text-cream tracking-tight whitespace-nowrap"
                            style={{ writingMode: "vertical-rl", textShadow: "2px 2px 0 #1A1A1A" }}
                        >
                            HYDERABAD · IN
                        </span>
                    </div>
                </div>
            </div>

            {/* ─── BOTTOM TRIANGLE (Yellow · Identity + Nav Pyramid) ─── */}
            <div
                className="absolute inset-0 will-change-transform z-20"
                style={{
                    filter: OUTLINE,
                    transform: `translate3d(0, ${fly * 75}%, 0) rotate(${fly * 4}deg)`,
                }}
            >
                <div
                    className="absolute inset-0"
                    style={{
                        clipPath: "polygon(0 100%, 100% 100%, 50% 50%)",
                        backgroundColor: "#FFD60A",
                        backgroundImage: `radial-gradient(rgba(26,26,26,0.16) 1.5px, transparent 1.5px)`,
                        backgroundSize: "16px 16px",
                    }}
                >
                    <div className="absolute left-0 right-0 bottom-[3.5%] flex flex-col items-center text-center gap-2">
                        <span className="font-mono text-[9px] font-extrabold uppercase tracking-[0.15em] text-ink/80">
                            Gen-AI &amp; Full-Stack Engineer
                        </span>
                        <div className="bg-cream border-[2.5px] border-ink px-3 py-1 shadow-[3px_3px_0px_#1A1A1A] font-heading font-extrabold text-base uppercase text-ink tracking-tight">
                            K. Nanda Kishore
                        </div>
                        <div className="flex items-center gap-2">
                            <a
                                href="mailto:nandureddy817.kalluri@gmail.com"
                                aria-label="Email K. Nanda Kishore"
                                className="w-10 h-9 bg-ink text-acid border-[2px] border-ink flex items-center justify-center shadow-[2px_2px_0px_#FFFDF5] active:translate-y-0.5"
                            >
                                <Mail size={15} />
                            </a>
                            <a
                                href="https://github.com/nandu-reddy-kalluri"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub Profile"
                                className="w-10 h-9 bg-ink text-acid border-[2px] border-ink flex items-center justify-center shadow-[2px_2px_0px_#FFFDF5] active:translate-y-0.5"
                            >
                                <Github size={15} />
                            </a>
                            <a
                                href="tel:6309718153"
                                aria-label="Call K. Nanda Kishore"
                                className="w-10 h-9 bg-ink text-acid border-[2px] border-ink flex items-center justify-center shadow-[2px_2px_0px_#FFFDF5] active:translate-y-0.5"
                            >
                                <Phone size={15} />
                            </a>
                        </div>
                        <div className="flex items-stretch gap-1.5 w-[86%] max-w-[330px]">
                            <button
                                type="button"
                                onClick={() => onNavigate("/work")}
                                className="flex-1 bg-[#E85D04] text-ink border-[2.5px] border-ink py-2 font-heading font-extrabold text-[11px] uppercase shadow-[3px_3px_0px_#1A1A1A] active:translate-y-0.5"
                            >
                                Work ↗
                            </button>
                            <button
                                type="button"
                                onClick={() => onNavigate("/stack")}
                                className="flex-1 bg-electric text-cream border-[2.5px] border-ink py-2 font-heading font-extrabold text-[11px] uppercase shadow-[3px_3px_0px_#1A1A1A] active:translate-y-0.5"
                            >
                                Stack ↗
                            </button>
                            <button
                                type="button"
                                onClick={() => onNavigate("/contact")}
                                className="flex-1 bg-[#FF2A6D] text-cream border-[2.5px] border-ink py-2 font-heading font-extrabold text-[11px] uppercase shadow-[3px_3px_0px_#1A1A1A] active:translate-y-0.5"
                            >
                                Hire ↗
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── X CAUTION TAPES (cover the diagonal seams) ─── */}
            <div className="absolute inset-0 z-30 pointer-events-none">
                {renderTape(angle, "#CCFF00", "#1A1A1A", 0.1)}
                {renderTape(-angle, "#1A1A1A", "#CCFF00", 0.25)}
            </div>

            {/* ─── CENTER WAX SEAL WITH PORTRAIT ─── */}
            <div
                className="absolute left-1/2 top-1/2 z-40"
                style={{
                    transform: `translate(-50%, -50%) scale(${1 + tear * 0.7}) rotate(${tear * 120}deg)`,
                    opacity: Math.max(0, 1 - tear * 1.4),
                }}
            >
                <button
                    type="button"
                    onClick={handleSealTap}
                    aria-label="Break the seal to open portfolio"
                    className="relative w-[132px] h-[132px] rounded-full active:scale-95 transition-transform"
                    style={{ animation: "knkSealPop 0.6s cubic-bezier(0.2, 1.4, 0.4, 1) 0.4s both" }}
                >
                    {/* Pulse ring hint */}
                    <span
                        className="absolute inset-0 rounded-full border-[3px] border-acid pointer-events-none"
                        style={{ animation: "knkPulseRing 1.6s ease-out infinite" }}
                    />
                    {/* Seal body */}
                    <span className="absolute inset-0 rounded-full bg-ink border-[3px] border-ink shadow-[4px_4px_0px_#FFFDF5]" />
                    {/* Rotating text ring */}
                    <svg
                        viewBox="0 0 132 132"
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        style={{ animation: "knkSpin 12s linear infinite" }}
                    >
                        <defs>
                            <path id="knk-seal-ring" d="M 66,66 m -53,0 a 53,53 0 1,1 106,0 a 53,53 0 1,1 -106,0" />
                        </defs>
                        <text fill="#CCFF00" fontSize="9.5" fontWeight="900" fontFamily="monospace" letterSpacing="2">
                            <textPath href="#knk-seal-ring">TAP TO BREAK SEAL ✦ OR SWIPE ANY WAY ✦ </textPath>
                        </text>
                    </svg>
                    {/* Portrait */}
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[78px] h-[78px] rounded-full overflow-hidden border-[3px] border-acid bg-hotpink">
                        <img src="/headshot.png" alt="K. Nanda Kishore" className="w-full h-full object-cover" />
                    </span>
                    {/* Verified tick */}
                    <span className="absolute right-2 bottom-3 w-7 h-7 rounded-full bg-acid border-[2.5px] border-ink flex items-center justify-center font-black text-[12px] text-ink">
                        ✓
                    </span>
                </button>
            </div>

            {/* ─── FLOATING TOP HUD (outside triangles so nothing gets clipped) ─── */}
            <div
                className="absolute top-3 left-3 right-3 z-50 flex items-center justify-between gap-2"
                style={{ opacity: Math.max(0, 1 - progress * 3) }}
            >
                <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-ink text-acid border-[2px] border-ink font-mono text-[10px] font-extrabold uppercase tracking-wider shadow-[2px_2px_0px_#FFFDF5]">
                    <span className="w-2 h-2 rounded-full bg-acid animate-pulse" />
                    <span>KNK</span>
                    <span className="text-cream/40">|</span>
                    <span className="text-cream">{liveTime || "HYD"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <button
                        type="button"
                        onClick={onToggleSfx}
                        aria-label="Toggle sound"
                        className="bg-ink border-[2px] border-ink px-1.5 py-1 shadow-[2px_2px_0px_#FFFDF5]"
                    >
                        {sfxOn ? <Volume2 size={13} className="text-acid" /> : <VolumeX size={13} className="text-cream/50" />}
                    </button>
                    <button
                        type="button"
                        onClick={onUnzip}
                        className="bg-acid text-ink border-[2px] border-ink px-2.5 py-1 font-mono text-[10px] font-black uppercase tracking-wider shadow-[2px_2px_0px_#1A1A1A]"
                    >
                        Skip ↗
                    </button>
                </div>
            </div>
        </div>
    );
}

