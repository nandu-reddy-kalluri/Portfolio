"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface TrailPoint {
    id: number;
    x: number;
    y: number;
    rotation: number;
}

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [isTouch, setIsTouch] = useState(false);
    const [trail, setTrail] = useState<TrailPoint[]>([]);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Spring physics for outer square reticle lag
    const springConfig = { damping: 24, stiffness: 350, mass: 0.5 };
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    // Smooth rotation spring for scroll/interaction dynamics
    const rotateMotion = useMotionValue(0);
    const smoothRotate = useSpring(rotateMotion, { damping: 20, stiffness: 200 });

    const lastScrollY = useRef(0);
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
    const lastMousePos = useRef({ x: -100, y: -100, time: Date.now() });

    const moveCursor = useCallback(
        (e: MouseEvent) => {
            const now = Date.now();
            const dx = e.clientX - lastMousePos.current.x;
            const dy = e.clientY - lastMousePos.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const dt = now - lastMousePos.current.time;

            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);

            // Add ghost echo square on fast sweeps (> 35px)
            if (dist > 35 && dt > 25) {
                const angle = Math.atan2(dy, dx) * (180 / Math.PI);
                const newPoint: TrailPoint = {
                    id: now + Math.random(),
                    x: e.clientX,
                    y: e.clientY,
                    rotation: angle,
                };

                setTrail((prev) => [...prev.slice(-4), newPoint]);
                lastMousePos.current = { x: e.clientX, y: e.clientY, time: now };
            }
        },
        [cursorX, cursorY, isVisible]
    );

    // Fade out ghost trail points
    useEffect(() => {
        if (trail.length === 0) return;
        const timer = setTimeout(() => {
            setTrail((prev) => prev.slice(1));
        }, 120);
        return () => clearTimeout(timer);
    }, [trail]);

    useEffect(() => {
        // Detect touch devices / coarse pointer
        const isTouchDevice =
            "ontouchstart" in window ||
            navigator.maxTouchPoints > 0 ||
            window.matchMedia("(pointer: coarse)").matches;

        if (isTouchDevice) {
            setIsTouch(true);
            return;
        }

        // Mouse movement & visibility
        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseenter", () => setIsVisible(true));
        window.addEventListener("mouseleave", () => setIsVisible(false));
        window.addEventListener("mousedown", () => setIsMouseDown(true));
        window.addEventListener("mouseup", () => setIsMouseDown(false));

        // Hover target detection
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement | null;
            if (!target) return;
            const isClickable = target.closest(
                "a, button, [role='button'], input, textarea, select, label, .neo-card, .cursor-pointer"
            );
            setIsHovering(!!isClickable);
        };
        const handleMouseOut = () => setIsHovering(false);

        document.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseout", handleMouseOut);

        // Scroll motion dynamics — rotates the reticle on scroll velocity
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const delta = currentScrollY - lastScrollY.current;
            lastScrollY.current = currentScrollY;

            const targetRotation = Math.max(Math.min(delta * 2.5, 90), -90);
            rotateMotion.set(targetRotation);

            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
            scrollTimeout.current = setTimeout(() => {
                rotateMotion.set(0);
            }, 120);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            document.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseout", handleMouseOut);
            window.removeEventListener("scroll", handleScroll);
            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        };
    }, [moveCursor, rotateMotion]);

    if (isTouch) return null;

    return (
        <div className="hidden lg:block pointer-events-none">
            {/* Ghost Echo Squares Trail */}
            {trail.map((point) => (
                <motion.div
                    key={point.id}
                    initial={{ opacity: 0.4, scale: 0.9 }}
                    animate={{ opacity: 0, scale: 0.4 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="fixed top-0 left-0 pointer-events-none z-[9997] mix-blend-difference border border-acid"
                    style={{
                        left: point.x,
                        top: point.y,
                        width: 22,
                        height: 22,
                        transform: `translate(-50%, -50%) rotate(${point.rotation}deg)`,
                    }}
                />
            ))}

            {/* Direct Inner Square Dot */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                <motion.div
                    animate={{
                        width: isHovering ? 10 : isMouseDown ? 4 : 8,
                        height: isHovering ? 10 : isMouseDown ? 4 : 8,
                        opacity: isVisible ? 1 : 0,
                        rotate: isHovering ? 45 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 28 }}
                    className="bg-acid"
                    style={{ borderRadius: 0 }}
                />
            </motion.div>

            {/* Trailing Outer Square Reticle Frame with Scroll & Hover Physics */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
                style={{
                    x: springX,
                    y: springY,
                    rotate: smoothRotate,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                <motion.div
                    animate={{
                        width: isHovering ? 52 : isMouseDown ? 24 : 34,
                        height: isHovering ? 52 : isMouseDown ? 24 : 34,
                        opacity: isVisible ? 1 : 0,
                        borderWidth: isHovering ? 3 : 2,
                        rotate: isHovering ? 45 : 0,
                        scale: isMouseDown ? 0.8 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="border-acid relative"
                    style={{
                        borderStyle: "solid",
                        borderRadius: 0,
                        boxShadow: isHovering
                            ? "0 0 18px rgba(204, 255, 0, 0.45)"
                            : "0 0 0px rgba(204, 255, 0, 0)",
                    }}
                >
                    {/* Micro Corner Crosshair Accents on Hover */}
                    {isHovering && (
                        <>
                            <span className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-acid" />
                            <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-acid" />
                            <span className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-acid" />
                            <span className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-acid" />
                        </>
                    )}
                </motion.div>
            </motion.div>
        </div>
    );
}
