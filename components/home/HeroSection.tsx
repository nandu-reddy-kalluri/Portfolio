"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useLoading } from "@/components/ui/LoadingContext";
import InteractiveConstellation from "@/components/ui/InteractiveConstellation";

export function HeroSection() {
    const heroRef = useRef(null);
    const prefersReduced = useReducedMotion();
    const [isMobile, setIsMobile] = useState(false);
    const { isLoaded } = useLoading();

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 768px)");
        const update = () => setIsMobile(mq.matches);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);

    const animationsOff = prefersReduced || isMobile;
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

    // Container orchestration for subtle sequential reveal
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.09,
                delayChildren: 0.05,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 16 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    };

    const sideVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                delay: 0.25,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    };

    return (
        <section ref={heroRef} className="relative min-h-[85vh] md:min-h-screen flex items-center overflow-hidden">
            {/* Interactive Neural Constellation Background */}
            <InteractiveConstellation density={30} className="z-0" />

            <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
                <div className="absolute -top-20 -right-20 w-72 md:w-[480px] h-72 md:h-[480px] bg-acid/10 rounded-full blur-3xl" />
                <div className="absolute bottom-10 -left-20 w-60 md:w-[380px] h-60 md:h-[380px] bg-electric/10 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/3 w-60 md:w-[300px] h-60 md:h-[300px] bg-mint/10 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 w-full relative z-10">
                <motion.div style={animationsOff ? undefined : { y: heroY, opacity: heroOpacity }}>
                    <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                        <motion.div
                            variants={animationsOff ? undefined : containerVariants}
                            initial={animationsOff ? undefined : "hidden"}
                            animate={animationsOff ? undefined : (isLoaded ? "visible" : "hidden")}
                            className="flex-1"
                        >
                            {/* 1. Header tag */}
                            <motion.div
                                variants={animationsOff ? undefined : itemVariants}
                                className="font-mono text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-ink/70 mb-4 flex items-center gap-2"
                            >
                                <span className="inline-block w-2 h-2 bg-acid animate-pulse-dot" />
                                <span>
                                    Portfolio / {new Date().getFullYear()} · AI · AUTOMATION · SOFTWARE
                                </span>
                            </motion.div>

                            {/* 2. Name */}
                            <motion.h1
                                variants={animationsOff ? undefined : itemVariants}
                                className="text-4xl sm:text-6xl md:text-[6.5rem] lg:text-[7.8rem] font-heading font-bold text-ink leading-[0.88] tracking-tighter uppercase cursor-default"
                            >
                                K. Nanda<br />
                                <span className="relative inline-block">
                                    Kishore
                                    <span className="absolute -right-2 -top-2 md:-right-4 md:-top-4 w-4 h-4 md:w-6 md:h-6 bg-acid border-[3px] border-ink" />
                                </span>
                            </motion.h1>

                            {/* 3. Role */}
                            <motion.div
                                variants={animationsOff ? undefined : itemVariants}
                                className="mt-4 font-heading font-bold text-xl sm:text-2xl md:text-3xl text-electric uppercase tracking-tight"
                            >
                                Generative AI &amp; Software Engineer
                            </motion.div>

                            {/* 4. Description */}
                            <motion.p
                                variants={animationsOff ? undefined : itemVariants}
                                className="font-mono text-sm md:text-base text-ink/85 mt-4 max-w-xl leading-relaxed"
                            >
                                I build AI-powered products, intelligent automation systems, and modern web experiences.
                            </motion.p>

                            {/* 5. Authentic Engineering Signals Pills */}
                            <motion.div
                                variants={animationsOff ? undefined : itemVariants}
                                className="mt-5 flex flex-wrap gap-2 max-w-xl"
                            >
                                <span className="inline-flex items-center gap-1.5 bg-ink/[0.05] border-[2px] border-ink/15 px-3 py-1 font-mono text-[10px] md:text-xs font-bold uppercase tracking-wider text-ink/80 hover:bg-ink hover:text-cream transition-colors">
                                    Aurora × NIAT · B.Tech
                                </span>
                                <span className="inline-flex items-center gap-1.5 bg-acid/20 border-[2px] border-ink/20 px-3 py-1 font-mono text-[10px] md:text-xs font-bold uppercase tracking-wider text-ink hover:bg-acid hover:border-ink transition-colors">
                                    <span className="w-1.5 h-1.5 rounded-full bg-acid" />
                                    Generative AI &amp; Agents
                                </span>
                                <span className="inline-flex items-center gap-1.5 bg-mint/15 border-[2px] border-mint/40 px-3 py-1 font-mono text-[10px] md:text-xs font-bold uppercase tracking-wider text-ink hover:bg-mint hover:text-ink transition-colors">
                                    <span className="w-1.5 h-1.5 rounded-full bg-mint" />
                                    Live Builds &amp; Pipelines
                                </span>
                            </motion.div>
                        </motion.div>

                        {/* 6. CTA buttons */}
                        <motion.div
                            variants={animationsOff ? undefined : sideVariants}
                            initial={animationsOff ? undefined : "hidden"}
                            animate={animationsOff ? undefined : (isLoaded ? "visible" : "hidden")}
                            className="flex flex-col sm:flex-row md:flex-col gap-3 w-full sm:w-auto md:min-w-[240px]"
                        >
                            <Link
                                href="/work"
                                className="neo-card bg-acid text-ink p-4 font-heading font-bold text-center uppercase tracking-wider text-sm flex items-center justify-center gap-2 hover:bg-cream hover:text-ink transition-colors group"
                            >
                                View Selected Work
                                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </Link>

                            <Link
                                href="/contact"
                                className="neo-card bg-ink text-cream p-4 font-heading font-bold text-center uppercase tracking-wider text-sm flex items-center justify-center gap-2 hover:bg-electric hover:text-cream transition-colors group"
                            >
                                Let&apos;s Connect
                                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </Link>
                        </motion.div>
                    </header>
                </motion.div>
            </div>
        </section>
    );
}
