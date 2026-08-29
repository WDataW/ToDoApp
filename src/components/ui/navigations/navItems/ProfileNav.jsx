import { useInfo } from "@/context/User";
import { useTheme } from "../../../../context/Theme";
import { OutlinedImageAnchor } from "../../anchors";

export default function ProfileNav({ className = "", children, ...props }) {
    const [userInfo] = useInfo();

    return (
        <OutlinedImageAnchor aria-label="Profile" className={`${className} mb-[0.3rem] md:mb-[0.5rem]`} image={userInfo.pfp} {...props} />
    );
}