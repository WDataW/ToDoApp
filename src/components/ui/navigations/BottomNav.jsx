import { useTheme } from "../../../context/Theme";
import MainNav from "./MainNav";

export default function BottomNav({...props}){
    return(
        <MainNav className={`w-full h-auto fixed bottom-0 shadow-lg bg-no-repeat bg-cover`} ulClassName="flex-row justify-evenly "  {...props}/>    );
}