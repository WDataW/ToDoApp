import { useTheme } from "../../../context/Theme";
import ImageAnchor from "./ImageAnchor";
import NavItem from "../navigations/navItems/NavItem";
const icons = {
    dark: "bg-[url(/src/assets/icons/dark/settings.svg)]",
    light: "bg-[url(/src/assets/icons/light/settings.svg)]"
}
export default function Settings({ className = "", ...props }) {
    const [theme] = useTheme();
    return (
        <ImageAnchor aria-label="Settings" className={className} image={icons[theme]} {...props} />
    );
}