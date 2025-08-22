import { useState } from "react";
import { useTheme, textThemeColors, darkerBgThemeColors, bgThemeColors, darkTextThemeColors } from "../../../context/Theme";


const outlines = {
    light: "outline-[var(--light-bg-color)]",
    dark: "outline-[var(--dark-bg-color)]"
}
export default function CheckTask({ className = "", checked, children, ...props }) {
    const [theme] = useTheme();
    const outline = outlines[theme];
    return (
        <input type="checkbox" aria-label="Finish Task" className={`checked:bg-[url(/src/assets/icons/check.svg)] hover:bg-[url(/src/assets/icons/lowOpacityCheck.svg)] ${darkTextThemeColors[theme]} ${bgThemeColors[theme]} appearance-none h-[1.3rem] w-[1.3rem]   ${className} bg-cover bg-no-repeat bg-center border-[0.1rem] outline-[0.3rem] ${outline} rounded-full flex-none`} checked={checked}  {...props} />
    );
}