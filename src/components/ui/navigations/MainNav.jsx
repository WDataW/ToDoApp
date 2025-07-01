import { useTheme, surfaceBgColors } from "../../../context/Theme";
import Nav from "./Nav";
import { StatsNav, ProfileNav, HomeNav, TasksNav } from "./navItems";

export default function MainNav({className="", invert=false ,ulClassName="", children,...props}){
    const [theme] = useTheme();
    const bgColor =surfaceBgColors[theme];
    return(
        <Nav  ulClassName={ulClassName} className={`${className} ${bgColor}`} {...props}>
            {invert && <ProfileNav />}
            <HomeNav active={true}/>
            <TasksNav/>
            <StatsNav/>
            {!invert && <ProfileNav />}
            {children}
        </Nav>
    );
}