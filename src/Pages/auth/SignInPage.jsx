import { EmailInput, PasswordInput, SignInButton, CheckboxInput, ThemedAnchor, ErrorMessage } from "../../components/ui";
import { useTheme } from "../../context/Theme";
import { useState } from "react";
import { commonStyles } from "./commonStyles";
import Page from "../Page";

import { useTranslation } from "../../context/Language";
import { useScreenWidth } from "@/context/ScreenSize";
import { appName } from "@/App";
import { Link } from "react-router-dom";
const styles = commonStyles;

export default function SignInPage({ children }) {
    const [theme] = useTheme();
    const [isValid, setIsValid] = useState(true);

    const t = useTranslation();
    function handleEmailChange(e) {
        setUserInfo({
            ...userInfo,
            email: e.target.value
        });
    }
    function handlePasswordChange(e) {
        setUserInfo({
            ...userInfo,
            password: e.target.value
        });
    }
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: ""
    })
    const w = useScreenWidth();
    return (
        <Page className={styles["page"]}>
            <div className={`frosted-glass p-[1.5rem] rounded-[0.5rem] md:text-white w-full max-w-[25rem] `}>
                <h1 className="leading-none">
                    {appName}
                </h1>
                <p className="text-center opacity-70 mb-[2rem]">*{t("titles.signIn")}*</p>

                <form action="">
                    <EmailInput customTheme={`auth${theme}`} customIcon={w >= 768 && "dark"} handleChange={handleEmailChange} />
                    <PasswordInput customTheme={`auth${theme}`} customIcon={w >= 768 && "dark"} handleChange={handlePasswordChange} />
                    {!isValid && <ErrorMessage className={'ps-[0.1rem]'}>{t("errors.invalidEmailPassword")}</ErrorMessage>}
                    <div className="mt-[0.5rem]">
                        <CheckboxInput className="h-[1rem] w-[1rem] align-middle">{t("fields.rememberMe")}</CheckboxInput>
                    </div>
                    <SignInButton customTheme={`auth${theme}`} customIcon={w >= 768 && "dark"} className="mt-[1.5rem] mb-[.1rem]" disabled={!userInfo["password"] || !userInfo["email"]} />
                </form>
                <Link to="/auth/forgot-password" href={null} className="text-[0.8rem] opacity-50 ">{t("titles.forgotPassword")}</Link>
                <p className="text-[0.8rem] opacity-70 text-center mt-[0.75rem]">{t("terms.dontHaveAnAccount")} <ThemedAnchor to="/auth/sign-up">{t("titles.signUp")}</ThemedAnchor></p>
                {children}
            </div>
        </Page>
    );
}