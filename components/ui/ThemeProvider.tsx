"use client";

import { createContext, useContext, useEffect, ReactNode } from "react";

type Theme = "light";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    toggleTheme: () => {},
});

export function useTheme() {
    return useContext(ThemeContext);
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
    useEffect(() => {
        try {
            localStorage.removeItem("theme");
            document.documentElement.removeAttribute("data-theme");
        } catch {
            // ignore storage errors
        }
    }, []);

    return (
        <ThemeContext.Provider value={{ theme: "light", toggleTheme: () => {} }}>
            {children}
        </ThemeContext.Provider>
    );
}
