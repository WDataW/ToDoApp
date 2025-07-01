import { useTranslation } from "../../../../context/Language";
import { useTheme } from "../../../../context/Theme";
import NavItem from "./NavItem";

export default function ProfileNav({className="" , children, ...props}){
    const t = useTranslation();
    return(
        <NavItem className={`${className} justify-center`} image={`bg-[url(/images/userPFP.png)] bg-cover rounded-full h-[2rem] w-[2rem] outline-[0.075rem] outline-offset-2 `} {...props}/>    );
}