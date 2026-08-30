
import { useTranslation } from "@/context/Language";
import { useTheme } from "@/context/Theme";
import { useInfo } from "@/context/User";
import { hidePageContents, showPageContents } from "@/Pages/pages";
import { setPFP } from "@/scripts/requests";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function PFPControl({ className = "", children, ...props }) {
    const t = useTranslation();
    const [userInfo, setUserInfo] = useInfo();
    const pfp = userInfo.pfp;

    const [isExpanded, setIsExpanded] = useState(false);
    const expandPhoto = () => {
        hidePageContents();
        setIsExpanded(true)

    }
    const shrinkPhoto = () => {
        showPageContents();
        setIsExpanded(false)
    }
    const bodyRef = useRef(null)
    const inputRef = useRef(null)
    const goBack = useEffectEvent((e) => {
        if (e.key == "Escape" && isExpanded) shrinkPhoto();
    });

    const updatePFP = async (e) => {
        const input = e.target;
        if (input.files.length == 0) return;
        const formData = new FormData();
        formData.append("image", input.files[0]);
        const response = await setPFP(formData);
        setUserInfo({ ...userInfo, pfp: response.signedUrl });
    }
    useEffect(() => {
        bodyRef.current = document.querySelector("body");
        inputRef.current = document.getElementById("imageSelector");


        window.addEventListener("keydown", goBack)
        return () => {
            window.removeEventListener("keydown", goBack);
        }
    }, []);

    const [theme] = useTheme();
    const outlineColor = theme == "dark" ? "outline-white/70" : "outline-black/70";

    return (
        <>
            {isExpanded && createPortal(
                <div className="items-start h-[100dvh] flex justify-center w-[100vw] top-0 z-100  -translate-x-1/2 absolute left-1/2 bg-[rgba(0,0,0,0.8)]">
                    <button onClick={shrinkPhoto} className={`outline-none absolute h-[2rem] w-[2rem] border rounded-full top-[0.5rem] bg-black right-[0.5rem] bg-[url(/src/assets/icons/dark/x.svg)] bg-center  bg-no-repeat`}></button>
                    <img className="max-h-full max-w-full   object-contain" src={pfp} alt="Profile picture" />
                </div>,
                bodyRef.current
            )}
            <div id="pfpControl" className={`${className} justify-center  flex flex-col mb-[1rem]`} {...props}>
                <button onClick={expandPhoto} className={`outline-[0.075rem] ${outlineColor} outline-offset-2  outline-[0.2rem] outline-offset-[0.2rem] rounded-full  flex justify-center`}>
                    <img className="aspect-1/1 h-[6rem] rounded-full " src={pfp} alt="Profile picture" />
                </button>
                <button onClick={() => inputRef.current.click()} type="file" className="cursor-pointer outline-none text-center mt-[0.5rem]">{t("titles.changePhoto")}</button>
                <input onChange={updatePFP} id="imageSelector" hidden accept="image/*" type="file" />
            </div>
        </>
    );
}