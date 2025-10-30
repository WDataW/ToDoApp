import { getIcon } from "@/assets/assetsHandler";
import { useTranslation } from "../../../../context/Language";
import { useTheme } from "../../../../context/Theme";
import NavItem from "./NavItem";

export default function HomeNav({ className = "", ...props }) {
    const [theme] = useTheme();
    const t = useTranslation();
    const homeIconSrc = getIcon(`/src/assets/icons/${theme}/home.svg`);

    return (
        <NavItem className={`${className}`} image={homeIconSrc} {...props}>
            {t("titles.home")}
        </NavItem>
    );
}