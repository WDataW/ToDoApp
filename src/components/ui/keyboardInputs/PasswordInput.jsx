import { getIcon } from "@/assets/assetsHandler";
import { useTranslation } from "../../../context/Language";
import KeyboardInput from "./KeyboardInput";
import { useId, useState } from "react";
export default function PasswordInput({ handleChange, label, className, placeholder, value, ...props }) {
    const t = useTranslation();
    const id = useId();
    const [hidden, setHidden] = useState(true);
    return (
        <div>
            <label className="ms-[0.2rem]" htmlFor={id}> {label || t("fields.password")}</label>
            <div className="relative">
                <button tabIndex={1} type="button" onClick={() => setHidden(!hidden)} className={`opacity-70 outline-none ${hidden ? "bg-[url(/src/assets/icons/eye-open.svg)]" : "bg-[url(/src/assets/icons/eye-closed.svg)]"} bg-contain bg-no-repeat bg-center w-[1.2rem] absolute top-1/2 -translate-y-1/2 z-1  end-[0.8rem] h-1/2 `} />
                <KeyboardInput
                    type={hidden ? "password" : "text"}
                    mask={"false"}
                    customId={id}
                    placeholder={placeholder || t("fields.enterPassword")}
                    handleChange={handleChange}
                    lightIcon={getIcon("/src/assets/icons/light/key.svg")}
                    darkIcon={getIcon("/src/assets/icons/dark/key.svg")}
                    alt="Door Key Icon"
                    className={`${className} `}
                    inputStyle="pe-[2.5rem]"
                    required={true}
                    value={value}
                    {...props}
                />
            </div>
        </div>
    );
}