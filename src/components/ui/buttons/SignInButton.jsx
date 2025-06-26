import ThemedRectButton from "./ThemedRectButton";
export default function SignInButton({className, handleClick}){
    return(<ThemedRectButton
                label={"Sign In"}
                type="submit" 
                handleClick={handleClick}
                className={className}
            />
    );
}