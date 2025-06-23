import { useTheme } from "../../../context/Theme";
import  ToggleTheme from "../../other/ToggleTheme";// for testing only
const bgColors={
    light:"bg-[#F7F8F8]",
    dark:"bg-[#0C0C0C]"
}
const textColors={
    light: "text-black",
    dark: "text-white"
}
export default function Page({className ,children}){
    const [theme] = useTheme();
    return(
        <div className={`min-h-screen px-[1.25rem] ${className} ${bgColors[theme]} ${textColors[theme]}`}>
            {children}
            <ToggleTheme/>
        </div>
    );
}