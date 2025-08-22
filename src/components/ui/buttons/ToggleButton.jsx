import { bgThemeColors, useTheme } from "@/context/Theme";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
export default function ToggleButton({ value, className = "", children, ...props }) {
    const [theme] = useTheme();
    return (

        <button dir="ltr" className={` ${value ? `justify-end ${bgThemeColors[theme]}` : "justify-start bg-gray-500"} transition-all duration-500 rounded-full flex items-center px-[0.1rem] aspect-[2/1] h-[1.8rem] ${className}`} {...props} >
            <motion.span layout className="bg-white aspect-1/1 h-[91%] inline-block rounded-full"></motion.span>
        </button>

    );
}