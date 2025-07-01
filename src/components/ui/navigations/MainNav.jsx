import { useTheme, surfaceBgColors } from "../../../context/Theme";
import Nav from "./Nav";
import { StatsNav, ProfileNav, HomeNav, TasksNav } from "./navItems";

export default function MainNav({className="", ulClassName="", children,...props}){
    const [theme] = useTheme();
    const bgColor =surfaceBgColors[theme];
    return(
        <Nav ulClassName={ulClassName} className={`${className} ${bgColor}`} {...props}>
            <HomeNav active={true} />
            <TasksNav/>
            <StatsNav/>
            <ProfileNav/>
            {children}
        </Nav>
    );
}