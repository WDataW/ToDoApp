import { useTheme } from "../../../context/Theme";
import ImageAnchor from "./ImageAnchor";
const icons = {
    dark: "bg-[url(/src/assets/icons/dark/mail.svg)]",
    light: "bg-[url(/src/assets/icons/light/mail.svg)]"
}
export default function InboxAnchor({ className = "", children, ...props }) {
    const [theme] = useTheme();
    return (
        <ImageAnchor aria-label="Inbox" className={`${className}`} image={icons[theme]} {...props} />
    );
}