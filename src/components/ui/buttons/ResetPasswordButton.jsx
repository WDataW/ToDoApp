import ThemedRectButton from "./ThemedRectButton";
import { useTranslation } from "../../../context/Language";
export default function ResetPasswordButton({ className, handleClick, disabled, ...props }) {
    const t = useTranslation();
    return (<ThemedRectButton
        type="submit"
        handleClick={handleClick}
        className={className}
        disabled={disabled}
        {...props}
    >
        {t("titles.resetPassword")}
    </ThemedRectButton>
    );
}