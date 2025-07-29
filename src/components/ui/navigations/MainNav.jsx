import { useTheme, surfaceBgColors } from "../../../context/Theme";
import Nav from "./Nav";
import { StatsNav, ProfileNav, HomeNav, TasksNav } from "./navItems";

export default function MainNav({ title, className = "", invert = false, ulClassName = "", children, ...props }) {
    const [theme] = useTheme();
    const bgColor = surfaceBgColors[theme];
    return (
        <Nav ulClassName={ulClassName} className={`z-100 ${className} ${bgColor}`} {...props}>
            {invert && <ProfileNav />}
            <HomeNav active={title == "home"} />
            <TasksNav active={title == "tasks"} />
            <StatsNav active={title == "stats"} />
            {!invert && <ProfileNav />}
            {children}
        </Nav>
    );
}