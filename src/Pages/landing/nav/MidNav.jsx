import { useLang, useTranslation } from "@/context/Language";
import { useTheme } from "@/context/Theme";
import SettingButton from "./SettingButton";
import ThemeButton from "./ThemeButton";
import LanguageButton from "./LanguageButton";
import { showPageContents } from "@/Pages/pages";

export const hovers = {
    light: " hover:bg-[rgba(0,0,0,0.1)] hover:opacity-100",
    dark: " hover:bg-[rgba(255,255,255,0.1)] hover:opacity-100"
}
export default function MidNav({ setShowBurger, children, itemStyle, ...props }) {
    const [theme] = useTheme();
    const commonStyles = `${hovers[theme]} h-full opacity-70 transition-[background-color]  transition-[opacity]  rounded-[0.5rem]  text-[0.8rem] `;
    const t = useTranslation();

    function Item({ children, href }) {
        return <li className={`justify-center ${itemStyle || commonStyles}`}>
            <a onClick={() => {
                if (setShowBurger) {
                    setShowBurger(false)
                    showPageContents();
                }
            }}
                className={`h-full ${!itemStyle && "px-[0.5rem] py-[0.4rem]"} inline-block w-full`} href={href}>{children}</a>
        </li>

    }
    return (
        <ul dir={document.body.dir} {...props}>
            <Item href="#features">{t("terms.features")}</Item>
            <LanguageButton isInBurger={itemStyle ? true : false} itemStyle={itemStyle} />
            <ThemeButton isInBurger={itemStyle ? true : false} itemStyle={itemStyle} />
            <Item href="#about">{t("terms.about")}</Item>
        </ul>);
}