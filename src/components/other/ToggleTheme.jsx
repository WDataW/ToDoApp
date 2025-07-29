import { useTheme, useUpdateUserTheme } from "../../context/Theme";
export default function ToggleTheme() {
    const [theme, setTheme] = useTheme();
    const updateUserTheme = useUpdateUserTheme();
    return (
        <input type="checkbox" checked={theme == "dark"} className="fixed bottom-[5rem] left-[10rem] h-10 w-10 mt-4" onChange={() => {
            const newTheme = theme == "dark" ? "light" : "dark";
            setTheme(newTheme);
            updateUserTheme(newTheme);
        }} />
    );
}