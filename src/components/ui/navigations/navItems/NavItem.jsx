import { useId } from "react";
import ImageAnchor from "../../anchors/ImageAnchor";
import { useTheme, activeSurfaceBgColors } from "../../../../context/Theme";

export default function NavItem({ className = "", children, image, size, active = false, ...props }) {
    const id = useId();
    const [theme] = useTheme();
    const activeSurfaceBgColor = activeSurfaceBgColors[theme];

    return (
        <li>
            <a href="" className={` p-0  flex flex-col justify-center items-center  sm:px-[1rem] sm:py-[0.5rem] py-[0.5rem] px-[0.5rem] ${active ? activeSurfaceBgColor + " border-t-[0.1rem] border-s-0 sm:border-t-0 sm:border-s-[0.15rem]" : ""}   ${className}`}>
                <img src={image} className={`${children ? "h-[1.2rem] w-[1.2rem]" : size}`} alt="" />
                <span className="cursor-pointer opacity-80 text-[0.8rem] text-center" >{children}</span>
            </a>
        </li>
    );
}