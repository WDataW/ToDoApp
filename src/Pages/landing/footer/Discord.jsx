import { useTheme } from "@/context/Theme";

const icons = {
    light: "bg-[url(/src/assets/icons/light/discord.svg)]", dark: "bg-[url(/src/assets/icons/dark/discord.svg)]"
}
export default function Discord({ className = "", children, ...props }) {
    const [theme] = useTheme();
    return (
        <a href="https://discord.com/users/1157778239331250216" target="_blank" className={`${className} ${icons[theme]} bg-center bg-cover bg-no-repeat`} {...props} />

    );
}