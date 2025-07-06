import { useTheme } from "../../../context/Theme";
import CheckTask from "../checkboxes/CheckTask";
const themeStyles={
    dark:"bg-[#222222] text-white",
    light:"bg-[#E9EBEB] text-black"
};
const icons = {
    light:{
        calender:"bg-[url(/src/assets/icons/light/calendar.svg)]",
        clock:"bg-[url(/src/assets/icons/light/clock.svg)]"
    },
    dark:{      
        calender:"bg-[url(/src/assets/icons/dark/calendar.svg)]",
        clock:"bg-[url(/src/assets/icons/dark/clock.svg)]"
    }
}
export default function Task({className="" ,taskObj={title:"meow"} ,children, ...props}){
    const [theme] = useTheme();
    return(
        <div className={`${themeStyles[theme]}  py-[0.5rem] px-[0.8rem] flex  rounded-[1.5rem] ${className}`} {...props}>
            <CheckTask className=" ms-[0.15rem] me-[0.9rem] mt-[0.65rem] "/>
            <div>
                <div className="text-[0.7rem] opacity-60 flex items-center">
                    <span className={`inline-block h-[0.6rem] w-[0.6rem] me-[0.2rem] ${icons[theme]["calender"]} bg-cover bg-no-repeat `}></span>Today
                    <span className={`inline-block h-[0.6rem] w-[0.6rem] ms-[0.5rem] me-[0.2rem] ${icons[theme]["clock"]} bg-cover bg-no-repeat`}></span>4:50 PM
                </div>
                <p className="break-all">{taskObj.title}</p>
            </div>
            {/* Kebab Dots */}
        </div>
    );
}