"use client";

import { GridDots } from "@/components/ui/Decorative";
import { Mail, Phone, Github, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function CtaSection() {
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12 reveal-up">
            <div className="neo-card bg-ink text-cream p-8 md:p-12 text-center relative overflow-hidden gradient-top-accent">
                <GridDots className="absolute inset-0 w-full h-full text-cream/5" />
                <div className="absolute top-0 left-1/4 w-1/2 h-32 bg-acid/10 blur-3xl pointer-events-none" />

                <div className="relative z-10">
                    <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-acid mb-3">
                        {"/// Open to Collaboration & Engineering Roles ///"}
                    </div>
                    <h2 className="font-heading font-bold text-3xl md:text-6xl uppercase tracking-tight mb-4">
                        Let&apos;s build something useful.
                    </h2>
                    <p className="font-mono text-sm md:text-base text-cream/80 mb-8 max-w-xl mx-auto leading-relaxed">
                        Interested in Generative AI, software engineering, automation workflows, or building a new product? Let&apos;s connect.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <a
                            href="mailto:nandureddy817.kalluri@gmail.com"
                            className="inline-flex items-center gap-2 bg-acid text-ink font-heading font-bold text-base md:text-lg uppercase tracking-wider px-6 py-3.5 border-[3px] border-ink shadow-neo hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
                        >
                            <Mail size={18} /> Email Direct
                        </a>
                        <a
                            href="tel:6309718153"
                            className="inline-flex items-center gap-2 bg-cream text-ink font-heading font-bold text-base md:text-lg uppercase tracking-wider px-6 py-3.5 border-[3px] border-ink hover:bg-electric hover:text-cream transition-colors"
                        >
                            <Phone size={18} /> 6309718153
                        </a>
                        <a
                            href="https://github.com/nandu-reddy-kalluri"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-ink text-cream font-heading font-bold text-base md:text-lg uppercase tracking-wider px-6 py-3.5 border-[3px] border-cream/30 hover:border-acid hover:text-acid transition-colors"
                        >
                            <Github size={18} /> GitHub Profile
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
