import ThemedRectButton from "./ThemedRectButton";

export default function SignUpButton({className}){
    return(<ThemedRectButton 
                label={"Create New Account"} 
                className ={className}
            />
    );
}