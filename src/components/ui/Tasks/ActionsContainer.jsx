import { useTheme, surfaceBgColors } from "../../../context/Theme";
import Action from "./Action";
import { FloatingContainer } from "../containers";
import { useEffect } from "react";
export default function ActionsContainer({ actionsArray, hideMenu, taskId, position, scrolableParent, meatballButton, className = "", children, ...props }) {



    let onlyOnce = true;// to avoid it running too many times
    window.addEventListener("resize", hideOnce)
    function hideOnce(e) {
        if (onlyOnce) {
            rememberFocus();
            hide()
            window.removeEventListener("resize", hide);
            onlyOnce = false;
        }

    }

    function hide(e) {
        window.removeEventListener("resize", hide);
        onlyOnce = false;
        if (e && !e.target.classList.contains("meatball-actions")) {
            rememberFocus();
        }
        hideMenu()

    }
    function rememberFocus() {
        meatballButton.focus();
    }

    const [theme] = useTheme();
    const bgColor = surfaceBgColors[theme];

    const rem = parseInt(getComputedStyle(document.documentElement).fontSize);
    if (document.body.dir == "ltr") {
        return (
            <FloatingContainer aria-label="Press Escape to close." hide={hide} scrolableParent={scrolableParent} style={{ top: position.top + window.scrollY - 7.5 * rem, left: position.left - 8.5 * rem }} className={`w-[10rem] ${bgColor} text-[0.9rem]  flex flex-col  border  rounded-[0.5rem] p-[0.5rem] absolute z-10 ${className}`} {...props}>
                {actionsArray.map((action, i) => <Action key={i} action={action} />)}
            </FloatingContainer>
        )
    } else if (document.body.dir == "rtl") {
        return (
            <FloatingContainer aria-label="Press Escape to close." hide={hide} scrolableParent={scrolableParent} style={{ top: position.top + window.scrollY - 7.5 * rem, right: window.innerWidth - position.right - 8.5 * rem }} className={`w-[10rem] absolute z-10 ${bgColor} text-[0.9rem]  flex flex-col  border  rounded-[0.5rem] p-[0.5rem] ${className}`} {...props}>
                {actionsArray.map((action, i) => <Action key={i} action={action} />)}
            </FloatingContainer>
        );
    }
}