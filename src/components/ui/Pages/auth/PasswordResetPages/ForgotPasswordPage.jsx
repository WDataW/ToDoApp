import { Page, EmailInput, ResetPasswordButton, ThemedAnchor } from "../../..";
import { useTheme } from "../../../../../context/Theme";
import { commonStyles } from "../commonStyles";
export default function ForgotPasswordPage(){  
    const [theme] = useTheme();
    const [styles, lowAlphaBgColor] = commonStyles;
    return(
        <Page className={styles["page"]}>
            <div className={`${styles["box"]} ${lowAlphaBgColor[theme]} ${theme}-outterShadow max-w-[23.5rem]`}> 
                <form action="">
                    <h2 className="text-center ">Forgot Password?</h2>
                    <p className="text-center opacity-70 mb-[2rem]">No worries we'll send you reset instrcutions</p>
                    <EmailInput />
                    <ResetPasswordButton/>
                    <a href="" className="text-[0.8rem] opacity-50 ">Back to sign in</a>
                    <p className="text-[0.8rem] opacity-70 text-center mt-[0.75rem]">Don't have an account? <ThemedAnchor href="">Sign up</ThemedAnchor></p>
                    
                </form>
            </div>
        </Page>
    ); 

}