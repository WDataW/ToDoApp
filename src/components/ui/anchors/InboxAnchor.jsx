import { useEffect, useRef } from "react";
import { useTheme } from "../../../context/Theme";
import { useTranslation } from "@/context/Language";
import { hidePageContents, showPageContents } from "@/Pages/pages";
const icons = {
    dark: "bg-[url(/src/assets/icons/dark/mail.svg)]",
    light: "bg-[url(/src/assets/icons/light/mail.svg)]"
}
export default function InboxAnchor({ viewInbox, setViewInbox, className = "", children, ...props }) {
    const [theme] = useTheme();


    const t = useTranslation();

    function startViewingInbox() {
        hidePageContents(document.getElementById("inboxButton"));
        setViewInbox(true);
    }

    return (<>
        <button id="inboxButton" aria-label="Inbox" onClick={startViewingInbox} className={`${className} ${icons[theme]} bg-cover bg-no-repeat bg-center`}  {...props} />
    </>
    );
}