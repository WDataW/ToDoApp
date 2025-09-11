import { useTheme } from "@/context/Theme";
import { motion } from "motion/react";
import { paddingX } from "../LandingPage";
import MidNav from "./MidNav";
import { useLang, useTranslation } from "@/context/Language";
import { useScreenWidth } from "@/context/ScreenSize";
import { Link } from "react-router-dom";
export default function BurgerNav({ setShowBurger, className = "", children, ...props }) {
    const [theme] = useTheme();
    const [lang] = useLang();
    const w = useScreenWidth();
    const t = useTranslation();
    return (
        <motion.div initial={{ x: "100%" }} exit={{ x: "100%", transition: { duration: 0.4 } }} animate={{ x: 0, transition: { duration: 0.4 } }} className={`pt-[1.5rem] ${theme == "dark" ? "dark-glass" : "light-glass"}  fixed ${paddingX} z-1 top-[3.5rem] overflow-auto overlay-target h-screen w-full ${className}`} {...props}>
            {((lang == "en" && w < 350) || (lang == "ar" && w < 415)) &&
                <ul className="flex flex-col items-center gap-[1.5rem] justify-center">
                    <li >
                        <Link to="/auth/sign-in" className="inline-block text-[1.5rem] text-center w-[10rem]  border-b">{t("titles.signIn")}</Link>
                    </li>

                    <li >
                        <Link to="/auth/sign-up" className="inline-block text-[1.5rem] text-center w-[10rem]  border-b">{t("titles.signUp")}</Link>
                    </li>
                </ul>
            }
            <MidNav setShowBurger={setShowBurger} className=" text-[1.5rem] flex flex-col items-center pt-[1.5rem] gap-[1.5rem] text-center" itemStyle={"text-center w-[10rem]  border-b"}></MidNav>
        </motion.div>
    );
}