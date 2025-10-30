import { useState } from "react";
import { EmailInput, ResetPasswordButton, ThemedAnchor } from "../../../components/ui";
import Page from "../../Page";
import { useTheme } from "../../../context/Theme";
import { commonStyles } from "../commonStyles";
import { useTranslation } from "../../../context/Language";
import { useScreenWidth } from "@/context/ScreenSize";
import { Link } from "react-router-dom";
export default function ForgotPasswordPage() {
    const [theme] = useTheme();
    const styles = commonStyles;
    const t = useTranslation();
    const [email, setEmail] = useState("");
    const w = useScreenWidth();
    return (
        <Page className={styles["page"]}>
            <div className={`frosted-glass p-[1.5rem] rounded-[0.5rem] md:text-white w-full  max-w-[23.5rem]`}>
                <form action="">
                    <h2 className="text-center ">{t("titles.forgotPassword")}</h2>
                    <p className="text-center opacity-70 mb-[2rem]">{t("terms.noWorriesWellSendYou")}</p>
                    <EmailInput customTheme={`auth${theme}`} customIcon={w >= 768 && "dark"} handleChange={(e) => {
                        setEmail(e.target.value);
                    }} />
                    <Link to={"/auth/verification-code"}>
                        <ResetPasswordButton customTheme={`auth${theme}`} customIcon={w >= 768 && "dark"} disabled={!email} />
                    </Link>
                    <Link to="/auth/sign-in" className="text-[0.8rem] opacity-50 ">{t("titles.signIn")}</Link>
                    <p className="text-[0.8rem] opacity-70 text-center mt-[0.75rem]">{t("terms.dontHaveAnAccount")} <ThemedAnchor to="/auth/sign-up">{t("titles.signUp")}</ThemedAnchor></p>

                </form>
            </div>
        </Page>
    );

}