import { getTags, getTasks, getUserInfo, isLogged } from "@/scripts/requests";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useInfo, useTags, useTasks } from "@/context/User";
import { useLang } from "@/context/Language";
export default function LoginChecker() {
    const [infoState, setInfoState] = useInfo();
    const [tagsState, setTagsState] = useTags();
    const [tasksState, setTasksState] = useTasks();
    const [lang, setLang] = useLang();
    const [isLoading, setIsLoading] = useState(false);
    const loadUser = async () => {
        setIsLoading(true);
        const storedInfo = await getUserInfo();
        const storedTags = await getTags();
        const storedTasks = await getTasks();
        setInfoState(storedInfo);
        setLang(storedInfo?.settings?.language)
        setTagsState(storedTags);
        setTasksState(storedTasks);
        setIsLoading(false);
    }
    const location = useLocation();
    const checkLogin = async () => {
        const isLoggedIn = await isLogged();
        console.log(isLoggedIn)
        if (isLoggedIn) {
            loadUser();
            if (!location.pathname.startsWith('/app')) window.location.href = '/app/home';
        } else if (location.pathname.startsWith('/app')) {
            window.location.href = '/';
        }
    }
    useEffect(() => {
        checkLogin()
    }
        , [location.pathname]);
    return <div>
        {isLoading && !infoState.email &&
            < div className="h-[100dvh] flex items-center justify-center w-[100dvw] absolute bg-black z-999">
                <div className="animate-spin animate-ping h-[8rem] aspect-1/1 rounded-full border   border-b-[#7C7C7C] border-[1.2rem]"></div>
            </div>
        }
        <Outlet></Outlet>
    </div >
}