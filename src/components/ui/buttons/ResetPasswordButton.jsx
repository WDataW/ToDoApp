import ThemedRectButton from "./ThemedRectButton";

export default function ResetPasswordButton({className, handleClick, disabled}){
    return(<ThemedRectButton 
                label={"Reset Password"}
                type="submit"
                handleClick={handleClick} 
                className ={className}
                disabled={disabled}
            />
    );
}