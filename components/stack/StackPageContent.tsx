"use client";

import { motion } from "framer-motion";
import { CircuitPattern, GridDots } from "@/components/ui/Decorative";
import { BookOpen, Flame, Sparkles, Bot, Code2, Cpu, Wrench } from "lucide-react";
import Link from "next/link";

/* Proficiency tag — categorical, not quantitative */
type Depth = "daily" | "frequent" | "proficient";
type Tool = { name: string; depth: Depth; detail: string };
type Category = { name: string; color: string; textColor: string; icon: React.ReactNode; tools: Tool[] };

const depthLabel: Record<Depth, string> = {
    daily: "Primary Focus",
    frequent: "Frequent",
    proficient: "Proficient",
};

export const categories: Category[] = [
    {
        name: "AI & Intelligence",
        color: "bg-acid",
        textColor: "text-ink",
        icon: <Bot size={24} className="text-ink" />,
        tools: [
            { name: "Generative AI", depth: "daily", detail: "LLM integration, conversational system design, and structured output handling." },
            { name: "Prompt Engineering", depth: "daily", detail: "Structured templates, few-shot prompting, and validation-guarded output generation." },
            { name: "Conversational AI", depth: "daily", detail: "Designing domain-specific chatbots and conversational interfaces like Legal AI Agent." },
            { name: "Google Gemini", depth: "daily", detail: "Multi-modal model prompting, fast conversational reasoning, and automation triggers." },
            { name: "Claude (Anthropic)", depth: "frequent", detail: "Complex reasoning, structured JSON extraction, and agentic workflows." },
            { name: "AI Agents & Pipelines", depth: "frequent", detail: "Building autonomous agent loops, tool calling, and multi-step data processing." },
        ],
    },
    {
        name: "Automation & APIs",
        color: "bg-electric",
        textColor: "text-cream",
        icon: <Cpu size={24} className="text-cream" />,
        tools: [
            { name: "n8n", depth: "daily", detail: "Visual workflow orchestration, automated node logic, and webhook handling." },
            { name: "Twilio WhatsApp API", depth: "daily", detail: "Building automated conversational interfaces and product dispatch flows." },
            { name: "REST APIs & Integration", depth: "daily", detail: "Designing and consuming JSON APIs with authentication and error handling." },
            { name: "Webhooks", depth: "daily", detail: "Real-time event-driven data ingestion and downstream trigger automation." },
            { name: "AI Pipelines", depth: "frequent", detail: "Multi-stage automated pipelines connecting data input, model reasoning, and output delivery." },
        ],
    },
    {
        name: "Programming & Frontend",
        color: "bg-hotpink",
        textColor: "text-cream",
        icon: <Code2 size={24} className="text-cream" />,
        tools: [
            { name: "Python", depth: "daily", detail: "Core language for AI scripting, Streamlit apps, automation flows, and backend logic." },
            { name: "JavaScript", depth: "daily", detail: "Modern ES6+ development for web applications and dynamic interfaces." },
            { name: "React", depth: "frequent", detail: "Component-driven user interfaces, state management, and responsive layouts." },
            { name: "Next.js", depth: "frequent", detail: "App Router and full-stack web applications for products like WeArrange." },
            { name: "Tailwind CSS & CSS3", depth: "daily", detail: "Utility-first modern styling, responsive layouts, and animations." },
            { name: "HTML5 & Semantic Web", depth: "daily", detail: "Clean document structure, accessibility standards, and SEO compliance." },
            { name: "SQL", depth: "proficient", detail: "Relational database queries, schema structuring, and data manipulation." },
        ],
    },
    {
        name: "Developer Tools & Platforms",
        color: "bg-vivid",
        textColor: "text-cream",
        icon: <Wrench size={24} className="text-cream" />,
        tools: [
            { name: "Git & GitHub", depth: "daily", detail: "Version control, open-source repositories, PR workflows, and branching." },
            { name: "Streamlit", depth: "daily", detail: "Rapid prototyping and live deployment for conversational AI and data applications." },
            { name: "VS Code", depth: "daily", detail: "Primary development environment configured for Python, TypeScript, and web development." },
            { name: "Vercel", depth: "frequent", detail: "Production edge hosting and continuous deployment for web applications like Cup Cozy." },
        ],
    },
];

export const learning = [
    { name: "Multi-Agent Systems", reason: "Coordinated agent networks executing complex parallel workflows." },
    { name: "Vector Search & Embeddings", reason: "Enhancing conversational context and intelligent document retrieval." },
    { name: "Advanced Pipeline Optimization", reason: "Scaling throughput and fault tolerance across automated data flows." },
    { name: "Full-Stack System Architecture", reason: "Deepening scalable backend designs for comprehensive software products." },
];

export function StatusBar() {
    const total = categories.reduce((acc, c) => acc + c.tools.length, 0);
    return (
        <div className="w-full bg-ink border-b-[3px] border-ink py-2 px-4 md:px-8 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-acid animate-pulse-dot" />
                <span className="font-mono text-xs font-bold text-cream/70 uppercase tracking-widest">{"/// engineering stack"}</span>
            </div>
            <span className="font-mono text-xs font-bold text-cream/60 tracking-widest uppercase">
                {total} TECHNOLOGIES · {categories.length} PILLARS
            </span>
        </div>
    );
}

export function HeaderSection() {
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mt-8 md:mt-16 mb-8 md:mb-12">
            <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/60 mb-3">Technical Stack</div>
                <h1 className="text-4xl sm:text-6xl md:text-[7rem] font-heading font-bold text-ink leading-[0.85] tracking-tighter uppercase mb-6">
                    Engineering<br />Stack
                </h1>
                <p className="font-mono text-sm md:text-base text-ink/85 max-w-xl leading-relaxed">
                    Technologies, frameworks, and AI tools I use to build practical intelligent systems, automated workflows, and modern web products.
                </p>
            </motion.div>
        </section>
    );
}

function DepthPill({ depth, textColor }: { depth: Depth; textColor: string }) {
    const onDark = textColor === "text-cream";
    const styles: Record<Depth, string> = {
        daily: onDark ? "bg-acid text-ink border-acid" : "bg-ink text-cream border-ink",
        frequent: onDark ? "bg-cream/15 text-cream border-cream/30" : "bg-ink/10 text-ink border-ink/30",
        proficient: onDark ? "bg-cream/5 text-cream/80 border-cream/20" : "bg-ink/5 text-ink/80 border-ink/20",
    };
    return (
        <span className={`inline-flex items-center px-2 py-0.5 border-2 font-mono text-[0.65rem] font-bold uppercase tracking-wider ${styles[depth]}`}>
            {depthLabel[depth]}
        </span>
    );
}

export function CategoriesSection() {
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20 space-y-5">
            {categories.map((cat, catIndex) => (
                <div
                    key={cat.name}
                    className="reveal-up"
                    style={{ animationDelay: `${Math.min(catIndex * 0.06, 0.4)}s` }}
                >
                    <div className={`neo-card ${cat.color} ${cat.textColor} p-6 md:p-8 relative overflow-hidden`}>
                        {catIndex % 2 === 0 ? (
                            <CircuitPattern className="absolute top-0 right-0 w-32 h-32 opacity-[0.08]" />
                        ) : (
                            <GridDots className="absolute top-0 right-0 w-32 h-32 opacity-[0.08]" />
                        )}

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    {cat.icon}
                                    <h2 className="font-heading font-bold text-2xl md:text-3xl uppercase tracking-tight">{cat.name}</h2>
                                </div>
                                <span className="font-mono text-xs font-bold uppercase tracking-widest opacity-75">
                                    {cat.tools.length} technologies
                                </span>
                            </div>

                            <div className="grid md:grid-cols-2 gap-x-8 gap-y-5">
                                {cat.tools.map((tool) => (
                                    <div key={tool.name} className="flex flex-col gap-1.5 p-3 bg-black/10 border border-current/10">
                                        <div className="flex items-center justify-between gap-3">
                                            <span className="font-heading font-bold text-sm md:text-base uppercase tracking-tight">{tool.name}</span>
                                            <DepthPill depth={tool.depth} textColor={cat.textColor} />
                                        </div>
                                        <p className="font-mono text-xs md:text-sm opacity-85 leading-relaxed">{tool.detail}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
}

export function CurrentlyLearningSection() {
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20 reveal-up">
            <div className="flex items-center gap-2 mb-2">
                <Flame size={16} className="text-hotpink" />
                <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/60">Active Exploration</div>
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl uppercase tracking-tight text-ink mb-6">Currently Exploring</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {learning.map((item, i) => (
                    <div key={item.name} className="reveal-up" style={{ animationDelay: `${Math.min(i * 0.06, 0.4)}s` }}>
                        <div className="neo-card bg-cream p-5 h-full group hover:bg-ink hover:text-cream transition-all flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Sparkles size={16} className="opacity-60 group-hover:text-acid" />
                                    <h3 className="font-heading font-bold text-base uppercase tracking-tight">{item.name}</h3>
                                </div>
                                <p className="font-mono text-xs opacity-80 leading-relaxed">{item.reason}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export function CTASection() {
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12 reveal-up">
            <div className="neo-card bg-ink text-cream p-8 md:p-12 text-center relative overflow-hidden gradient-top-accent">
                <GridDots className="absolute inset-0 w-full h-full text-cream/5" />
                <div className="relative z-10">
                    <h2 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-tight mb-4">
                        Let&apos;s build something <span className="text-acid">impactful.</span>
                    </h2>
                    <p className="font-mono text-sm text-cream/80 max-w-lg mx-auto mb-8 leading-relaxed">
                        Ready to collaborate on Generative AI systems, automation workflows, or software development.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block bg-acid text-ink font-heading font-bold text-lg uppercase tracking-wider px-8 py-4 border-[3px] border-ink shadow-neo hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all"
                    >
                        Let&apos;s Connect →
                    </Link>
                </div>
            </div>
        </section>
    );
}
