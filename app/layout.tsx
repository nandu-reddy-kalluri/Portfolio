import type { Metadata, Viewport } from "next";
// Fonts loaded via head stylesheet to prevent build timeout
import "./globals.css";
import ThemeProvider from "@/components/ui/ThemeProvider";
import { LoadingProvider } from "@/components/ui/LoadingContext";
import ScrollProgress from "@/components/ui/ScrollProgress";
import LoadingScreen from "@/components/ui/LoadingScreen";
import CommandPalette from "@/components/ui/CommandPalette";
import CustomCursor from "@/components/ui/CustomCursor";
import TelemetryHUD from "@/components/ui/TelemetryHUD";
import CmdKButton from "@/components/ui/CmdKButton";
import MagneticButton from "@/components/ui/MagneticButton";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { themeScript } from "@/lib/theme-script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";



const SITE_URL = "https://github.com/nandu-reddy-kalluri";

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: "K. Nanda Kishore — Generative AI & Software Engineer",
        template: "%s · K. Nanda Kishore",
    },
    description:
        "Portfolio of K. Nanda Kishore, a B.Tech student building Generative AI applications, intelligent automation workflows, AI pipelines, conversational systems, and modern web products.",
    keywords: [
        "Generative AI",
        "AI Agents",
        "AI Automation",
        "Conversational AI",
        "Software Engineering",
        "Web Development",
        "AI Pipelines",
        "n8n",
        "Gemini",
        "React",
        "Python",
        "K. Nanda Kishore",
    ],
    authors: [{ name: "K. Nanda Kishore", url: SITE_URL }],
    creator: "K. Nanda Kishore",
    alternates: {
        canonical: "/",
    },
    icons: {
        icon: "/favicon.svg",
    },
    openGraph: {
        type: "website",
        url: SITE_URL,
        siteName: "K. Nanda Kishore",
        title: "K. Nanda Kishore — Generative AI & Software Engineer",
        description:
            "Building AI-powered products, intelligent automation systems, and modern web experiences.",
    },
    twitter: {
        card: "summary_large_image",
        title: "K. Nanda Kishore — Generative AI & Software Engineer",
        description:
            "Building AI-powered products, intelligent automation systems, and modern web experiences.",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export const viewport: Viewport = {
    themeColor: "#FFFDF5",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`overflow-x-hidden`} suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: themeScript,
                    }}
                />
            </head>
            <body className="font-mono bg-cream text-ink antialiased selection:bg-acid selection:text-ink overflow-x-hidden">
                <LoadingProvider>
                    <ThemeProvider>
                        <CustomCursor />
                        <TelemetryHUD />
                        <LoadingScreen />
                        <ScrollProgress />
                        <CommandPalette />

                        <main className="pb-24 md:pb-20 overflow-x-hidden">{children}</main>

                        {/* High-Contrast Obsidian Bottom Navigation Dock (No Dark Mode Toggle) */}
                        <nav className="fixed bottom-0 left-0 w-full bg-ink border-t-[3px] border-ink z-[100] shadow-[0px_-4px_20px_rgba(0,0,0,0.28)] pb-[env(safe-area-inset-bottom)]">
                            <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-2 md:py-3 flex items-center justify-between gap-1 md:gap-2">
                                {/* Primary links */}
                                <div className="flex items-center gap-0.5 sm:gap-1 overflow-x-auto no-scrollbar">
                                    <NavLink href="/" label="Home" />
                                    <NavLink href="/work" label="Work" />
                                    <NavLink href="/stack" label="Stack" />
                                    <NavLink href="/services" label="Capabilities" />
                                </div>

                                {/* Trailing controls */}
                                <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                                    <CmdKButton />

                                    {/* Desktop Direct WhatsApp Quick Chat */}
                                    <a
                                        href="https://wa.me/916309718153?text=Hi%20Nanda%20Kishore%2C%20I%20saw%20your%20portfolio%20and%20want%20to%20connect%20with%20you!"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Chat directly on WhatsApp"
                                        title="Chat directly on WhatsApp: +91 6309718153"
                                        className="hidden md:inline-flex items-center gap-1.5 bg-[#25D366] text-ink px-3 py-2 font-mono font-black text-xs uppercase tracking-wider border-[2px] border-ink hover:bg-[#20bd5a] hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-[2px_2px_0px_#1A1A1A] min-h-[40px]"
                                    >
                                        <MessageCircle size={14} className="stroke-[2.5]" />
                                        <span>WhatsApp</span>
                                    </a>

                                    <MagneticButton>
                                        <Link
                                            href="/contact"
                                            className="bg-acid text-ink px-2.5 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 font-heading font-bold text-[11px] sm:text-xs md:text-sm uppercase tracking-wider border-[2px] md:border-[3px] border-ink hover:bg-[#FFD60A] transition-colors min-h-[36px] md:min-h-[40px] inline-flex items-center"
                                        >
                                            <span className="sm:hidden">Connect</span>
                                            <span className="hidden sm:inline">Let&apos;s Connect</span>
                                        </Link>
                                    </MagneticButton>
                                </div>
                            </div>
                        </nav>
                    </ThemeProvider>
                </LoadingProvider>
                <SpeedInsights />
                <Analytics />
            </body>
        </html>
    );
}

function NavLink({ href, label }: { href: string; label: string }) {
    return (
        <MagneticButton>
            <Link
                href={href}
                className="font-mono text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-wider text-cream/85 hover:text-acid transition-colors px-2 sm:px-3 md:px-4 py-1.5 md:py-2 min-h-[36px] md:min-h-[40px] inline-flex items-center whitespace-nowrap"
            >
                {label}
            </Link>
        </MagneticButton>
    );
}
