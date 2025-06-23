import {Page, UsernameInput, PasswordInput, SignInButton, CheckboxInput, ThemedAnchor } from "..";
export default function SignInPage({children}){
    return(
        <Page className="pt-[8rem]"> 
            <h1 className="mb-20">
                TODO
            </h1>
            <UsernameInput/>
            <PasswordInput/>
            <div className="mt-[0.5rem]">
                <CheckboxInput className="h-[1rem] w-[1rem] align-middle"/>
                <span className="opacity-50 text-[0.8rem] align-middle ml-[0.3rem]">Remember Me</span>
            </div>
            <SignInButton className="mt-[1.5rem] mb-[.1rem]"/>
            <a href="" className="text-[0.8rem] opacity-50 ">Forgot Password?</a>
            <p className="text-[0.8rem] opacity-70 text-center mt-[0.75rem]">Don't have an account? <ThemedAnchor href="">Sign Up</ThemedAnchor></p>
            {children}
        </Page>
    );
}