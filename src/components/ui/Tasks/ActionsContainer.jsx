import { useTheme, surfaceBgColors } from "../../../context/Theme";
import Action from "./Action";
import { FloatingContainer } from "../containers";
export default function ActionsContainer({ actionsArray, taskId, position, scrolableParent, meatballButton, className = "", children, ...props }) {

    window.addEventListener("resize", hideOnce)
    let onlyOnce = true;// to avoid it running too many times
    function hideOnce() {
        if (onlyOnce) hide()
        window.removeEventListener("resize", hide);
        onlyOnce = false;
    }

    function hide(e) {
        meatballButton.click()
    }

    const [theme] = useTheme();
    const bgColor = surfaceBgColors[theme];

    const rem = parseInt(getComputedStyle(document.documentElement).fontSize);
    if (document.body.dir == "ltr") {
        return (
            <FloatingContainer hide={hide} scrolableParent={scrolableParent} lastFocused={meatballButton} style={{ top: position.top + window.scrollY - 7.5 * rem, left: position.left - 8.5 * rem }} className={`w-[10rem] ${bgColor} text-[0.9rem]  flex flex-col  border  rounded-[0.5rem] p-[0.5rem] absolute z-10 ${className}`} {...props}>
                {actionsArray.map((action, i) => <Action key={i} action={action} />)}
            </FloatingContainer>
        )
    } else if (document.body.dir == "rtl") {
        return (
            <FloatingContainer hide={hide} scrolableParent={scrolableParent} lastFocused={meatballButton} style={{ top: position.top + window.scrollY - 7.5 * rem, right: window.innerWidth - position.right - 8.5 * rem }} className={`w-[10rem] absolute z-10 ${bgColor} text-[0.9rem]  flex flex-col  border  rounded-[0.5rem] p-[0.5rem] ${className}`} {...props}>
                {actionsArray.map((action, i) => <Action key={i} action={action} />)}
            </FloatingContainer>
        );
    }
}