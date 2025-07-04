import Page from "../Page";
import { SideNav, BottomNav } from "../../components/ui";
import { useScreenWidth } from "../../context/ScreenSize";
export default function AppPage({className="" , children, ...props}){
    const screenWidth = useScreenWidth();
    const MainNavigation = screenWidth>=640?<SideNav/>:<BottomNav/>;
    return(
        <Page className={`pb-[4.7rem] sm:ps-[4.7rem] sm:pb-0 ${className}`} {...props}>
            {children}
            {MainNavigation}
        </Page>
    );
} 