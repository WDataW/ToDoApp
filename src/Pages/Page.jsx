import { useTheme, textColors, bgColors } from "../context/Theme";
import ResetScroll from "./ResetScroll";
import { useEffect } from "react";
export default function Page({ resetScroll = true, customTheme, className, children, ...props }) {
    const [theme] = useTheme();
    useEffect(() => console.log(document.documentElement.classList))
    return (
        <div className={`min-h-[100dvh]  ${className} ${textColors[theme]} ${bgColors[customTheme || theme]} `} {...props}>
            {resetScroll && <ResetScroll />}
            {children}
        </div>
    );
}