"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { ServicePackages } from "./components/ServicePackages";
import { ProcessSection } from "./components/ProcessSection";
import { ComparisonSection } from "./components/ComparisonSection";
import { CTASection } from "./components/CTASection";
import { MobileCapabilitiesHub } from "./components/MobileCapabilitiesHub";

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-cream pb-24">
            {/* Top Status Bar */}
            <div className="w-full bg-ink border-b-[3px] border-ink py-2 px-4 md:px-8 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-acid animate-pulse-dot" />
                    <span className="font-mono text-xs font-extrabold text-cream uppercase tracking-widest">
                        {"/// engineering capabilities"}
                    </span>
                </div>
                <span className="font-mono text-xs font-extrabold text-acid tracking-widest uppercase">
                    4 Core Domains
                </span>
            </div>

            {/* Header Section */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 mt-5 md:mt-14 mb-5 md:mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-acid text-ink border-[2px] border-ink shadow-[3px_3px_0px_#1A1A1A] font-mono text-[10px] font-extrabold uppercase tracking-[0.22em] mb-2.5">
                        <Sparkles size={12} /> ENGINEERING SCOPE // FULL MATRIX
                    </div>
                    <h1 className="text-3xl sm:text-6xl md:text-[6.5rem] font-heading font-extrabold text-ink leading-[0.9] tracking-tighter uppercase mb-3">
                        Capabilities
                    </h1>
                    <p className="font-mono text-xs sm:text-sm md:text-base text-ink/85 max-w-xl leading-relaxed">
                        Practical engineering capabilities spanning Generative AI applications, intelligent n8n automation workflows, and modern full-stack web products.
                    </p>
                </motion.div>
            </section>

            {/* ═══ MOBILE (< lg): Segmented Console (1 Screen, Zero Scroll Fatigue) ═══ */}
            <MobileCapabilitiesHub />

            {/* ═══ DESKTOP (lg+): Full Multi-Deck Layout (Unchanged) ═══ */}
            <div className="hidden lg:block">
                <ServicePackages />
                <ProcessSection />
                <ComparisonSection />
                <CTASection />
            </div>
        </div>
    );
}
