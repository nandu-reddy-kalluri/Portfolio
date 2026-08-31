"use client";

import { GridDots } from "@/components/ui/Decorative";
import Link from "next/link";

export function CTASection() {
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12 reveal-up">
            <div className="neo-card bg-ink text-cream p-8 md:p-12 text-center relative overflow-hidden gradient-top-accent">
                <GridDots className="absolute inset-0 w-full h-full text-cream/3" />
                <div className="absolute top-0 left-1/4 w-1/2 h-20 bg-acid/10 blur-3xl pointer-events-none" />
                <div className="relative z-10">
                    <h2 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-tight mb-4">
                        Have a project or<br /><span className="gradient-text-acid">workflow to build?</span>
                    </h2>
                    <p className="font-mono text-sm text-cream/85 max-w-lg mx-auto mb-8 leading-relaxed">
                        Let&apos;s connect to discuss how Generative AI, automation pipelines, or full-stack engineering can bring your idea to life.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block bg-acid text-ink font-heading font-bold text-lg uppercase tracking-wider px-8 py-4 border-[3px] border-ink shadow-neo hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all"
                    >
                        Get In Touch →
                    </Link>
                </div>
            </div>
        </section>
    );
}
