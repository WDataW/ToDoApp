import { createContext, useContext, useState } from "react";

export const ThemeContext = createContext();  
export function useTheme(){
    return useContext(ThemeContext);
}
export const bgThemeColors  = {
    both:"bg-[var(--cross-theme-color)]",
    dark:"bg-[rgba(var(--dark-theme-accent-color),1)]",
    light:"bg-[rgba(var(--light-theme-accent-color),1)]"
}
export const textThemeColors  = {
    dark:"text-[rgba(var(--dark-theme-accent-color),1)]",
    light:"text-[rgba(var(--light-theme-accent-color),1)]"
}
export const accentThemeColors  = {
    dark:"accent-[rgba(var(--dark-theme-accent-color),1)]",
    light:"accent-[rgba(var(--light-theme-accent-color),1)]"
}
export const textColors = {
    dark: "text-[var(--dark-text-color)]",
    light: "text-[var(--light-text-color)]"
}
export const bgColors = {
    dark: "bg-[var(--dark-bg-color)]",
    light: "bg-[var(--light-bg-color)]"
}

export default function Theme({children}){
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