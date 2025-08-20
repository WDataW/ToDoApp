import { useTranslation } from "../../../context/Language";
import KeyboardInput from "./KeyboardInput";
export default function UsernameInput({ handleChange, value, placeholder, ...props }) {
    const t = useTranslation();
    return (
        <KeyboardInput
            type="text"
            autocomplete="username"
            label={t("fields.username")}
            placeholder={placeholder}
            handleChange={handleChange}
            lightIcon="/src/assets/icons/light/user.svg"
            darkIcon="/src/assets/icons/dark/user.svg"
            alt="User Icon"
            className="mb-[0.5rem]"
            required={true}
            value={value}
            {...props}
        />
    );
}