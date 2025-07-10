import { useEffect, useId } from "react";
import { useTheme, surfaceBgColors } from "../../../context/Theme";
import Action from "./Action";
export default function ActionsContainer({ position, scrolableParent, setOpened, className = "", children, ...props }) {
    const id = useId();
    let skipFirst = true;
    function handleHide(e) {
        const self = document.getElementById(id);
        if (!skipFirst && self !== e.target.closest(`#${id}`)) {

            setOpened(false);
        }
        skipFirst = false
    }
    useEffect(() => {
        document.addEventListener("click",
            handleHide
        );
        scrolableParent.addEventListener("scroll",
            handleHide
        );
        return () => {
            document.removeEventListener("click",
                handleHide
            );
            scrolableParent.removeEventListener("scroll",
                handleHide
            );
        }
    }, []);

    const [theme] = useTheme();
    const bgColor = surfaceBgColors[theme];

    const rem = parseInt(getComputedStyle(document.documentElement).fontSize);
    if (document.body.dir == "ltr") {
        return (
            <div id={id} style={{ top: position.top + window.scrollY - 7.5 * rem, left: position.left - 8.5 * rem }} className={`w-[10rem] ${bgColor} text-[0.9rem]  flex flex-col  border  rounded-[0.5rem] p-[0.5rem] absolute z-10 ${className}`} {...props}>
                <Action action="edit" >Edit</Action>
                <Action action="reschedule">Reschedule</Action>
                <Action action="delete">Delete</Action>
            </div>
        )
    } else if (document.body.dir == "rtl") {
        return (
            <div id={id} style={{ top: position.top + window.scrollY - 7.5 * rem, right: window.innerWidth - position.right - 8.5 * rem }} className={`w-[10rem] absolute z-10 ${bgColor} text-[0.9rem]  flex flex-col  border  rounded-[0.5rem] p-[0.5rem] ${className}`} {...props}>
                <Action action="edit" >Edit</Action>
                <Action action="reschedule">Reschedule</Action>
                <Action action="delete">Delete</Action>
            </div>
        );
    }
}