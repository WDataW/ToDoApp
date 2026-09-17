import { useInfo } from "@/context/User";
import ImageAnchor from "./ImageAnchor";
import { useTheme } from "@/context/Theme";
export default function OutlinedImageAnchor({ className = "", image, ...props }) {
    const [theme] = useTheme();
    const outlineColor = theme == "dark" ? "outline-white/70" : "outline-black/70";
    return (
        <ImageAnchor className={`object-cover rounded-full h-[2rem] w-[2rem] outline-[0.075rem] ${outlineColor} outline-offset-2  outline-[0.2rem] outline-offset-[0.2rem] ${className} ${image}`} {...props}>
            <img className={`h-full w-full aspect-1/1 object-cover rounded-full`} src={image} alt="" />
        </ImageAnchor>
    );
}