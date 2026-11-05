"use client";

import Link from "next/link";

export function CTASection() {
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12 reveal-up">
            <div className="neo-card bg-vivid text-ink p-4 sm:p-6">
                <div className="bg-ink text-cream border-[3px] border-ink p-6 sm:p-10 text-center">
                    <span className="inline-block px-3 py-1 bg-acid text-ink font-mono text-[10px] font-extrabold uppercase tracking-widest mb-3">
                        READY TO SHIP
                    </span>
                    <h2 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-tight text-cream mb-3">
                        Have a project or <span className="text-acid">workflow to build?</span>
                    </h2>
                    <p className="font-mono text-xs sm:text-sm text-cream/80 max-w-lg mx-auto mb-6 leading-relaxed">
                        Let&apos;s connect to discuss how Generative AI, automation pipelines, or full-stack engineering can bring your idea to life.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block bg-acid hover:bg-[#FFD60A] text-ink font-heading font-bold text-base sm:text-lg uppercase tracking-wider px-7 py-3.5 border-[3px] border-cream shadow-[4px_4px_0px_#FFFDF5] transition-all"
                    >
                        Get In Touch →
                    </Link>
                </div>
            </div>
        </section>
    );
}
