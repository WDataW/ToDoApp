import { useTheme, textThemeColors } from "../../../context/Theme";
const textColor = {
    ...textThemeColors,
    error: "text-[#ff0000]",
}
export default function Message({ children, theme = "", className = "" }) {

    return (<p className={`${textColor[theme]} ${className}`}>{children}</p>);
}