import { OverlayPage } from "@/Pages";
import { Main, SearchInput, SectionContainer, SelectButtons } from "..";

import { useTranslation } from "@/context/Language";
import { useState } from "react";
import MailContainer from "./MailContainer";
export default function InboxPage({ close, className = "", children, ...props }) {

    const t = useTranslation();

    const [category, setCategory] = useState("all")
    const [search, setSearch] = useState("");
    return (
        <OverlayPage id="inboxPage" close={close} className={` ${className}`} {...props}>
            <Main className="flex items-center flex-col ">
                <div className="w-full ">
                    <SelectButtons className="w-full" value={category} setValue={setCategory} options={["all", "tasks", "system"]}></SelectButtons>
                    <section >
                        <SearchInput placeholder={t("fields.searchMail")} value={search} handleChange={(e) => { setSearch(e.target.value) }} required={false} className="mb-[0.5rem]"></SearchInput>
                        <MailContainer search={search} from={category}></MailContainer>
                    </section>
                </div>
            </Main>
        </OverlayPage>
    );
}