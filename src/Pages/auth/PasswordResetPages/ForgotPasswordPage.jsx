import { useState } from "react";
import { EmailInput, ResetPasswordButton, ThemedAnchor } from "../../../components/ui";
import Page from "../../Page";
import { useTheme } from "../../../context/Theme";
import { commonStyles } from "../commonStyles";
import { useTranslation } from "../../../context/Language";
export default function ForgotPasswordPage(){  
    const [theme] = useTheme();
    const [styles, lowAlphaBgColor] = commonStyles;
    const t = useTranslation();
    const [email, setEmail] = useState("");
    return(
        <Page className={styles["page"]}>
            <div className={`${styles["box"]} ${lowAlphaBgColor[theme]} ${theme}-outterShadow max-w-[23.5rem]`}> 
                <form action="">
                    <h2 className="text-center ">{t("titles.forgotPassword")}</h2>
                    <p className="text-center opacity-70 mb-[2rem]">{t("terms.noWorriesWellSendYou")}</p>
                    <EmailInput handleChange={(e)=>{
                        setEmail(e.target.value);   
                    }} />
                    <ResetPasswordButton disabled={!email} />
                    <a href="" className="text-[0.8rem] opacity-50 ">{t("titles.signIn")}</a>
                    <p className="text-[0.8rem] opacity-70 text-center mt-[0.75rem]">{t("terms.dontHaveAnAccount")} <ThemedAnchor href="">{t("titles.signUp")}</ThemedAnchor></p>
                    
                </form>
            </div>
        </Page>
    ); 

}