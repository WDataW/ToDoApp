import { getInbox, getTags, getTasks, getUserInfo, isLogged } from "@/scripts/requests";
import { Outlet, useLocation, } from "react-router-dom";
import { useEffect, useState } from "react";
import { useInbox, useInfo, useTags, useTasks } from "@/context/User";
import { getInitLang, useLang } from "@/context/Language";
import { sortInbox } from "@/components/ui/inbox/mail";
export default function LoginChecker() {
    const [infoState, setInfoState] = useInfo();
    const [tagsState, setTagsState] = useTags();
    const [tasksState, setTasksState] = useTasks();
    const [inboxState, setInboxState] = useInbox();
    const [lang, setLang] = useLang();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(location.pathname.startsWith('/app'));
    const loadUser = async () => {
        setIsLoading(true);
        const storedInfo = await getUserInfo();
        const storedTags = await getTags();
        const storedTasks = await getTasks();
        const inbox = await getInbox();

        setInboxState(sortInbox(inbox));
        setInfoState(storedInfo);
        setLang(storedInfo?.settings?.language || getInitLang())
        setTagsState(storedTags);
        setTasksState(storedTasks);
        setIsLoading(false);
    }
    const checkLogin = async () => {
        const isLoggedIn = await isLogged();
        if (isLoggedIn) {
            loadUser();
            if (!location.pathname.startsWith('/app')) window.location.href = '/app/home';
        } else if (location.pathname.startsWith('/app')) {
            window.location.href = '/';
        } else if (!location.pathname.startsWith('/app'))
            setIsLoading(false);
    }
    useEffect(() => {
        checkLogin()
    }
        , [location.pathname]);
    return <div>
        {isLoading && !infoState.email &&
            < div className="h-[100dvh] flex items-center justify-center w-[100dvw] fixed  bottom-0 bg-black z-999">
                <div className="animate-spin animate-ping h-[8rem] aspect-1/1 rounded-full border   border-b-[#7C7C7C] border-[1.2rem]"></div>
            </div>
        }
        <Outlet></Outlet>
    </div >
}