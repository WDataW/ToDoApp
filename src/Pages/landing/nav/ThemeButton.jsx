import { useTranslation } from "@/context/Language";
import SettingButton from "./SettingButton";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FloatingContainer, SelectButtons } from "@/components/ui";
import { useTheme } from "@/context/Theme";

let popUp;
export default function ThemeButton({ isInBurger, className = "", yOffset = -2.8, children, ...props }) {
    const t = useTranslation();
    const [show, setShow] = useState(false)
    const selfRef = useRef();
    const [theme, setTheme] = useTheme();
    const [localTheme, setLocalTheme] = useState(theme);

    function updateTheme(newTheme) {
        setLocalTheme(newTheme);
        setTheme(newTheme);
    }

    function hideContainer() {
        rememberFocus();
        setShow(false);
    }
    function rememberFocus() {
        selfRef.current.focus();
    }
    function handleClick(e) {
        const position = selfRef.current.getBoundingClientRect();
        const rem = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("font-size"));
        popUp = <FloatingContainer aria-label="Press Escape to close." lastFocused={e.target} style={{ position: "fixed", top: position.top - yOffset * rem, left: position.left - 2 * rem }} hide={hideContainer} className={` text-[1rem] flex flex-col justify-center    `} >
            <SelectButtons customZIndex={true} className={`w-[8rem]`} value={localTheme} setValue={updateTheme} options={["light", "dark"]}></SelectButtons>
        </FloatingContainer>;
        setShow(!show);
    }
    function handleBurgerClick(e) {
        setShow(!show);
    }
    if (!isInBurger) {
        return (
            <>
                {show && createPortal(popUp, document.querySelector(".page-target"))}
                <SettingButton label={t("terms.theme")} ref={selfRef} active={show} onClick={handleClick} className={`${className}`} {...props}>

                </SettingButton>

            </>
        );
    }
    else if (isInBurger) {
        return (
            <>
                <SettingButton ref={selfRef} label={t("terms.theme")} active={show} onClick={handleBurgerClick} className={` ${className}`} {...props}>
                    <SelectButtons customZIndex={true} className={`mt-[0.1rem] w-[10rem] text-[1rem]`} value={localTheme} setValue={updateTheme} options={["light", "dark"]}></SelectButtons>
                </SettingButton>

            </>
        );
    }
}