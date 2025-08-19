import { useTranslation } from "@/context/Language";
import { useState } from "react";
import { motion } from "motion/react";
import { useTheme } from "@/context/Theme";
import Trophies from "./Trophies";
import Goals from "./Goals";
import { SelectButtons } from "../buttons";
export default function AchivementsContainer({ className = "", children, ...props }) {
    const t = useTranslation();
    const [theme] = useTheme();
    const [mode, setMode] = useState("trophies");

    return (
        <div>
            <h3 className="border-b mb-[0.4rem] mx-[0.4rem]">{t("titles.achievements")}</h3>
            <SelectButtons className=" ms-[0.3rem] w-[10rem]" value={mode} setValue={setMode} options={["trophies", "goals"]} />
            {mode == "trophies" && <Trophies />}
            {mode == "goals" && <Goals />}
        </div>
    );
}




