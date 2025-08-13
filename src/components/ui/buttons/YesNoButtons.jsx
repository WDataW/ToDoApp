import { useTheme, bgThemeColors, bgColors } from "@/context/Theme";

export default function YesNoButtons({ yes, yesFunc, disabled, no, noFunc, className = "", children, ...props }) {
    const [theme] = useTheme();
    return (
        <div dir="ltr" className={`${className} flex gap-[0.5rem]`} {...props}>
            <button tabIndex={0} className={`${bgColors[theme]} min-w-[5rem] border rounded-[0.4rem] py-[0.2rem] px-[0.5rem]`} onClick={noFunc}>{no}</button>
            <button tabIndex={0} disabled={disabled} className={`min-w-[5rem] ${disabled ? "opacity-60" : ""} text-white ${bgThemeColors[theme]} py-[0.2rem] px-[0.5rem] rounded-[0.4rem]`} onClick={yesFunc}>{yes}</button>
        </div>
    );
}