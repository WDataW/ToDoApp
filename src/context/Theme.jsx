import { createContext, useContext, useState, useEffect } from "react";

export const ThemeContext = createContext();
export function useTheme() {
    return useContext(ThemeContext);
}



export default function Theme({ children }) {
    function getUserPreference() {
        return (
            (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
                ? "dark" : "light"
        );
    }
    const [theme, setTheme] = useState(getUserPreference());


    function initTheme() {
        setTheme(getUserPreference());
    }
    useEffect(() => {

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener("change",
            initTheme
        );
        return () => {
            window.matchMedia('(prefers-color-scheme: dark)').removeEventListener("change",
                initTheme
            );
        };
    }, []
    );

    return (
        <ThemeContext value={[theme, setTheme]}>
            {children}
        </ThemeContext>
    );

}




export const bgThemeColors = {
    both: "bg-[var(--cross-theme-color)]",
    dark: "bg-[var(--dark-theme-accent-color)]",
    light: "bg-[var(--light-theme-accent-color)]",
    transparent: "bg-[#00000000]"
}
export const textThemeColors = {
    dark: "text-[var(--dark-theme-accent-color)]",
    light: "text-[var(--light-theme-accent-color)]"
}
export const hoverTextThemeColors = {
    dark: "hover:text-[var(--dark-theme-accent-color)]",
    light: "hover:text-[var(--light-theme-accent-color)]"
}
export const accentThemeColors = {
    dark: "accent-[var(--dark-theme-accent-color)]",
    light: "accent-[var(--light-theme-accent-color)]"
}
export const textColors = {
    dark: "text-[var(--dark-text-color)]",
    light: "text-[var(--light-text-color)]"
}
export const bgColors = {
    dark: "bg-[var(--dark-bg-color)]",
    light: "bg-[var(--light-bg-color)]"
}
export const surfaceBgColors = {
    dark: "bg-[var(--dark-surface-bg-color)]",
    light: "bg-[var(--light-surface-bg-color)]"

}
export const activeSurfaceBgColors = {
    dark: "bg-[var(--dark-active-surface-bg-color)]",
    light: "bg-[var(--light-active-surface-bg-color)]"

}
export const hoverSurfaceBgColors = {
    dark: "hover:bg-[var(--dark-active-surface-bg-color)]",
    light: "hover:bg-[var(--light-active-surface-bg-color)]"

}
export const gradientColors = {
    dark: " bg-[var(--dark-gradient-color)]  from-[var(--dark-gradient-color)] to-[var(--cross-gradient-color)]",
    light: " bg-[var(--light-gradient-color)] from-[var(--light-gradient-color)] to-[var(--cross-gradient-color)]"
}

export const hoverBgThemeColors = {
    both: "hover:bg-[var(--cross-theme-color)] hover:text-white",
    dark: "hover:bg-[var(--dark-theme-accent-color)] hover:text-white",
    light: "hover:bg-[var(--light-theme-accent-color)] hover:text-white",
    transparent: "hover:bg-[#00000000]"



}