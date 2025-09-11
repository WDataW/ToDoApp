import { useRef, useState } from "react";
import Setting from "./Setting";
import { getFinalHeight } from "./settings";
import AccountInfoPage from "./AccountInfoPage";
import { createPortal } from "react-dom";
import { useTranslation } from "@/context/Language";
import { hidePageContents, showPageContents } from "@/Pages/pages";
import VerifyUser from "./VerifyUser";

export default function AccountSettings({ className = "", children, ...props }) {
    const setting = {
        title: "account",
        icon: "profile",
        type: "expand",

    }
    const t = useTranslation();
    const expandRef = useRef();
    const innerSettings = [
        {
            title: "editAccount",
            icon: "edit",
            type: "action",

        },
        {
            title: "deleteAccount",
            icon: "trash",
            type: "criticalAction",
            position: "inner"
        }
    ]
    const selfRef = useRef();
    const [editInfoMode, setEditInfoMode] = useState(false);
    const [deleteAccountMode, setDeleteAccountMode] = useState(false);
    function showEditInfo() {
        hidePageContents(selfRef.current)
        setEditInfoMode(true);
    }
    function hideEditInfo() {
        showPageContents(selfRef.current)
        setEditInfoMode(false);
    }
    function showDeleteAccount() {
        hidePageContents(selfRef.current)
        setDeleteAccountMode(true);
    }
    function hideDeleteAccount() {
        showPageContents(selfRef.current)
        setDeleteAccountMode(false);
    }
    function deleteAccount() {
        console.log("Account deleted");// to be handled later
        hideDeleteAccount();
    }
    return (<>

        {deleteAccountMode && createPortal(<VerifyUser yesFunc={deleteAccount} customTheme={"danger"} heading={t("terms.deleteAccount")} yes={t("titles.delete")} no={t("terms.cancel")} close={hideDeleteAccount} />, selfRef.current.closest(".page-target"))}
        {editInfoMode && createPortal(<AccountInfoPage heading={t("terms.editAccount")} yes={t("terms.continue")} no={t("terms.cancel")} close={hideEditInfo}></AccountInfoPage>, selfRef.current.closest(".page-target"))}
        <Setting ref={selfRef} setting={setting} expandHeight={() => getFinalHeight(expandRef.current)} className={`${className}`} {...props}>
            <ul className="sm:ms-[1.8rem] flex flex-col gap-[0.7rem] sm:me-[1.8rem]" ref={expandRef}>
                {innerSettings.map((s, i) => <li key={i}> <Setting onClick={s.title == "editAccount" ? showEditInfo : showDeleteAccount} setting={s}></Setting></li>)}
            </ul>
        </Setting>
    </>
    );
}