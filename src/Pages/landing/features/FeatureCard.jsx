import { useTranslation } from "@/context/Language";
import { bgColors, useTheme } from "@/context/Theme";
import { motion } from "motion/react";

export default function FeatureCard({ feat, className = "", children, ...props }) {
    const [theme] = useTheme();
    const t = useTranslation();
    const bgColors = {
        light: "bg-[rgb(230,231,232)]",
        dark: "bg-[rgb(20,21,22)]"
    }
    return (
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`w-full  rounded-[1rem]    ${bgColors[theme]} h-full  ${className}`} {...props}>
            <div className="flex   p-[1.5rem] flex flex-col items-start">
                <img src={`/src/assets/icons/${theme}/${feat.icon}.svg`} className={` shrink-0  h-[2rem] ${!feat.noOpacity ? "opacity-60" : "opacity-85"} w-[2rem]`} />
                <h3 >{t(`features.${feat.key}`)}</h3>
                <p className="mt-[0.3rem] opacity-60">{t(`features.${feat.key}D`)}</p>
            </div>
        </motion.div>
    );
}