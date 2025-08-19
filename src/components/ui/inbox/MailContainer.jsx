import { useInbox } from "@/context/User";
import { filterMail, processMail } from "./mail";
import Mail from "./Mail.jsx";
import { hidePageContents, showPageContents } from "@/Pages/pages";
import { useRef, useState } from "react";
import MailPage from "./MailPage";
import { createPortal } from "react-dom";
import { useTranslation } from "@/context/Language";
export default function MailContainer({ from, search, className = "", children, ...props }) {
    const [inbox] = useInbox();

    const processedInbox = processMail(inbox);
    const filteredInbox = filterMail(processedInbox, from, search);
    const [currentMail, setCurrentMail] = useState(null);
    const t = useTranslation();
    const [viewMail, setViewMail] = useState(false);
    const selfRef = useRef();
    function startViewingMail(mail) {
        hidePageContents(selfRef.current, true);
        setCurrentMail(mail);
        setViewMail(true)
    }
    function stopViewingMail() {
        showPageContents(selfRef.current, true);
        setViewMail(false)
    }
    return (<>
        {viewMail && createPortal(<MailPage mail={currentMail} heading={t("titles.message")} close={stopViewingMail} />, selfRef.current.closest(".overlay-target"))}
        <ol ref={selfRef} className={`${className} flex flex-col gap-[0.5rem]`} {...props}>
            {filteredInbox.map((m, i) => <li key={m.id + i}><Mail onClick={() => { startViewingMail(m) }} mail={m} /></li>)}
        </ol>
    </>
    );
}