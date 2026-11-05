"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { MobileCrossGate } from "./MobileCrossGate";
import {
    Mail,
    Github,
    Phone,
    MessageCircle,
    ArrowUpRight,
    ChevronsDown,
    Sparkles,
    Volume2,
    VolumeX,
    ShieldCheck,
    Zap,
    Cpu,
    Radio,
    Clock,
} from "lucide-react";

// Module-level memory flag:
// - False on initial page load / browser refresh (F5), so the cover always greets visitors immediately from SSR frame 0.
// - True during client-side SPA navigation (e.g. clicking /work then back to /) unless manually re-zipped.
let hasUnzippedInSession = false;

/* ═════════════════════════════════════════════════════════════════════════════════
   PROCEDURAL AUDIO SYNTHESIZER (Zero external files · 100% Web Audio API)
   Generates authentic mechanical zipper ratchets, tactile stamp pops, and vault thuds
═════════════════════════════════════════════════════════════════════════════════ */
class DossierSoundSynth {
    private ctx: AudioContext | null = null;
    public enabled: boolean = true;
    private lastClickTime: number = 0;

    private getContext(): AudioContext | null {
        if (typeof window === "undefined") return null;
        if (!this.ctx) {
            const AudioCtx =
                window.AudioContext ||
                (window as unknown as { webkitAudioContext: typeof AudioContext })
                    .webkitAudioContext;
            if (AudioCtx) this.ctx = new AudioCtx();
        }
        if (this.ctx && this.ctx.state === "suspended") {
            this.ctx.resume().catch(() => {});
        }
        return this.ctx;
    }

    playZipClick(pitchMultiplier = 1) {
        if (!this.enabled) return;
        const now = performance.now();
        // Debounce slightly to avoid audio stack on hyper-fast drags
        if (now - this.lastClickTime < 24) return;
        this.lastClickTime = now;

        const ctx = this.getContext();
        if (!ctx) return;
        try {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "triangle";
            const baseFreq = 950 + Math.random() * 450 * pitchMultiplier;
            osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.022);

            gain.gain.setValueAtTime(0.09, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.022);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.022);
        } catch {}
    }

    playStampPop() {
        if (!this.enabled) return;
        const ctx = this.getContext();
        if (!ctx) return;
        try {
            // Punchy physical thud + spring pop
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(460, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(95, ctx.currentTime + 0.08);

            gain.gain.setValueAtTime(0.22, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.08);
        } catch {}
    }

    playLanyardSnap() {
        if (!this.enabled) return;
        const ctx = this.getContext();
        if (!ctx) return;
        try {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "triangle";
            osc.frequency.setValueAtTime(620, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.1);

            gain.gain.setValueAtTime(0.18, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.1);
        } catch {}
    }

    playVaultUnzip() {
        if (!this.enabled) return;
        const ctx = this.getContext();
        if (!ctx) return;
        try {
            // Whoosh release + heavy latch unclamp
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sawtooth";
            osc.frequency.setValueAtTime(320, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(65, ctx.currentTime + 0.28);

            gain.gain.setValueAtTime(0.16, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.28);
        } catch {}
    }
}

const soundSynth = new DossierSoundSynth();

interface TactileDossierGateProps {
    forceOpenTrigger?: number;
}

export function TactileDossierGate({ forceOpenTrigger = 0 }: TactileDossierGateProps) {
    const router = useRouter();
    const [isUnzipped, setIsUnzipped] = useState(false);
    const [progress, setProgress] = useState(0); // 0 = closed, 1 = fully unzipped
    const [isDragging, setIsDragging] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [sfxOn, setSfxOn] = useState(true);

    // Live IST clock
    const [liveTime, setLiveTime] = useState("");

    // Interactive easter egg stamp notification
    const [activeStampToast, setActiveStampToast] = useState<{
        title: string;
        desc: string;
        color: string;
    } | null>(null);
    const toastTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Mouse tilt & holographic refraction coordinates (normalized 0 to 1)
    const [mouseTilt, setMouseTilt] = useState({ x: 0.5, y: 0.5, holoAngle: 45 });

    // Interactive draggable Lanyard ID badge physics
    const [lanyardPullY, setLanyardPullY] = useState(0);
    const isPullingLanyard = useRef(false);
    const lanyardStartCoord = useRef(0);
    const lanyardAnimRef = useRef<number | null>(null);

    const trackRef = useRef<HTMLDivElement>(null);
    const touchStartRef = useRef<{ x: number; y: number } | null>(null);
    const animFrameRef = useRef<number | null>(null);
    const progressRef = useRef(0);
    const lastToothPassedRef = useRef(0);

    // Live clock update
    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const timeStr = now.toLocaleTimeString("en-US", {
                timeZone: "Asia/Kolkata",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
            });
            setLiveTime(timeStr);
        };
        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, []);

    // Sync audio synth enabled state
    const toggleSfx = () => {
        const next = !sfxOn;
        setSfxOn(next);
        soundSynth.enabled = next;
        if (next) soundSynth.playStampPop();
    };

    // Update progress & trigger ratchet clicks with pitch variation
    const updateProgress = useCallback((val: number) => {
        progressRef.current = val;
        setProgress(val);

        const currentTooth = Math.floor(val * 34);
        if (currentTooth !== lastToothPassedRef.current) {
            lastToothPassedRef.current = currentTooth;
            soundSynth.playZipClick(1 + val * 0.8);
        }
    }, []);

    // Trigger an Easter egg badge click
    const handleBadgeClick = (title: string, desc: string, color: string) => {
        soundSynth.playStampPop();
        if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
        setActiveStampToast({ title, desc, color });
        toastTimerRef.current = setTimeout(() => {
            setActiveStampToast(null);
        }, 3200);
    };

    // Smoothly animate progress to target (0 or 1)
    const animateTo = useCallback(
        (target: 0 | 1, onDone?: () => void) => {
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
            setIsAnimating(true);
            if (target === 1) soundSynth.playVaultUnzip();

            const start = performance.now();
            const initial = progressRef.current;
            const duration = target === 1 ? 580 : 360;

            const step = (now: number) => {
                const elapsed = now - start;
                const t = Math.min(elapsed / duration, 1);
                // Ease-in-out cubic
                const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
                const nextProgress = initial + (target - initial) * eased;
                updateProgress(nextProgress);

                if (t < 1) {
                    animFrameRef.current = requestAnimationFrame(step);
                } else {
                    updateProgress(target);
                    setIsAnimating(false);
                    if (target === 1) {
                        hasUnzippedInSession = true;
                        setIsUnzipped(true);
                    }
                    onDone?.();
                }
            };

            animFrameRef.current = requestAnimationFrame(step);
        },
        [updateProgress]
    );

    // Check SPA session state on mount
    useEffect(() => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (hasUnzippedInSession || reduced) {
            setIsUnzipped(true);
            updateProgress(1);
        }
    }, [updateProgress]);

    // External "Re-Zip Cover" button on Home Page
    useEffect(() => {
        if (forceOpenTrigger > 0) {
            hasUnzippedInSession = false;
            setIsUnzipped(false);
            setIsAnimating(false);
            updateProgress(0);
            window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
            soundSynth.playStampPop();
        }
    }, [forceOpenTrigger, updateProgress]);

    // Navigation helper
    const handleUnzipAndNavigate = useCallback(
        (destination?: string) => {
            animateTo(1, () => {
                if (destination) {
                    if (destination.startsWith("#")) {
                        const el = document.querySelector(destination);
                        el?.scrollIntoView({ behavior: "smooth" });
                    } else {
                        router.push(destination);
                    }
                }
            });
        },
        [animateTo, router]
    );

    // Lock body scroll while cover is closed
    useEffect(() => {
        if (!isUnzipped) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isUnzipped]);

    // Wheel & Keyboard listeners
    useEffect(() => {
        if (isUnzipped || isAnimating) return;

        const handleWheel = (e: WheelEvent) => {
            if (Math.abs(e.deltaY) > 4) {
                e.preventDefault();
                animateTo(1);
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowDown" || e.key === " " || e.key === "Enter" || e.key === "Escape") {
                e.preventDefault();
                animateTo(1);
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: false });
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isUnzipped, isAnimating, animateTo]);

    // Pointer move for 3D tilt & holographic foil
    const handleMouseMove = (e: React.MouseEvent) => {
        if (typeof window === "undefined") return;
        const normX = e.clientX / window.innerWidth;
        const normY = e.clientY / window.innerHeight;
        const angle = Math.round(normX * 120 + normY * 60);
        setMouseTilt({ x: normX, y: normY, holoAngle: angle });
    };

    // Desktop Pointer drag handlers for central zipper pull
    const handlePointerDown = (e: React.PointerEvent) => {
        e.stopPropagation();
        if (isAnimating) return;
        setIsDragging(true);
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isDragging || !trackRef.current) return;
        const rect = trackRef.current.getBoundingClientRect();
        const relY = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
        const ratio = relY / rect.height;
        updateProgress(ratio);
        if (ratio > 0.45) {
            setIsDragging(false);
            animateTo(1);
        }
    };

    const handlePointerUp = () => {
        if (!isDragging) return;
        setIsDragging(false);
        animateTo(1);
    };

    // Interactive Lanyard Drag Physics (Pull the badge down and release to spring back!)
    const handleLanyardStart = (clientY: number) => {
        if (lanyardAnimRef.current) cancelAnimationFrame(lanyardAnimRef.current);
        isPullingLanyard.current = true;
        lanyardStartCoord.current = clientY;
    };

    const handleLanyardMove = (clientY: number) => {
        if (!isPullingLanyard.current) return;
        const diff = Math.max(0, Math.min(clientY - lanyardStartCoord.current, 75));
        setLanyardPullY(diff);
    };

    const handleLanyardEnd = () => {
        if (!isPullingLanyard.current) return;
        isPullingLanyard.current = false;
        soundSynth.playLanyardSnap();

        // Spring-back harmonic oscillation
        const startVal = lanyardPullY;
        const startTime = performance.now();
        const spring = (now: number) => {
            const elapsed = (now - startTime) / 1000;
            // Damped spring formula: e^(-dt) * cos(wt)
            const decay = Math.exp(-8 * elapsed);
            const osc = Math.cos(24 * elapsed);
            const current = startVal * decay * osc;
            setLanyardPullY(current);

            if (elapsed < 0.55) {
                lanyardAnimRef.current = requestAnimationFrame(spring);
            } else {
                setLanyardPullY(0);
            }
        };
        lanyardAnimRef.current = requestAnimationFrame(spring);
    };

    // Touch swipe on mobile
    const handleTouchStart = (e: React.TouchEvent) => {
        if (isAnimating) return;
        touchStartRef.current = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
        };
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!touchStartRef.current || isAnimating) return;
        const dx = Math.abs(e.touches[0].clientX - touchStartRef.current.x);
        const dy = Math.abs(e.touches[0].clientY - touchStartRef.current.y);
        if (dy > 16 || dx > 24) {
            touchStartRef.current = null;
            animateTo(1);
        }
    };

    const handleTouchEnd = () => {
        touchStartRef.current = null;
        if (!isAnimating && progressRef.current > 0) {
            animateTo(1);
        }
    };

    if (isUnzipped) return null;

    // Transform math
    const splitPhase = Math.max(0, (progress - 0.08) / 0.92);
    const leftDoorX = -splitPhase * 108; // %
    const rightDoorX = splitPhase * 108; // %
    const leftRotate = -splitPhase * 3.5; // deg
    const rightRotate = splitPhase * 3.5; // deg

    const topDoorY = -splitPhase * 108; // % (Mobile Top Door slides UP)
    const bottomDoorY = splitPhase * 108; // % (Mobile Bottom Door slides DOWN)
    const overlayOpacity = progress > 0.88 ? 1 - (progress - 0.88) / 0.12 : 1;

    // 3D Parallax tilt calculations
    const plateTiltX = (mouseTilt.y - 0.5) * -7;
    const plateTiltY = (mouseTilt.x - 0.5) * 8;
    const badgeTiltX = (mouseTilt.y - 0.5) * -9;
    const badgeTiltY = (mouseTilt.x - 0.5) * 9;

    const desktopTeethCount = 34;
    const mobileTeethCount = 22;

    return (
        <div
            className="fixed inset-0 z-[250] overflow-hidden select-none"
            style={{ opacity: overlayOpacity }}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            role="dialog"
            aria-modal="true"
            aria-label="Interactive Portfolio Dossier Cover"
        >
            {/* ─── HOLOGRAPHIC LASER SEAM BACKLIGHT (Peeks through separating doors) ─── */}
            <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
                style={{
                    opacity: progress > 0.02 ? Math.min(progress * 1.5, 0.95) : 0,
                    background: `
                        radial-gradient(ellipse at 50% 50%, rgba(204, 255, 0, 0.45) 0%, rgba(0, 85, 255, 0.3) 35%, rgba(255, 42, 109, 0.2) 65%, transparent 85%)
                    `,
                }}
            >
                <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-4 bg-acid blur-md animate-pulse" />
            </div>

            {/* ─── FLOATING EASTER EGG TOAST (Interactive Badge Click feedback) ─── */}
            {activeStampToast && (
                <div className="absolute top-14 left-1/2 -translate-x-1/2 z-[300] pointer-events-none animate-in fade-in zoom-in duration-200">
                    <div
                        className="border-[3px] border-ink px-4 py-2 rounded-xl shadow-[5px_5px_0px_#1A1A1A] flex items-center gap-2.5"
                        style={{ backgroundColor: activeStampToast.color }}
                    >
                        <Sparkles size={16} className="text-ink animate-spin" />
                        <div>
                            <div className="font-heading font-black text-xs uppercase text-ink leading-none">
                                {activeStampToast.title}
                            </div>
                            <div className="font-mono text-[10px] font-bold text-ink/85 mt-0.5">
                                {activeStampToast.desc}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 1. MOBILE VERSION (< lg): X-CROSS SEALED DOSSIER (4 triangles + caution tapes + wax seal) */}
            <MobileCrossGate
                progress={progress}
                liveTime={liveTime}
                sfxOn={sfxOn}
                onToggleSfx={toggleSfx}
                onUnzip={() => animateTo(1)}
                onNavigate={handleUnzipAndNavigate}
            />

            {/* ███████████████████████████████████████████████████████████████████
                2. DESKTOP VERSION (lg+): 3D TACTILE DOORS + PARALLAX & SOUND FX
               ███████████████████████████████████████████████████████████████████ */}
            <div className="hidden lg:block relative w-full h-full perspective-[1200px]">
                {/* ─── LEFT BACKGROUND CURTAIN DOOR ─── */}
                <div
                    className="absolute top-0 bottom-0 left-0 w-1/2 border-r-[4px] border-ink will-change-transform z-20"
                    style={{
                        backgroundColor: "#E85D04",
                        backgroundImage: `
                            repeating-linear-gradient(
                                90deg,
                                rgba(26, 26, 26, 0.22) 0px,
                                rgba(26, 26, 26, 0.22) 4px,
                                rgba(255, 255, 255, 0.08) 4px,
                                rgba(255, 255, 255, 0.08) 8px,
                                transparent 8px,
                                transparent 32px
                            )
                        `,
                        transform: `translate3d(${leftDoorX}%, 0, 0) rotate(${leftRotate}deg)`,
                        transformOrigin: "bottom left",
                    }}
                >
                    {/* Top Cyber Telemetry Bar */}
                    <div className="flex items-center justify-between px-6 py-3 border-b-[2px] border-ink/20 font-mono text-[11px] font-bold uppercase tracking-widest text-ink">
                        <div className="flex items-center gap-2.5">
                            <span className="px-2 py-0.5 bg-acid text-ink border-[2px] border-ink font-black shadow-neo-sm">
                                SYS.01
                            </span>
                            <span className="font-extrabold tracking-wider">KNK // ENGINEERING DOSSIER</span>
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-ink text-acid border border-ink text-[10px]">
                                <Radio size={10} className="animate-pulse" />
                                <span>6/6 ACTIVE RUNNERS</span>
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-ink/80 text-[10px]">
                            <Clock size={12} className="text-ink" />
                            <span className="font-mono font-bold bg-cream px-2 py-0.5 border border-ink">
                                {liveTime ? `${liveTime} IST` : "HYDERABAD, IN"}
                            </span>
                        </div>
                    </div>

                    {/* Industrial Warning Stripe Deco */}
                    <div className="absolute bottom-6 left-6 flex items-center gap-2 pointer-events-none opacity-85">
                        <div className="h-6 w-36 bg-[repeating-linear-gradient(45deg,#1A1A1A,#1A1A1A_8px,#CCFF00_8px,#CCFF00_16px)] border-[2px] border-ink shadow-neo-sm" />
                        <span className="font-mono text-[9px] font-extrabold text-ink bg-cream px-1.5 py-0.5 border border-ink">
                            CHASSIS // L4-VAULT
                        </span>
                    </div>
                </div>

                {/* ─── RIGHT BACKGROUND CURTAIN DOOR ─── */}
                <div
                    className="absolute top-0 bottom-0 right-0 w-1/2 border-l-[4px] border-ink will-change-transform z-20"
                    style={{
                        backgroundColor: "#F26400",
                        backgroundImage: `radial-gradient(rgba(26, 26, 26, 0.16) 1.5px, transparent 1.5px)`,
                        backgroundSize: "18px 18px",
                        transform: `translate3d(${rightDoorX}%, 0, 0) rotate(${rightRotate}deg)`,
                        transformOrigin: "bottom right",
                    }}
                >
                    {/* Top Right Quick Controls */}
                    <div className="flex items-center justify-end gap-3 px-6 py-3 border-b-[2px] border-ink/20">
                        {/* Audio Synthesizer Toggle */}
                        <button
                            type="button"
                            onClick={toggleSfx}
                            className={`px-3 py-1 border-[2px] border-ink font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-neo-sm transition-all ${
                                sfxOn ? "bg-cream text-ink" : "bg-ink text-cream/50"
                            }`}
                            title="Toggle tactile sound synthesizer"
                        >
                            {sfxOn ? (
                                <>
                                    <Volume2 size={13} className="text-ink" />
                                    <span>SFX: ON</span>
                                    <span className="flex items-end gap-0.5 h-3 ml-0.5">
                                        <span className="w-0.5 h-2.5 bg-ink animate-pulse" />
                                        <span className="w-0.5 h-1.5 bg-ink animate-pulse delay-75" />
                                        <span className="w-0.5 h-3 bg-ink animate-pulse delay-150" />
                                    </span>
                                </>
                            ) : (
                                <>
                                    <VolumeX size={13} />
                                    <span>SFX: OFF</span>
                                </>
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={() => animateTo(1)}
                            className="bg-ink text-acid hover:bg-acid hover:text-ink border-[2px] border-ink px-4 py-1 font-mono text-xs font-black uppercase tracking-wider shadow-neo-sm transition-colors flex items-center gap-1.5"
                        >
                            <span>Unzip Cover</span>
                            <ArrowUpRight size={14} />
                        </button>
                    </div>

                    {/* Bottom Right Clearance Tag */}
                    <div className="absolute bottom-6 right-6 flex items-center gap-2 pointer-events-none opacity-85">
                        <span className="font-mono text-[9px] font-extrabold text-ink bg-cream px-2 py-0.5 border border-ink shadow-neo-sm">
                            ID: #KNK-HYD-2026 // GEN-AI ARCHITECT
                        </span>
                        <div className="w-6 h-6 rounded-full bg-acid border-[2px] border-ink flex items-center justify-center font-black text-[10px] text-ink">
                            ★
                        </div>
                    </div>
                </div>

                {/* ─── CENTRAL MECHANICAL ZIPPER TRACK & INTERLOCKING TEETH ─── */}
                <div
                    ref={trackRef}
                    className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-12 z-30 pointer-events-none flex flex-col justify-between items-center py-1"
                >
                    {Array.from({ length: desktopTeethCount }).map((_, idx) => {
                        const toothRatio = idx / desktopTeethCount;
                        const isUnzippedTooth = toothRatio < progress;
                        const toothSpread = isUnzippedTooth
                            ? Math.max(10, (progress - toothRatio) * 440)
                            : 0;

                        return (
                            <div
                                key={idx}
                                className="w-full flex items-center justify-center relative h-2.5"
                            >
                                <div
                                    className="w-3.5 h-2 bg-ink border border-ink flex items-center justify-end pr-0.5 rounded-l-[1px] shadow-sm"
                                    style={{
                                        transform: `translateX(${-toothSpread}px)`,
                                    }}
                                >
                                    <div className="w-1.5 h-1 bg-amber" />
                                </div>
                                <div
                                    className="w-3.5 h-2 bg-ink border border-ink flex items-center justify-start pl-0.5 rounded-r-[1px] -ml-[2px] shadow-sm"
                                    style={{
                                        transform: `translateX(${toothSpread}px)`,
                                    }}
                                >
                                    <div className="w-1.5 h-1 bg-acid" />
                                </div>
                            </div>
                        );
                    })}

                    {/* DRAGGABLE / CLICKABLE ZIPPER PULL SLIDER */}
                    <div
                        onPointerDown={handlePointerDown}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                        onClick={() => !isDragging && animateTo(1)}
                        style={{
                            top: `calc(${Math.min(progress * 84, 84)}% + 8px)`,
                        }}
                        className="absolute left-1/2 -translate-x-1/2 pointer-events-auto cursor-grab active:cursor-grabbing group z-50 flex flex-col items-center"
                        title="Drag down, scroll, or click to unzip"
                    >
                        <div className="w-10 h-12 bg-amber border-[3px] border-ink rounded-t-md shadow-neo-sm flex flex-col items-center justify-between p-1 group-hover:bg-acid transition-colors">
                            <div className="w-4 h-2 bg-ink rounded-sm" />
                            <div className="w-3 h-4 border-[2px] border-ink bg-cream rounded-sm" />
                        </div>
                        <div className="w-3 h-2.5 bg-ink -mt-0.5" />
                        <div className="bg-ink text-cream border-[3px] border-ink px-4 py-2 rounded-md shadow-[4px_4px_0px_0px_#CCFF00] group-hover:bg-acid group-hover:text-ink group-hover:shadow-[4px_4px_0px_0px_#1A1A1A] transition-all flex flex-col items-center gap-0.5">
                            <ChevronsDown size={16} className="text-acid group-hover:text-ink animate-bounce" />
                            <span className="font-mono text-xs font-extrabold uppercase tracking-wider leading-none">
                                scroll
                            </span>
                        </div>
                    </div>
                </div>

                {/* ─── FOREGROUND CONTENT GRID (Desktop 2 Columns) ─── */}
                <div className="relative z-20 w-full h-full max-w-7xl mx-auto px-10 py-12 grid grid-cols-2 items-center gap-8 pointer-events-none">
                    {/* LEFT ASSEMBLY: BOLTED SPEC PLATE + 3 COLLECTIBLE STAMPS */}
                    <div
                        className="w-full flex items-center justify-center will-change-transform pointer-events-auto"
                        style={{
                            transform: `translate3d(${leftDoorX * 1.1}%, 0, 0) rotate(${leftRotate}deg) rotateX(${plateTiltX}deg) rotateY(${plateTiltY}deg)`,
                            transition: isDragging ? "none" : "transform 0.15s ease-out",
                        }}
                    >
                        <div className="relative w-full max-w-[430px]">
                            {/* STAMP 1: Working Systems */}
                            <button
                                type="button"
                                onClick={() =>
                                    handleBadgeClick(
                                        "THIS IS NOT A DEMO",
                                        "100% Production code · Tested in real customer workflows",
                                        "#0055FF"
                                    )
                                }
                                aria-label="Interactive Stamp: Working Systems"
                                className="absolute -top-10 -right-7 z-20 w-28 h-28 rounded-full bg-cream border-[3px] border-ink shadow-neo flex items-center justify-center hover:scale-110 hover:rotate-12 active:scale-95 transition-transform cursor-pointer group"
                            >
                                <CircularBadgeSVG
                                    idSuffix="desk-bot"
                                    text="THIS IS NOT A DEMO • IT'S WORKING CODE • "
                                    innerBg="#0055FF"
                                    icon="bot"
                                />
                            </button>

                            {/* MAIN BOLTED SPEC PLATE */}
                            <div
                                className="relative bg-cream border-[3px] border-ink p-9 shadow-[8px_8px_0px_0px_#1A1A1A] overflow-hidden"
                                style={{
                                    backgroundImage:
                                        "linear-gradient(135deg, #FFFFFF 0%, #F4F1EA 55%, #E5E0D5 100%)",
                                }}
                            >
                                {/* Prismatic Refraction Sheen */}
                                <div
                                    className="absolute inset-0 pointer-events-none opacity-20"
                                    style={{
                                        background: `linear-gradient(${mouseTilt.holoAngle}deg, transparent 25%, rgba(204,255,0,0.5) 45%, rgba(0,85,255,0.4) 55%, transparent 75%)`,
                                    }}
                                />

                                <CornerBolt className="top-2.5 left-2.5" />
                                <CornerBolt className="top-2.5 right-2.5" />
                                <CornerBolt className="bottom-2.5 left-2.5" />
                                <CornerBolt className="bottom-2.5 right-2.5" />

                                <div className="font-mono text-xs font-bold text-ink/60 tracking-wider mb-2 flex items-center justify-between">
                                    <span>since 2025 · Aurora × NIAT</span>
                                    <span className="font-mono text-[9px] bg-ink text-acid px-1.5 py-0.5 font-bold">
                                        SPEC v4.2
                                    </span>
                                </div>

                                <div className="font-heading font-extrabold text-[2.75rem] leading-[0.92] tracking-tight uppercase text-ink select-none relative">
                                    WORKING<br />
                                    AI &amp; CODE FOR<br />
                                    <span className="text-vivid inline-block my-0.5" style={{ textShadow: "2px 2px 0px #1A1A1A" }}>
                                        COMPLEX
                                    </span><br />
                                    SYSTEMS

                                    {/* Red Grunge Rubber Stamp Overlay */}
                                    <div className="absolute right-0 bottom-1 pointer-events-none rotate-[-12deg] border-[3px] border-dashed border-[#D91B1B] text-[#D91B1B] px-2.5 py-1 font-mono text-[10px] font-black uppercase tracking-widest opacity-85">
                                        VERIFIED // HYD
                                    </div>
                                </div>

                                <div className="mt-4 pt-3 border-t-[2px] border-ink/15 flex items-center justify-between font-mono text-[11px] font-bold uppercase text-ink/75">
                                    <span className="inline-flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-acid border border-ink animate-pulse" />
                                        6 Pipelines Live
                                    </span>
                                    <span className="bg-cream px-1.5 py-0.5 border border-ink text-ink font-extrabold">
                                        HYDERABAD, IN
                                    </span>
                                </div>
                            </div>

                            {/* STAMP 2: Build Like You Give a Damn */}
                            <button
                                type="button"
                                onClick={() =>
                                    handleBadgeClick(
                                        "CRAFT & VELOCITY",
                                        "Build like you give a damn · Micro-interactions that delight",
                                        "#CCFF00"
                                    )
                                }
                                aria-label="Interactive Stamp: Build With Craft"
                                className="absolute -bottom-12 left-4 z-20 w-24 h-24 rounded-full bg-cream border-[3px] border-ink shadow-neo flex items-center justify-center hover:scale-110 hover:-rotate-12 active:scale-95 transition-transform cursor-pointer"
                            >
                                <CircularBadgeSVG
                                    idSuffix="desk-bolt"
                                    text="BUILD LIKE YOU GIVE A DAMN • SHIP FAST • "
                                    innerBg="#CCFF00"
                                    icon="bolt"
                                />
                            </button>

                            {/* STAMP 3: Tested in Code */}
                            <button
                                type="button"
                                onClick={() =>
                                    handleBadgeClick(
                                        "TRUST ME, I TESTED IT!",
                                        "Multi-agent stress tests & real-time monitoring",
                                        "#FF2A6D"
                                    )
                                }
                                aria-label="Interactive Stamp: Tested In Code"
                                className="absolute -bottom-9 right-12 z-20 w-24 h-24 rounded-full bg-cream border-[3px] border-ink shadow-neo flex items-center justify-center hover:scale-110 hover:rotate-12 active:scale-95 transition-transform cursor-pointer"
                            >
                                <CircularBadgeSVG
                                    idSuffix="desk-bee"
                                    text="TRUST ME, I TESTED IT! • VERIFIED PIPELINE • "
                                    innerBg="#FF2A6D"
                                    icon="bee"
                                />
                            </button>
                        </div>
                    </div>

                    {/* RIGHT ASSEMBLY: UTILITY POCKET + INTERACTIVE PULLABLE ID BADGE */}
                    <div
                        className="w-full flex items-center justify-center will-change-transform pointer-events-auto"
                        style={{
                            transform: `translate3d(${rightDoorX * 1.1}%, 0, 0) rotate(${rightRotate}deg) rotateX(${badgeTiltX}deg) rotateY(${badgeTiltY}deg)`,
                            transition: isDragging ? "none" : "transform 0.15s ease-out",
                        }}
                    >
                        <div className="relative w-full max-w-[400px] pt-10 pb-6">
                            {/* FOLDER TABS */}
                            <div className="relative z-10 flex items-end px-2 -mb-[3px]">
                                <button
                                    type="button"
                                    onClick={() => handleUnzipAndNavigate("/work")}
                                    className="group relative flex-1 bg-[#FFD60A] hover:bg-acid text-ink border-[3px] border-ink rounded-t-xl pt-3 pb-5 px-2 text-center transition-transform hover:-translate-y-1.5 shadow-neo-sm"
                                >
                                    <span className="font-heading font-extrabold text-sm uppercase tracking-tight block">
                                        WORK
                                    </span>
                                    <span className="mt-1 inline-block bg-ink text-acid font-mono text-[9px] font-bold uppercase px-1.5 py-0.5">
                                        06 BUILDS
                                    </span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleUnzipAndNavigate("/stack")}
                                    className="group relative flex-1 bg-electric hover:bg-[#1A66FF] text-cream border-[3px] border-ink rounded-t-xl pt-2.5 pb-4 px-2 -ml-[3px] text-center transition-transform hover:-translate-y-1.5 shadow-neo-sm"
                                >
                                    <span className="font-heading font-extrabold text-sm uppercase tracking-tight block">
                                        STACK
                                    </span>
                                    <span className="mt-1 inline-block bg-ink text-cream border border-cream/40 font-mono text-[9px] font-bold uppercase px-1.5 py-0.5">
                                        CHOOSE
                                    </span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleUnzipAndNavigate("/contact")}
                                    className="group relative flex-1 bg-[#FF1E42] hover:bg-hotpink text-cream border-[3px] border-ink rounded-t-xl pt-3.5 pb-5 px-2 -ml-[3px] text-center transition-transform hover:-translate-y-1.5 shadow-neo-sm"
                                >
                                    <span className="font-heading font-extrabold text-sm uppercase tracking-tight block">
                                        CONTACT
                                    </span>
                                    <span className="mt-1 inline-block bg-cream text-ink border border-ink font-mono text-[9px] font-extrabold uppercase px-1.5 py-0.5 rotate-2">
                                        HIRE / SYNC
                                    </span>
                                </button>
                            </div>

                            {/* RED POCKET ENCLOSURE */}
                            <div className="relative z-20 border-[3px] border-ink bg-[#D91B1B] shadow-[8px_8px_0px_0px_#1A1A1A] overflow-hidden">
                                <div className="grid grid-cols-3 border-b-[3px] border-ink h-24 bg-cream relative overflow-hidden">
                                    <div className="bg-[#9B8AFB] border-r-[2px] border-ink p-2 flex flex-col justify-between relative overflow-hidden">
                                        <div className="w-8 h-8 rounded-full bg-[#FF7EB6] border-[2px] border-ink ml-auto opacity-90" />
                                        <div className="bg-acid border border-ink px-1 py-0.5 font-mono text-[8px] font-extrabold text-ink uppercase w-fit z-10">
                                            LLM · RAG
                                        </div>
                                    </div>

                                    <div className="bg-[#48CAE4] border-r-[2px] border-ink p-1 flex items-center justify-center relative">
                                        <div className="w-16 h-20 bg-amber border-[2px] border-ink rounded-b-full flex flex-col items-center justify-center p-1 text-center shadow-sm">
                                            <span className="font-mono text-[7px] font-extrabold uppercase leading-tight text-ink border-b border-ink pb-0.5 mb-0.5">
                                                Make Systems Smart
                                            </span>
                                            <div className="flex items-center gap-1 text-ink font-bold text-xs">
                                                <span>⚡</span>
                                                <span>🚀</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-[#1D3557] p-2 flex flex-col justify-end items-end relative">
                                        <div className="w-full h-10 bg-hotpink border-[2px] border-ink flex items-center justify-center">
                                            <span className="font-mono text-[8px] font-bold text-ink bg-acid px-1 border border-ink">
                                                n8n.flow
                                            </span>
                                        </div>
                                        <div className="w-4 h-2 bg-cream border border-ink mx-auto" />
                                    </div>
                                </div>

                                <div
                                    className="h-56 w-full relative"
                                    style={{
                                        backgroundImage: `
                                            repeating-linear-gradient(
                                                90deg,
                                                #C81D25 0px,
                                                #C81D25 14px,
                                                #E5242B 14px,
                                                #E5242B 28px
                                            )
                                        `,
                                    }}
                                >
                                    <div className="absolute inset-2 border-[2px] border-dashed border-ink/35 pointer-events-none" />
                                    <div className="absolute bottom-3 right-3 bg-ink text-cream border-[2px] border-cream/30 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                                        <Cpu size={11} className="text-acid" />
                                        <span>PKT // AI-LAB</span>
                                    </div>
                                </div>
                            </div>

                            {/* ─── HANGING SPRING-PULLABLE ID BADGE PASS ─── */}
                            <div
                                className="absolute top-20 left-4 z-30 flex flex-col items-center cursor-grab active:cursor-grabbing"
                                onMouseDown={(e) => handleLanyardStart(e.clientY)}
                                onMouseMove={(e) => handleLanyardMove(e.clientY)}
                                onMouseUp={handleLanyardEnd}
                                onMouseLeave={handleLanyardEnd}
                                style={{
                                    transform: `translate3d(0, ${lanyardPullY}px, 0)`,
                                    transition: isPullingLanyard.current ? "none" : "transform 0.08s ease-out",
                                }}
                                title="Click & drag badge down to stretch lanyard!"
                            >
                                {/* Elastic Fabric Lanyard Strap */}
                                <div
                                    className="w-6 bg-[#6A1B09] border-[2px] border-ink shadow-sm flex flex-col items-center justify-between transition-all"
                                    style={{
                                        height: `${64 + lanyardPullY * 0.75}px`,
                                    }}
                                >
                                    <div className="w-full h-1.5 bg-ink/40" />
                                    <div className="font-mono text-[6px] text-cream/70 uppercase tracking-tighter rotate-90 my-auto">
                                        NIAT · KNK
                                    </div>
                                    <div className="w-7 h-3 bg-ink rounded-xs" />
                                </div>
                                <div className="w-3 h-5 bg-[#FF2A2A] border-[2px] border-ink -mt-0.5 z-10" />

                                {/* Yellow VIP Card with Holographic Sheen */}
                                <div
                                    className="relative w-52 bg-[#FFE14D] border-[3px] border-ink rounded-xl p-3 shadow-[6px_6px_0px_0px_#1A1A1A] -mt-1 -rotate-3 hover:rotate-0 transition-transform duration-300 overflow-hidden"
                                    style={{
                                        backgroundImage: `
                                            repeating-linear-gradient(
                                                90deg,
                                                #FFE14D 0px,
                                                #FFE14D 10px,
                                                #F5CB22 10px,
                                                #F5CB22 20px
                                            )
                                        `,
                                    }}
                                >
                                    {/* Holographic Prismatic Glare */}
                                    <div
                                        className="absolute inset-0 pointer-events-none opacity-25"
                                        style={{
                                            background: `linear-gradient(${mouseTilt.holoAngle}deg, transparent 30%, rgba(255,255,255,0.8) 50%, transparent 70%)`,
                                        }}
                                    />

                                    {/* Top Header */}
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-mono text-[8px] font-extrabold uppercase bg-ink text-acid px-1.5 py-0.5">
                                            ID-01 // VIP
                                        </span>
                                        <div className="flex items-center gap-1 font-mono text-[7px] font-black uppercase text-ink bg-acid px-1 border border-ink">
                                            <ShieldCheck size={9} />
                                            <span>VERIFIED</span>
                                        </div>
                                    </div>

                                    {/* Photo with Halftone Dot Texture */}
                                    <div className="relative w-full h-32 bg-hotpink border-[2px] border-ink overflow-hidden mb-2.5">
                                        <div
                                            className="absolute inset-0 opacity-25 pointer-events-none"
                                            style={{
                                                backgroundImage: "radial-gradient(#1A1A1A 1.5px, transparent 1.5px)",
                                                backgroundSize: "6px 6px",
                                            }}
                                        />
                                        <img
                                            src="/headshot.png"
                                            alt="K. Nanda Kishore"
                                            className="w-full h-full object-cover object-center mix-blend-normal"
                                        />
                                        <div className="absolute top-1 right-1 bg-ink text-acid px-1 font-mono text-[7px] font-black uppercase">
                                            HYD-IND
                                        </div>
                                    </div>

                                    {/* Name Badge */}
                                    <div className="bg-cream border-[2px] border-ink px-2 py-1.5 text-center mb-2 shadow-[2px_2px_0px_0px_#1A1A1A]">
                                        <div className="font-heading font-extrabold text-sm text-ink uppercase tracking-tight leading-none">
                                            Nanda Kishore
                                        </div>
                                        <div className="font-mono text-[10px] font-bold text-ink/75 mt-1">
                                            GenAI &amp; SWE
                                        </div>
                                    </div>

                                    {/* Barcode & Security Strip */}
                                    <div className="mb-2 px-1 py-0.5 bg-cream border border-ink flex items-center justify-between">
                                        <div className="flex items-center gap-0.5 h-3">
                                            <span className="w-0.5 h-full bg-ink" />
                                            <span className="w-1 h-full bg-ink" />
                                            <span className="w-0.5 h-full bg-ink" />
                                            <span className="w-1.5 h-full bg-ink" />
                                            <span className="w-0.5 h-full bg-ink" />
                                            <span className="w-1 h-full bg-ink" />
                                        </div>
                                        <span className="font-mono text-[7px] font-extrabold text-ink/70">
                                            *KNK-SWE-2026*
                                        </span>
                                    </div>

                                    {/* Quick Connect Buttons */}
                                    <div className="grid grid-cols-5 gap-1">
                                        <a
                                            href="mailto:nandureddy817.kalluri@gmail.com"
                                            aria-label="Email K. Nanda Kishore"
                                            title="Email: nandureddy817.kalluri@gmail.com"
                                            className="bg-ink text-acid hover:bg-electric hover:text-cream border border-ink h-7 flex items-center justify-center rounded-sm transition-colors"
                                        >
                                            <Mail size={11} />
                                        </a>
                                        <a
                                            href="https://wa.me/916309718153?text=Hi%20Nanda%20Kishore%2C%20I%20saw%20your%20portfolio%20and%20want%20to%20connect%20with%20you!"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="Chat on WhatsApp"
                                            title="WhatsApp: +91 6309718153"
                                            className="bg-ink text-[#25D366] hover:bg-[#25D366] hover:text-ink border border-ink h-7 flex items-center justify-center rounded-sm transition-colors"
                                        >
                                            <MessageCircle size={11} />
                                        </a>
                                        <a
                                            href="https://github.com/nandu-reddy-kalluri"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="GitHub Profile"
                                            title="GitHub: @nandu-reddy-kalluri"
                                            className="bg-ink text-acid hover:bg-electric hover:text-cream border border-ink h-7 flex items-center justify-center rounded-sm transition-colors"
                                        >
                                            <Github size={11} />
                                        </a>
                                        <a
                                            href="tel:6309718153"
                                            aria-label="Call K. Nanda Kishore"
                                            title="Call: +91 6309718153"
                                            className="bg-ink text-acid hover:bg-hotpink hover:text-cream border border-ink h-7 flex items-center justify-center rounded-sm transition-colors"
                                        >
                                            <Phone size={11} />
                                        </a>
                                        <button
                                            type="button"
                                            onClick={() => animateTo(1)}
                                            aria-label="Enter Portfolio"
                                            title="Enter Portfolio"
                                            className="bg-acid text-ink hover:bg-cream border border-ink h-7 flex items-center justify-center rounded-sm font-mono text-[9px] font-extrabold transition-colors"
                                        >
                                            GO
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ─── DESKTOP BOTTOM ACTION BAR ─── */}
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-md flex justify-center">
                    <button
                        type="button"
                        onClick={() => animateTo(1)}
                        className="bg-ink text-acid hover:bg-acid hover:text-ink border-[3px] border-ink px-6 py-3 shadow-[4px_4px_0px_0px_#FFFDF5] font-heading font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all active:translate-y-0.5"
                    >
                        <ChevronsDown size={17} className="animate-bounce" />
                        <span>Tap or Scroll to Unzip Portfolio</span>
                        <ChevronsDown size={17} className="animate-bounce" />
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ─── Helper: Bolted Plate Corner Screw ─── */
function CornerBolt({ className = "" }: { className?: string }) {
    return (
        <span
            className={`absolute w-3 h-3 rounded-full bg-cream border-[2px] border-ink flex items-center justify-center ${className}`}
            aria-hidden="true"
        >
            <span className="w-2 h-[1.5px] bg-ink rotate-45 block" />
        </span>
    );
}

/* ─── Helper: Circular Collectible Enamel Stamp SVG ─── */
function CircularBadgeSVG({
    idSuffix,
    text,
    innerBg,
    icon,
}: {
    idSuffix: string;
    text: string;
    innerBg: string;
    icon: "bot" | "bolt" | "bee";
}) {
    const pathId = `circle-path-${idSuffix}`;
    return (
        <svg viewBox="0 0 120 120" className="w-full h-full p-1 select-none pointer-events-none">
            <defs>
                <path
                    id={pathId}
                    d="M 60, 60 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
                />
            </defs>

            {/* Inner colored enamel circle */}
            <circle cx="60" cy="60" r="32" fill={innerBg} stroke="#1A1A1A" strokeWidth="3" />

            {/* Curved perimeter typography */}
            <text
                fill="#1A1A1A"
                fontSize="8.2"
                fontWeight="800"
                fontFamily="monospace"
                letterSpacing="1.1px"
            >
                <textPath href={`#${pathId}`} startOffset="0%">
                    {text}
                </textPath>
            </text>

            {/* Center Mascot Icon */}
            {icon === "bot" && (
                <g transform="translate(42, 42)">
                    <rect x="4" y="10" width="28" height="20" rx="4" fill="#FFFDF5" stroke="#1A1A1A" strokeWidth="2.5" />
                    <path d="M2 12 L34 12 L30 3 L6 3 Z" fill="#CCFF00" stroke="#1A1A1A" strokeWidth="2.5" />
                    <rect x="8" y="15" width="7" height="5" fill="#1A1A1A" />
                    <rect x="21" y="15" width="7" height="5" fill="#1A1A1A" />
                    <path d="M11 25 H25" stroke="#FF2A6D" strokeWidth="2.5" strokeLinecap="round" />
                </g>
            )}

            {icon === "bolt" && (
                <g transform="translate(43, 40)">
                    <polygon
                        points="20,2 6,20 17,20 13,38 29,17 18,17"
                        fill="#1A1A1A"
                        stroke="#FFFDF5"
                        strokeWidth="2"
                    />
                </g>
            )}

            {icon === "bee" && (
                <g transform="translate(42, 42)">
                    <ellipse cx="18" cy="19" rx="11" ry="13" fill="#FFD60A" stroke="#1A1A1A" strokeWidth="2.5" />
                    <path d="M8 15 H28 M7 20 H29 M9 25 H27" stroke="#1A1A1A" strokeWidth="2.5" />
                    <circle cx="14" cy="10" r="2" fill="#1A1A1A" />
                    <circle cx="22" cy="10" r="2" fill="#1A1A1A" />
                </g>
            )}
        </svg>
    );
}
