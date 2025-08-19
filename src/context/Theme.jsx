import { createContext, useContext, useState, useEffect } from "react";
import { useInfo } from "./User";

export const ThemeContext = createContext();
export function useTheme() {
    return useContext(ThemeContext);
}

export function useUpdateUserTheme() {
    const [userInfo, setUserInfo] = useInfo();
    return (theme) => {
        setUserInfo({ ...userInfo, settings: { ...userInfo["settings"], theme: theme } });
    }
}


export default function Theme({ children }) {
    function getBrowserPreference() {
        return (
            (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
                ? "dark" : "light"
        );
    }
    const [userInfo] = useInfo();
    const userTheme = userInfo["settings"]["theme"];

    const [theme, setTheme] = useState(userTheme || getBrowserPreference());



    function initTheme() {
        setTheme(getBrowserPreference());
    }
    useEffect(() => {
        if (!userTheme) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener("change",
                initTheme
            );
            return () => {
                window.matchMedia('(prefers-color-scheme: dark)').removeEventListener("change",
                    initTheme
                );
            };
        }
    }, []
    );

    return (
        <ThemeContext value={[theme, setTheme]}>
            {children}
        </ThemeContext>
    );

}




export const bgThemeColors = {
    dark: "bg-[var(--dark-theme-accent-color)]",
    light: "bg-[var(--light-theme-accent-color)]",
    transparent: "bg-[#00000000]"
}


export const darkerBgThemeColors = {
    dark: "bg-[var(--color-darker-dark-theme)]",
    light: "bg-[var(--color-darker-light-theme)]",
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
    light: "bg-[var(--light-bg-color)]",
    darkenBg: "bg-[rgba(0,0,0,0.6)]"
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
export const focusBgThemeColors = {
    both: "focus:bg-[var(--cross-theme-color)] focus:text-white",
    dark: "focus:bg-[var(--dark-theme-accent-color)] focus:text-white",
    light: "focus:bg-[var(--light-theme-accent-color)] focus:text-white",
    transparent: "focus:bg-[#00000000]"
}

export const outlineFocusThemeColors = {
    both: "focus:outline-[var(--cross-theme-color)]",
    dark: "focus:outline-[var(--dark-theme-accent-color)]",
    light: "focus:outline-[var(--light-theme-accent-color)]",
    transparent: "focus:outline-[#00000000]"
}