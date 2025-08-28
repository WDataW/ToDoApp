import { useLang, useTranslation } from "@/context/Language";
import { useTheme } from "@/context/Theme";
import { paddingX } from "./LandingPage";

export default function HeroSection({ className = "", children, ...props }) {
    const [theme] = useTheme();
    const [lang] = useLang();
    const t = useTranslation();
    const gradientColors = {
        dark: "bg-linear-to-t from-[var(--dark-theme-accent-color)] from-0% to-70%  ",
        light: "bg-linear-to-t from-[var(--light-theme-accent-color)] from-0% to-70% "
    }
    return (
        <div className={`${className} border-b relative flex  items-center py-[3rem]  md:pt-[3rem] md:py-0  md:h-screen`} {...props}>
            <img className={`h-full ${lang == "en" ? "-scale-x-100" : ""}  min-w-full hidden md:block object-cover`} src={`/images/${theme}Hero.jpg`} alt="" />
            <div className={` text-center pt-[3.5rem]    md:text-start md:absolute top-[13.5rem] xs:top-[14rem] md:top-[13rem] w-full left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 ${paddingX}`}>
                <h1 className="text-center md:text-start text-[2.5rem] md:text-[3rem] w-full ">{t("titles.doMoreStressLess")}</h1>
                <p className={`text-[1.3rem] opacity-80 ${lang == "ar" && "mt-[0.5rem]"}`}>{t("terms.stayFocused")}</p>
                <button className={`transition-[scale] hover:scale-110 border mt-[2rem] ${theme == "dark" ? "bg-white text-black" : "bg-black text-white"} rounded-[1rem] border h-[2.6rem] w-[8rem]`}>{t("terms.getStarted")}</button>
                <div className={`w-full  left-0 bottom-0 md:hidden absolute h-1/8 opacity-65 ${gradientColors[theme]}  `}></div>
            </div>
        </div>
    );
}