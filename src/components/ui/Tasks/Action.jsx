import { useTranslation } from "../../../context/Language";
import { useTheme, hoverBgThemeColors, focusBgThemeColors, textThemeColors, outlineFocusThemeColors } from "../../../context/Theme";

const icons = {
    light: {
        edit: "bg-[url(/src/assets/icons/light/edit.svg)]  opacity-90",
        delete: "bg-[url(/src/assets/icons/light/trash.svg)]   opacity-90",
        reschedule: "bg-[url(/src/assets/icons/light/calendar.svg)]"
    },
    dark: {
        edit: "bg-[url(/src/assets/icons/dark/edit.svg)]  opacity-80",
        delete: "bg-[url(/src/assets/icons/dark/trash.svg)]  opacity-80",
        reschedule: "bg-[url(/src/assets/icons/dark/calendar.svg)]"
    },
    hover: {
        edit: "group-hover:bg-[url(/src/assets/icons/dark/edit.svg)]  ",
        delete: "group-hover:bg-[url(/src/assets/icons/dark/trash.svg)] ",
        reschedule: "group-hover:bg-[url(/src/assets/icons/dark/calendar.svg)]  "

    }
}

export default function Action({ className = "", action, children, ...props }) {
    const [theme] = useTheme();
    const icon = icons[theme][action];
    const hoverIcon = icons["hover"][action];
    const hoverBgThemeColor = hoverBgThemeColors[theme];
    const outlineThemeColor = outlineFocusThemeColors[theme];
    const t = useTranslation();
    return (
        <button tabIndex="0" className={`${className} group ps-[0.5rem] flex  items-center py-[0.5rem] rounded-[0.5rem] transition duration-80 focus:outline  ${outlineThemeColor} ${hoverBgThemeColor}`} {...props}>
            <span className={`${icon} ${hoverIcon}  me-[0.3em] h-[1rem] w-[1rem] bg-center bg-cover bg-no-repeat`}></span>
            <span className=" h-[1.15rem] ">
                {t(`titles.${action}`)}
            </span>
        </button>
    );
}