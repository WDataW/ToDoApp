import { useTheme, textThemeColors } from "../../../context/Theme";
import Anchor from "./Anchor";
export default function ThemedAnchor({ href = "", className = "", children }) {
    const [theme] = useTheme();
    return (<Anchor href={href} className={`${className} ${textThemeColors[theme]} md:text-shadow-md md:font-bold`}>
        {children}
    </Anchor>
    );
}