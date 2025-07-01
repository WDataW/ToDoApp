import { useTheme } from "../../../../context/Theme";
import NavItem from "./NavItem";
import { useTranslation } from "../../../../context/Language";
const icons = {
    dark:"bg-[url(/src/assets/icons/dark/pie-chart.svg)]",
    light:"bg-[url(/src/assets/icons/light/pie-chart.svg)]"
}
export default function StatsNav({className="" , children, ...props}){
    const [theme] = useTheme();
    const t = useTranslation();
    return(
        <NavItem className={`${className}`} image={icons[theme]} {...props}>
            {t("titles.stats")}
        </NavItem>
    );
}