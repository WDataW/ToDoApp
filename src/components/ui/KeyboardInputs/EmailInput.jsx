import { getIcon } from "@/assets/assetsHandler";
import { useTranslation } from "../../../context/Language";
import KeyboardInput from "./KeyboardInput";
export default function EmailInput({ handleChange, value, placeholder, ...props }) {
    const t = useTranslation()
    return (
        <KeyboardInput
            type="email"
            label={t("fields.email")}
            placeholder={placeholder || t("fields.enterEmail")}
            handleChange={handleChange}
            lightIcon={getIcon("/src/assets/icons/light/email.svg")}
            darkIcon={getIcon("/src/assets/icons/dark/email.svg")}
            alt="Mail Icon"
            className="mb-[0.5rem]"
            required={true}
            value={value}
            {...props}
        />
    );
}