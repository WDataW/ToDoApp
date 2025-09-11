import { hoverTextThemeColors, textThemeColors, useTheme } from "@/context/Theme";
import { landingBgColors } from "./landing/LandingPage";
import { Link } from "react-router-dom";
import { ThemedRectButton } from "@/components/ui";
import ToggleTheme from "@/components/other/ToggleTheme";
import { useTranslation } from "@/context/Language";
import ToggleLang from "@/components/other/ToggleLang";

export default function PageNotFound({ className = "", children, ...props }) {
    const [theme] = useTheme();
    const hoverTextColor = hoverTextThemeColors[theme];
    const t = useTranslation();
    return (
        <div className={`h-[100dvh]  p-[2rem] ${landingBgColors[theme]} w-[100dvw] flex pt-[5rem] justify-center ${className}`} {...props}>
            <div className="flex flex-col relative pt-[9.5rem] text-center items-center ">
                <h1 className={`text-[7rem] font-sans absolute top-0  z-1 ${textThemeColors[theme]}`}>404</h1>
                <h1 className={`text-[7rem] font-sans absolute top-0 blur-[.35rem]  ${textThemeColors[theme]}`}>404</h1>
                <p className="opacity-60 max-w-[13rem] mb-[0.7rem]">{t("terms.oops")}</p>
                <Link to="../" relative="path"><ThemedRectButton style={{ padding: "0.4rem 1.5rem" }} customTheme=" transparent" className={`outline-none border-[0.1rem] text-wrap  bg-[rgba(0,0,0,1)] w-[10rem] transition duration-300 hover:bg-white ${hoverTextColor}`}>{t("terms.return")}</ThemedRectButton></Link>
            </div>
        </div>
    );
}   