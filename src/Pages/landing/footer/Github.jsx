import { useTheme } from "@/context/Theme";

const icons = {
    light: "bg-[url(/src/assets/icons/light/github.png)]", dark: "bg-[url(/src/assets/icons/dark/github.png)]"
}
export default function Github({ className = "", children, ...props }) {
    const [theme] = useTheme();
    return (
        <a href="https://github.com/WDataW/ToDoApp" target="_blank" className={`${className} ${icons[theme]} bg-center bg-cover`} {...props} />

    );
}