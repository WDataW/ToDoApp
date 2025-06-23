import ThemedRectButton from "./ThemedRectButton";
export default function SignInButton({className}){
    return(<ThemedRectButton
                label={"Sign In"} 
                className={className}
            />
    );
}