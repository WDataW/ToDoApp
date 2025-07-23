import { useRef, useId, useEffect } from 'react';

/* 
    this component is used to make floating components with focus trap.
    it requires 'hide' function, which is used to hide the element by certain interactions.
    it requires 'lastFocused' HtmlElement, which is used to return the focus to the normal flow after the element is removed. important to maintain accessibility.
    it takes optional 'scrolableParent' HtmlElement, which is used to hide the element when scrolled.
*/
export default function FloatingContainer({ className = "", hide, lastFocused, scrolableParent = null, children, ...props }) {
    const self = useRef(null);
    useEffect(() => {
        const selfRef = self.current;
        document.addEventListener("click", handleClickAway);
        selfRef.addEventListener("keydown", handleEscape);
        if (scrolableParent) {
            scrolableParent.addEventListener("scroll", handleParentScroll);
        }
        const focusableChildren = selfRef.querySelectorAll("[tabIndex='0']");
        let firstChild;
        let lastChild;

        if (focusableChildren.length !== 0) {
            firstChild = focusableChildren[0];
            firstChild.focus();
            firstChild.addEventListener("keydown", handleShiftTab);
            lastChild = focusableChildren[focusableChildren.length - 1];
            lastChild.addEventListener("keydown", handleTab);

        }
        return () => {
            cleanUpListeners(selfRef)
        }
    }, []);
    function cleanUpListeners(selfRef) {
        const focusableChildren = selfRef.querySelectorAll("[tabIndex='0']");
        if (selfRef) {
            if (scrolableParent) {
                scrolableParent.removeEventListener("scroll", handleParentScroll);
            }
            selfRef.removeEventListener("keydown", handleEscape);
            document.removeEventListener("click", handleClickAway);
            if (focusableChildren.length !== 0) {
                const firstChild = focusableChildren[0];
                firstChild.removeEventListener("keydown", handleShiftTab);

                const lastChild = focusableChildren[focusableChildren.length - 1];
                lastChild.removeEventListener("keydown", handleTab);
            }
        }
    }


    let onlyOnce = true; // to allow only one scroll event to be handled, no more.
    function handleParentScroll(e) {
        if (onlyOnce) handleHide(e);
        onlyOnce = false;
    }
    function handleClickAway(e) {
        if (self.current !== e.target.closest(`#${id}`)) {
            handleHide(e);
        }
    }
    let index = 0;
    function handleShiftTab(e) {
        if (e.key == "Tab" && e.shiftKey) {
            handleHide(e);
        }
    }
    function handleTab(e) {
        console.log(index);
        if (e.key == "Tab" && !e.shiftKey) {
            e.preventDefault();
            const firstChild = self.current.querySelectorAll("[tabIndex='0']")[0];
            firstChild.focus();

        }

    }
    function handleEscape(e) {
        if (e.key == "Escape") handleHide(e);
    }
    let ignoreHide = true;// the interaction causing the FloatingContainer to be mounted is also invoking handleHide therefore the first interaction is ignored
    function handleHide(e) {
        if (!ignoreHide) {
            cleanUpListeners(self.current);
            hide(e);
            ignoreHide = true;
        }
        ignoreHide = false;
    }



    const id = useId();
    return (
        <div tabIndex="0" ref={self} id={id} className={`${className} absolute z-10`} {...props}>
            {children}
        </div>
    );
}