"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface LoadingContextType {
    isLoading: boolean;
    isLoaded: boolean;
    finishLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType>({
    isLoading: false,
    isLoaded: true,
    finishLoading: () => {},
});

export function useLoading() {
    return useContext(LoadingContext);
}

export function LoadingProvider({ children }: { children: ReactNode }) {
    // Start with false for SSR hydration safety; determine state on mount
    const [isLoading, setIsLoading] = useState(false);
    const [isLoaded, setIsLoaded] = useState(true);

    useEffect(() => {
        try {
            const hasVisited = sessionStorage.getItem("portfolio-loaded");
            const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            if (!hasVisited && !reducedMotion) {
                setIsLoading(true);
                setIsLoaded(false);
            } else {
                setIsLoading(false);
                setIsLoaded(true);
            }
        } catch {
            // Storage access blocked or unavailable
            setIsLoading(false);
            setIsLoaded(true);
        }
    }, []);

    const finishLoading = () => {
        setIsLoading(false);
        setIsLoaded(true);
        try {
            sessionStorage.setItem("portfolio-loaded", "true");
        } catch {
            // Fallback safe
        }
    };

    return (
        <LoadingContext.Provider value={{ isLoading, isLoaded, finishLoading }}>
            {children}
        </LoadingContext.Provider>
    );
}
