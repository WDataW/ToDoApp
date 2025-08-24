import { bgThemeColors, useTheme } from "@/context/Theme";
import AppNavItem from "./AppNavItem";
import { useLang, useTranslation } from "@/context/Language";
import BurgerMenu from "./BurgerMenu";
import { useScreenWidth } from "@/context/ScreenSize";
import MidNav, { hovers } from "./MidNav";
import { paddingX } from "../LandingPage";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import BurgerNav from "./BurgerNav";

export default function Nav({ className = "", children, ...props }) {
    const [theme] = useTheme();
    const t = useTranslation();
    const w = useScreenWidth();
    const [lang] = useLang();
    const [showBurger, setShowBurger] = useState(false);
    return (<>
        {((lang == "en" && w < 810) || (lang == "ar" && w < 870)) &&

            <AnimatePresence>
                {showBurger && <BurgerNav />}
            </AnimatePresence>
        }
        <nav dir="ltr" className={`flex justify-between gap-[1rem] items-center ${theme == "dark" ? "dark-glass" : "light-glass"} flex items-center ${paddingX} h-[3.5rem] w-full fixed z-100 top-0 glass ${className}`} {...props}>
            <ul className="flex items-center">
                <li>
                    <AppNavItem />
                </li>

            </ul>
            {((lang == "en" && w >= 810) || (lang == "ar" && w >= 870)) &&
                <MidNav className="text-nowrap text-center flex items-center justify-center gap-[0.8rem]" />
            }

            <ul className="flex text-nowrap items-center gap-[0.3rem]">
                {((lang == "en" && w >= 350) || (lang == "ar" && w >= 415)) &&
                    <>
                        <li>
                            <button className={`${hovers[theme]} h-full opacity-70 transition-[background-color]  transition-[opacity] px-[0.5rem] py-[0.4rem] rounded-[0.5rem]   text-[0.8rem]`} >{t("titles.signIn")}</button>
                        </li>
                        <li >
                            <button className={`text-white max-h-[1.9rem] text-nowrap rounded-[0.5rem] px-[0.5rem] py-[0.3rem]  text-[0.8rem] ${bgThemeColors[theme]}`} >{t("titles.signUp")}</button>
                        </li>
                    </>
                }
                {((lang == "en" && w < 810) || (lang == "ar" && w < 870)) &&
                    <li className="ms-[0.5rem] max-h-[1.5rem]">
                        <BurgerMenu value={showBurger} setValue={setShowBurger} />
                    </li>
                }
            </ul>
        </nav >
    </>
    );
}