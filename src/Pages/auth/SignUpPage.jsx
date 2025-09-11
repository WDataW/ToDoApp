import { EmailInput, PasswordInput, UsernameInput, ThemedAnchor, CheckboxInput, ErrorMessage, ThemedRectButton, WarningMessage } from "../../components/ui";
import Page from "../Page";
import { useTheme } from "../../context/Theme";
import { useState, useRef } from "react";
import { commonStyles } from "./commonStyles";
import { useValidation, validatePassword } from "./PasswordResetPages/PasswordValidation";
import { useTranslation } from "../../context/Language";
import { useScreenWidth } from "@/context/ScreenSize";
import { Link } from "react-router-dom";
const styles = commonStyles;


export default function SignUpPage({ children }) {
    const w = useScreenWidth();
    const agreeToTermsCheckbox = useRef(null)
    const [theme] = useTheme();
    const [passwordWarning, dispatch] = useValidation();
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [agreed, setAgreed] = useState(false);
    const t = useTranslation();

    return (
        <Page className={styles["page"]}>
            <div className={`frosted-glass p-[1.5rem] rounded-[0.5rem] md:text-white w-full  max-w-[25rem]`}>
                <h2 className="text-center">
                    {t("titles.signUp")}
                </h2>
                <form action="">

                    <UsernameInput customTheme={`auth${theme}`} customIcon={w >= 768 && "dark"} placeholder={t("fields.enterUsername")} className="mb-[0.5rem]" />
                    <EmailInput customTheme={`auth${theme}`} customIcon={w >= 768 && "dark"} />
                    <PasswordInput customTheme={`auth${theme}`} customIcon={w >= 768 && "dark"} className="mb-[0.2rem]" value={password} handleChange={(e) => { setPassword(e.target.value); validatePassword(e.target.value, dispatch); }} />
                    <WarningMessage className="ms-[0.2rem] mb-[0.5rem]">{t(passwordWarning)}</WarningMessage>
                    <PasswordInput customTheme={`auth${theme}`} customIcon={w >= 768 && "dark"} placeholder={t("fields.reEnterPassword")} className={"mb-[0.2rem]"} value={confirmedPassword} handleChange={(e) => { setConfirmedPassword(e.target.value) }} label={t("fields.confirmPassword")} />
                    <WarningMessage className="ms-[0.2rem] mb-[0.5rem]">
                        {password !== confirmedPassword && confirmedPassword ? t("warnings.passwordNotConfirmed") : ""}
                    </WarningMessage>
                    <div className="my-[0.5rem]">
                        <CheckboxInput ref={agreeToTermsCheckbox} checked={agreed} handleChange={(e) => { setAgreed(!agreed) }} className="h-[1rem] w-[1rem] align-middle">
                            {t("terms.iAgree")} <ThemedAnchor>{t("terms.ToS")}</ThemedAnchor> {t("terms.and")} <ThemedAnchor>{t("terms.PP")}</ThemedAnchor>
                        </CheckboxInput>
                    </div>
                    <ThemedRectButton disabled={!password || password !== confirmedPassword || passwordWarning !== "" || !agreed} >{t("titles.createAccount")}</ThemedRectButton>
                </form>
                <Link to="/auth/sign-in" className="text-[0.8rem] opacity-50 ">{t("titles.signIn")}</Link>
            </div>
        </Page>
    );
}