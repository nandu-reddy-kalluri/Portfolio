"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    intensity?: number;
    glare?: boolean;
}

export default function TiltCard({
    children,
    className = "",
    intensity = 10,
    glare = true,
}: TiltCardProps) {
    const cardRef = useRef<HTMLDivElement | null>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 300 };
    const smoothRotateX = useSpring(rotateX, springConfig);
    const smoothRotateY = useSpring(rotateY, springConfig);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!cardRef.current) return;
            const rect = cardRef.current.getBoundingClientRect();
            const clientX = e.clientX - rect.left;
            const clientY = e.clientY - rect.top;

            const xPercent = clientX / rect.width;
            const yPercent = clientY / rect.height;

            const rX = (0.5 - yPercent) * intensity;
            const rY = (xPercent - 0.5) * intensity;

            rotateX.set(rX);
            rotateY.set(rY);

            if (glare) {
                setGlarePos({
                    x: xPercent * 100,
                    y: yPercent * 100,
                    opacity: 0.15,
                });
            }
        },
        [intensity, glare, rotateX, rotateY]
    );

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        rotateX.set(0);
        rotateY.set(0);
        setGlarePos((prev) => ({ ...prev, opacity: 0 }));
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: 1000,
                transformStyle: "preserve-3d",
                rotateX: smoothRotateX,
                rotateY: smoothRotateY,
            }}
            className={`relative transition-shadow duration-300 ${className}`}
        >
            {children}

            {/* Holographic dynamic glare overlay */}
            {glare && isHovered && (
                <div
                    className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden z-20 transition-opacity duration-300"
                    style={{
                        background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(204, 255, 0, 0.22) 0%, rgba(0, 245, 212, 0.12) 30%, transparent 70%)`,
                        opacity: glarePos.opacity,
                    }}
                />
            )}
        </motion.div>
    );
}
