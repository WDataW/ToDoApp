import { getBrowserPreference, useTheme, useUpdateUserTheme } from "@/context/Theme";
import { ColorPicker, Select } from "../selects";
import Setting from "./Setting";
import { useTranslation } from "@/context/Language";
import { useInfo } from "@/context/User";
import { getColorVar, getFinalHeight, useColor } from "./settings";
import { useEffect, useRef, useState } from "react";
import { setThemeSetting } from "@/scripts/requests";
import { useEffectEvent } from "react";

export default function ThemeSetting({ className = "", children, ...props }) {
    const setting = {
        title: "theme",
        icon: "theme",
        type: "expand",
    }

    const [theme, setTheme] = useTheme();

    const t = useTranslation();
    const updateUserTheme = useUpdateUserTheme();

    async function updateTheme(e) {
        const newTheme = e.target.value;
        await setThemeSetting({ base: newTheme });
        window.localStorage.setItem("theme", newTheme);
        updateUserTheme(newTheme);
        if (!newTheme) {
            setTheme(getBrowserPreference());
            return
        } else {
            setTheme(newTheme);
        }
    }
    useEffect(() => {
        setAccentColor(getColorVar(`--${theme}-theme-accent-color`));
        setSecondaryColor(getColorVar(`--color-darker-${theme}-theme`));
    }, [theme]);

    const [accentColor, setAccentColor] = useColor(`--${theme}-theme-accent-color`);
    const [secondaryColor, setSecondaryColor] = useColor(`--color-darker-${theme}-theme`);
    const postColors = useEffectEvent(async () => {
        if (theme == "dark")
            await setThemeSetting({ darkAccentColor: accentColor, darkSecondaryColor: secondaryColor });
        else if (theme == "light")
            await setThemeSetting({ lightAccentColor: accentColor, lightSecondaryColor: secondaryColor });
    })
    const [userInfo] = useInfo();
    const [isFirstRender, setisFirstRender] = useState(true);
    useEffect(() => {// debouncer
        if (isFirstRender) {
            setisFirstRender(false);
            return;
        }

        const id = setTimeout(postColors, 1000);
        return () => {
            clearTimeout(id);
        }
    }, [accentColor, secondaryColor]);
    useEffect(() => {
        if (userInfo?.settings?.theme) {
            const storedTheme = userInfo.settings.theme;
            if (storedTheme?.darkAccentColor) {
                if (theme == "dark") setAccentColor(storedTheme.darkAccentColor);
            }
            if (storedTheme?.lightAccentColor) {
                if (theme == "light") setAccentColor(storedTheme.lightAccentColor);
            }
            if (storedTheme?.darkSecondaryColor) {
                if (theme == "dark") setSecondaryColor(storedTheme.darkSecondaryColor);
            }
            if (storedTheme?.lightSecondaryColor) {
                if (theme == "light") setSecondaryColor(storedTheme.lightSecondaryColor);
            }
        }
    }, [userInfo])

    const expandRef = useRef();
    return (
        <Setting setting={setting} expandHeight={() => getFinalHeight(expandRef.current)} className={`${className}`} {...props}>
            <div ref={expandRef} className="sm:ms-[1.8rem] sm:w-[12rem] flex flex-col gap-[1rem]">
                <Select value={theme} onChange={updateTheme}>
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