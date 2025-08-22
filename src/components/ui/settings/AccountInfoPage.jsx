import { OverlayPage } from "@/Pages";
import { Main, YesNoButtons } from "..";
import { useTranslation } from "@/context/Language";
import UserInit from "./UserInit";
import { useInfo } from "@/context/User";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import VerifyUser from "./VerifyUser";
import { hidePageContents, showPageContents } from "@/Pages/pages";
export default function AccountInfoPage({ close, yes, no, className = "", children, ...props }) {
    const t = useTranslation();
    function save() {

        // close();
    }
    const [info, setInfo] = useInfo();
    const [newInfo, setNewInfo] = useState(info);
    const selfRef = useRef();
    const [verifyMode, setVerifyMode] = useState(false);
    function startVerifyMode() {
        hidePageContents(selfRef.current, true)
        setVerifyMode(true);
    }
    function stopVerifyMode() {
        showPageContents(selfRef.current, true)
        setVerifyMode(false);
    }
    function endEdit() {
        setVerifyMode(false);
        setInfo(newInfo);
        close();
    }
    return (<>
        {verifyMode && createPortal(<VerifyUser heading={t("terms.editAccount")} yes={t("terms.confirm")} yesFunc={endEdit} no={t("terms.cancel")} close={stopVerifyMode} overAnOverlay={true} ></VerifyUser>, selfRef.current.closest(".overlay-target"))}
        <OverlayPage close={close} className={`${className}`} {...props}>
            <Main ref={selfRef} className="flex items-center flex-col ">
                <div className="max-w-full xs:w-[15rem] sm:w-[25rem]  ">
                    <UserInit info={newInfo} setInfo={setNewInfo}></UserInit>
                    <YesNoButtons className="justify-center flex mt-[1rem] text-[0.9rem]" yesFunc={startVerifyMode} yes={yes} noFunc={close} no={no} />
                </div>
            </Main>
        </OverlayPage>
    </>
    );
}