import { getBrowserPreference, useTheme, useUpdateUserTheme } from "@/context/Theme";
import { ColorPicker, Select } from "../selects";
import Setting from "./Setting";
import { useTranslation } from "@/context/Language";
import { useInfo } from "@/context/User";
import { getColorVar, getFinalHeight, useColor } from "./settings";
import { useEffect, useRef } from "react";

export default function ThemeSetting({ className = "", children, ...props }) {
    const setting = {
        title: "theme",
        icon: "theme",
        type: "expand",
    }

    const [theme, setTheme] = useTheme();
    const t = useTranslation();
    const updateUserTheme = useUpdateUserTheme();

    function updateTheme(e) {
        const newTheme = e.target.value;
        updateUserTheme(newTheme)
        if (!newTheme) {
            setTheme(getBrowserPreference());
            return
        } else {
            setTheme(newTheme);
        }
    }
    const [info] = useInfo()
    const userTheme = info?.settings?.theme || "";
    useEffect(() => {
        setAccentColor(getColorVar(`--${theme}-theme-accent-color`));
        setSecondaryColor(getColorVar(`--color-darker-${theme}-theme`));
    }, [theme]);

    const [accentColor, setAccentColor] = useColor(`--${theme}-theme-accent-color`);
    const [secondaryColor, setSecondaryColor] = useColor(`--color-darker-${theme}-theme`);
    const expandRef = useRef();
    return (
        <Setting setting={setting} expandHeight={() => getFinalHeight(expandRef.current)} className={`${className}`} {...props}>
            <div ref={expandRef} className="sm:ms-[1.8rem] sm:w-[12rem] flex flex-col gap-[1rem]">
                <Select value={userTheme} onChange={updateTheme}>
                    <option value="">{t("terms.auto")}</option>
                    <option value="light">{t("terms.light")}</option>
                    <option value="dark">{t("terms.dark")}</option>
                </Select>
                <ColorPicker color={accentColor} setColor={setAccentColor} label={t("terms.accentColor")}></ColorPicker>
                <ColorPicker color={secondaryColor} setColor={setSecondaryColor} label={t("terms.secondaryAccentColor")}></ColorPicker>

            </div>
            {children}
        </Setting >
    );
}