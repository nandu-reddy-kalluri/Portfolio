"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ContactForm } from "@/components/contact/ContactForm";
import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Github, ChevronDown, GraduationCap, Code2 } from "lucide-react";
import { CircuitPattern } from "@/components/ui/Decorative";

const contactInfo = [
    { icon: <Mail size={18} />, label: "Email", value: "nandureddy817.kalluri@gmail.com", href: "mailto:nandureddy817.kalluri@gmail.com" },
    { icon: <Phone size={18} />, label: "Phone", value: "6309718153", href: "tel:6309718153" },
    { icon: <Github size={18} />, label: "GitHub", value: "github.com/nandu-reddy-kalluri", href: "https://github.com/nandu-reddy-kalluri" },
    { icon: <MapPin size={18} />, label: "Location", value: "India · Open to Remote" },
];

const faqs = [
    { q: "What areas do you focus on?", a: "I focus on Generative AI applications, intelligent automation workflows (n8n, webhooks, APIs), multi-stage AI pipelines, and modern full-stack web products with React and Next.js." },
    { q: "What is your background and education?", a: "I am a B.Tech student at Aurora × NIAT (2025 – Present) actively building and experimenting with Generative AI systems, automation pipelines, and software engineering projects." },
    { q: "How do you approach AI projects and agent workflows?", a: "I focus on practical engineering: structured prompt constraints, validation gates, API tool calling, and fallback error handling rather than unconstrained demos." },
    { q: "Are you open to internships, projects, or collaborations?", a: "Yes! I am actively open to discussing software engineering roles, AI product development, automation pipelines, and open-source collaborations." },
];

export default function ContactPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="min-h-screen bg-cream pb-24">
            {/* Status bar */}
            <div className="w-full bg-ink border-b-[3px] border-ink py-2 px-4 md:px-8 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-acid animate-pulse-dot" />
                    <span className="font-mono text-xs font-bold text-cream/70 uppercase tracking-widest">{"/// contact"}</span>
                </div>
                <span className="font-mono text-xs font-bold text-cream/60 tracking-widest uppercase">Open to Connect</span>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Header */}
                <section className="mt-8 md:mt-16 mb-8 md:mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/60 mb-3">Get in Touch</div>
                        <h1 className="text-4xl sm:text-6xl md:text-[7rem] font-heading font-bold text-ink leading-[0.85] tracking-tighter uppercase mb-6">
                            Let&apos;s Build<br />Something Useful
                        </h1>
                        <p className="font-mono text-sm md:text-base text-ink/85 max-w-xl leading-relaxed">
                            Interested in Generative AI, software engineering, automation, or building something new? Let&apos;s connect.
                        </p>
                    </motion.div>
                </section>

                <div className="grid lg:grid-cols-5 gap-5 mb-12 md:mb-20">
                    {/* ─── Form ─── */}
                    <div className="lg:col-span-3">
                        <ContactForm />
                    </div>

                    {/* ─── Sidebar ─── */}
                    <div className="lg:col-span-2 space-y-5">
                        {/* Direct contact info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="neo-card bg-ink text-cream p-6 relative overflow-hidden gradient-top-accent"
                        >
                            <CircuitPattern className="absolute top-0 right-0 w-24 h-24 text-cream/5" />
                            <div className="relative z-10">
                                <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-acid mb-4">Direct Lines</div>
                                <div className="space-y-4">
                                    {contactInfo.map((info) => (
                                        <div key={info.label} className="flex items-start gap-3">
                                            <div className="text-acid mt-0.5 flex-shrink-0">{info.icon}</div>
                                            <div>
                                                <div className="font-mono text-xs font-bold uppercase tracking-widest text-cream/70">{info.label}</div>
                                                {info.href ? (
                                                    <a href={info.href} className="font-mono text-sm font-bold text-cream hover:text-acid transition-colors break-all" rel="noopener noreferrer" target={info.href.startsWith("http") ? "_blank" : undefined}>
                                                        {info.value}
                                                    </a>
                                                ) : (
                                                    <div className="font-mono text-sm font-bold text-cream">{info.value}</div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Education card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="neo-card bg-cream text-ink p-5 border-[3px] border-ink"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <GraduationCap size={18} className="text-electric" />
                                <div className="font-mono text-xs font-bold uppercase tracking-widest text-ink/70">Education</div>
                            </div>
                            <h3 className="font-heading font-bold text-lg uppercase tracking-tight">Aurora × NIAT</h3>
                            <p className="font-mono text-xs text-ink/80 mt-1">Bachelor of Technology (B.Tech) · 2025 – Present</p>
                        </motion.div>

                        {/* GitHub link button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <a
                                href="https://github.com/nandu-reddy-kalluri"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="neo-card bg-acid text-ink p-4 text-center font-mono text-sm font-bold uppercase hover:bg-ink hover:text-cream transition-all flex items-center justify-center gap-2 group w-full"
                            >
                                <Github size={18} /> Open GitHub Profile
                            </a>
                        </motion.div>
                    </div>
                </div>

                {/* ─── FAQ ─── */}
                <section className="mb-12 md:mb-20 reveal-up">
                    <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/60 mb-2">Frequently Asked</div>
                    <h2 className="font-heading font-bold text-3xl md:text-4xl uppercase tracking-tight text-ink mb-6">FAQ</h2>

                    <div className="space-y-3">
                        {faqs.map((faq, i) => (
                            <div key={i} className="reveal-up" style={{ animationDelay: `${Math.min(i * 0.06, 0.4)}s` }}>
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="neo-card w-full bg-cream p-5 text-left group"
                                >
                                    <div className="flex justify-between items-center gap-4">
                                        <h4 className="font-heading font-bold text-base uppercase tracking-tight group-hover:text-electric transition-colors">
                                            {faq.q}
                                        </h4>
                                        <ChevronDown
                                            size={18}
                                            className={`flex-shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                                        />
                                    </div>
                                    <AnimatePresence>
                                        {openFaq === i && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <p className="font-mono text-sm text-ink/85 leading-relaxed mt-4 pt-4 border-t-[2px] border-ink/10">
                                                    {faq.a}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
