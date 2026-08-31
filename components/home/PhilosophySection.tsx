"use client";

export function PhilosophySection() {
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20 reveal-up">
            <div className="neo-card bg-ink text-cream p-6 md:p-12 relative overflow-hidden">
                <div className="grid md:grid-cols-2 gap-8 md:gap-16 relative z-10">
                    <div>
                        <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-cream/70 mb-3">Engineering Approach</div>
                        <h2 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-tight text-cream mb-6 leading-tight">
                            Ideas into<br />
                            working systems,<br />
                            <span className="text-acid">tested in code.</span>
                        </h2>
                        <p className="font-mono text-sm md:text-base text-cream/85 leading-relaxed mb-6">
                            I learn by building. From connecting APIs and orchestrating AI pipelines to shipping
                            responsive interfaces and exploring agentic architectures, every project is focused
                            on practical problem solving and clean execution.
                        </p>
                        <div className="inline-flex items-center gap-3 p-4 border-[3px] border-cream/20">
                            <div className="w-3 h-3 bg-acid animate-pulse-dot flex-shrink-0" />
                            <span className="font-mono text-xs font-bold text-cream/80 uppercase tracking-wider">Open to AI &amp; Software Opportunities</span>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {[
                            { num: "01", title: "Problem Framing", desc: "Understanding the exact use case, constraints, and data requirements before writing code." },
                            { num: "02", title: "Pipeline & Model Design", desc: "Selecting the right models (Gemini, Claude), crafting structured prompt gates, and designing workflows." },
                            { num: "03", title: "Automation & Backend", desc: "Connecting APIs, webhooks, and automation nodes (n8n, Python) into reliable execution paths." },
                            { num: "04", title: "Frontend & Deployment", desc: "Building intuitive user interfaces (React, Next.js, Streamlit) and deploying to production." },
                        ].map((step, idx) => (
                            <div
                                key={step.num}
                                className="flex gap-4 items-start group reveal-up"
                                style={{ animationDelay: `${Math.min(idx * 0.06, 0.4)}s` }}
                            >
                                <div className="font-heading font-bold text-2xl md:text-3xl text-acid w-12 flex-shrink-0 group-hover:translate-x-1 transition-transform">{step.num}</div>
                                <div className="border-l-[3px] border-cream/20 pl-4 group-hover:border-acid/40 transition-colors">
                                    <div className="font-heading font-bold text-lg uppercase tracking-tight">{step.title}</div>
                                    <div className="font-mono text-xs text-cream/70 mt-1 leading-relaxed">{step.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
