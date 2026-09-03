import { updateLang, useLang, useTranslation } from "@/context/Language";
import SettingButton from "./SettingButton";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FloatingContainer, SelectButtons } from "@/components/ui";
import { useInbox } from "@/context/User";
import { getInbox } from "@/scripts/requests";
import { sortInbox } from "@/components/ui/inbox/mail";

let popUp;
export default function LanguageButton({ isInBurger, className = "", yOffset = -2.8, children, ...props }) {
    const t = useTranslation();
    const [show, setShow] = useState(false)
    const selfRef = useRef();
    const [lang, setLang] = useLang();
    const [localLang, setLocalLang] = useState(lang);
    const [inbox, setInbox] = useInbox();
    async function updateLanguage(newLang) {
        updateLang(newLang)
        setLocalLang(newLang);
        window.localStorage.setItem("lang", newLang);
        setLang(newLang);
        const newInbox = await getInbox();
        setInbox(sortInbox(newInbox));
        hideContainer();
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
        const xOffset = lang == "ar" ? 2 : 2;
        const rem = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("font-size"));
        popUp = <FloatingContainer aria-label="Press Escape to close." lastFocused={e.target} style={{ position: "fixed", top: position.top - yOffset * rem, left: position.left - xOffset * rem }} hide={hideContainer} className={` text-[1rem] flex flex-col justify-center    `} >
            <SelectButtons customZIndex={true} className={`w-[9rem]`} value={localLang} setValue={updateLanguage} options={["en", "ar"]}></SelectButtons>
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
                <SettingButton label={t("terms.language")} ref={selfRef} active={show} onClick={handleClick} className={`${className}`} {...props} />
            </>
        );
    }
    else if (isInBurger) {
        return (
            <>
                <SettingButton ref={selfRef} label={t("terms.language")} active={show} onClick={handleBurgerClick} className={` ${className}`} {...props}>
                    <SelectButtons customZIndex={true} className={`mt-[0.1rem] w-[10rem] text-[1rem]`} value={localLang} setValue={updateLanguage} options={["en", "ar"]}></SelectButtons>
                </SettingButton>
            </>
        );
    }
}