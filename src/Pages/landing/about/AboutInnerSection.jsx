import { useLang, useTranslation } from "@/context/Language";
import { useTheme } from "@/context/Theme";
import { motion } from "motion/react";
const colors = {
    light: "text-black", dark: "text-[rgba(255,255,255,0.3)]"
}
export default function AboutInnerSection({ invert = false, titleKey, className = "", children, ...props }) {
    const t = useTranslation();
    const [theme] = useTheme();
    const [lang] = useLang();
    const imageSrc = `/images/${theme}/${lang + titleKey}.png`
    titleKey = titleKey.toLowerCase();
    return (
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} className={`flex flex-col gap-[1rem]  md:h-[20rem] md:gap-[2.5rem]  overflow-hidden  ${!invert ? "md:flex-row-reverse" : "md:flex-row"} ${className} flex-col-reverse`} {...props}>
            <img src={imageSrc} className={` border   ${colors[theme]} object-cover ${lang == "ar" ? "object-right-top" : "object-left-top"} w-full  md:max-w-2/3  rounded-[0.7rem]`} alt="" />
            <div className="w-full md:w-[15rem] ">
                <h3 className="shrink-0 mb-[0.5rem]">{t(`about.${titleKey}`)}</h3>
                <p className="shrink-0 opacity-70 text-[1rem]/7.5">{t(`about.${titleKey}D`)}</p>
            </div>
        </motion.div>
    );
}