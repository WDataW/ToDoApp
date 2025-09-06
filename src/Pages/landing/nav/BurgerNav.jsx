import { useTheme } from "@/context/Theme";
import { motion } from "motion/react";
import { paddingX } from "../LandingPage";
import MidNav from "./MidNav";
export default function BurgerNav({ className = "", children, ...props }) {
    const [theme] = useTheme();
    return (
        <motion.div initial={{ x: "100%" }} exit={{ x: "100%", transition: { duration: 0.4 } }} animate={{ x: 0, transition: { duration: 0.4 } }} className={`${theme == "dark" ? "dark-glass" : "light-glass"}  fixed ${paddingX} z-1 top-[3.5rem] overflow-auto overlay-target h-screen w-full ${className}`} {...props}>
            <MidNav className="pt-[1.5rem] text-[1.5rem] flex flex-col items-center gap-[1.5rem] text-center" itemStyle={"text-center w-[10rem]  border-b"}></MidNav>
        </motion.div>
    );
}