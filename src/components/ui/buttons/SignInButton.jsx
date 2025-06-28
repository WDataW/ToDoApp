import { useTranslation } from "../../../context/Language";
import ThemedRectButton from "./ThemedRectButton";
export default function SignInButton({className, handleClick, disabled}){
    const t = useTranslation();
    return(<ThemedRectButton
                label={t("titles.signIn")}
                type="submit" 
                handleClick={handleClick}
                className={className}
                disabled={disabled}
            />
    );
}