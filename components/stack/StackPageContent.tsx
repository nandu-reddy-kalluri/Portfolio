"use client";

import { motion } from "framer-motion";
import { Flame, Sparkles, Bot, Code2, Cpu, Wrench } from "lucide-react";
import Link from "next/link";
import MobileSwipeStack, { type SwipeCardSlide } from "@/components/ui/MobileSwipeStack";

type Depth = "daily" | "frequent" | "proficient";
type Tool = { name: string; depth: Depth; detail: string };
type Category = {
    code: string;
    shortTab: string;
    name: string;
    jacketBg: string;
    pillBg: string;
    icon: React.ReactNode;
    tools: Tool[];
};

const depthLabel: Record<Depth, string> = {
    daily: "CORE DAILY",
    frequent: "FREQUENT",
    proficient: "PROFICIENT",
};

export const categories: Category[] = [
    {
        code: "01",
        shortTab: "01. AI",
        name: "AI & Intelligence",
        jacketBg: "bg-acid text-ink",
        pillBg: "bg-acid text-ink",
        icon: <Bot size={22} className="text-ink" />,
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
        code: "02",
        shortTab: "02. Auto",
        name: "Automation & APIs",
        jacketBg: "bg-electric text-cream",
        pillBg: "bg-[#FFD60A] text-ink",
        icon: <Cpu size={22} className="text-ink" />,
        tools: [
            { name: "n8n", depth: "daily", detail: "Visual workflow orchestration, automated node logic, and webhook handling." },
            { name: "Twilio WhatsApp API", depth: "daily", detail: "Building automated conversational interfaces and product dispatch flows." },
            { name: "REST APIs & Integration", depth: "daily", detail: "Designing and consuming JSON APIs with authentication and error handling." },
            { name: "Webhooks", depth: "daily", detail: "Real-time event-driven data ingestion and downstream trigger automation." },
            { name: "AI Pipelines", depth: "frequent", detail: "Multi-stage automated pipelines connecting data input, model reasoning, and output delivery." },
        ],
    },
    {
        code: "03",
        shortTab: "03. Web",
        name: "Programming & Frontend",
        jacketBg: "bg-[#FF2A6D] text-cream",
        pillBg: "bg-acid text-ink",
        icon: <Code2 size={22} className="text-ink" />,
        tools: [
            { name: "Python", depth: "daily", detail: "Core language for AI scripting, Streamlit apps, automation flows, and backend logic." },
            { name: "JavaScript / TS", depth: "daily", detail: "Modern ES6+ & TypeScript development for web applications and dynamic interfaces." },
            { name: "React", depth: "frequent", detail: "Component-driven user interfaces, state management, and responsive layouts." },
            { name: "Next.js", depth: "frequent", detail: "App Router and full-stack web applications for products like WeArrange." },
            { name: "Tailwind CSS & CSS3", depth: "daily", detail: "Utility-first modern styling, responsive layouts, and motion animations." },
            { name: "HTML5 & Semantic Web", depth: "daily", detail: "Clean document structure, accessibility standards, and SEO compliance." },
            { name: "SQL", depth: "proficient", detail: "Relational database queries, schema structuring, and data manipulation." },
        ],
    },
    {
        code: "04",
        shortTab: "04. Tools",
        name: "Developer Tools & Platforms",
        jacketBg: "bg-vivid text-ink",
        pillBg: "bg-[#FFD60A] text-ink",
        icon: <Wrench size={22} className="text-ink" />,
        tools: [
            { name: "Git & GitHub", depth: "daily", detail: "Version control, open-source repositories, PR workflows, and branching." },
            { name: "Streamlit", depth: "daily", detail: "Rapid prototyping and live deployment for conversational AI and data applications." },
            { name: "VS Code", depth: "daily", detail: "Primary development environment configured for Python, TypeScript, and web development." },
            { name: "Vercel", depth: "frequent", detail: "Production edge hosting and continuous deployment for web applications like Cup Cozy." },
        ],
    },
];

export const learning = [
    { name: "Multi-Agent Systems", reason: "Coordinated agent networks executing complex parallel workflows.", bg: "bg-acid text-ink" },
    { name: "Vector Search & RAG", reason: "Enhancing conversational context and intelligent document retrieval.", bg: "bg-electric text-cream" },
    { name: "Pipeline Optimization", reason: "Scaling throughput and fault tolerance across automated data flows.", bg: "bg-[#FF2A6D] text-cream" },
    { name: "System Architecture", reason: "Deepening scalable backend designs for comprehensive software products.", bg: "bg-[#FFD60A] text-ink" },
];

export function StatusBar() {
    const total = categories.reduce((acc, c) => acc + c.tools.length, 0);
    return (
        <div className="w-full bg-ink border-b-[3px] border-ink py-2 px-4 md:px-8 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-acid animate-pulse-dot" />
                <span className="font-mono text-xs font-extrabold text-cream uppercase tracking-widest">
                    {"/// engineering stack"}
                </span>
            </div>
            <span className="font-mono text-xs font-extrabold text-acid tracking-widest uppercase">
                {total} TECHNOLOGIES · {categories.length} PILLARS
            </span>
        </div>
    );
}

export function HeaderSection() {
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mt-6 md:mt-14 mb-6 md:mb-12">
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-acid text-ink border-[2px] border-ink shadow-[3px_3px_0px_#1A1A1A] font-mono text-[10px] font-extrabold uppercase tracking-[0.22em] mb-3">
                    <Sparkles size={12} /> TECHNICAL ARSENAL // CARTRIDGE SPEC
                </div>
                <h1 className="text-4xl sm:text-6xl md:text-[6.5rem] font-heading font-bold text-ink leading-[0.88] tracking-tighter uppercase mb-4">
                    Engineering Stack
                </h1>
                <p className="font-mono text-xs sm:text-sm md:text-base text-ink/85 max-w-xl leading-relaxed">
                    Technologies, frameworks, and AI tools I use to build practical intelligent systems, automated workflows, and modern web products.
                </p>
            </motion.div>
        </section>
    );
}

function DepthPill({ depth, pillBg }: { depth: Depth; pillBg: string }) {
    const styles: Record<Depth, string> = {
        daily: `${pillBg} border-ink`,
        frequent: "bg-ink text-cream border-ink",
        proficient: "bg-cream text-ink border-ink",
    };
    return (
        <span className={`inline-flex items-center px-2 py-0.5 border-[1.5px] font-mono text-[9px] font-extrabold uppercase tracking-wider flex-shrink-0 ${styles[depth]}`}>
            {depthLabel[depth]}
        </span>
    );
}

export function CategoriesSection() {
    const mobileCatSlides: SwipeCardSlide[] = categories.map((cat) => ({
        id: cat.code,
        tabLabel: `[${cat.code}] ${cat.shortTab.split(" ")[1]}`,
        headerBg: cat.jacketBg,
        badgeText: `PILLAR // ${cat.code}`,
        statusText: `${cat.tools.length} TOOLS`,
        content: (
            <div className="space-y-2">
                <h2 className="font-heading font-bold text-xl uppercase tracking-tight text-ink mb-1">
                    {cat.name}
                </h2>
                <div className="space-y-2">
                    {cat.tools.map((tool) => (
                        <div key={tool.name} className="p-2.5 bg-[#F4F0E4] border-[2px] border-ink">
                            <div className="flex items-center justify-between gap-2 mb-0.5">
                                <span className="font-heading font-bold text-xs sm:text-sm uppercase tracking-tight text-ink">
                                    {tool.name}
                                </span>
                                <DepthPill depth={tool.depth} pillBg={cat.pillBg} />
                            </div>
                            <p className="font-mono text-[11px] text-ink/80 leading-snug">
                                {tool.detail}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        ),
    }));

    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-10 lg:mb-20">
            {/* ─── MOBILE ONLY (< lg): 3D Tinder Swipe Stack for Stack Pillars [01]–[04] ─── */}
            <div className="lg:hidden">
                <MobileSwipeStack
                    slides={mobileCatSlides}
                    instructionLabel="SWIPE STACK PILLAR [01–04] ↔"
                />
            </div>

            {/* ─── DESKTOP ONLY (lg+): Full 4-Pillar Cartridge Matrix (Unchanged) ─── */}
            <div className="hidden lg:block space-y-6">
                {categories.map((cat, catIndex) => (
                    <div
                        key={cat.name}
                        className="reveal-up"
                        style={{ animationDelay: `${Math.min(catIndex * 0.06, 0.4)}s` }}
                    >
                        <div className={`neo-card ${cat.jacketBg} p-4 md:p-5`}>
                            <div className="flex items-center justify-between mb-4 px-1">
                                <div className="flex items-center gap-3">
                                    <span className="p-2 bg-cream border-[2px] border-ink shadow-[2px_2px_0px_#1A1A1A]">
                                        {cat.icon}
                                    </span>
                                    <div>
                                        <span className="font-mono text-[10px] font-extrabold uppercase tracking-widest block opacity-85">
                                            PILLAR // {cat.code}
                                        </span>
                                        <h2 className="font-heading font-bold text-2xl md:text-3xl uppercase tracking-tight">
                                            {cat.name}
                                        </h2>
                                    </div>
                                </div>
                                <span className="px-3 py-1 bg-ink text-acid border-[2px] border-ink font-mono text-xs font-extrabold uppercase tracking-widest">
                                    {cat.tools.length} Technologies
                                </span>
                            </div>

                            <div className="bg-cream text-ink border-[3px] border-ink p-5 md:p-6 grid md:grid-cols-2 gap-4">
                                {cat.tools.map((tool) => (
                                    <div key={tool.name} className="flex flex-col gap-1.5 p-3.5 bg-[#F4F0E4] border-[2px] border-ink shadow-[3px_3px_0px_#1A1A1A]">
                                        <div className="flex items-center justify-between gap-3">
                                            <span className="font-heading font-bold text-base uppercase tracking-tight text-ink">
                                                {tool.name}
                                            </span>
                                            <DepthPill depth={tool.depth} pillBg={cat.pillBg} />
                                        </div>
                                        <p className="font-mono text-xs sm:text-sm text-ink/80 leading-relaxed">
                                            {tool.detail}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export function CurrentlyLearningSection() {
    const mobileLearnSlides: SwipeCardSlide[] = learning.map((item, i) => ({
        id: `0${i + 1}`,
        tabLabel: `[0${i + 1}] ${item.name.split(" ")[0]}`,
        headerBg: item.bg,
        badgeText: `R&D // 0${i + 1}`,
        statusText: "EXPLORING",
        content: (
            <div>
                <h3 className="font-heading font-bold text-lg uppercase tracking-tight text-ink mb-1.5">
                    {item.name}
                </h3>
                <p className="font-mono text-xs text-ink/85 leading-relaxed">
                    {item.reason}
                </p>
            </div>
        ),
    }));

    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-10 lg:mb-20 reveal-up">
            <div className="flex items-center gap-2 mb-1.5">
                <Flame size={16} className="text-vivid" />
                <div className="font-mono text-xs font-extrabold uppercase tracking-[0.3em] text-ink/65">
                    Active R&amp;D Exploration
                </div>
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl uppercase tracking-tight text-ink mb-4 lg:mb-6">
                Currently Exploring
            </h2>

            {/* ─── MOBILE ONLY (< lg): 3D Tinder Swipe Stack for R&D [01]–[04] ─── */}
            <div className="lg:hidden">
                <MobileSwipeStack
                    slides={mobileLearnSlides}
                    instructionLabel="SWIPE R&D [01–04] ↔"
                />
            </div>

            {/* ─── DESKTOP ONLY (lg+): 4-Column Grid (Unchanged) ─── */}
            <div className="hidden lg:grid lg:grid-cols-4 gap-4">
                {learning.map((item, i) => (
                    <div key={item.name} className="reveal-up" style={{ animationDelay: `${Math.min(i * 0.06, 0.4)}s` }}>
                        <div className="neo-card bg-cream text-ink h-full overflow-hidden flex flex-col justify-between">
                            <div className={`${item.bg} px-4 py-2 border-b-[2.5px] border-ink flex items-center justify-between`}>
                                <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider">
                                    R&amp;D // 0{i + 1}
                                </span>
                                <Sparkles size={14} />
                            </div>
                            <div className="p-4 flex-1">
                                <h3 className="font-heading font-bold text-base uppercase tracking-tight text-ink mb-1.5">
                                    {item.name}
                                </h3>
                                <p className="font-mono text-xs text-ink/80 leading-relaxed">
                                    {item.reason}
                                </p>
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
            <div className="neo-card bg-vivid text-ink p-4 sm:p-6">
                <div className="bg-ink text-cream border-[3px] border-ink p-6 md:p-10 text-center">
                    <h2 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-tight text-cream mb-3">
                        Let&apos;s build something <span className="text-acid">impactful.</span>
                    </h2>
                    <p className="font-mono text-xs sm:text-sm text-cream/80 max-w-lg mx-auto mb-6 leading-relaxed">
                        Ready to collaborate on Generative AI systems, automation workflows, or full-stack software development.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block bg-acid hover:bg-[#FFD60A] text-ink font-heading font-bold text-base sm:text-lg uppercase tracking-wider px-7 py-3.5 border-[3px] border-cream shadow-[4px_4px_0px_#FFFDF5] transition-all"
                    >
                        Let&apos;s Connect →
                    </Link>
                </div>
            </div>
        </section>
    );
}
