import {Page, UsernameInput, PasswordInput, SignInButton, CheckboxInput, ThemedAnchor } from "..";
import { useTheme, bgColors } from "../../../context/Theme";
const lowAlphaBgColor = {
    dark: "bg-[#0c0c0cc9]",
    light: "bg-[#F7F8F8C9]"
}
export default function SignInPage({children}){
    const [theme] = useTheme();
    
    return(
        <Page className="pt-[4rem] flex flex-col items-center md:bg-[url(/public/images/desk.jpg)] bg-cover bg-center">
            <div className={`w-full max-w-[30rem] ${lowAlphaBgColor [theme]} p-[2rem] rounded-[1rem] ${theme}-outterShadow`}> 
                <h1 className="mb-20">
                    TODO
                </h1>
                <form action="">
                    <UsernameInput/>
                    <PasswordInput/>
                    <div className="mt-[0.5rem]">
                        <CheckboxInput className="h-[1rem] w-[1rem] align-middle"/>
                        <span className="opacity-50 text-[0.8rem] align-middle ml-[0.3rem]">Remember Me</span>
                    </div>
                    <SignInButton className="mt-[1.5rem] mb-[.1rem]"/>
                </form>
                <a href="" className="text-[0.8rem] opacity-50 ">Forgot Password?</a>
                <p className="text-[0.8rem] opacity-70 text-center mt-[0.75rem]">Don't have an account? <ThemedAnchor href="">Sign Up</ThemedAnchor></p>
                {children}
            </div>
        </Page>
    );
}