"use client";

import LiveTerminal from "@/components/ui/LiveTerminal";
import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { AboutSection } from "@/components/home/AboutSection";
import { TechLogoMarquee } from "@/components/home/TechLogoMarquee";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { AiPipelinesSection } from "@/components/home/AiPipelinesSection";
import { CurrentlyBuildingSection } from "@/components/home/CurrentlyBuildingSection";
import { PhilosophySection } from "@/components/home/PhilosophySection";
import { ProofSection } from "@/components/home/ProofSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { CtaSection } from "@/components/home/CtaSection";
import { TactileDossierGate } from "@/components/home/TactileDossierGate";
import CurvedPathMarquee from "@/components/ui/CurvedPathMarquee";

/* ─── Konami Code Easter Egg ─── */
function useKonamiCode(callback: () => void) {
    const sequence = useMemo(() => [
        "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
        "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
        "b", "a",
    ], []);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === sequence[index]) {
                const next = index + 1;
                if (next === sequence.length) {
                    callback();
                    setIndex(0);
                } else {
                    setIndex(next);
                }
            } else {
                setIndex(0);
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [index, callback, sequence]);
}

export default function Home() {
    const [konamiActive, setKonamiActive] = useState(false);
    const [dossierTrigger, setDossierTrigger] = useState(0);
    const [showMobileLab, setShowMobileLab] = useState(false);
    useKonamiCode(() => setKonamiActive(true));

    const topTags = [
        "K. Nanda Kishore",
        "Generative AI",
        "Intelligent Automation",
        "AI Pipelines",
        "Full-Stack Engineering",
        "Aurora × NIAT",
    ];

    return (
        <div className={`min-h-screen bg-cream overflow-x-hidden w-full max-w-full ${konamiActive ? "hue-rotate-180 transition-all duration-1000" : ""}`}>
            {/* Interactive Pre-Home Tactile Dossier & Zipper Cover Gate */}
            <TactileDossierGate forceOpenTrigger={dossierTrigger} />

            {/* Top marquee + Re-Zip Cover trigger */}
            <div className="w-full max-w-full bg-acid border-b-[3px] border-ink py-1.5 sm:py-2 overflow-hidden select-none relative flex items-center">
                <div className="marquee-container font-mono font-bold text-ink uppercase tracking-widest text-[11px] sm:text-xs flex-1">
                    <div className="marquee-content animate-marquee">
                        {topTags.map((t) => (
                            <span key={t} className="px-3 sm:px-4 md:px-6">{t}&nbsp;///&nbsp;</span>
                        ))}
                    </div>
                    <div className="marquee-content animate-marquee" aria-hidden="true">
                        {topTags.map((t) => (
                            <span key={`dup-${t}`} className="px-3 sm:px-4 md:px-6">{t}&nbsp;///&nbsp;</span>
                        ))}
                    </div>
                </div>
                <button
                    type="button"
                    onClick={() => setDossierTrigger((c) => c + 1)}
                    className="relative z-10 mr-2 sm:mr-4 bg-ink text-acid hover:bg-cream hover:text-ink border-[2px] border-ink px-2 sm:px-3 py-0.5 font-mono text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider flex-shrink-0 transition-colors"
                    title="Re-zip the interactive dossier cover"
                >
                    ⚡ Cover
                </button>
            </div>

            {/* 1. Hero */}
            <HeroSection />

            {/* 2. Engineering Signals Bar ([01]–[04] Tinder Swipe Deck on Mobile, 4-Col Grid on Desktop) */}
            <StatsSection />

            {/* 3. About Section ([01]–[03] Tinder Swipe Deck on Mobile, 12-Col on Desktop) */}
            <AboutSection />

            {/* 3.5 Cybernetic Curved SVG Text-on-a-Path Ribbon Marquee (Desktop lg+ Only to keep Mobile ultra-clean) */}
            <div className="hidden lg:block">
                <CurvedPathMarquee className="mb-12 md:mb-20" />
            </div>

            {/* 4. Selected Work ([01]–[04] Tinder Swipe Deck on Mobile, 2x2 Folder Grid on Desktop) */}
            <ProjectsSection />

            {/* 8. Tech Marquee ([01]–[04] Tinder Swipe Deck on Mobile, 8-Col Keycap Matrix on Desktop) */}
            <TechLogoMarquee />

            {/* 11. Capabilities ([01]–[04] Tinder Swipe Deck on Mobile, 2x2 Grid on Desktop) */}
            <ServicesSection />

            {/* ─── MOBILE ONLY (< lg): Optional Deep-Lab Accordion Trigger (Keeps Mobile Scroll Ultra-Short by Default) ─── */}
            <div className="lg:hidden max-w-7xl mx-auto px-4 mb-10">
                <button
                    type="button"
                    onClick={() => setShowMobileLab((prev) => !prev)}
                    className="w-full py-3.5 px-4 bg-ink text-acid border-[3px] border-ink rounded-2xl shadow-[5px_5px_0px_#CCFF00] font-mono text-xs font-extrabold uppercase tracking-wider flex items-center justify-between gap-2 active:scale-[0.99] transition-all"
                >
                    <span className="flex items-center gap-2 text-left">
                        <Sparkles size={15} className="text-[#FFD60A] flex-shrink-0" />
                        <span>
                            {showMobileLab
                                ? "Hide Deep Lab Decks (Pipelines & Receipts)"
                                : "Explore Deep Lab Decks (Pipelines, R&D & 06 Receipts)"}
                        </span>
                    </span>
                    {showMobileLab ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
            </div>

            {/* Deep Engineering Lab Sections: Always visible on Desktop (lg+), toggleable on Mobile (< lg) */}
            <div className={`${showMobileLab ? "block" : "hidden"} lg:block`}>
                {/* 5. Dedicated AI Pipelines Architecture */}
                <AiPipelinesSection />

                {/* 6. Currently Building */}
                <CurrentlyBuildingSection />

                {/* 7. Live Interactive Cyber Deck Terminal (Desktop lg+ Only) */}
                <section className="hidden lg:block max-w-7xl mx-auto px-4 md:px-8 mb-14 md:mb-24">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-acid text-ink border-[2px] border-ink shadow-[3px_3px_0px_#1A1A1A] font-mono text-[10px] font-extrabold uppercase tracking-[0.22em] mb-3">
                        LIVE SHELL // INTERACTIVE WORKSPACE
                    </div>
                    <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-ink mb-5 leading-[0.95]">
                        Engineering Command Deck
                    </h2>
                    <LiveTerminal />
                </section>

                {/* 9. Proof & Verifiable Receipts */}
                <ProofSection />

                {/* 10. Engineering Philosophy */}
                <PhilosophySection />

                {/* 10.5 Secondary Curved SVG Ribbon Marquee (Desktop lg+ Only) */}
                <div className="hidden lg:block">
                    <CurvedPathMarquee
                        variant="vivid"
                        direction="right"
                        speed={85}
                        items={[
                            "LEGAL AI AGENT · LIVE ON STREAMLIT",
                            "WEARRANGE · NEXT.JS WEDDING PLATFORM",
                            "WHATSAPP AI BOT · GEMINI + TWILIO + N8N",
                            "CUP COZY · LIVE ON VERCEL EDGE",
                            "AI PUBLIC SAFETY · COMPUTER VISION R&D",
                        ]}
                        className="mb-12 md:mb-20"
                    />
                </div>
            </div>

            {/* 12. CTA */}
            <CtaSection />

            {/* Bottom marquee */}
            <div className="w-full max-w-full bg-acid border-t-[3px] border-ink py-2.5 sm:py-3 overflow-hidden select-none">
                <div className="marquee-container font-mono font-bold text-ink uppercase tracking-widest text-xs sm:text-sm">
                    <div className="marquee-content animate-marquee-reverse">
                        <span className="px-4 sm:px-6">Generative AI &amp; Software Engineer&nbsp;///&nbsp;</span>
                        <span className="px-4 sm:px-6">Building practical AI systems&nbsp;///&nbsp;</span>
                        <span className="px-4 sm:px-6">n8n &amp; Intelligent Automation&nbsp;///&nbsp;</span>
                        <span className="px-4 sm:px-6">Open to engineering collaborations&nbsp;///&nbsp;</span>
                    </div>
                    <div className="marquee-content animate-marquee-reverse" aria-hidden="true">
                        <span className="px-4 sm:px-6">Generative AI &amp; Software Engineer&nbsp;///&nbsp;</span>
                        <span className="px-4 sm:px-6">Building practical AI systems&nbsp;///&nbsp;</span>
                        <span className="px-4 sm:px-6">n8n &amp; Intelligent Automation&nbsp;///&nbsp;</span>
                        <span className="px-4 sm:px-6">Open to engineering collaborations&nbsp;///&nbsp;</span>
                    </div>
                </div>
            </div>

            {/* Easter egg */}
            {konamiActive && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="fixed top-20 left-1/2 -translate-x-1/2 z-[400] neo-card bg-acid text-ink px-6 py-3 font-mono text-sm font-bold uppercase"
                >
                    🚀 Developer mode activated
                    <button onClick={() => setKonamiActive(false)} className="ml-4 underline text-xs">dismiss</button>
                </motion.div>
            )}
        </div>
    );
}
