import { EmailInput, ResetPasswordButton, ThemedAnchor, PasswordInput, WarningMessage } from "../../../components/ui";
import Page from "../../Page";
import { useTheme } from "../../../context/Theme";
import { commonStyles } from "../commonStyles";
import { useValidation, validatePassword } from "./PasswordValidation";
import { useState } from "react";
import { useTranslation } from "../../../context/Language";
import { useScreenWidth } from "@/context/ScreenSize";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "@/scripts/requests";
export default function SetNewPasswordPage() {
    // styles
    const [theme] = useTheme();
    const styles = commonStyles;
    const [searchParams, _] = useSearchParams();
    const [email] = useState(searchParams.get("email"));
    const [token] = useState(searchParams.get("token"));
    // state
    const [loading, setLoading] = useState(false);

    const [passwordWarning, dispatch] = useValidation();
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");

    const t = useTranslation();
    const w = useScreenWidth();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await resetPassword(email, token, password);
            if (response && response.status == 200) navigate(`/auth/sign-in?email=${email}`);
        } catch (error) {
            // 
        } finally {
            setLoading(false);
        }
    }
    return (
        <Page className={styles["page"]}>
            <div className={`frosted-glass p-[1.5rem] rounded-[0.5rem] md:text-white w-full  max-w-[23.5rem]`}>
                <h2 className="text-center ">{t("titles.setNewPassword")}</h2>
                <p className="text-center opacity-70 mb-[2rem]">{t("terms.useEnglishOnly")}</p>
                <form onSubmit={handleSubmit} action="">
                    <PasswordInput customTheme={`auth${theme}`} customIcon={w >= 768 && "dark"} placeholder={t("fields.enterPassword")} className="mb-[0.2rem]" value={password} handleChange={(e) => { setPassword(e.target.value); validatePassword(e.target.value, dispatch); }} />
                    <WarningMessage className="ms-[0.2rem] mb-[0.5rem]">{t(passwordWarning)}</WarningMessage>
                    <PasswordInput customTheme={`auth${theme}`} customIcon={w >= 768 && "dark"} className={"mb-[0.2rem]"} value={confirmedPassword} handleChange={(e) => { setConfirmedPassword(e.target.value) }} label={t("fields.confirmPassword")} placeholder={t("fields.reEnterPassword")} />
                    <WarningMessage className="ms-[0.2rem] mb-[0.5rem]">{password !== confirmedPassword && confirmedPassword ? t("warnings.passwordNotConfirmed") : ""}</WarningMessage>

                    <ResetPasswordButton loading={loading} disabled={!password || password !== confirmedPassword || passwordWarning !== ""} />
                    <Link to={"/auth/sign-in"}>
                        <a href={null} className="text-[0.8rem] opacity-50 ">{t("titles.signIn")}</a>
                    </Link>
                    <p className="text-[0.8rem] opacity-70 text-center mt-[0.75rem]">{t("terms.dontHaveAnAccount")} <ThemedAnchor href="">{t("titles.signUp")}</ThemedAnchor></p>

                </form>
            </div>
        </Page>
    );

}