import { useState } from "react";
import { useTheme, textThemeColors } from "../../../context/Theme";

const bgs = {
    light: {
        empty: "bg-[url(/src/assets/icons/light/checkbox/empty.svg)]",
        hover: "hover:bg-[url(/src/assets/icons/light/checkbox/hover.svg)]",
        checked: "checked:bg-[url(/src/assets/icons/light/checkbox/checked.svg)]"
    },
    dark: {
        empty: "bg-[url(/src/assets/icons/dark/checkbox/empty.svg)]",
        hover: "hover:bg-[url(/src/assets/icons/dark/checkbox/hover.svg)]",
        checked: "checked:bg-[url(/src/assets/icons/dark/checkbox/checked.svg)]"
    }
}
const outlines = {
    light: "outline-[var(--light-bg-color)]",
    dark: "outline-[var(--dark-bg-color)]"
}
export default function CheckTask({ className = "", checked, children, ...props }) {
    const [theme] = useTheme();
    const bg = bgs[theme];
    const outline = outlines[theme]
    return (
        <input type="checkbox" aria-label="Finish Task" className={` appearance-none h-[1.3rem] w-[1.3rem] ${textThemeColors[theme]} ${bg["empty"]} ${!checked && bg["hover"]} ${bg["checked"]} ${className} bg-cover bg-no-repeat bg-center border-[0.1rem] outline-[0.3rem] ${outline} rounded-full flex-none`} checked={checked}  {...props} />
    );
}