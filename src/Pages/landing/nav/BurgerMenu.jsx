import { useTheme } from "@/context/Theme";
import { hidePageContents, showPageContents } from "@/Pages/pages";
import { useEffect, useRef } from "react";
const icons = {
    dark: "bg-[url(/src/assets/icons/dark/burgerMenu.svg)]",
    light: "bg-[url(/src/assets/icons/light/burgerMenu.svg)]"
}

const activeIcons = {
    dark: "bg-[url(/src/assets/icons/dark/x.svg)]",
    light: "bg-[url(/src/assets/icons/light/x.svg)]"

}
export default function BurgerMenu({ value, setValue, className = "", children, ...props }) {
    const [theme] = useTheme();
    const selfRef = useRef();
    function handleBurgerClick() {
        if (!value) hidePageContents();
        if (value) showPageContents();
        setValue(!value);
    }
    useEffect(() => {
        return () => {
            setValue(false);
            showPageContents();
        }
    }, []);
    return (
        <button onClick={handleBurgerClick} ref={selfRef} className={`${value ? activeIcons[theme] : icons[theme]} opacity-80  bg-cover bg-no-repeat bg-center h-[1.5rem] w-[1.5rem]`}></button>
    );
}