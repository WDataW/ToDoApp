import {EmailInput, PasswordInput, SignInButton, CheckboxInput, ThemedAnchor, ErrorMessage } from "../../components/ui";
import { useTheme } from "../../context/Theme";
import { useState } from "react";
import { commonStyles } from "./commonStyles";
import Page from "../Page";

import { useTranslation } from "../../context/Language";
const [styles, lowAlphaBgColor] = commonStyles; 
    
export default function SignInPage({children}){
    const [theme] = useTheme();
    const [isValid, setIsValid] = useState(true);

    const t = useTranslation();
    function handleEmailChange(e){
        setUserInfo({
            ...userInfo,
            email: e.target.value
        });
    }
    function handlePasswordChange(e){
        setUserInfo({
            ...userInfo,
            password: e.target.value
        });
    }
    const [userInfo, setUserInfo] = useState({
                                        email:"",
                                        password:""
                                    })

    return(
        <Page className={styles["page"]}>
            <div className={`${styles["box"]} ${lowAlphaBgColor[theme]} ${theme}-outterShadow max-w-[30rem] `}> 
                <h1 className="leading-none">
                    TODO
                </h1>
                <p className="text-center opacity-70 mb-[2rem]">*{t("titles.signIn")}*</p>

                <form action="">
                    <EmailInput handleChange={handleEmailChange}/>
                    <PasswordInput handleChange={handlePasswordChange}/>
                    {!isValid && <ErrorMessage className={'ps-[0.1rem]'}>{t("errors.invalidEmailPassword")}</ErrorMessage>}
                    <div className="mt-[0.5rem]">
                        <CheckboxInput  className="h-[1rem] w-[1rem] align-middle">{t("fields.rememberMe")}</CheckboxInput>
                    </div>
                    <SignInButton className="mt-[1.5rem] mb-[.1rem]" disabled={!userInfo["password"] || !userInfo["email"]} />
                </form>
                <a href="" className="text-[0.8rem] opacity-50 ">{t("titles.forgotPassword")}</a>
                <p className="text-[0.8rem] opacity-70 text-center mt-[0.75rem]">{t("terms.dontHaveAnAccount")} <ThemedAnchor href="">{t("titles.signUp")}</ThemedAnchor></p>
                {children}
            </div>
        </Page>
    );
}