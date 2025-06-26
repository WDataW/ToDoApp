import {Page, EmailInput, PasswordInput, SignInButton, CheckboxInput, ThemedAnchor, ErrorMessage } from "../..";
import { useTheme } from "../../../../context/Theme";
import { useState } from "react";
import { commonStyles } from "./commonStyles";
const [styles, lowAlphaBgColor] = commonStyles; 
    
export default function SignInPage({children}){
    const [theme] = useTheme();
    const [isValid, setIsValid] = useState(true);
    return(
        <Page className={styles["page"]}>
            <div className={`${styles["box"]} ${lowAlphaBgColor[theme]} ${theme}-outterShadow max-w-[30rem]`}> 
                <h1 className="mb-[2rem]">
                    TODO
                </h1>
                <form action="">
                    <EmailInput/>
                    <PasswordInput/>
                    {!isValid && <ErrorMessage className={'pl-[0.1rem]'}>Invalid username or password</ErrorMessage>}
                    <div className="mt-[0.5rem]">
                        <CheckboxInput  className="h-[1rem] w-[1rem] align-middle">Remember me</CheckboxInput>
                    </div>
                    <SignInButton className="mt-[1.5rem] mb-[.1rem]"/>
                </form>
                <a href="" className="text-[0.8rem] opacity-50 ">Forgot Password?</a>
                <p className="text-[0.8rem] opacity-70 text-center mt-[0.75rem]">Don't have an account? <ThemedAnchor href="">Sign up</ThemedAnchor></p>
                {children}
            </div>
        </Page>
    );
}