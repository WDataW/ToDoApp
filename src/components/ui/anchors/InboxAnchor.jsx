import { useInbox } from "@/context/User";
import { bgThemeColors, useTheme } from "../../../context/Theme";
import { hidePageContents } from "@/Pages/pages";
const icons = {
    dark: "bg-[url(/src/assets/icons/dark/mail.svg)]",
    light: "bg-[url(/src/assets/icons/light/mail.svg)]"
}
export default function InboxAnchor({ viewInbox, setViewInbox, className = "", children, ...props }) {
    const [theme] = useTheme();



    function startViewingInbox() {
        hidePageContents(document.getElementById("inboxButton"));
        setViewInbox(true);
    }
    const [inbox] = useInbox();
    const newInbox = inbox.filter((mail) => !mail.read).length > 0;

    return (<>
        <button id="inboxButton" aria-label="Inbox" onClick={startViewingInbox} className={`${className} ${icons[theme]} relative bg-cover bg-no-repeat bg-center`}  {...props} >
            {newInbox && <span className={`absolute h-[0.5rem]  w-[0.5rem] ${bgThemeColors[theme]} rounded-full top-[0rem] left-[0.85rem] border`}></span>}

        </button>
    </>
    );
}