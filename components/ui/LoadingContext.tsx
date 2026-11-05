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
    const [isLoading, setIsLoading] = useState(false);
    const [isLoaded, setIsLoaded] = useState(true);

    const finishLoading = () => {
        setIsLoading(false);
        setIsLoaded(true);
    };

    return (
        <LoadingContext.Provider value={{ isLoading, isLoaded, finishLoading }}>
            {children}
        </LoadingContext.Provider>
    );
}
