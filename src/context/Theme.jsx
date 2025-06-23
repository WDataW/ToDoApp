import { createContext, useContext, useState } from "react";

export const ThemeContext = createContext();  
export function useTheme(){
    return useContext(ThemeContext);
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
        <ThemeContext value={[theme, setTheme] }>
            {children}
        </ThemeContext>
    ); 

}