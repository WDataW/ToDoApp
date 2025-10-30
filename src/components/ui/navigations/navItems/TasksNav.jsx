import { useTheme } from "../../../../context/Theme";
import NavItem from "./NavItem";
import { useTranslation } from "../../../../context/Language";
import { getIcon } from "@/assets/assetsHandler";

export default function TasksNav({ className = "", ...props }) {
    const [theme] = useTheme();
    const t = useTranslation();
    const tasksIconSrc = getIcon(`/src/assets/icons/${theme}/pencil.svg`);

    return (
        <NavItem className={`${className}`} image={tasksIconSrc} {...props}>
            {t("titles.tasks")}
        </NavItem>
    );
}