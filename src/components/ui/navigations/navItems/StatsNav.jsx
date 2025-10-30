import { useTheme } from "../../../../context/Theme";
import NavItem from "./NavItem";
import { useTranslation } from "../../../../context/Language";
import { getIcon } from "@/assets/assetsHandler";
export default function StatsNav({ className = "", children, ...props }) {
    const [theme] = useTheme();
    const t = useTranslation();
    const statsIconSrc = getIcon(`/src/assets/icons/${theme}/pie-chart.svg`);

    return (
        <NavItem className={`${className}`} image={statsIconSrc} {...props}>
            {t("titles.stats")}
        </NavItem>
    );
}