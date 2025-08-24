import { useLang, useTranslation } from "@/context/Language";
import { useTheme } from "@/context/Theme";

export const hovers = {
    light: " hover:bg-[rgba(0,0,0,0.1)] hover:opacity-100",
    dark: " hover:bg-[rgba(255,255,255,0.1)] hover:opacity-100"
}
export default function MidNav({ children, itemStyle, ...props }) {
    const [theme] = useTheme();
    const commonStyles = `${hovers[theme]}   h-full opacity-70 transition-[background-color]  transition-[opacity] px-[0.5rem] py-[0.4rem] rounded-[0.5rem]  text-[0.8rem] `;
    const t = useTranslation();

    function Item({ children }) {
        return <li>
            <a className={itemStyle || commonStyles} href="">{children}</a>
        </li>

    }
    return (
        <ul dir={document.body.dir} {...props}>
            <Item>{t("terms.features")}</Item>
            <Item>{t("terms.language")}</Item>
            <Item>{t("terms.theme")}</Item>
            <Item>{t("terms.about")}</Item>
        </ul>);
}