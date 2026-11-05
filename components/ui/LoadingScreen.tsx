"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLoading } from "./LoadingContext";

export default function LoadingScreen() {
    const { isLoading, finishLoading } = useLoading();
    const [visible, setVisible] = useState(false);
    const hasCompletedRef = useRef(false);

    // Sync visible state with isLoading
    useEffect(() => {
        if (isLoading && !hasCompletedRef.current) {
            const isMobile = window.innerWidth < 768;
            setVisible(true);

            // Shorter duration on mobile for fast response, luxury intro on desktop
            const duration = isMobile ? 450 : 950;
            const fallbackDuration = isMobile ? 850 : 1500;

            const mainTimer = setTimeout(() => {
                setVisible(false);
            }, duration);

            // Guaranteed hard fallback — ensures screen NEVER gets stuck
            const hardFallback = setTimeout(() => {
                hasCompletedRef.current = true;
                setVisible(false);
                finishLoading();
            }, fallbackDuration);

            return () => {
                clearTimeout(mainTimer);
                clearTimeout(hardFallback);
            };
        } else if (!isLoading) {
            setVisible(false);
        }
    }, [isLoading, finishLoading]);

    // Ensure body scroll is unlocked when unmounted
    useEffect(() => {
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    const handleExitComplete = () => {
        hasCompletedRef.current = true;
        finishLoading();
    };

    return (
        <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
            {visible && (
                <motion.div
                    key="loading-screen"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="fixed inset-0 z-[500] bg-ink flex items-center justify-center select-none"
                    aria-live="polite"
                    aria-busy="true"
                >
                    <div className="text-center px-4">
                        {/* Name animation */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                        >
                            <div className="font-heading font-bold text-4xl md:text-6xl text-cream uppercase tracking-tighter">
                                <motion.span
                                    initial={{ opacity: 0, x: -16 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.15, duration: 0.35 }}
                                >
                                    Nanda Kishore
                                </motion.span>
                                <motion.span
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.35, duration: 0.25 }}
                                    className="text-acid ml-2 inline-block"
                                >
                                    _
                                </motion.span>
                            </div>
                        </motion.div>

                        {/* Loading bar */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.2 }}
                            className="mt-6 w-44 h-[3px] bg-cream/10 mx-auto overflow-hidden rounded-full"
                        >
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{
                                    duration: 0.65,
                                    delay: 0.25,
                                    ease: [0.25, 0.46, 0.45, 0.94],
                                }}
                                className="h-full w-full bg-gradient-to-r from-transparent via-acid to-transparent"
                            />
                        </motion.div>

                        {/* Subtitle */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.45, duration: 0.3 }}
                            className="mt-3 font-mono text-[10px] md:text-xs font-bold text-cream/40 uppercase tracking-[0.3em]"
                        >
                            Initializing engineering workspace
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
