import { createContext, useContext, useState } from "react";

export const ThemeContext = createContext();  
export function useTheme(){
    return useContext(ThemeContext);
}
export const bgThemeColors  = {
    both:"bg-[var(--cross-theme-color)]",
    dark:"bg-[var(--dark-theme-accent-color)]",
    light:"bg-[var(--light-theme-accent-color)]"
}
export const textThemeColors  = {
    dark:"text-[var(--dark-theme-accent-color)]",
    light:"text-[var(--light-theme-accent-color)]"
}
export const accentThemeColors  = {
    dark:"accent-[var(--dark-theme-accent-color)]",
    light:"accent-[var(--light-theme-accent-color)]"
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


export default function Theme({children}){
    console.log("Them Render");
    function getUserPreference(){
        return(
            (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
            ?"dark" : "light"
        );
    }
    const [theme, setTheme] = useState(getUserPreference());
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener("change",()=>{
        setTheme(getUserPreference());
    });
    return(
        <ThemeContext value={[theme ,setTheme] }>
            {children}
        </ThemeContext>
    ); 

}