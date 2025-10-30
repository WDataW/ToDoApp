import { getIcon } from "@/assets/assetsHandler";
import { useTranslation } from "../../../context/Language";
import KeyboardInput from "./KeyboardInput";
export default function UsernameInput({ handleChange, value, placeholder, ...props }) {
    const t = useTranslation();
    return (
        <KeyboardInput
            type="text"
            autocomplete="username"
            label={t("fields.username")}
            placeholder={placeholder || t("fields.enterUsername")}
            handleChange={handleChange}
            lightIcon={getIcon("/src/assets/icons/light/user.svg")}
            darkIcon={getIcon("/src/assets/icons/dark/user.svg")}
            alt="User Icon"
            className="mb-[0.5rem] "
            required={true}
            value={value}
            {...props}
        />
    );
}