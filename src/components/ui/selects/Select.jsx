import { useTheme, bgColors } from "@/context/Theme";
import { useId } from "react";
export default function Select({ className = "", label, labelClassName, children, ...props }) {
    const [theme] = useTheme();
    const id = useId();
    return (
        <label htmlFor={id} className={`flex flex-col  ${labelClassName}`}>
            <span className="ps-[0.3rem]">
                {label}
            </span>
            <select id={id} className={` ${bgColors[theme]} max-h-[2.25rem] w-full outline-none text-[0.85rem] p-[0.5rem] border rounded-[0.4rem] ${className}`}  {...props} >
                {children}
            </select>
        </label>
    );
}