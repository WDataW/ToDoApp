import { useTheme, textColors, bgColors } from "../context/Theme";
import ToggleTheme from "../components/other/ToggleTheme";// for testing only
import ToggleLang from "../components/other/ToggleLang";
import ResetScroll from "./ResetScroll";
export default function Page({ resetScroll = true, customTheme, className, children, ...props }) {
    const [theme] = useTheme();

    return (
        <div className={`min-h-[100dvh]  ${className} ${textColors[theme]} ${bgColors[customTheme || theme]} `} {...props}>
            {resetScroll && <ResetScroll />}
            {children}
        </div>
    );
}