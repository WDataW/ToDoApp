import { useTranslation } from "@/context/Language";
import { useTheme } from "@/context/Theme";
import { motion } from "motion/react"
import { useState } from "react";
export default function SelectButtons({ customZIndex = false, value, setValue, options, className = "", children, ...props }) {
    const [theme] = useTheme();
    const t = useTranslation();
    const [localValue, setLocalValue] = useState(value);
    function onClick(option) {
        setValue(option);
        setLocalValue(option);
    }
    return (
        <div style={{ gridTemplateColumns: `repeat(${options.length}, 1fr)` }} className={`${className} ${customZIndex && (theme == "dark" ? "bg-black" : "bg-white")} relative   h-[2rem] border rounded-[0.4rem] mb-[0.8rem] grid   overflow-hidden`}>
            <motion.span style={{ gridColumn: options.indexOf(localValue) + 1, }} layout className={`h-full    ${theme == "dark" ? "bg-white" : "bg-black"}`}></motion.span>
            {options.map((option) => {
                return <button tabIndex={0} aria-label={t(`terms.${option}`)} key={"BB" + option} style={{ width: `${1 / options.length * 100}%`, insetInlineStart: `${(options.indexOf(option)) / options.length * 100}%` }} onClick={() => { onClick(option) }} className={`capitalize text-center text-white mix-blend-difference absolute start-0  px-[0.5rem]  py-[0.2rem] w-1/2`}>{t(`terms.${option}`)}</button>
            })}
        </div>

    );
}
