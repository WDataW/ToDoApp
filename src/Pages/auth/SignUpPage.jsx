import { EmailInput, PasswordInput, UsernameInput, ThemedAnchor, CheckboxInput, ErrorMessage, ThemedRectButton, KeyboardInput, WarningMessage } from "../../components/ui";
import Page from "../Page";
import { useTheme } from "../../context/Theme";
import { useState, useRef } from "react";
import { commonStyles } from "./commonStyles";
import { useValidation, validatePassword } from "./PasswordResetPages/PasswordValidation";
import { useTranslation } from "../../context/Language";
const [styles, lowAlphaBgColor] = commonStyles; 


export default function SignUpPage({children}){
    const agreeToTermsCheckbox = useRef(null)
    const [theme] = useTheme();
    const [passwordWarning, dispatch] = useValidation();
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [agreed, setAgreed] = useState(false);
    const t = useTranslation();
    
    return(
        <Page className={styles["page"]}>
            <div className={`${styles["box"]} ${lowAlphaBgColor[theme]} ${theme}-outterShadow max-w-[30rem]`}> 
                <h2 className="text-center">
                    {t("titles.signUp")}
                </h2>
                <form action="">
                    <UsernameInput placeholder={t("fields.enterUsername")} className="mb-[0.5rem]"/>
                    <EmailInput />
                    <PasswordInput  className="mb-[0.2rem]" value={password} handleChange={(e)=>{setPassword(e.target.value); validatePassword(e.target.value, dispatch);}}/>
                    <WarningMessage className="ms-[0.2rem] mb-[0.5rem]">{t(passwordWarning)}</WarningMessage>
                    <PasswordInput placeholder={t("fields.reEnterPassword")} className={"mb-[0.2rem]"} value={confirmedPassword} handleChange={(e)=>{setConfirmedPassword(e.target.value)}} label={t("fields.confirmPassword")}/>
                    <WarningMessage className="ms-[0.2rem] mb-[0.5rem]">
                        {password!==confirmedPassword && confirmedPassword?t("warnings.passwordNotConfirmed"):""}
                    </WarningMessage>
                    <div className="my-[0.5rem]">
                        <CheckboxInput ref={agreeToTermsCheckbox} checked={agreed} handleChange={(e)=>{setAgreed(!agreed)}} className="h-[1rem] w-[1rem] align-middle">
                            {t("terms.iAgree")} <ThemedAnchor>{t("terms.ToS")}</ThemedAnchor> {t("terms.and")} <ThemedAnchor>{t("terms.PP")}</ThemedAnchor>
                        </CheckboxInput>
                    </div>                    
                    <ThemedRectButton disabled={!password || password!==confirmedPassword || passwordWarning!=="" || !agreed } >{t("titles.createAccount")}</ThemedRectButton>
                </form>
                <a href="" className="text-[0.8rem] opacity-50 ">{t("titles.signIn")}</a>
            </div>
        </Page>
    );
}