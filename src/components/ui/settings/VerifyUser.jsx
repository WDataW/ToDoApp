import { OverlayPage } from "@/Pages";
import { Main, PasswordInput, WarningMessage, YesNoButtons } from "..";
import { useTranslation } from "@/context/Language";
import { useState } from "react";
import { useTheme } from "@/context/Theme";
import { useValidation, validatePassword } from "@/Pages/auth/PasswordResetPages/PasswordValidation";
export default function VerifyUser({ customTheme, close, yesFunc, yes, no, className = "", children, ...props }) {
    const t = useTranslation();
    function confirm() {
        yesFunc();
    }
    const [theme] = useTheme();
    const [passwordWarning, dispatch] = useValidation();
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");


    return (
        <OverlayPage close={close} className={`${className}`} {...props}>
            <Main className="flex items-center flex-col ">
                <div className="max-w-full xs:w-[15rem] sm:w-[25rem]  ">
                    <div className="flex flex-col  gap-[0.5rem]">
                        <div>
                            <PasswordInput className="mb-[0.2rem]" value={password} handleChange={(e) => { setPassword(e.target.value); validatePassword(e.target.value, dispatch); }} />
                            <WarningMessage className="ms-[0.2rem] mb-[0.5rem]">{t(passwordWarning)}</WarningMessage>
                        </div>
                        <div>

                            <PasswordInput placeholder={t("fields.reEnterPassword")} className={"mb-[0.2rem]"} value={confirmedPassword} handleChange={(e) => { setConfirmedPassword(e.target.value) }} label={t("fields.confirmPassword")} />
                            <WarningMessage className="ms-[0.2rem] mb-[0.5rem]">
                                {password !== confirmedPassword && confirmedPassword ? t("warnings.passwordNotConfirmed") : ""}
                            </WarningMessage>
                        </div>
                    </div>
                    <YesNoButtons customTheme={customTheme} disabled={!password || password !== confirmedPassword || passwordWarning !== ""} className="justify-center flex mt-[1rem] text-[0.9rem]" yesFunc={confirm} yes={yes} noFunc={close} no={no} />
                </div>
            </Main>
        </OverlayPage>
    );
}