import Page from "../Page";
import { useRef, useState } from "react";
import { SideNav, BottomNav, AppPageHeader } from "../../components/ui";
import { useScreenWidth } from "../../context/ScreenSize";
import { useTranslation } from "@/context/Language";
import InboxPage from "@/components/ui/inbox/InboxPage";
import { createPortal } from "react-dom";
import { showPageContents } from "../pages";
export default function AppPage({ title, className = "", children, ...props }) {
    const screenWidth = useScreenWidth();
    const t = useTranslation();
    const [viewInbox, setViewInbox] = useState(false)
    const selfRef = useRef();
    const MainNavigation = screenWidth >= 640 ? <SideNav selfRef={selfRef} viewInbox={viewInbox} setViewInbox={setViewInbox} title={title} /> : <BottomNav title={title} />;
    function stopViewingInbox() {
        setViewInbox(false);
        showPageContents(selfRef.current);
    }

    return (<>
        {viewInbox && createPortal(<InboxPage heading={t("titles.inbox")} close={stopViewingInbox} />, document.querySelector(".page-target"))}
        <Page className={`page-target pb-[4.7rem] sm:ps-[4.7rem] sm:pb-0 ${className}`} {...props}>
            {MainNavigation}
            <AppPageHeader selfRef={selfRef} viewInbox={viewInbox} setViewInbox={setViewInbox}>{t(`titles.${title}`)}</AppPageHeader>
            {children}
        </Page>
    </>
    );
} 