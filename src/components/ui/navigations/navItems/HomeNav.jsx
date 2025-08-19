import { useTranslation } from "../../../../context/Language";
import { useTheme } from "../../../../context/Theme";
import NavItem from "./NavItem";
const icons = {
    dark: "/src/assets/icons/dark/home.svg",
    light: "/src/assets/icons/light/home.svg"
}
export default function HomeNav({ className = "", ...props }) {
    const [theme] = useTheme();
    const t = useTranslation();

    return (
        <NavItem className={`${className}`} image={icons[theme]} {...props}>
            {t("titles.home")}
        </NavItem>
    );
}