import { SettingsAnchor, InboxAnchor } from "../anchors";
export default function AppPageHeader({ viewInbox, selfRef, setViewInbox, className, children, ...props }) {
    return (
        <header dir="ltr" className={` ${className} grid grid-rows-1 grid-cols-3 items-center justify-items-center h-[3rem] mb-[1rem]`}>
            <InboxAnchor selfRef={selfRef} viewInbox={viewInbox} setViewInbox={setViewInbox} className="ms-[5vw] opacity-70 justify-self-start h-[1.2rem] w-[1.2rem] sm:hidden" />
            <h4 className=" text-center sm:col-start-2 ">{children}</h4>
            <SettingsAnchor className="me-[5vw] opacity-75 justify-self-end h-[1.1rem] w-[1.1rem] sm:hidden" />
        </header>
    );
}