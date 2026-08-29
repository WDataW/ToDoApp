import { EmailInput, PasswordInput, GuestModeButton, UsernameInput, ThemedAnchor, CheckboxInput, ErrorMessage, ThemedRectButton, WarningMessage } from "../../components/ui";
import Page from "../Page";
import { useTheme } from "../../context/Theme";
import { useState, useRef } from "react";
import { commonStyles } from "./commonStyles";
import { useValidation, validatePassword } from "./PasswordResetPages/PasswordValidation";
import { useTranslation } from "../../context/Language";
import { useScreenWidth } from "@/context/ScreenSize";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";
import { signUp } from "@/scripts/requests";
const styles = commonStyles;


export default function SignUpPage() {
    const w = useScreenWidth();
    const agreeToTermsCheckbox = useRef(null)
    const [theme] = useTheme();
    const [passwordWarning, dispatch] = useValidation();
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [fullname, setFullname] = useState('');
    const [agreed, setAgreed] = useState(false);
    const t = useTranslation();
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const createNewAccount = async (e) => {
        e.preventDefault();
        const response = await signUp({ email, password, fullname });
        if (response.status !== 201) throw new Error('Error couldn\'t register');
        navigate(`/auth/verify-email?email=${email}`);
    }
    return (
        <Page className={styles["page"]}>
            <div className={`frosted-glass p-[1.5rem] rounded-[0.5rem] md:text-white w-full  max-w-[25rem]`}>
                <h2 className="text-center">
                    {t("titles.signUp")}
                </h2>
                <form action="">
                    <UsernameInput required={true} handleChange={(e) => setFullname(e.target.value)} value={fullname} customTheme={`auth${theme}`} customIcon={w >= 768 && "dark"} placeholder={t("fields.enterUsername")} className="mb-[0.5rem]" />
                    <EmailInput required={true} handleChange={(e) => setEmail(e.target.value)} value={email} customTheme={`auth${theme}`} customIcon={w >= 768 && "dark"} />
                    <WarningMessage className="ms-[0.2rem] mb-[0.5rem]">{email !== '' && !validator.isEmail(email) && t("errors.invalidEmail")}</WarningMessage>
                    <PasswordInput required={true} customTheme={`auth${theme}`} customIcon={w >= 768 && "dark"} className="mb-[0.2rem]" value={password} handleChange={(e) => { setPassword(e.target.value); validatePassword(e.target.value, dispatch); }} />
                    <WarningMessage className="ms-[0.2rem] mb-[0.5rem]">{t(passwordWarning)}</WarningMessage>
                    <PasswordInput required={true} customTheme={`auth${theme}`} customIcon={w >= 768 && "dark"} placeholder={t("fields.reEnterPassword")} className={"mb-[0.2rem]"} value={confirmedPassword} handleChange={(e) => { setConfirmedPassword(e.target.value) }} label={t("fields.confirmPassword")} />
                    <WarningMessage className="ms-[0.2rem] mb-[0.5rem]">
                        {password !== confirmedPassword && confirmedPassword ? t("warnings.passwordNotConfirmed") : ""}
                    </WarningMessage>
                    <div className="my-[0.5rem]">
                        <CheckboxInput ref={agreeToTermsCheckbox} checked={agreed} handleChange={(e) => { setAgreed(!agreed) }} className="h-[1rem] w-[1rem] align-middle">
                            {t("terms.iAgree")} <ThemedAnchor>{t("terms.ToS")}</ThemedAnchor> {t("terms.and")} <ThemedAnchor>{t("terms.PP")}</ThemedAnchor>
                        </CheckboxInput>
                    </div>
                    <ThemedRectButton handleClick={createNewAccount} disabled={fullname == "" || !validator.isEmail(email) || !password || password !== confirmedPassword || passwordWarning !== "" || !agreed} >{t("titles.createAccount")}</ThemedRectButton>
                </form>
                {/* <Link to="/app/home">
                    <GuestModeButton customTheme={`auth${theme}`} customIcon={w >= 768 && "dark"} className="mt-[0.5rem] mb-[.1rem]" />
                </Link> */}
                <Link to="/auth/sign-in" className="text-[0.8rem] opacity-50 ">{t("titles.signIn")}</Link>
            </div>
        </Page>
    );
}