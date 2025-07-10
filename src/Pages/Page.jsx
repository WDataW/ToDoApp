import { useTheme, textColors, bgColors } from "../context/Theme";
import ToggleTheme from "../components/other/ToggleTheme";// for testing only
import ToggleLang from "../components/other/ToggleLang";
export default function Page({ className, children, ...props }) {
    const [theme] = useTheme();
    return (
        <div className={`min-h-screen  ${className} ${textColors[theme]} ${bgColors[theme]} `} {...props}>
            {children}
            <ToggleLang />
            <ToggleTheme />
        </div>
    );
}