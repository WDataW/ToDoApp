import { useTranslation } from "@/context/Language";
import { useState } from "react";
import { motion } from "motion/react";
import { useTheme } from "@/context/Theme";
import Trophies from "./Trophies";
import Goals from "./Goals";
export default function AchivementsContainer({ className = "", children, ...props }) {
    const t = useTranslation();
    const [theme] = useTheme();
    const [mode, setMode] = useState("trophies");

    return (
        <div>
            <h3 className="border-b mb-[0.4rem] mx-[0.4rem]">{t("titles.achievements")}</h3>
            <div className={` relative w-[10rem] h-[2rem] border rounded-[0.4rem] mb-[0.8rem] ms-[0.3rem] flex ${mode == "trophies" ? "justify-start" : "justify-end"} overflow-hidden`}>
                <motion.span layout className={`h-full w-1/2   ${theme == "dark" ? "bg-white" : "bg-black"}`}></motion.span>
                <button onClick={() => { setMode("trophies") }} className={`text-white mix-blend-difference absolute start-0  px-[0.5rem] py-[0.2rem] w-1/2`}>{t("terms.trophies")}</button>
                <button onClick={() => { setMode("goals") }} className={`text-white mix-blend-difference absolute end-0 px-[0.5rem] py-[0.2rem] w-1/2`}>{t("terms.goals")}</button>
            </div>
            {mode == "trophies" && <Trophies />}
            {mode == "goals" && <Goals />}
        </div>
    );
}




