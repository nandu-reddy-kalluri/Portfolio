import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "K. Nanda Kishore — Generative AI & Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "72px",
                    backgroundColor: "#F5F1E8",
                    color: "#0A0A0A",
                    fontFamily: "sans-serif",
                }}
            >
                {/* Acid strip at top */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 14,
                        backgroundColor: "#CDFF00",
                    }}
                />

                {/* Meta tag */}
                <div
                    style={{
                        fontSize: 22,
                        letterSpacing: 8,
                        textTransform: "uppercase",
                        color: "#0A0A0A",
                        opacity: 0.75,
                        fontWeight: 700,
                        display: "flex",
                    }}
                >
                    Engineering Portfolio / {new Date().getFullYear()}
                </div>

                {/* Name */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 28,
                    }}
                >
                    <div
                        style={{
                            fontSize: 120,
                            lineHeight: 0.95,
                            fontWeight: 800,
                            letterSpacing: -3,
                            textTransform: "uppercase",
                            color: "#0A0A0A",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <span>K. Nanda</span>
                        <span style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                            <span>Kishore</span>
                            <span
                                style={{
                                    width: 28,
                                    height: 28,
                                    backgroundColor: "#CDFF00",
                                    border: "4px solid #0A0A0A",
                                    marginTop: 12,
                                }}
                            />
                        </span>
                    </div>

                    <div
                        style={{
                            fontSize: 30,
                            lineHeight: 1.25,
                            fontWeight: 600,
                            color: "#0A0A0A",
                            opacity: 0.85,
                            maxWidth: 900,
                            display: "flex",
                        }}
                    >
                        Generative AI & Software Engineer · AI Pipelines, Intelligent Automation & Web Products.
                    </div>
                </div>

                {/* Bottom row — tags */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: 20,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: 3,
                    }}
                >
                    <div style={{ display: "flex", gap: 14 }}>
                        {["Generative AI", "AI Pipelines", "Automation", "Full-Stack"].map((t) => (
                            <div
                                key={t}
                                style={{
                                    padding: "8px 16px",
                                    border: "3px solid #0A0A0A",
                                    backgroundColor: "#F5F1E8",
                                    display: "flex",
                                }}
                            >
                                {t}
                            </div>
                        ))}
                    </div>
                    <div
                        style={{
                            backgroundColor: "#0A0A0A",
                            color: "#F5F1E8",
                            padding: "12px 20px",
                            display: "flex",
                        }}
                    >
                        Aurora × NIAT
                    </div>
                </div>
            </div>
        ),
        { ...size },
    );
}
