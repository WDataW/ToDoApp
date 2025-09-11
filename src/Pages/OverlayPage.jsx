import { Page } from ".";
import { useEffect, useRef } from "react";
import { useTheme } from "@/context/Theme";
export default function OverlayPage({ overAnOverlay = false, close, heading = "", className = "", children, ...props }) {
    const selfRef = useRef(null);
    useEffect(
        () => {
            xRef.current.focus()
        }, []
    );
    const [theme] = useTheme();
    const xIcons = {
        dark: "bg-[url(/src/assets/icons/dark/x.svg)]",
        light: "bg-[url(/src/assets/icons/light/x.svg)]"
    }
    const backIcons = {
        dark: "bg-[url(/src/assets/icons/dark/back.svg)]",
        light: "bg-[url(/src/assets/icons/light/back.svg)]"
    }
    const icon = overAnOverlay ? `${backIcons[theme]} bg-size-[len:1rem_1.5rem] -scale-x-100` : xIcons[theme]
    const xRef = useRef();
    return (
        <Page resetScroll={false} ref={selfRef} tabIndex={0} className={`overflow-auto  overlay-target h-screen fixed w-full  sm:w-[calc(100%-4.7rem)] z-52 pb-[4rem] sm:pb-[2rem] top-0 ${className}`} {...props}>

            <header dir="ltr" className="grid grid-rows-1 grid-cols-3 items-center h-[3rem] mb-[1rem] justify-items-center">
                <h4 className="text-nowrap col-start-2">{heading}</h4>
                <button ref={xRef} onClick={close} className={`inline-block justify-self-end me-[1rem] h-[1.2rem] w-[1.2rem] bg-center bg-cover bg-no-repeat ${icon}`} ></button>
            </header>

            {children}
        </Page >
    );
}