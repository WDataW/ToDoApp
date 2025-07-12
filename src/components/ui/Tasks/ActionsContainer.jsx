import { useEffect, useId } from "react";
import { useTheme, surfaceBgColors } from "../../../context/Theme";
import Action from "./Action";
export default function ActionsContainer({ actionsArray, taskId, position, scrolableParent, meatballButton, className = "", children, ...props }) {
    const id = useId();
    let skipFirst = true;
    function handleHide(e) {
        const self = document.getElementById(id);
        if (!skipFirst && self !== e.target.closest(`#${id}`)) {
            meatballButton.click()
        }
        skipFirst = false
    }




    let index = 0;
    function handleKeyDown(e) {
        const self = document.getElementById(id);
        const actions = self.querySelectorAll("button");
        if (e.key == "Tab" && !e.shiftKey) {
            index++;
        } else if (e.key == "Tab" && e.shiftKey) {
            index--;
        } else {
            return;
        }
        if (index == -1 || index == 3) {
            e.preventDefault()
            meatballButton.click();
        }
    }

    function handleEscape(e) {
        if (e.key == "Escape") {
            meatballButton.click();
        }
    }


    useEffect(() => {
        const self = document.getElementById(id);
        self.focus();
        const actions = self.querySelectorAll("button");
        actions.forEach((action) => {
            action.addEventListener("keydown", handleKeyDown);
        });

        self.addEventListener("keydown",
            handleEscape
        );

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
            actions.forEach((action) => {
                action.removeEventListener("keydown", handleKeyDown);
            });
            self.removeEventListener("keydown",
                handleEscape
            );
        }
    }, []);

    const [theme] = useTheme();
    const bgColor = surfaceBgColors[theme];

    const rem = parseInt(getComputedStyle(document.documentElement).fontSize);
    if (document.body.dir == "ltr") {
        return (
            <div id={id} style={{ top: position.top + window.scrollY - 7.5 * rem, left: position.left - 8.5 * rem }} className={`w-[10rem] ${bgColor} text-[0.9rem]  flex flex-col  border  rounded-[0.5rem] p-[0.5rem] absolute z-10 ${className}`} {...props}>
                {actionsArray.map((action, i) => <Action key={i} action={action} />)}
            </div>
        )
    } else if (document.body.dir == "rtl") {
        return (
            <div id={id} style={{ top: position.top + window.scrollY - 7.5 * rem, right: window.innerWidth - position.right - 8.5 * rem }} className={`w-[10rem] absolute z-10 ${bgColor} text-[0.9rem]  flex flex-col  border  rounded-[0.5rem] p-[0.5rem] ${className}`} {...props}>
                {actionsArray.map((action, i) => <Action key={i} action={action} />)}
            </div>
        );
    }
}