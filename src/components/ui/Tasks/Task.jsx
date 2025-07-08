import { useTheme } from "../../../context/Theme";
import CheckTask from "../checkboxes/CheckTask";
import { MeatballMenu } from "../buttons";
import { useState } from "react";
import { getDueDate, getDueTime, getTaskTags } from "./tasks";
const themeStyles = {
    dark: "bg-[#222222] text-white",
    light: "bg-[#E9EBEB] text-black"
};
const icons = {
    light: {
        calender: "bg-[url(/src/assets/icons/light/calendar.svg)]",
        clock: "bg-[url(/src/assets/icons/light/clock.svg)]"
    },
    dark: {
        calender: "bg-[url(/src/assets/icons/dark/calendar.svg)]",
        clock: "bg-[url(/src/assets/icons/dark/clock.svg)]"
    }
}

export default function Task({ className = "", taskObj = {}, children, ...props }) {
    const [theme] = useTheme();
    const [checked, setChecked] = useState(false);

    const taskContent = (
        <div className={`${themeStyles[theme]} py-[0.5rem] px-[0.8rem] flex  rounded-[1.5rem] ${className}`} {...props}>
            <CheckTask checked={checked} onChange={handleChange} className=" ms-[0.15rem] me-[0.9rem] mt-[0.65rem] " />
            <div className="me-[0.5rem]">
                <div className="text-[0.7rem] opacity-">
                    <div className=" opacity-60 flex items-center ">
                        <span className={`inline-block h-[0.6rem] w-[0.6rem] me-[0.2rem] ${icons[theme]["calender"]} bg-cover bg-no-repeat `}></span>{getDueDate(taskObj)}
                        <span className={`inline-block h-[0.6rem] w-[0.6rem] ms-[0.5rem] me-[0.2rem] ${icons[theme]["clock"]} bg-cover bg-no-repeat`}></span>{getDueTime(taskObj)}
                    </div>
                    <div className="flex items-center flex-wrap">
                        {
                            getTaskTags(taskObj).map((tag) => {
                                if (!tag.title) { return null }
                                return (
                                    <div className="flex items-center first:ms-0 ms-[0.5rem]">
                                        <span className={`inline-block h-[0.6rem] w-[0.6rem] me-[0.1rem] ${tag.icon} rounded-full bg-[length:0.73rem_0.73rem] bg-center bg-no-repeat`} />
                                        <span className="flex-0 opacity-60 capitalize text-nowrap">{tag.title}</span>
                                    </div>
                                );
                            }
                            )
                        }
                    </div>
                </div>
                <p>{taskObj.title}</p>
            </div>
            <MeatballMenu className="ms-auto me-[0.25rem] mt-[0.65rem]  h-[1.4rem] w-[1.4rem]"></MeatballMenu>
        </div>
    );
    function handleChange() {
        setChecked(!checked);
    }

    return (
        <>
            {!checked ? taskContent : <del>{taskContent}</del>}
        </>
    );
}