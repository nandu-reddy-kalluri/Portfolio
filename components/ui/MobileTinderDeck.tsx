"use client";

import { useState } from "react";
import {
    motion,
    AnimatePresence,
    useMotionValue,
    useTransform,
    animate,
    PanInfo,
} from "framer-motion";
import {
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    ExternalLink,
    Github,
    Sparkles,
} from "lucide-react";
import Link from "next/link";

export interface TinderCardItem {
    id: string;
    slug: string;
    status: string;
    category: string;
    title: string;
    description: string;
    architectureFlow?: string;
    tags: string[];
    headerBg: string;
    pillBg: string;
    liveUrl?: string;
    repoUrl?: string;
}

interface MobileTinderDeckProps {
    items: TinderCardItem[];
}

interface DraggableProjectCardProps {
    card: TinderCardItem;
    exitDirection: "left" | "right";
    onSwipeLeft: () => void;
    onSwipeRight: () => void;
}

function DraggableProjectCard({
    card,
    exitDirection,
    onSwipeLeft,
    onSwipeRight,
}: DraggableProjectCardProps) {
    // Isolated MotionValue per card mount — guarantees a new card NEVER inherits a stuck x offset
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-220, 0, 220], [-10, 0, 10]);

    const rightBadgeOpacity = useTransform(x, [25, 85], [0, 1]);
    const rightBadgeScale = useTransform(x, [25, 85], [0.85, 1.05]);
    const leftBadgeOpacity = useTransform(x, [-85, -25], [1, 0]);
    const leftBadgeScale = useTransform(x, [-85, -25], [1.05, 0.85]);

    const handleDragEnd = (
        _event: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
    ) => {
        const swipeThreshold = 45;
        const velocityThreshold = 240;

        if (
            info.offset.x < -swipeThreshold ||
            info.velocity.x < -velocityThreshold
        ) {
            onSwipeLeft();
        } else if (
            info.offset.x > swipeThreshold ||
            info.velocity.x > velocityThreshold
        ) {
            onSwipeRight();
        } else {
            animate(x, 0, {
                type: "spring",
                stiffness: 450,
                damping: 30,
            });
        }
    };

    return (
        <motion.article
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.75}
            dragMomentum={false}
            onDragEnd={handleDragEnd}
            style={{ x, rotate, touchAction: "pan-y" }}
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
                x: exitDirection === "left" ? -340 : 340,
                rotate: exitDirection === "left" ? -14 : 14,
                opacity: 0,
                scale: 0.92,
                transition: { duration: 0.18, ease: "easeOut" },
            }}
            className={`relative z-30 ${card.headerBg} p-2.5 border-[3px] border-ink rounded-2xl shadow-[5px_5px_0px_#1A1A1A] overflow-hidden cursor-grab active:cursor-grabbing flex flex-col justify-between`}
        >
            {/* Dynamic Tinder Swipe Stamps */}
            <motion.div
                style={{ opacity: rightBadgeOpacity, scale: rightBadgeScale }}
                className="pointer-events-none absolute top-11 left-3 z-40 px-2.5 py-1 bg-acid text-ink border-[2.5px] border-ink shadow-[3px_3px_0px_#1A1A1A] font-heading font-bold text-xs uppercase tracking-wider -rotate-12"
            >
                NEXT BUILD ★
            </motion.div>
            <motion.div
                style={{ opacity: leftBadgeOpacity, scale: leftBadgeScale }}
                className="pointer-events-none absolute top-11 right-3 z-40 px-2.5 py-1 bg-[#FF2A6D] text-cream border-[2.5px] border-ink shadow-[3px_3px_0px_#1A1A1A] font-heading font-bold text-xs uppercase tracking-wider rotate-12"
            >
                SWIPE NEXT →
            </motion.div>

            {/* Top Colored Folder Bar */}
            <div className="px-2 pt-0.5 pb-2 flex items-center justify-between gap-2">
                <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 bg-ink text-acid border border-ink">
                    FILE // {card.id}
                </span>
                <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 bg-cream text-ink border-[1.5px] border-ink">
                    ● {card.status}
                </span>
            </div>

            {/* Inner Crisp Cream Spec Card */}
            <div className="bg-cream text-ink border-[2.5px] border-ink rounded-xl p-4 flex-1 flex flex-col justify-between">
                <div>
                    <div className="font-mono text-[10px] font-extrabold uppercase tracking-widest text-electric mb-1">
                        {card.category}
                    </div>

                    <h3 className="font-heading font-bold text-xl sm:text-2xl uppercase tracking-tight text-ink mb-1.5 leading-tight">
                        {card.title}
                    </h3>

                    <p className="font-mono text-xs text-ink/85 leading-relaxed mb-3">
                        {card.description}
                    </p>

                    {card.architectureFlow && (
                        <div className="p-2 bg-ink text-cream border-[2px] border-ink mb-3">
                            <div className="font-mono text-[9px] font-extrabold uppercase tracking-widest text-acid mb-0.5">
                                SYSTEM PIPELINE:
                            </div>
                            <div className="font-mono text-[10px] font-bold text-cream leading-snug">
                                {card.architectureFlow}
                            </div>
                        </div>
                    )}

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                        {card.tags.slice(0, 4).map((tag) => (
                            <span
                                key={tag}
                                className={`px-2 py-0.5 border-[1.5px] border-ink font-mono text-[10px] font-extrabold uppercase ${card.pillBg}`}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Card Footer Action Bar */}
                <div className="pt-2.5 border-t-[2px] border-ink/15 flex flex-wrap items-center justify-between gap-2">
                    <Link
                        href={`/work/${card.slug}`}
                        className="bg-ink text-acid hover:bg-acid hover:text-ink border-[2px] border-ink px-3 py-1.5 font-mono text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-1"
                    >
                        <span>Case Study</span>
                        <ArrowUpRight size={13} />
                    </Link>

                    <div className="flex items-center gap-2">
                        {card.liveUrl && (
                            <a
                                href={card.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-acid text-ink border-[2px] border-ink px-2.5 py-1.5 font-mono text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-1"
                            >
                                <span>Live</span>
                                <ExternalLink size={12} />
                            </a>
                        )}
                        {card.repoUrl && (
                            <a
                                href={card.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${card.title} GitHub`}
                                className="bg-[#FFD60A] text-ink border-[2px] border-ink p-1.5 inline-flex items-center justify-center"
                            >
                                <Github size={14} />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.article>
    );
}

export default function MobileTinderDeck({ items }: MobileTinderDeckProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [exitDirection, setExitDirection] = useState<"left" | "right">("left");

    if (!items || items.length === 0) return null;

    const safeIndex = currentIndex % items.length;
    const activeCard = items[safeIndex];
    const nextCard = items[(safeIndex + 1) % items.length];

    const triggerNext = (dir: "left" | "right" = "left") => {
        setExitDirection(dir);
        setCurrentIndex((prev) => (prev + 1) % items.length);
    };

    const triggerPrev = () => {
        setExitDirection("right");
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    return (
        <div className="w-full select-none">
            {/* Numbered Quick-Select Pills [01] [02] [03] [04] */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2 mb-1.5">
                {items.map((item, idx) => {
                    const isActive = idx === safeIndex;
                    return (
                        <button
                            key={item.slug}
                            type="button"
                            onClick={() => {
                                setExitDirection(idx >= safeIndex ? "left" : "right");
                                setCurrentIndex(idx);
                            }}
                            className={`px-3 py-1.5 font-mono text-[10px] font-extrabold uppercase tracking-wider border-[2px] border-ink rounded-lg transition-all flex-shrink-0 ${
                                isActive
                                    ? `${item.headerBg} shadow-[2px_2px_0px_#1A1A1A] -translate-y-0.5`
                                    : "bg-cream text-ink/75"
                            }`}
                        >
                            [{String(idx + 1).padStart(2, "0")}] {item.title.split(" ").slice(0, 2).join(" ")}
                        </button>
                    );
                })}
            </div>

            {/* Top Swipe Instruction Pill */}
            <div className="flex items-center justify-between mb-2 px-0.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-ink text-acid border-[1.5px] border-ink font-mono text-[9px] font-extrabold uppercase tracking-wider">
                    <Sparkles size={10} /> SWIPE PROJECT CARD ↔
                </div>
                <div className="font-mono text-[11px] font-extrabold uppercase tracking-widest text-ink bg-[#FFD60A] px-2 py-0.5 border-[1.5px] border-ink">
                    {String(safeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </div>
            </div>

            {/* Stacked Tinder Deck Stage (overflow-hidden prevents stuck/bleeding cards) */}
            <div className="relative w-full overflow-hidden px-1 pt-1 pb-5">
                {/* 2nd Card in Stack (Real Project Content Underneath, Scaled & Tilted) */}
                {items.length > 1 && (
                    <div
                        aria-hidden="true"
                        className={`absolute inset-x-3 top-3 bottom-2 ${nextCard.headerBg} border-[2.5px] border-ink shadow-[3px_3px_0px_#1A1A1A] rounded-2xl scale-[0.95] translate-y-2 rotate-1 opacity-90 pointer-events-none z-10 p-2.5 flex flex-col justify-between overflow-hidden`}
                    >
                        <div className="px-2 pt-0.5 pb-1.5 flex items-center justify-between opacity-85">
                            <span className="font-mono text-[9px] font-extrabold uppercase px-2 py-0.5 bg-ink text-acid">
                                NEXT // {nextCard.id}
                            </span>
                            <span className="font-mono text-[9px] font-extrabold uppercase truncate max-w-[140px]">
                                {nextCard.title}
                            </span>
                        </div>
                        <div className="bg-cream text-ink border-[2px] border-ink rounded-xl p-3.5 flex-1 overflow-hidden opacity-85">
                            <div className="font-mono text-[9px] font-extrabold uppercase text-electric mb-0.5">
                                {nextCard.category}
                            </div>
                            <div className="font-heading font-bold text-lg uppercase text-ink mb-1">
                                {nextCard.title}
                            </div>
                            <p className="font-mono text-[11px] text-ink/80 line-clamp-3">
                                {nextCard.description}
                            </p>
                        </div>
                    </div>
                )}

                {/* Active Draggable Front Tinder Card */}
                <AnimatePresence mode="wait" initial={false}>
                    <DraggableProjectCard
                        key={`${activeCard.slug}-${safeIndex}`}
                        card={activeCard}
                        exitDirection={exitDirection}
                        onSwipeLeft={() => triggerNext("left")}
                        onSwipeRight={() => triggerNext("right")}
                    />
                </AnimatePresence>
            </div>

            {/* Bottom Tinder Control Dock (Prev / Dots / Next) */}
            <div className="flex items-center justify-between gap-3 px-1">
                <button
                    type="button"
                    onClick={triggerPrev}
                    className="px-3.5 py-2 bg-ink text-cream active:scale-95 border-[2px] border-ink rounded-full shadow-[2px_2px_0px_#CCFF00] font-mono text-xs font-extrabold uppercase inline-flex items-center gap-1 transition-transform"
                    aria-label="Previous project card"
                >
                    <ArrowLeft size={13} />
                    <span>Prev</span>
                </button>

                {/* Interactive Dot Indicators */}
                <div className="flex items-center gap-1.5">
                    {items.map((item, idx) => (
                        <button
                            key={item.slug}
                            type="button"
                            onClick={() => {
                                setExitDirection(idx > safeIndex ? "left" : "right");
                                setCurrentIndex(idx);
                            }}
                            aria-label={`Jump to project ${idx + 1}`}
                            className={`h-2.5 border-[1.5px] border-ink transition-all rounded-full ${
                                idx === safeIndex
                                    ? "w-6 bg-vivid"
                                    : "w-2.5 bg-cream"
                            }`}
                        />
                    ))}
                </div>

                <button
                    type="button"
                    onClick={() => triggerNext("left")}
                    className="px-4 py-2 bg-acid text-ink active:scale-95 border-[2px] border-ink rounded-full shadow-[2px_2px_0px_#1A1A1A] font-mono text-xs font-extrabold uppercase inline-flex items-center gap-1 transition-transform"
                    aria-label="Swipe to next project card"
                >
                    <span>Swipe</span>
                    <ArrowRight size={13} />
                </button>
            </div>
        </div>
    );
}
