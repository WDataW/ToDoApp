import MainNav from "./MainNav";
const inboxIcons = {
    dark: "/src/assets/icons/dark/mail.svg",
    light: "/src/assets/icons/light/mail.svg"
}
import { SettingsAnchor, InboxAnchor } from "../../ui";
import { useId } from "react";
import { useTranslation } from "../../../context/Language";
import { useTheme } from "../../../context/Theme";
export default function SideNav({ ...props }) {
    const id = useId()
    const t = useTranslation();
    const [theme] = useTheme();
    return (
        <MainNav invert={true} ulClassName="items-center flex-col h-full gap-[0.3rem] py-[1rem]" className="fixed start-0 top-0 h-full w-[4.7rem] " {...props}>
            <li >
                <a href="" className="cursor-pointer p-0 flex flex-col justify-center items-center  sm:px-[1rem] sm:py-[0.5rem] py-[0.5rem] px-[0.5rem]">
                    <img className="opacity-65 h-[1.3rem] w-[1.3rem]" src={inboxIcons[theme]} alt="" />
                    <span className="cursor-pointer opacity-80 text-[0.8rem] text-center">{t("titles.inbox")}</span>
                </a>
            </li>
            <li className="p-0 mt-auto flex flex-col justify-center items-center  sm:px-[1rem] sm:py-[0.5rem] py-[0.5rem] px-[0.5rem]">
                <SettingsAnchor className="opacity-70 h-[1.5rem] w-[1.5rem]" />
            </li>
        </MainNav>
    );
}

