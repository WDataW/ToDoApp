import {Page, EmailInput, PasswordInput, UsernameInput, ThemedAnchor, CheckboxInput, ErrorMessage, ThemedRectButton, KeyboardInput, WarningMessage } from "../..";
import { useTheme } from "../../../../context/Theme";
import { useState, useRef } from "react";
import { commonStyles } from "./commonStyles";
import { useValidation, validatePassword } from "./PasswordResetPages/PasswordValidation";

const [styles, lowAlphaBgColor] = commonStyles; 


export default function SignUpPage({children}){
    const agreeToTermsCheckbox = useRef(null)
    const [theme] = useTheme();
    const [passwordWarning, dispatch] = useValidation();
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [agreed, setAgreed] = useState(false);
    return(
        <Page className={styles["page"]}>
            <div className={`${styles["box"]} ${lowAlphaBgColor[theme]} ${theme}-outterShadow max-w-[30rem]`}> 
                <h2 className="text-center">
                    Sign Up
                </h2>
                <p className="text-center opacity-70 mb-[2rem]">*Creating new account*</p>
                <form action="">
                    <UsernameInput placeholder="Enter username" className="mb-[0.5rem]"/>
                    <EmailInput placeholder="Enter email"/>
                    <PasswordInput placeholder="Enter password" className="mb-[0.2rem]" value={password} handleChange={(e)=>{setPassword(e.target.value); validatePassword(e.target.value, dispatch);}}/>
                    <WarningMessage className="ml-[0.2rem] mb-[0.5rem]">{passwordWarning}</WarningMessage>
                    <PasswordInput placeholder="Re-enter password" className={"mb-[0.2rem]"} value={confirmedPassword} handleChange={(e)=>{setConfirmedPassword(e.target.value)}} label="Confirm password"/>
                    <WarningMessage className="ml-[0.2rem] mb-[0.5rem]">{password!==confirmedPassword && confirmedPassword?"Passwords don't match":""}</WarningMessage>
                    <div className="my-[0.5rem]">
                        <CheckboxInput ref={agreeToTermsCheckbox} checked={agreed} handleChange={(e)=>{setAgreed(!agreed)}} className="h-[1rem] w-[1rem] align-middle">I agree to the <ThemedAnchor>Terms of Service</ThemedAnchor> and <ThemedAnchor>Privacy Policy</ThemedAnchor></CheckboxInput>
                    </div>                    
                    <ThemedRectButton label={"Create Account"} disabled={!password || password!==confirmedPassword || passwordWarning!=="" || !agreed } />
                </form>
                <a href="" className="text-[0.8rem] opacity-50 ">Back to sign in</a>
            </div>
        </Page>
    );
}