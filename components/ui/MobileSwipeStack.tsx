"use client";

import React, { useState } from "react";
import {
    motion,
    AnimatePresence,
    useMotionValue,
    useTransform,
    animate,
    PanInfo,
} from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

export interface SwipeCardSlide {
    id: string;
    tabLabel: string;
    headerBg: string;
    badgeText?: string;
    statusText?: string;
    content: React.ReactNode;
}

interface MobileSwipeStackProps {
    slides: SwipeCardSlide[];
    instructionLabel?: string;
    darkStage?: boolean;
}

interface DraggableTopCardProps {
    slide: SwipeCardSlide;
    exitDir: "left" | "right";
    darkStage: boolean;
    onSwipeLeft: () => void;
    onSwipeRight: () => void;
}

function DraggableTopCard({
    slide,
    exitDir,
    darkStage,
    onSwipeLeft,
    onSwipeRight,
}: DraggableTopCardProps) {
    // Isolated MotionValue per card mount — guarantees a new card NEVER inherits a stuck x offset
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-220, 0, 220], [-10, 0, 10]);

    const rightStampOpacity = useTransform(x, [25, 85], [0, 1]);
    const rightStampScale = useTransform(x, [25, 85], [0.85, 1.05]);
    const leftStampOpacity = useTransform(x, [-85, -25], [1, 0]);
    const leftStampScale = useTransform(x, [-85, -25], [1.05, 0.85]);

    const handleDragEnd = (
        _e: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
    ) => {
        const offsetThreshold = 45;
        const velocityThreshold = 240;

        if (
            info.offset.x < -offsetThreshold ||
            info.velocity.x < -velocityThreshold
        ) {
            onSwipeLeft();
        } else if (
            info.offset.x > offsetThreshold ||
            info.velocity.x > velocityThreshold
        ) {
            onSwipeRight();
        } else {
            // Explicitly spring back to x = 0 so the card can never get stuck mid-drag
            animate(x, 0, {
                type: "spring",
                stiffness: 450,
                damping: 30,
            });
        }
    };

    return (
        <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.75}
            dragMomentum={false}
            onDragEnd={handleDragEnd}
            style={{
                x,
                rotate,
                touchAction: "pan-y",
            }}
            initial={{
                opacity: 0,
                scale: 0.94,
                y: 10,
            }}
            animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                transition: {
                    type: "spring",
                    stiffness: 380,
                    damping: 28,
                },
            }}
            exit={{
                x: exitDir === "left" ? -340 : 340,
                rotate: exitDir === "left" ? -14 : 14,
                opacity: 0,
                scale: 0.92,
                transition: { duration: 0.18, ease: "easeOut" },
            }}
            className={`relative z-30 ${
                slide.headerBg
            } p-2.5 border-[3px] ${
                darkStage
                    ? "border-cream shadow-[5px_5px_0px_#CCFF00]"
                    : "border-ink shadow-[5px_5px_0px_#1A1A1A]"
            } rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing flex flex-col justify-between`}
        >
            {/* Dynamic Tinder Swipe Stamp: Drag Right */}
            <motion.div
                style={{
                    opacity: rightStampOpacity,
                    scale: rightStampScale,
                }}
                className="pointer-events-none absolute top-11 left-3 z-40 px-2.5 py-1 bg-acid text-ink border-[2.5px] border-ink shadow-[3px_3px_0px_#1A1A1A] font-heading font-bold text-xs uppercase tracking-wider -rotate-12"
            >
                NEXT CARD ★
            </motion.div>

            {/* Dynamic Tinder Swipe Stamp: Drag Left */}
            <motion.div
                style={{
                    opacity: leftStampOpacity,
                    scale: leftStampScale,
                }}
                className="pointer-events-none absolute top-11 right-3 z-40 px-2.5 py-1 bg-[#FF2A6D] text-cream border-[2.5px] border-ink shadow-[3px_3px_0px_#1A1A1A] font-heading font-bold text-xs uppercase tracking-wider rotate-12"
            >
                SWIPE NEXT →
            </motion.div>

            {/* Colored Folder Top Bar */}
            <div className="px-2 pt-0.5 pb-2 flex items-center justify-between gap-2">
                <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 bg-ink text-acid border border-ink">
                    {slide.badgeText || `CARD // ${slide.id}`}
                </span>
                <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 bg-cream text-ink border-[1.5px] border-ink">
                    {slide.statusText || "SWIPE ↔"}
                </span>
            </div>

            {/* Inner High-Contrast Cream Body */}
            <div className="bg-cream text-ink border-[2.5px] border-ink rounded-xl p-4 flex-1 flex flex-col justify-between">
                {slide.content}
            </div>
        </motion.div>
    );
}

export default function MobileSwipeStack({
    slides,
    instructionLabel = "SWIPE CARD LEFT / RIGHT",
    darkStage = false,
}: MobileSwipeStackProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [exitDir, setExitDir] = useState<"left" | "right">("left");

    if (!slides || slides.length === 0) return null;

    const safeIdx = activeIndex % slides.length;
    const currentSlide = slides[safeIdx];
    const nextSlide = slides[(safeIdx + 1) % slides.length];

    const goNext = (dir: "left" | "right" = "left") => {
        setExitDir(dir);
        setActiveIndex((prev) => (prev + 1) % slides.length);
    };

    const goPrev = () => {
        setExitDir("right");
        setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div className="w-full select-none">
            {/* 1. Numbered Quick-Jump Pill Tabs (01, 02, 03, 04...) */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2 mb-1.5">
                {slides.map((slide, idx) => {
                    const isActive = idx === safeIdx;
                    return (
                        <button
                            key={slide.id}
                            type="button"
                            onClick={() => {
                                setExitDir(idx >= safeIdx ? "left" : "right");
                                setActiveIndex(idx);
                            }}
                            className={`px-3 py-1.5 font-mono text-[10px] font-extrabold uppercase tracking-wider border-[2px] transition-all flex-shrink-0 rounded-lg ${
                                isActive
                                    ? `${slide.headerBg} ${
                                          darkStage
                                              ? "border-cream shadow-[2px_2px_0px_#FFFDF5]"
                                              : "border-ink shadow-[2px_2px_0px_#1A1A1A]"
                                      } -translate-y-0.5`
                                    : darkStage
                                    ? "bg-cream/10 text-cream/80 border-cream/25"
                                    : "bg-cream text-ink/75 border-ink"
                            }`}
                        >
                            {slide.tabLabel}
                        </button>
                    );
                })}
            </div>

            {/* 2. Top Status & Counter Bar */}
            <div className="flex items-center justify-between mb-2 px-0.5">
                <div
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 border-[1.5px] font-mono text-[9px] font-extrabold uppercase tracking-wider ${
                        darkStage
                            ? "bg-acid text-ink border-cream"
                            : "bg-ink text-acid border-ink"
                    }`}
                >
                    <Sparkles size={10} />
                    <span>{instructionLabel}</span>
                </div>
                <span
                    className={`font-mono text-[11px] font-extrabold uppercase tracking-widest px-2 py-0.5 border-[1.5px] ${
                        darkStage
                            ? "bg-[#FFD60A] text-ink border-cream"
                            : "bg-[#FFD60A] text-ink border-ink"
                    }`}
                >
                    {String(safeIdx + 1).padStart(2, "0")} /{" "}
                    {String(slides.length).padStart(2, "0")}
                </span>
            </div>

            {/* 3. Stacked Tinder Deck Stage (overflow-hidden prevents stuck/bleeding cards) */}
            <div className="relative w-full overflow-hidden px-1 pt-1 pb-5">
                {/* 2nd Card in Stack (Real Content Underneath, Scaled & Tilted) */}
                {slides.length > 1 && (
                    <div
                        aria-hidden="true"
                        className={` absolute inset-x-3 top-3 bottom-2 ${
                            nextSlide.headerBg
                        } border-[2.5px] ${
                            darkStage
                                ? "border-cream shadow-[3px_3px_0px_#FFFDF5]"
                                : "border-ink shadow-[3px_3px_0px_#1A1A1A]"
                        } rounded-2xl scale-[0.95] translate-y-2 rotate-1 opacity-90 pointer-events-none z-10 p-2.5 flex flex-col justify-between overflow-hidden`}
                    >
                        <div className="px-2 pt-0.5 pb-1.5 flex items-center justify-between opacity-80">
                            <span className="font-mono text-[9px] font-extrabold uppercase px-2 py-0.5 bg-ink text-acid">
                                NEXT // {nextSlide.id}
                            </span>
                            <span className="font-mono text-[9px] font-extrabold uppercase">
                                {nextSlide.tabLabel}
                            </span>
                        </div>
                        <div className="bg-cream text-ink border-[2px] border-ink rounded-xl p-3.5 flex-1 overflow-hidden opacity-85">
                            {nextSlide.content}
                        </div>
                    </div>
                )}

                {/* Active Draggable Front Tinder Card */}
                <AnimatePresence mode="wait" initial={false}>
                    <DraggableTopCard
                        key={`${currentSlide.id}-${safeIdx}`}
                        slide={currentSlide}
                        exitDir={exitDir}
                        darkStage={darkStage}
                        onSwipeLeft={() => goNext("left")}
                        onSwipeRight={() => goNext("right")}
                    />
                </AnimatePresence>
            </div>

            {/* 4. Bottom Thumb-Friendly Tinder Controls */}
            <div className="flex items-center justify-between gap-3 px-1">
                <button
                    type="button"
                    onClick={goPrev}
                    className={`px-3.5 py-2 border-[2px] rounded-full font-mono text-xs font-extrabold uppercase inline-flex items-center gap-1 active:scale-95 transition-transform ${
                        darkStage
                            ? "bg-cream text-ink border-cream shadow-[2px_2px_0px_#CCFF00]"
                            : "bg-ink text-cream border-ink shadow-[2px_2px_0px_#CCFF00]"
                    }`}
                >
                    <ArrowLeft size={13} />
                    <span>Prev</span>
                </button>

                {/* Progress Pill Dots */}
                <div className="flex items-center gap-1.5">
                    {slides.map((s, idx) => (
                        <button
                            key={s.id}
                            type="button"
                            onClick={() => {
                                setExitDir(idx >= safeIdx ? "left" : "right");
                                setActiveIndex(idx);
                            }}
                            aria-label={`Go to card ${idx + 1}`}
                            className={`h-2.5 rounded-full border-[1.5px] transition-all ${
                                darkStage ? "border-cream" : "border-ink"
                            } ${
                                idx === safeIdx
                                    ? "w-6 bg-vivid"
                                    : darkStage
                                    ? "w-2.5 bg-cream/30"
                                    : "w-2.5 bg-cream"
                            }`}
                        />
                    ))}
                </div>

                <button
                    type="button"
                    onClick={() => goNext("left")}
                    className={`px-4 py-2 bg-acid text-ink border-[2px] rounded-full font-mono text-xs font-extrabold uppercase inline-flex items-center gap-1 active:scale-95 transition-transform ${
                        darkStage
                            ? "border-cream shadow-[2px_2px_0px_#FFFDF5]"
                            : "border-ink shadow-[2px_2px_0px_#1A1A1A]"
                    }`}
                >
                    <span>Swipe</span>
                    <ArrowRight size={13} />
                </button>
            </div>
        </div>
    );
}
