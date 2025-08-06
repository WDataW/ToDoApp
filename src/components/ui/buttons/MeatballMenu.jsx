import { useTheme } from "../../../context/Theme";
import Button from "./Button";
const icons = {
    light: "bg-[url(/src/assets/icons/light/dot-horizontal.svg)] ",
    dark: "bg-[url(/src/assets/icons/dark/dot-horizontal.svg)]"
}

export default function MeatballMenu({ customTheme = "", className = "", children, ...props }) {
    const [currentTheme] = useTheme();
    const theme = customTheme || currentTheme;
    return (
        <Button aria-label="Open Actions Menu" theme="tranparent" shape="" className={`rounded-[0.3rem] bg-contain bg-no-repeat flex-none ${icons[theme]} ${className}`} {...props} />
    );
}