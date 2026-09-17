import { useLang, useUpdateUserLang } from "@/context/Language";
import Setting from "./Setting";
import { Select } from "../selects";
import { useRef } from "react";
import { getFinalHeight } from "./settings";
import { setLanguage } from "@/scripts/requests";

export default function LanguageSetting({ className = "", children, ...props }) {
    const setting = {
        title: "language",
        icon: "language",
        type: "expand",

    }
    const [lang, setLang] = useLang();
    const updateUserLang = useUpdateUserLang()

    async function updateLang(e) {
        const data = await setLanguage(e.target.value);
        window.localStorage.setItem("lang", data.language)
        updateUserLang(data.language);
        setLang(data.language);
    }
    const expandRef = useRef();
    return (
        <Setting setting={setting} expandHeight={() => getFinalHeight(expandRef.current)} className={`${className}`} {...props}>
            <div ref={expandRef} className="sm:ms-[1.8rem] sm:w-[10rem] ">
                <Select value={lang} onChange={updateLang}>
                    <option value="en">English</option>
                    <option value="ar">العربية</option>
                </Select>

            </div>
            {children}
        </Setting>
    );
}