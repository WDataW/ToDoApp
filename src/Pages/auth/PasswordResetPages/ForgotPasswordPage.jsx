import { useState } from "react";
import { EmailInput, ResetPasswordButton, ThemedAnchor } from "../../../components/ui";
import Page from "../../Page";
import { useTheme } from "../../../context/Theme";
import { commonStyles } from "../commonStyles";
import { useTranslation } from "../../../context/Language";
import { useScreenWidth } from "@/context/ScreenSize";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { forgotPassword } from "@/scripts/requests";
export default function ForgotPasswordPage() {
    const [theme] = useTheme();
    const styles = commonStyles;
    const t = useTranslation();
    const [searchParams, _] = useSearchParams();
    const [email, setEmail] = useState(searchParams.get("email") || "");
    const w = useScreenWidth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await forgotPassword(email);
            if (response && response.status == 200) {
                navigate('/auth/email-sent')
            }
        } catch (error) {
            // 
        } finally {
            setLoading(false)
        }
    }
    return (
        <Page className={styles["page"]}>
            <div className={`frosted-glass p-[1.5rem] rounded-[0.5rem] md:text-white w-full  max-w-[23.5rem]`}>
                <form action="" onSubmit={handleSubmit}>
                    <h2 className="text-center ">{t("titles.forgotPassword")}</h2>
                    <p className="text-center opacity-70 mb-[2rem]">{t("terms.noWorriesWellSendYou")}</p>
                    <EmailInput value={email} customTheme={`auth${theme}`} customIcon={w >= 768 && "dark"} handleChange={(e) => {
                        setEmail(e.target.value);
                    }} />
                    <ResetPasswordButton loading={loading} disabled={!email} />
                    <Link to="/auth/sign-in" className="text-[0.8rem] opacity-50 ">{t("titles.signIn")}</Link>
                    <p className="text-[0.8rem] opacity-70 text-center mt-[0.75rem]">{t("terms.dontHaveAnAccount")} <ThemedAnchor to="/auth/sign-up">{t("titles.signUp")}</ThemedAnchor></p>

                </form>
            </div>
        </Page>
    );

}