import { Page } from ".";
import { useEffect, useRef } from "react";
export default function LockFocusPage({ page, className = "", children, ...props }) {
    const selfRef = useRef(null);
    function handleLastTab(e) {
        if (e.key == "Tab") {
            e.preventDefault();
            focusableChildren[0].focus();
        }
    }
    function handleFirstTab(e) {
        if (e.key == "Tab" && e.shiftKey) {
            e.preventDefault();
            focusableChildren[focusableChildren.length - 1].focus();
        }
    }

    let focusableChildren;
    function preventPageScroll(e) {
        e.preventDefault();
    }
    useEffect(
        () => {
            focusableChildren = selfRef.current.querySelectorAll("[tabIndex='0']");
            if (page) {
                page.addEventListener("wheel", preventPageScroll)
                page.addEventListener("touchmove", preventPageScroll)
            }
            if (focusableChildren.length !== 0) {
                focusableChildren[0].focus();

                focusableChildren[focusableChildren.length - 1].addEventListener("keydown", handleLastTab)
                focusableChildren[0].addEventListener("keydown", handleFirstTab)
                return () => {
                    if (page) {
                        page.removeEventListener("wheel", preventPageScroll)
                        page.removeEventListener("touchmove", preventPageScroll)
                    }

                    if (focusableChildren.length !== 0) {
                        focusableChildren[focusableChildren.length - 1].removeEventListener("keydown", handleLastTab)
                        focusableChildren[0].removeEventListener("keydown", handleLastTab)

                    }

                }
            }
        }, []
    );

    return (
        <Page resetScroll={false} ref={selfRef} tabIndex={0} className={` overflow-scroll-auto z-50 fixed w-full sm:w-[calc(100%-4.7rem)] pb-[4rem] sm:pb-[2rem] top-0 ${className}`} {...props}>
            {children}
        </Page >
    );
}