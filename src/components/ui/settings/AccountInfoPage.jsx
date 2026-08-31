import { OverlayPage } from "@/Pages";
import { Main, YesNoButtons } from "..";
import UserInit from "./UserInit";
import { useInfo } from "@/context/User";
import { useRef, useState } from "react";
import { updateName } from "@/scripts/requests";
export default function AccountInfoPage({ close, yes, no, className = "", children, ...props }) {
    async function save() {
        const user = await updateName(name);
        setInfo((i) => ({ ...i, name: user.fullname }));
        close();
    }
    const [info, setInfo] = useInfo();
    const selfRef = useRef();
    const [name, setName] = useState(info.name);
    return (<>
        {/* {verifyMode && createPortal(<VerifyUser heading={t("terms.editAccount")} yes={t("terms.confirm")} yesFunc={endEdit} no={t("terms.back")} close={stopVerifyMode} overAnOverlay={true} ></VerifyUser>, selfRef.current.closest(".overlay-target"))} */}
        <OverlayPage close={close} className={`${className}`} {...props}>
            <Main ref={selfRef} className="flex items-center flex-col ">
                <div className="max-w-full xs:w-[15rem] sm:w-[25rem]  ">
                    <UserInit info={info} name={name} setName={setName} ></UserInit>
                    <YesNoButtons className="justify-center flex mt-[1rem] text-[0.9rem]" yesFunc={save} yes={yes} noFunc={close} no={no} />
                </div>
            </Main>
        </OverlayPage>
    </>
    );
}