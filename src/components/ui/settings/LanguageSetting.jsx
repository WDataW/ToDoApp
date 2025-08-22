import { useLang, useUpdateUserLang } from "@/context/Language";
import Setting from "./Setting";
import { Select } from "../selects";
import { useRef } from "react";
import { getFinalHeight } from "./settings";

export default function LanguageSetting({ className = "", children, ...props }) {
    const setting = {
        title: "language",
        icon: "language",
        type: "expand",

    }
    const [lang, setLang] = useLang();
    const updateUserLang = useUpdateUserLang()

    function updateLang(e) {
        updateUserLang(e.target.value);
        setLang(e.target.value);
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