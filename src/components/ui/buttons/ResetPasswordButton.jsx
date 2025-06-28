import ThemedRectButton from "./ThemedRectButton";
import { useTranslation } from "../../../context/Language";
export default function ResetPasswordButton({className, handleClick, disabled}){
    const t= useTranslation();
    return(<ThemedRectButton 
                label={t("titles.resetPassword")}
                type="submit"
                handleClick={handleClick} 
                className ={className}
                disabled={disabled}
            />
    );
}