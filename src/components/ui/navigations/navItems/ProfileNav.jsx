import { useTranslation } from "../../../../context/Language";
import { useTheme } from "../../../../context/Theme";
import NavItem from "./NavItem";
const icons = {
    dark:"bg-[url(/src/assets/icons/dark/profile.svg)]",
    light:"bg-[url(/src/assets/icons/light/profile.svg)]"
}
export default function ProfileNav({className="" , children, ...props}){
    const [theme] = useTheme();
    const t = useTranslation();
    return(
        <NavItem className={`${className}`} image={icons[theme]} {...props}>
            {t("titles.profile")}
        </NavItem>
    );
}