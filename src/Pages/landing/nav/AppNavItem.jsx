import { useTheme } from "@/context/Theme";
const icons = {
    light: "bg-[url(/images/lightLogo.svg)]",
    dark: "bg-[url(/images/darkLogo.svg)]"
}
export default function AppNavItem({ className = "", children, ...props }) {
    const [theme] = useTheme();
    return (
        <a className={`flex gap-[0.5rem] items-center ${className}`} {...props}>
            <span className={`h-[1.5rem] w-[1.5rem] bg-cover bg-no-repeat bg-center ${icons[theme]}`}></span>
            <span className="font-bold  text-[1.3rem]">TODOU</span>
        </a>
    );
}