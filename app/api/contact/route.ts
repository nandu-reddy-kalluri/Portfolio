import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limiter
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (!record) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }

    if (now > record.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }

    if (record.count >= MAX_REQUESTS_PER_WINDOW) {
        return true;
    }

    record.count += 1;
    return false;
}

export async function POST(req: NextRequest) {
    try {
        const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

        if (isRateLimited(ip)) {
            return NextResponse.json(
                { error: "Too many requests. Please try again later." },
                { status: 429 }
            );
        }

        const body = await req.json();
        const { name, email, projectType, brief } = body;

        // Basic validation
        if (!name || !email || !brief) {
            return NextResponse.json(
                { error: "Name, email, and message are required." },
                { status: 400 }
            );
        }

        // Length validation
        if (typeof name !== 'string' || name.length > 100) {
            return NextResponse.json(
                { error: "Name is too long (maximum 100 characters)." },
                { status: 400 }
            );
        }
        if (typeof email !== 'string' || email.length > 500) {
            return NextResponse.json(
                { error: "Email is too long (maximum 500 characters)." },
                { status: 400 }
            );
        }
        if (typeof brief !== 'string' || brief.length > 5000) {
            return NextResponse.json(
                { error: "Message is too long (maximum 5000 characters)." },
                { status: 400 }
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Please provide a valid email address." },
                { status: 400 }
            );
        }

        const FORMSPREE_ID = process.env.FORMSPREE_ID;
        const FORMSPREE_ENDPOINT = process.env.FORMSPREE_ENDPOINT || (FORMSPREE_ID ? `https://formspree.io/f/${FORMSPREE_ID}` : null);

        if (!FORMSPREE_ENDPOINT) {
            return NextResponse.json(
                { success: true, message: "Received. Please also reach out to nandureddy817.kalluri@gmail.com directly." }
            );
        }

        const formspreeResponse = await fetch(FORMSPREE_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                projectType: projectType || "General",
                brief,
                _subject: `New Portfolio Message from ${name}`,
            }),
        });

        if (!formspreeResponse.ok) {
            return NextResponse.json(
                { error: "Failed to send — please email nandureddy817.kalluri@gmail.com directly." },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { error: "Something went wrong. Please email nandureddy817.kalluri@gmail.com directly." },
            { status: 500 }
        );
    }
}
