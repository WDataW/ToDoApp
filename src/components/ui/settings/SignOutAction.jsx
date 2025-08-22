import { useLang, useTranslation } from "@/context/Language";
import Setting from "./Setting";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { YesNoPopUp } from "../buttons";

export default function SignOutAction({ className = "", children, ...props }) {
    const [lang] = useLang();
    const iconModifier = lang == "ar" ? "-scale-x-100" : "";
    const setting = {
        title: "signout",
        icon: "signout",
        iconModifier: iconModifier,
        type: "criticalAction",
        position: "outer"

    }
    const selfRef = useRef();

    function singOut() {
        console.log("signed out");//to be handled later
        setConfirm(false);
    }
    const t = useTranslation();
    const [confirm, setConfirm] = useState(false);
    return (<>
        {confirm && createPortal(<YesNoPopUp yes={t("terms.signout")} yesFunc={singOut} noFunc={() => { setConfirm(false) }} no={t("terms.cancel")}>
            <h3 className="mb-[0.5rem]">{t("titles.signingOut")}</h3>
            <span >{t("terms.signoutConfirmation")}</span>
        </YesNoPopUp>, selfRef.current.closest(".page-target"))}
        <Setting ref={selfRef} onClick={() => setConfirm(true)} setting={setting} className={`${className}`} {...props}>
            {children}
        </Setting >
    </>
    );
}