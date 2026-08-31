"use client";

import { useEffect, useRef } from "react";

interface Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    color: string;
}

export default function InteractiveConstellation({
    className = "",
    density = 35,
}: {
    className?: string;
    density?: number;
}) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
        x: -1000,
        y: -1000,
        active: false,
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
        let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

        const colors = [
            "rgba(204, 255, 0, 0.7)",   // acid
            "rgba(0, 85, 255, 0.6)",    // electric blue
            "rgba(0, 245, 212, 0.7)",   // mint cyan
            "rgba(255, 51, 153, 0.6)",  // hotpink
        ];

        const nodeCount = Math.min(Math.floor((width * height) / 24000), density);
        const nodes: Node[] = [];

        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.6,
                vy: (Math.random() - 0.5) * 0.6,
                radius: Math.random() * 2 + 1.5,
                color: colors[Math.floor(Math.random() * colors.length)],
            });
        }

        const handleResize = () => {
            if (!canvas.parentElement) return;
            width = canvas.width = canvas.parentElement.clientWidth;
            height = canvas.height = canvas.parentElement.clientHeight;
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current.x = e.clientX - rect.left;
            mouseRef.current.y = e.clientY - rect.top;
            mouseRef.current.active = true;
        };

        const handleMouseLeave = () => {
            mouseRef.current.active = false;
        };

        window.addEventListener("resize", handleResize);
        const parent = canvas.parentElement;
        if (parent) {
            parent.addEventListener("mousemove", handleMouseMove);
            parent.addEventListener("mouseleave", handleMouseLeave);
        }

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            // Update and draw nodes
            for (let i = 0; i < nodes.length; i++) {
                const node = nodes[i];
                node.x += node.vx;
                node.y += node.vy;

                if (node.x < 0 || node.x > width) node.vx *= -1;
                if (node.y < 0 || node.y > height) node.vy *= -1;

                // Mouse interaction - slight attraction
                if (mouseRef.current.active) {
                    const dx = mouseRef.current.x - node.x;
                    const dy = mouseRef.current.y - node.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 140) {
                        const force = (140 - dist) / 140;
                        node.x += dx * force * 0.03;
                        node.y += dy * force * 0.03;
                    }
                }

                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fillStyle = node.color;
                ctx.fill();

                // Connect nearby nodes
                for (let j = i + 1; j < nodes.length; j++) {
                    const other = nodes[j];
                    const dx = other.x - node.x;
                    const dy = other.y - node.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 110) {
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(other.x, other.y);
                        const alpha = (1 - dist / 110) * 0.22;
                        ctx.strokeStyle = `rgba(204, 255, 0, ${alpha})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }

                // Connect to mouse cursor
                if (mouseRef.current.active) {
                    const dx = mouseRef.current.x - node.x;
                    const dy = mouseRef.current.y - node.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
                        const alpha = (1 - dist / 150) * 0.45;
                        ctx.strokeStyle = `rgba(0, 245, 212, ${alpha})`;
                        ctx.lineWidth = 1.2;
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener("resize", handleResize);
            if (parent) {
                parent.removeEventListener("mousemove", handleMouseMove);
                parent.removeEventListener("mouseleave", handleMouseLeave);
            }
            cancelAnimationFrame(animationFrameId);
        };
    }, [density]);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 pointer-events-none opacity-40 dark:opacity-60 transition-opacity ${className}`}
        />
    );
}
