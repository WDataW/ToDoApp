import { getTags, getTasks, getUserInfo, isLogged } from "@/scripts/requests";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useInfo, useTags, useTasks } from "@/context/User";
export default function LoginChecker() {
    const navigate = useNavigate()
    const [infoState, setInfoState] = useInfo();
    const [tagsState, setTagsState] = useTags();
    const [tasksState, setTasksState] = useTasks();
    const loadUser = async () => {
        const storedInfo = await getUserInfo();
        const storedTags = await getTags();
        const storedTasks = await getTasks();
        setInfoState(storedInfo);
        setTagsState(storedTags);
        setTasksState(storedTasks);
    }
    const location = useLocation();
    const checkLogin = async () => {
        const isLoggedIn = await isLogged();

        if (isLoggedIn) {
            loadUser();
            if (!location.pathname.startsWith('/app')) window.location.href = '/app/home';
        } else if (location.pathname.startsWith('/app')) {
            window.location.href = '/';
        }
    }
    useEffect(() => checkLogin, [location.pathname]);
    return <div>
        <Outlet></Outlet>
    </div>
}