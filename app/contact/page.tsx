"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ContactForm } from "@/components/contact/ContactForm";
import { MobileContactHub } from "@/components/contact/MobileContactHub";
import { useState } from "react";
import { Mail, Phone, MapPin, Github, ChevronDown, GraduationCap, Sparkles, MessageCircle } from "lucide-react";

const contactInfo = [
    { icon: <MessageCircle size={18} />, label: "WhatsApp (Direct)", value: "+91 6309718153 · Chat on WhatsApp ↗", href: "https://wa.me/916309718153?text=Hi%20Nanda%20Kishore%2C%20I%20saw%20your%20portfolio%20and%20want%20to%20connect%20with%20you!", bg: "bg-[#25D366]" },
    { icon: <Mail size={18} />, label: "Email", value: "nandureddy817.kalluri@gmail.com", href: "mailto:nandureddy817.kalluri@gmail.com", bg: "bg-acid" },
    { icon: <Phone size={18} />, label: "Phone", value: "+91 6309718153", href: "tel:6309718153", bg: "bg-[#FFD60A]" },
    { icon: <Github size={18} />, label: "GitHub", value: "github.com/nandu-reddy-kalluri", href: "https://github.com/nandu-reddy-kalluri", bg: "bg-[#00F5D4]" },
    { icon: <MapPin size={18} />, label: "Location", value: "Hyderabad, India · Open to Remote", bg: "bg-[#FF7EB6]" },
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
            {/* Light-Mode Gen-Z Status Bar */}
            <div className="w-full bg-[#00F5D4] border-b-[3px] border-ink py-2 px-4 md:px-8 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-ink animate-pulse-dot" />
                    <span className="font-mono text-xs font-extrabold text-ink uppercase tracking-widest">
                        {"/// direct contact"}
                    </span>
                </div>
                <span className="font-mono text-xs font-extrabold text-ink tracking-widest uppercase">
                    Open to Connect
                </span>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Header */}
                <section className="mt-5 md:mt-14 mb-5 md:mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-acid text-ink border-[2px] border-ink shadow-[3px_3px_0px_#1A1A1A] font-mono text-[10px] font-extrabold uppercase tracking-[0.22em] mb-2.5">
                            <Sparkles size={12} /> GET IN TOUCH // DIRECT DISPATCH
                        </div>
                        <h1 className="text-3xl sm:text-6xl md:text-[6.5rem] font-heading font-extrabold text-ink leading-[0.9] tracking-tighter uppercase mb-3">
                            Let&apos;s Build<br />Something Useful
                        </h1>
                        <p className="font-mono text-xs sm:text-sm md:text-base text-ink/85 max-w-xl leading-relaxed">
                            Interested in Generative AI, software engineering, automation, or building something new? Let&apos;s connect.
                        </p>
                    </motion.div>
                </section>

                {/* ═══ MOBILE (< lg): Organized Segmented Contact Hub (1 Screen, Zero Scroll Fatigue) ═══ */}
                <MobileContactHub contactInfo={contactInfo} faqs={faqs} />

                {/* ═══ DESKTOP (lg+): Full 5-Column Matrix & Full FAQs (Unchanged) ═══ */}
                <div className="hidden lg:block">
                    <div className="grid lg:grid-cols-5 gap-5 mb-12 md:mb-20">
                        {/* Form */}
                        <div className="lg:col-span-3">
                            <ContactForm />
                        </div>

                        {/* Light-Mode Gen-Z Sidebar */}
                        <div className="lg:col-span-2 space-y-5">
                            <div className="neo-card bg-[#FFD60A] text-ink p-3.5 sm:p-5">
                                <div className="bg-cream border-[2.5px] border-ink p-4 sm:p-5">
                                    <div className="font-mono text-xs font-extrabold uppercase tracking-[0.2em] text-ink mb-4 pb-2 border-b-[2px] border-ink">
                                        Direct Channels
                                    </div>
                                    <div className="space-y-3">
                                        {contactInfo.map((info) => (
                                            <div key={info.label} className="flex items-start gap-3 p-2.5 bg-[#F4F0E4] border-[2px] border-ink">
                                                <div className={`p-1.5 ${info.bg} text-ink border border-ink mt-0.5 flex-shrink-0`}>
                                                    {info.icon}
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="font-mono text-[10px] font-extrabold uppercase tracking-widest text-ink/65">
                                                        {info.label}
                                                    </div>
                                                    {info.href ? (
                                                        <a
                                                            href={info.href}
                                                            className="font-mono text-xs sm:text-sm font-extrabold text-ink hover:underline break-all"
                                                            rel="noopener noreferrer"
                                                            target={info.href.startsWith("http") ? "_blank" : undefined}
                                                        >
                                                            {info.value}
                                                        </a>
                                                    ) : (
                                                        <div className="font-mono text-xs sm:text-sm font-extrabold text-ink">
                                                            {info.value}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Education card */}
                            <div className="neo-card bg-cream text-ink p-5 border-[3px] border-ink">
                                <div className="flex items-center gap-2 mb-2">
                                    <GraduationCap size={18} className="text-electric" />
                                    <div className="font-mono text-xs font-extrabold uppercase tracking-widest text-ink/70">
                                        Education
                                    </div>
                                </div>
                                <h3 className="font-heading font-bold text-lg uppercase tracking-tight text-ink">
                                    Aurora × NIAT
                                </h3>
                                <p className="font-mono text-xs text-ink/80 mt-1">
                                    Bachelor of Technology (B.Tech) · 2025 – Present
                                </p>
                            </div>

                            {/* GitHub link button */}
                            <a
                                href="https://github.com/nandu-reddy-kalluri"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="neo-card bg-acid text-ink p-4 text-center font-mono text-sm font-extrabold uppercase hover:bg-[#00F5D4] transition-all flex items-center justify-center gap-2 w-full"
                            >
                                <Github size={18} /> Open GitHub Profile
                            </a>
                        </div>
                    </div>

                    {/* FAQ */}
                    <section className="mb-12 md:mb-20 reveal-up">
                        <div className="font-mono text-xs font-extrabold uppercase tracking-[0.3em] text-ink/65 mb-2">
                            Frequently Asked
                        </div>
                        <h2 className="font-heading font-bold text-3xl md:text-4xl uppercase tracking-tight text-ink mb-6">
                            FAQ
                        </h2>

                        <div className="space-y-3">
                            {faqs.map((faq, i) => (
                                <div key={i} className="reveal-up" style={{ animationDelay: `${Math.min(i * 0.06, 0.4)}s` }}>
                                    <button
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                        className="neo-card w-full bg-cream p-4 sm:p-5 text-left group"
                                    >
                                        <div className="flex justify-between items-center gap-4">
                                            <h3 className="font-heading font-bold text-sm sm:text-base uppercase tracking-tight text-ink">
                                                {faq.q}
                                            </h3>
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
                                                    transition={{ duration: 0.25 }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="font-mono text-xs sm:text-sm text-ink/85 leading-relaxed mt-3 pt-3 border-t-[2px] border-ink/15">
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
        </div>
    );
}
