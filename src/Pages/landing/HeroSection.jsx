import { useLang, useTranslation } from "@/context/Language";
import { useTheme } from "@/context/Theme";
import { paddingX } from "./LandingPage";

export default function HeroSection({ className = "", children, ...props }) {
    const [theme] = useTheme();
    const [lang] = useLang();
    const t = useTranslation();

    return (
        <div className={`${className} border-b relative flex  md:flex-col    items-end  pt-[7.5rem] md:pt-[3rem] md:py-0 h-[calc(100vh-3.3rem)]  md:h-screen`} {...props}>
            <img className={`h-full ${lang == "en" ? "-scale-x-100" : ""}  min-w-full object-cover`} src={`/images/${theme}/hero.jpg`} alt="" />
            <div className={` text-center   flex flex-col items-center md:block  md:text-start absolute  top-[14rem] w-full left-1/2 -translate-x-1/2 -translate-y-1/2 ${paddingX}`}>
                <h1 className="text-center md:text-start text-[2.5rem] md:text-[3rem] w-full ">{t("titles.doMoreStressLess")}</h1>
                <p className={`text-[1.3rem] opacity-80 ${lang == "ar" && "mt-[0.5rem]"}`}>{t("terms.stayFocused")}</p>
                <button className={`transition-[scale] hover:scale-110 border mt-[2rem] ${theme == "dark" ? "bg-white text-black" : "bg-black text-white"} rounded-[1rem] border h-[2.6rem] w-[8rem]`}>{t("terms.getStarted")}</button>
            </div>
        </div>
    );
}