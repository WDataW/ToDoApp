import { useTranslation } from "../../../context/Language";
import KeyboardInput from "./KeyboardInput";
export default function PasswordInput({ handleChange, label, className, placeholder, value, ...props }) {
    const t = useTranslation();
    return (
        <KeyboardInput
            type="password"
            label={label || t("fields.password")}
            placeholder={placeholder || t("fields.enterPassword")}
            handleChange={handleChange}
            lightIcon="/src/assets/icons/light/key.svg"
            darkIcon="/src/assets/icons/dark/key.svg"
            alt="Door Key Icon"
            className={className}
            required={true}
            value={value}
            {...props}
        />
    );
}