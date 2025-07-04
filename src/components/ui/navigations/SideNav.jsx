import MainNav from "./MainNav";
import {SettingsAnchor,InboxAnchor } from "../../ui";
import { useId } from "react";
import { useTranslation } from "../../../context/Language";
export default function SideNav({...props}){
    const id = useId()
    const t = useTranslation();
    return(
        <MainNav invert={true} ulClassName="flex-col h-full gap-[0.3rem] py-[1rem]" className="fixed start-0 top-0 h-full w-[4.7rem] " {...props}>
            <li className="p-0 flex flex-col justify-center items-center  sm:px-[1rem] sm:py-[0.5rem] py-[0.5rem] px-[0.5rem]">
                <InboxAnchor className="opacity-65 h-[1.3rem] w-[1.3rem]" />
                <label className="opacity-80 text-[0.8rem] text-center" htmlFor={id}>{t("titles.inbox")}</label>
            </li>
            <li className="p-0 mt-auto flex flex-col justify-center items-center  sm:px-[1rem] sm:py-[0.5rem] py-[0.5rem] px-[0.5rem]">
                <SettingsAnchor className="opacity-70 h-[1.5rem] w-[1.5rem]" />
            </li>
        </MainNav>
    );
}

