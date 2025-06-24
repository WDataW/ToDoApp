import { useTheme, textThemeColors } from "../../context/Theme";

export default function ThemedAnchor({href="", className="", children}){
    const [theme] = useTheme();
    return(<a href={href} className={`${className} ${textThemeColors[theme]} underline`}>
              {children}
           </a>
    );
}