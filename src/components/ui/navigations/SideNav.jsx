import MainNav from "./MainNav";

import { SettingsAnchor } from "../../ui";
import { useTranslation } from "../../../context/Language";
import { useTheme, activeSurfaceBgColors, bgThemeColors } from "../../../context/Theme";
import { hidePageContents, showPageContents } from "@/Pages/pages";
import { useInbox } from "@/context/User";
import { getIcon } from "@/assets/assetsHandler";

export default function SideNav({ viewInbox, setViewInbox, title, ...props }) {
    const t = useTranslation();
    const [theme] = useTheme();
    const [inbox] = useInbox();
    const newInbox = inbox.filter((mail) => !mail.read).length > 0;

    function startViewingInbox() {
        hidePageContents(document.getElementById("inboxButton"));
        setViewInbox(true);
    }
    function stopViewingInbox() {
        setViewInbox(false);
        showPageContents(<></>, document.querySelectorAll(".overlay-target").length >= 2);
    }
    const inboxIconSrc = getIcon(`/src/assets/icons/${theme}/mail.svg`);
    const activeSurfaceBgColor = activeSurfaceBgColors[theme];
    return (
        <MainNav invert={true} hideInbox={stopViewingInbox} trueTitle={title} title={viewInbox || title} ulClassName="items-center flex-col h-full gap-[0.3rem] py-[1rem]" className="fixed start-0 top-0 h-full w-[4.7rem]" {...props}>
            <li className="w-full">
                <button id="inboxButton" onClick={startViewingInbox} href={null} className={`relative w-full cursor-pointer p-0 flex flex-col justify-center items-center  sm:px-[1rem] sm:py-[0.5rem] py-[0.5rem] px-[0.5rem] ${viewInbox && activeSurfaceBgColor + " border-t-[0.1rem] border-s-0 sm:border-t-0 sm:border-s-[0.15rem]"}`}>
                    <img className="opacity-65 h-[1.3rem] w-[1.3rem]" src={inboxIconSrc} alt="" />
                    <span className="cursor-pointer opacity-80 text-[0.8rem] text-center">{t("titles.inbox")}</span>
                    {newInbox && <span className={`absolute h-[0.5rem] w-[0.5rem] ${bgThemeColors[theme]} rounded-full top-[0.5rem] left-[2.6rem] border`}></span>}
                </button>
            </li>
            <li className="p-0 mt-auto flex flex-col justify-center items-center  sm:px-[1rem] sm:py-[0.5rem] py-[0.5rem] px-[0.5rem]">
                <SettingsAnchor to="/app/settings" className="opacity-70 h-[1.5rem] w-[1.5rem]" onClick={title == "settings" ? stopViewingInbox : showPageContents} />
            </li>
        </MainNav>
    );
}

