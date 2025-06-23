import { useTheme } from "../../context/Theme";
export default function Page({children}){
    const [theme] = useTheme();
    const bgColors={
        light:"bg-[#F7F8F8]",
        dark:"bg-[#0C0C0C]"
    }
    return(
        <div className={`h-screen w-screen ${bgColors[theme]}`}>
            {children}
        </div>
    );
}