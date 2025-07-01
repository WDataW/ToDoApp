import MainNav from "./MainNav";
import Settings from "./navItems/Settings";
export default function SideNav({...props}){
    return(
        <MainNav invert={true} ulClassName="flex-col h-full gap-[0.3rem] py-[1rem]" className="fixed start-0  h-full w-[4.7rem]" {...props}>
            <Settings className="mt-auto "></Settings>
        </MainNav>
    );
}