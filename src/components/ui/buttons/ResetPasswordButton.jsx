import ThemedRectButton from "./ThemedRectButton";
import { useTranslation } from "../../../context/Language";
export default function ResetPasswordButton({className, handleClick, disabled}){
    const t= useTranslation();
    return(<ThemedRectButton 
                type="submit"
                handleClick={handleClick} 
                className ={className}
                disabled={disabled}
            >
                {t("titles.resetPassword")}
            </ThemedRectButton>
    );
}