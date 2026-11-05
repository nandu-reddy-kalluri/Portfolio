"use client";

import MobileSwipeStack, { type SwipeCardSlide } from "@/components/ui/MobileSwipeStack";

export function ProcessSection() {
    const steps = [
        { num: "01", title: "Scope & Framing", desc: "Understanding the problem, required data models, and API interfaces.", bg: "bg-acid text-ink" },
        { num: "02", title: "Model & Pipeline", desc: "Crafting structured prompt gates, API triggers, and automation graphs.", bg: "bg-electric text-cream" },
        { num: "03", title: "Frontend & Logic", desc: "Building responsive UI, integrating state, and connecting backend routes.", bg: "bg-[#FF2A6D] text-cream" },
        { num: "04", title: "Deploy & Refine", desc: "Production release with public repos, live testing, and documentation.", bg: "bg-[#FFD60A] text-ink" },
    ];

    const mobileSlides: SwipeCardSlide[] = steps.map((step) => ({
        id: step.num,
        tabLabel: `[${step.num}] ${step.title.split(" ")[0]}`,
        headerBg: step.bg,
        badgeText: `STAGE // ${step.num}`,
        statusText: `STEP ${step.num} OF 04`,
        content: (
            <div>
                <h3 className="font-heading font-bold text-xl uppercase tracking-tight text-ink mb-2">
                    {step.title}
                </h3>
                <p className="font-mono text-xs text-ink/85 leading-relaxed">
                    {step.desc}
                </p>
            </div>
        ),
    }));

    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-10 lg:mb-20 reveal-up">
            <div className="font-mono text-xs font-extrabold uppercase tracking-[0.3em] text-ink/65 mb-1.5">
                Workflow Loop
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl uppercase tracking-tight text-ink mb-4 lg:mb-6">
                The Process
            </h2>

            {/* ─── MOBILE ONLY (< lg): 3D Tinder Swipe Stack for Stages [01]–[04] ─── */}
            <div className="lg:hidden">
                <MobileSwipeStack
                    slides={mobileSlides}
                    instructionLabel="SWIPE PROCESS STAGE [01–04] ↔"
                />
            </div>

            {/* ─── DESKTOP ONLY (lg+): 4-Column Grid (Unchanged) ─── */}
            <div className="hidden lg:grid lg:grid-cols-4 gap-5">
                {steps.map((step, i) => (
                    <div key={step.num} className="reveal-up" style={{ animationDelay: `${Math.min(i * 0.06, 0.4)}s` }}>
                        <div className="neo-card bg-cream text-ink h-full overflow-hidden flex flex-col justify-between">
                            <div className={`${step.bg} px-4 py-2.5 border-b-[3px] border-ink flex items-center justify-between`}>
                                <span className="font-mono text-[10px] font-extrabold uppercase tracking-widest">
                                    STAGE // {step.num}
                                </span>
                                <span className="font-heading font-bold text-lg">{step.num}</span>
                            </div>
                            <div className="p-5 flex-1">
                                <h3 className="font-heading font-bold text-xl uppercase tracking-tight text-ink mb-2">
                                    {step.title}
                                </h3>
                                <p className="font-mono text-xs sm:text-sm text-ink/85 leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
