import { interpreteBuiltInTagTitle } from "./tasks";

export default function MiniTag({ tag, className = "", children, ...props }) {
    let color = "";
    if (tag.icon.startsWith("bg-[#")) {
        color = tag.icon.replace("bg-[", "").replace("]", "");
    }


    let tagTitle;
    if (tag?.builtIn) {
        tagTitle = interpreteBuiltInTagTitle(tag);
    }


    return (
        <div className={`flex items-center justify-start overflow-x-hidden overflow-y-hidden ${className}`}{...props}>
            {color
                ? <span style={{ backgroundColor: color }} className={`shrink-0 inline-block h-[0.6rem]  w-[0.6rem] me-[0.1rem]  rounded-full bg-[length:0.73rem_0.73rem] bg-center bg-no-repeat`} />
                : <span className={`shrink-0 inline-block h-[0.6rem]  w-[0.6rem] me-[0.1rem] ${tag.icon} rounded-full bg-[length:0.73rem_0.73rem] bg-center bg-no-repeat`} />
            }
            <span className="flex-0 text-nowrap   capitalize opacity-60 capitalize text-nowrap">{tagTitle || tag.title}</span>
        </div>);
}