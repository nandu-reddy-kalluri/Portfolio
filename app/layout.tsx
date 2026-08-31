import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ui/ThemeProvider";
import { LoadingProvider } from "@/components/ui/LoadingContext";
import ThemeToggle from "@/components/ui/ThemeToggle";
import ScrollProgress from "@/components/ui/ScrollProgress";
import LoadingScreen from "@/components/ui/LoadingScreen";
import CommandPalette from "@/components/ui/CommandPalette";
import CustomCursor from "@/components/ui/CustomCursor";
import TelemetryHUD from "@/components/ui/TelemetryHUD";
import CmdKButton from "@/components/ui/CmdKButton";
import MagneticButton from "@/components/ui/MagneticButton";
import Link from "next/link";
import { themeScript } from "@/lib/theme-script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-heading",
    weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
    weight: ["400", "500", "600", "700", "800"],
});

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
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#F5F1E8" },
        { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: themeScript,
                    }}
                />
            </head>
            <body className="font-mono bg-cream text-ink antialiased selection:bg-acid selection:text-ink">
                <LoadingProvider>
                    <ThemeProvider>
                        <CustomCursor />
                        <TelemetryHUD />
                        <LoadingScreen />
                        <ScrollProgress />
                        <CommandPalette />

                        <main className="pb-24 md:pb-20">{children}</main>

                        {/* Bottom Navigation */}
                        <nav className="fixed bottom-0 left-0 w-full bg-ink border-t-[3px] border-ink z-[100] shadow-[0px_-4px_20px_rgba(0,0,0,0.3)]">
                            <div className="max-w-7xl mx-auto px-3 md:px-6 py-2 md:py-3 flex items-center gap-1 md:gap-2">
                                {/* Primary links */}
                                <div className="flex items-center gap-1 md:gap-1 flex-1">
                                    <NavLink href="/" label="Home" />
                                    <NavLink href="/work" label="Work" />
                                    <NavLink href="/stack" label="Stack" />
                                    <NavLink href="/services" label="Capabilities" desktopOnly />
                                </div>

                                {/* Trailing controls */}
                                <div className="flex items-center gap-1 md:gap-2">
                                    <CmdKButton />

                                    <ThemeToggle />

                                    <MagneticButton>
                                        <Link
                                            href="/contact"
                                            className="bg-acid text-ink px-3 md:px-5 py-2 md:py-2.5 font-heading font-bold text-xs md:text-sm uppercase tracking-wider border-[3px] border-ink hover:bg-cream transition-colors min-h-[40px] inline-flex items-center"
                                        >
                                            Let&apos;s Connect
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

function NavLink({ href, label, desktopOnly = false }: { href: string; label: string; desktopOnly?: boolean }) {
    return (
        <MagneticButton>
            <Link
                href={href}
                className={`font-mono text-xs md:text-sm font-bold uppercase tracking-wider text-cream/80 hover:text-acid transition-colors px-3 md:px-4 py-2 min-h-[40px] inline-flex items-center ${desktopOnly ? "hidden md:inline-flex" : ""}`}
            >
                {label}
            </Link>
        </MagneticButton>
    );
}
