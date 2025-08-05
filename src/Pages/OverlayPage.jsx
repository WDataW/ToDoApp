import { Page } from ".";
import { useEffect, useRef } from "react";
import { ImageAnchor } from "@/components/ui";
import { useTheme } from "@/context/Theme";
export default function OverlayPage({ close, heading = "", className = "", children, ...props }) {
    const selfRef = useRef(null);
    useEffect(
        () => {
            xRef.current.focus()
            const focusableChildren = selfRef.current.querySelectorAll("[tabIndex='0']");
        }, []
    );
    const [theme] = useTheme();
    const icons = {
        dark: "bg-[url(/src/assets/icons/dark/x.svg)]",
        light: "bg-[url(/src/assets/icons/light/x.svg)]"
    }

    const xRef = useRef();
    return (
        <Page ref={selfRef} tabIndex={0} className={` overflow-scroll-auto absolute w-full sm:w-[calc(100%-4.7rem)] pb-[4rem] sm:pb-[2rem] top-0 ${className}`} {...props}>
            <header className="grid grid-rows-1 grid-cols-3 items-center h-[3rem] mb-[1rem] justify-items-center">
                <h4 className="text-nowrap col-start-2">{heading}</h4>
                <button ref={xRef} onClick={close} className={`inline-block justify-self-end me-[1rem] h-[1.2rem] w-[1.2rem] bg-center bg-cover bg-no-repeat ${icons[theme]}`} ></button>
            </header>
            {children}
        </Page >
    );
}