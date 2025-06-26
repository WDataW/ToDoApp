import ThemedRectButton from "./ThemedRectButton";

export default function SignUpButton({className, handleClick}){
    return(<ThemedRectButton 
                label={"Create New Account"}
                type="submit" 
                handleClick={handleClick}
                className ={className}
            />
    );
}