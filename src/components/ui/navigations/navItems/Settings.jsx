import { useTheme } from "../../../../context/Theme";
import NavItem from "./NavItem";
const icons = {
    dark:"bg-[url(/src/assets/icons/dark/settings.svg)]",
    light:"bg-[url(/src/assets/icons/light/settings.svg)]"
}
export default function Settings({className="" , ...props}){
    const [theme] = useTheme();
    return(
        <NavItem className={className} image={icons[theme]} {...props}/>
    );
}