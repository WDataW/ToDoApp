import { useTranslation } from "../../../context/Language";
import ThemedRectButton from "./ThemedRectButton";
export default function SignInButton({ className, handleClick, disabled, ...props }) {
    const t = useTranslation();
    console.log(props);
    return (<ThemedRectButton
        type="submit"
        handleClick={handleClick}
        className={className}
        disabled={disabled}
        {...props}
    >
        {t("titles.signIn")}
    </ThemedRectButton>
    );
}