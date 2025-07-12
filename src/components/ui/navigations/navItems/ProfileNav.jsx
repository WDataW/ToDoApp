import { useTranslation } from "../../../../context/Language";
import { useTheme } from "../../../../context/Theme";
import { OutlinedImageAnchor } from "../../anchors";
import NavItem from "./NavItem";

export default function ProfileNav({ className = "", children, ...props }) {
    const t = useTranslation();
    const [theme] = useTheme();
    const outlineColor = theme == "dark" ? "outline-white/70" : "outline-black/70";
    return (
        <OutlinedImageAnchor aria-label="Profile" className={`${className} mb-[0.3rem] md:mb-[0.5rem]`} image={`bg-[url(/images/userPFP.png)] bg-cover rounded-full h-[2rem] w-[2rem] outline-[0.075rem] ${outlineColor} outline-offset-2 `} {...props} />
    );
}