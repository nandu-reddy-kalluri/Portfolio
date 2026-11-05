"use client";

import MobileSwipeStack, { type SwipeCardSlide } from "@/components/ui/MobileSwipeStack";

const focusData = [
    { id: "01", area: "Architecture", standard: "Generic boilerplate", mine: "Purpose-built pipelines & prompt schemas", color: "bg-acid text-ink" },
    { id: "02", area: "AI Integration", standard: "Unvalidated wrappers", mine: "JSON validation gates & fallback logic", color: "bg-electric text-cream" },
    { id: "03", area: "Automation", standard: "Isolated scripts", mine: "End-to-end n8n workflows & webhooks", color: "bg-[#FF2A6D] text-cream" },
    { id: "04", area: "Code Quality", standard: "Opaque black-box", mine: "Clean modular code & public GitHub repos", color: "bg-[#FFD60A] text-ink" },
];

export function ComparisonSection() {
    const mobileSlides: SwipeCardSlide[] = focusData.map((row) => ({
        id: row.id,
        tabLabel: `[${row.id}] ${row.area.split(" ")[0]}`,
        headerBg: row.color,
        badgeText: `STANDARD // ${row.id}`,
        statusText: row.area,
        content: (
            <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2 pb-2 border-b border-ink/15">
                    <span className="font-mono text-[10px] font-bold text-ink/55 uppercase">
                        TYPICAL APPROACH:
                    </span>
                    <span className="font-mono text-xs font-bold text-ink/55 uppercase line-through">
                        {row.standard}
                    </span>
                </div>
                <div>
                    <span className="font-mono text-[10px] font-extrabold text-electric uppercase block mb-1">
                        MY ENGINEERING STANDARD:
                    </span>
                    <div className="font-heading font-bold text-lg uppercase tracking-tight text-ink">
                        ✓ {row.mine}
                    </div>
                </div>
            </div>
        ),
    }));

    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-10 lg:mb-20 reveal-up">
            <div className="font-mono text-xs font-extrabold uppercase tracking-[0.3em] text-ink/65 mb-1.5">
                Engineering Standards
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl uppercase tracking-tight text-ink mb-4 lg:mb-6">
                How I Build Systems
            </h2>

            {/* ─── MOBILE ONLY (< lg): 3D Tinder Swipe Stack [01]–[04] ─── */}
            <div className="lg:hidden">
                <MobileSwipeStack
                    slides={mobileSlides}
                    instructionLabel="SWIPE STANDARD [01–04] ↔"
                />
            </div>

            {/* ─── DESKTOP ONLY (lg+): 2x2 Grid (Unchanged) ─── */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-4">
                {focusData.map((row) => (
                    <div key={row.area} className="neo-card bg-cream text-ink p-4 sm:p-5">
                        <div className="flex items-center justify-between gap-2 mb-3">
                            <span className={`px-2.5 py-0.5 ${row.color} border-[2px] border-ink font-mono text-[10px] font-extrabold uppercase`}>
                                {row.area}
                            </span>
                            <span className="font-mono text-[10px] font-bold text-ink/50 uppercase line-through">
                                {row.standard}
                            </span>
                        </div>
                        <div className="font-heading font-bold text-base sm:text-lg uppercase tracking-tight text-ink">
                            ✓ {row.mine}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
