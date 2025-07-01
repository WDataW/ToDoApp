import { useId } from "react";
import ImageAnchor from "../../anchors/ImageAnchor";
import { useTheme, activeSurfaceBgColors } from "../../../../context/Theme";

export default function NavItem({className="", children, image, active=false,...props}){
    const id = useId();
    const [theme] = useTheme();
    const activeSurfaceBgColor = activeSurfaceBgColors[theme];

    return(
        <li className={` list-none p-0  flex flex-col justify-center items-center  sm:px-[1rem] sm:py-[0.5rem] py-[1rem] px-[0.5rem] ${active?activeSurfaceBgColor+" border-t-[0.1rem] border-s-0 sm:border-t-0 sm:border-s-[0.1rem]":""}   ${className}`}>
            <ImageAnchor className={`h-[1.2rem] w-[1.2rem] ${children??"h-[1.5rem] w-[1.5rem]"}`} id={id} image={image}  {...props}/>
            <label className="text-[0.8rem] text-center" htmlFor={id}>{children}</label>
        </li>
    );
}