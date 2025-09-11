import { showPageContents } from "@/Pages/pages";
import { useTheme, surfaceBgColors } from "../../../context/Theme";
import Nav from "./Nav";
import { StatsNav, ProfileNav, HomeNav, TasksNav } from "./navItems";
export default function MainNav({ hideInbox, trueTitle, title, className = "", invert = false, ulClassName = "", children, ...props }) {
    const [theme] = useTheme();
    const bgColor = surfaceBgColors[theme];

    return (
        <Nav ulClassName={ulClassName} className={`z-100 ${className} ${bgColor}`} {...props}>
            {invert && <ProfileNav className="mt-[0.3rem]" to="/app/settings" onClick={trueTitle == "settings" ? hideInbox : showPageContents} />}
            <HomeNav onClick={trueTitle == "home" ? hideInbox : showPageContents} to="/app/home/" active={title == "home"} />
            <TasksNav onClick={trueTitle == "tasks" ? hideInbox : showPageContents} to="/app/tasks/" active={title == "tasks"} />
            <StatsNav onClick={trueTitle == "stats" ? hideInbox : showPageContents} to="/app/stats/" active={title == "stats"} />
            {!invert && <ProfileNav to="/app/settings" onClick={trueTitle == "settings" ? hideInbox : showPageContents} />}
            {children}
        </Nav>
    );
}