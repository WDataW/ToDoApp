import { useTheme } from "../../context/Theme";
const textColors={
    dark:"text-[#F97316]",
    light:"text-[#3B82F6]"
}
export default function ThemedAnchor({href="", className="", children}){
    const [theme] = useTheme();
    return(<a href={href} className={`${className} ${textColors[theme]} underline`}>
              {children}
           </a>
    );
}