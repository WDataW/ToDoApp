import { useTheme } from "../../../../context/Theme";
import NavItem from "./NavItem";
import { useTranslation } from "../../../../context/Language";
const icons = {
    dark:"bg-[url(/src/assets/icons/dark/pencil.svg)]",
    light:"bg-[url(/src/assets/icons/light/pencil.svg)]"
}

export default function TasksNav({className="" , ...props}){
    const [theme] = useTheme();
    const t = useTranslation();
    return(
        <NavItem className={`${className}`} image={icons[theme]} {...props}>
            {t("titles.tasks")}
        </NavItem>
    );
}