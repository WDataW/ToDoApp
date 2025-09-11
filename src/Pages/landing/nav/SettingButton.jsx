import { useTheme } from "@/context/Theme";

export const hovers = {
    light: " hover:bg-[rgba(0,0,0,0.1)] hover:opacity-100",
    dark: " hover:bg-[rgba(255,255,255,0.1)] hover:opacity-100"
}
export default function SettingButton({ active, label, itemStyle, className = "", children, ...props }) {
    const [theme] = useTheme();
    const commonStyles = `${hovers[theme]}   h-full opacity-70 transition-[background-color]  transition-[opacity]  rounded-[0.5rem]  text-[0.8rem] `;
    const icons = {
        dark: "bg-[url(/src/assets/icons/dark/arrowDown.svg)]",
        light: "bg-[url(/src/assets/icons/light/arrowDown.svg)]"
    }

    return (
        <div style={{ height: active && itemStyle ? "5.3rem" : "" }} className={`h-[2.3rem] overflow-hidden transition-[height] flex flex-col items-center  justify-start  ${itemStyle || commonStyles}`}>
            <button className={` flex items-center ${!itemStyle && "px-[0.5rem] py-[0.4rem]"} ${className}`} {...props}>
                {label}
                <span className={`${active ? "rotate-180 mt-[0rem]" : "mt-[0.2rem] rotate-0"} ms-[0.2rem] ${icons[theme]}  h-[1rem] w-[1rem] inline-block bg-center bg-cover bg-no-repeat `}></span>
            </button>
            {children}
        </div>
    );
}