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
        document.addEventListener("click", handleClickAway);
        self.current.addEventListener("keydown", handleEscape);
        if (scrolableParent) {
            scrolableParent.addEventListener("scroll", handleParentScroll);
        }
        const focusableChildren = self.current.querySelectorAll("[tabIndex='0']");
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
            if (self.current) {

                self.current.removeEventListener("keydown", handleEscape);
                document.removeEventListener("click", handleClickAway);
                if (scrolableParent) {
                    scrolableParent.removeEventListener("scroll", handleParentScroll);
                }
                if (focusableChildren.length !== 0) {
                    firstChild.removeEventListener("keydown", handleShiftTab);
                    lastChild.removeEventListener("keydown", handleTab);
                }
            }

        }
    }, []);
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
    function handleShiftTab(e) {
        if (e.key == "Tab" && e.shiftKey) {
            handleHide(e);
        }
    }
    function handleTab(e) {
        if (e.key == "Tab" && !e.shiftKey) {

            handleHide(e);
        }
    }
    function handleEscape(e) {
        if (e.key == "Escape") handleHide(e);
    }
    let ignoreHide = true;// the interaction causing the FloatingContainer to be mounted is also invoking handleHide therefore the first interaction is ignored
    function handleHide(e) {
        if (!ignoreHide) {
            e.preventDefault();
            hide();
            rememberFocus();
        }
        ignoreHide = false;
    }
    function rememberFocus() {
        lastFocused.focus();
    }


    const id = useId();
    return (
        <div tabIndex="0" ref={self} id={id} className={`${className} absolute z-10`} {...props}>
            {children}
        </div>
    );
}