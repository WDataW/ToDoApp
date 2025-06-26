import { Page, EmailInput, ResetPasswordButton, ThemedAnchor, PasswordInput, WarningMessage } from "../../..";
import { useTheme } from "../../../../../context/Theme";
import { commonStyles } from "../commonStyles";
import { useValidation, validatePassword } from "./PasswordValidation";
import { useState } from "react";
export default function SetNewPasswordPage(){  
    // styles
    const [theme] = useTheme();
    const [styles, lowAlphaBgColor] = commonStyles;

    // state
    const [passwordWarning, dispatch] = useValidation();
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
 
    return(
        <Page className={styles["page"]}>
            <div className={`${styles["box"]} ${lowAlphaBgColor[theme]} ${theme}-outterShadow max-w-[23.5rem]`}> 
                <h2 className="text-center ">Set New Password</h2>
                <p className="text-center opacity-70 mb-[2rem]">Don't forget this one :)</p>
                <form action="">
                    <PasswordInput className="mb-[0.2rem]" value={password} handleChange={(e)=>{setPassword(e.target.value); validatePassword(e.target.value, dispatch);}}/>
                    <WarningMessage className="ml-[0.2rem] mb-[0.5rem]">{passwordWarning}</WarningMessage>
                    <PasswordInput className={"mb-[0.2rem]"} value={confirmedPassword} handleChange={(e)=>{setConfirmedPassword(e.target.value)}} label="Confirm password" placeholder="Re-enter your password"/>
                    <WarningMessage className="ml-[0.2rem] mb-[0.5rem]">{password!==confirmedPassword && confirmedPassword?"Passwords don't match":""}</WarningMessage>

                    <ResetPasswordButton disabled={!password || password!==confirmedPassword || passwordWarning!==""}/>
                    <a href="" className="text-[0.8rem] opacity-50 ">Back to sign in</a>
                    <p className="text-[0.8rem] opacity-70 text-center mt-[0.75rem]">Don't have an account? <ThemedAnchor href="">Sign up</ThemedAnchor></p>
                    
                </form>
            </div>
        </Page>
    ); 

}