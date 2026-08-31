"use client";

const focusData = [
    { area: "Architecture Focus", standard: "Generic templates / boilerplate", mine: "Purpose-built pipelines & structured prompt constraints" },
    { area: "AI Integration", standard: "Superficial wrappers without validation", mine: "Structured outputs, validation gates & fallback logic" },
    { area: "Automation", standard: "Manual handoffs & isolated scripts", mine: "End-to-end n8n workflows, webhooks & REST APIs" },
    { area: "Code Quality", standard: "Complex unmaintainable bloat", mine: "Clean modular architecture & open-source transparency" },
    { area: "Iteration Speed", standard: "Weeks of overhead planning", mine: "Fast working prototypes & rapid functional builds" },
];

export function ComparisonSection() {
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20 reveal-up">
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/60 mb-2">Engineering Focus</div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl uppercase tracking-tight text-ink mb-8">
                How I Build Systems
            </h2>

            <div className="neo-card bg-cream overflow-hidden">
                {/* Header row */}
                <div className="grid grid-cols-3 bg-ink text-cream">
                    <div className="p-4 font-mono text-xs font-bold uppercase tracking-wider border-r border-cream/20">
                        Focus Area
                    </div>
                    <div className="p-4 font-mono text-xs font-bold uppercase tracking-wider text-center border-r border-cream/20 text-cream/70">
                        Generic Approach
                    </div>
                    <div className="p-4 font-mono text-xs font-bold uppercase tracking-wider text-center text-acid">
                        My Approach
                    </div>
                </div>

                {/* Rows */}
                {focusData.map((row, i) => (
                    <div key={i} className={`grid grid-cols-3 ${i % 2 === 0 ? "bg-cream" : "bg-ink/[0.03]"} border-t-[2px] border-ink/10`}>
                        <div className="p-4 font-mono text-xs md:text-sm font-bold text-ink">{row.area}</div>
                        <div className="p-4 font-mono text-xs md:text-sm text-ink/70 text-center border-x-[2px] border-ink/10">{row.standard}</div>
                        <div className="p-4 font-mono text-xs md:text-sm font-bold text-ink text-center text-acid-contrast">{row.mine}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
