import { surfaceBgColors, activeSurfaceBgColors, bgThemeColors, useTheme } from "@/context/Theme";
import { isEqual } from "@/scripts/dateTime";

export default function Day({ date, picked, day, className = "", children, ...props }) {

    const [theme] = useTheme();
    let bgColor;
    const due = day.due;
    if (due != 0) bgColor = bgThemeColors[theme];
    const active = isEqual(date, picked);
    return (
        <button className={`${active && (theme == "dark" ? "text-black bg-white" : "text-white bg-black")} ${!active && (theme == "dark" ? "text-white" : "text-black")} ${!active && due == 0 && theme == "dark" ? `${activeSurfaceBgColors[theme]}` : `${surfaceBgColors[theme]}`} ${!active && due != 0 && `${bgColor} text-white `} border h-[3rem] w-[3rem] rounded-[0.3rem] ${className}`} {...props}>
            <span>{day.day}</span>
        </button>
    );
}