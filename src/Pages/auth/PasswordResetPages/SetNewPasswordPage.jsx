import {  EmailInput, ResetPasswordButton, ThemedAnchor, PasswordInput, WarningMessage } from "../../../components/ui";
import Page from "../../Page";
import { useTheme } from "../../../context/Theme";
import { commonStyles } from "../commonStyles";
import { useValidation, validatePassword } from "./PasswordValidation";
import { useState } from "react";
import { useTranslation } from "../../../context/Language";
export default function SetNewPasswordPage(){  
    // styles
    const [theme] = useTheme();
    const [styles, lowAlphaBgColor] = commonStyles;

    // state
    const [passwordWarning, dispatch] = useValidation();
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
 
    const t= useTranslation();
    return(
        <Page className={styles["page"]}>
            <div className={`${styles["box"]} ${lowAlphaBgColor[theme]} ${theme}-outterShadow max-w-[23.5rem]`}> 
                <h2 className="text-center ">{t("titles.setNewPassword")}</h2>
                <p className="text-center opacity-70 mb-[2rem]">{t("terms.useEnglishOnly")}</p>
                <form action="">
                    <PasswordInput className="mb-[0.2rem]" value={password} handleChange={(e)=>{setPassword(e.target.value); validatePassword(e.target.value, dispatch);}}/>
                    <WarningMessage className="ms-[0.2rem] mb-[0.5rem]">{t(passwordWarning)}</WarningMessage>
                    <PasswordInput className={"mb-[0.2rem]"} value={confirmedPassword} handleChange={(e)=>{setConfirmedPassword(e.target.value)}} label={t("fields.confirmPassword")} placeholder={t("fields.reEnterPassword")}/>
                    <WarningMessage className="ms-[0.2rem] mb-[0.5rem]">{password!==confirmedPassword && confirmedPassword?t("warnings.passwordNotConfirmed"):""}</WarningMessage>

                    <ResetPasswordButton disabled={!password || password!==confirmedPassword || passwordWarning!==""}/>
                    <a href="" className="text-[0.8rem] opacity-50 ">{t("titles.signIn")}</a>
                    <p className="text-[0.8rem] opacity-70 text-center mt-[0.75rem]">{t("terms.dontHaveAnAccount")} <ThemedAnchor href="">{t("titles.signUp")}</ThemedAnchor></p>
                    
                </form>
            </div>
        </Page>
    ); 

}