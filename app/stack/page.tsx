"use client";

import { StatusBar, HeaderSection, CategoriesSection, CurrentlyLearningSection, CTASection } from "@/components/stack/StackPageContent";
import { MobileStackHub } from "@/components/stack/MobileStackHub";

export default function StackPage() {
    return (
        <div className="min-h-screen bg-cream pb-24">
            {/* Status bar */}
            <StatusBar />

            {/* Header */}
            <HeaderSection />

            {/* ═══ MOBILE (< lg): High-Density Tactile Arsenal Hub (1 Screen, Zero Scroll Fatigue) ═══ */}
            <MobileStackHub />

            {/* ═══ DESKTOP (lg+): Full Cartridge Matrix (Unchanged) ═══ */}
            <div className="hidden lg:block">
                <CategoriesSection />
                <CurrentlyLearningSection />
                <CTASection />
            </div>
        </div>
    );
}
