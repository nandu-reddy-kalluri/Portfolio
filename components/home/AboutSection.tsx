"use client";

import { CrossHatch } from "@/components/ui/Decorative";
import { Github, Mail, Phone, Code2, GraduationCap, MapPin } from "lucide-react";

export function AboutSection() {
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20 reveal-up">
            <div className="grid md:grid-cols-5 gap-5">
                {/* Left Card: Quick Identity & Education */}
                <div className="md:col-span-2 neo-card bg-acid text-ink p-6 md:p-8 flex flex-col justify-between relative overflow-hidden min-h-[300px] md:min-h-[380px]">
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-4">
                            <GraduationCap size={20} />
                            <span className="font-mono text-xs font-bold uppercase tracking-widest">Education</span>
                        </div>
                        <h3 className="font-heading font-bold text-2xl md:text-3xl uppercase tracking-tight mb-2">
                            Aurora × NIAT
                        </h3>
                        <p className="font-mono text-sm font-bold opacity-80 uppercase tracking-wider mb-4">
                            Bachelor of Technology (B.Tech) · 2025 – Present
                        </p>
                        <div className="border-t-[2px] border-ink/20 pt-4 space-y-2 font-mono text-xs opacity-90">
                            <div className="flex items-center gap-2">
                                <Code2 size={14} />
                                <span>Generative AI &amp; Software Engineering</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin size={14} />
                                <span>India · Open to Remote Collaboration</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 pt-6 mt-6 border-t-[2px] border-ink/20">
                        <div className="font-mono text-[11px] font-bold uppercase tracking-widest opacity-75 mb-2">
                            Core Engineering Pillars
                        </div>
                        <div className="flex flex-wrap gap-1.5 font-mono text-[10px] font-bold uppercase">
                            <span className="px-2 py-1 bg-ink text-cream">AI Agents</span>
                            <span className="px-2 py-1 bg-ink text-cream">Pipelines</span>
                            <span className="px-2 py-1 bg-ink text-cream">Automation</span>
                            <span className="px-2 py-1 bg-ink text-cream">Full-Stack</span>
                        </div>
                    </div>
                </div>

                {/* Right Card: Bio Narrative & Direct Links */}
                <div className="md:col-span-3 neo-card bg-cream p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
                    <CrossHatch className="absolute top-0 right-0 w-32 h-32 text-ink opacity-10" />
                    <div className="relative z-10">
                        <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/60 mb-3">About</div>
                        <h2 className="font-heading font-bold text-3xl md:text-4xl uppercase tracking-tight text-ink mb-5 leading-tight">
                            Building Practical<br />Intelligent Systems
                        </h2>
                        <p className="font-mono text-sm md:text-base text-ink/85 leading-relaxed mb-4">
                            I am a B.Tech student at Aurora × NIAT exploring the intersection of Generative AI,
                            software engineering, automation, and product development.
                        </p>
                        <p className="font-mono text-sm md:text-base text-ink/85 leading-relaxed mb-4">
                            I enjoy turning ideas into working systems — from conversational AI applications and
                            automated workflows to full-stack web products and AI-powered pipelines.
                        </p>
                        <p className="font-mono text-sm md:text-base text-ink/85 leading-relaxed">
                            My current focus is building practical AI systems, experimenting with intelligent
                            automation, and continuously improving how software can solve real-world problems.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-6 pt-5 border-t-[3px] border-ink/10 relative z-10">
                        <a
                            href="https://github.com/nandu-reddy-kalluri"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="neo-pill bg-ink text-cream hover:bg-acid hover:text-ink flex items-center gap-2"
                        >
                            <Github size={14} /> GitHub Profile
                        </a>
                        <a
                            href="mailto:nandureddy817.kalluri@gmail.com"
                            className="neo-pill bg-ink text-cream hover:bg-electric hover:text-cream flex items-center gap-2"
                        >
                            <Mail size={14} /> nandureddy817.kalluri@gmail.com
                        </a>
                        <a
                            href="tel:6309718153"
                            className="neo-pill bg-ink text-cream hover:bg-hotpink hover:text-cream flex items-center gap-2"
                        >
                            <Phone size={14} /> 6309718153
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
