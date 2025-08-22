import { useLang, useTranslation } from "@/context/Language";
import { useTheme } from "@/context/Theme";
import { useState } from "react";

export default function Setting({ setting, expandHeight, className = "", children, ...props }) {
    const [theme] = useTheme();
    const img = `/src/assets/icons/${theme}/${setting.icon}.svg`
    const t = useTranslation();
    const [lang] = useLang();
    const [expand, setExpand] = useState();
    const arrows = {
        light: "bg-[url(/src/assets/icons/light/arrowDown.svg)] ",
        dark: "bg-[url(/src/assets/icons/dark/arrowDown.svg)]"
    }

    if (setting.type == "expand") {
        return (
            <div style={{ height: expand ? expandHeight() : "" }} className={`${expand ? expandHeight : "h-[4rem]"}  transition-[height] duration-500  w-full   overflow-hidden border-b`}>
                <button onClick={() => setExpand(!expand)} className={`${className} items-center justify-between gap-[0.5rem] flex w-full text-start p-[0.5rem] h-[4rem]`} {...props}>
                    <div className="flex gap-[0.5rem]">
                        <img src={img} className="shrink-0 inline-block h-[1.5rem] w-[1.5rem] ms-[0.7rem]  " />
                        <p className=" capitalize">{t(`terms.${setting.title}`)}</p>
                    </div>
                    <span className={`${expand ? "rotate-180" : "rotate-0"} ${arrows[theme]} bg-no-repeat bg-center bg-cover transition duration-500 inline-block h-[1.5rem] w-[1.5rem] me-[0.5rem]  `} />
                </button>
                <div className="px-[1.2rem] pb-[1.2rem] ">
                    {children}

                </div>
            </div>
        );
    }

    else if (setting.type == "criticalAction") {
        const actionImg = `/src/assets/icons/${setting.icon}.svg`
        if (setting.position == "outer") {
            return (
                <div className="w-full overflow-hidden  border-b">
                    <button className={`${className} items-center justify-between gap-[0.5rem] flex w-full text-start p-[0.5rem] h-[4rem]`} {...props}>
                        <div className="flex items-center gap-[0.5rem]">
                            <img src={actionImg} className={`${setting.iconModifier} shrink-0 inline-block h-[1.5rem] w-[1.5rem] ms-[0.7rem]  `} />
                            <p className="text-red-500">{t(`terms.${setting.title}`)}</p>
                        </div>

                    </button>
                    {children}
                </div >
            );
        }
        else if (setting.position == "inner") {
            return (
                <div className="w-full overflow-hidden border rounded-[0.4rem]">
                    <button className={`${className} items-center justify-between gap-[0.5rem] flex w-full text-start p-[0.5rem] h-[3rem]`} {...props}>
                        <div className="flex gap-[0.5rem] items-center">
                            <img src={actionImg} className={` shrink inline-block h-[1.1rem] w-[1.1rem] ms-[0.7rem]  `} />
                            <p className="text-red-500">{t(`terms.${setting.title}`)}</p>
                        </div>

                    </button>
                    {children}
                </div >
            );
        }
    }
    else if (setting.type == "action") {
        return (
            <div className="w-full overflow-hidden border rounded-[0.4rem]">
                <button className={`${className} items-center justify-between gap-[0.5rem] flex w-full text-start p-[0.5rem] h-[3rem]`} {...props}>
                    <div className="flex items-center gap-[0.5rem]">
                        <img src={img} className={`shrink h-[1.1rem] min-w-0 min-h-0 w-[1.1rem] ms-[0.5rem] `} />
                        <p className=" text-nowrap ">{t(`terms.${setting.title}`)}</p>
                    </div>

                </button>
                {children}
            </div >
        );
    }
}