import { useTheme } from "@/context/Theme";
import { useId } from "react";

export default function Textarea({ className = "", children, ...props }) {
    const themeStyles = {
        light: " text-black",
        dark: " text-white"
    };
    const [theme] = useTheme();
    const id = useId()
    return (
        <div className={`${className} flex flex-col`}>
            {props.label && <label htmlFor={id} className="ms-[0.3rem]">{props.label}</label>}
            <textarea id={id} className={`w-full border-b outline-none py-[0.4rem] px-[0.8rem] placeholder-opacity-50 outline-none  min-h-[4rem] rounded-[0.4rem]  ${themeStyles[theme]}`} {...props}>
                {children}
            </textarea>
        </div>
    );
}