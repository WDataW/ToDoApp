import { useTheme } from "@/context/Theme";
import Nav from "./nav/Nav";
import ToggleLang from "@/components/other/ToggleLang";
import ToggleTheme from "@/components/other/ToggleTheme";
import HeroSection from "./HeroSection";
import FeaturesSection from "./features/FeaturesSection";

const bgColors = {
    light: "bg-[#f7f6f5]",
    dark: "bg-[#08090a]"
}
export const paddingX = " px-[2rem] sm:px-[5rem] md:px-[7rem]";

export default function LandingPage({ className = "", children, ...props }) {
    const [theme] = useTheme();
    return (
        <div className={`page-target  relative ${bgColors[theme]} ${theme == "dark" ? "text-white" : "text-black"} min-h-screen ${className}`} {...props}>
            <Nav></Nav>
            <main className={` overflow-hidden `}>
                <HeroSection></HeroSection>
                <FeaturesSection></FeaturesSection>
                <ToggleLang></ToggleLang>
                <ToggleTheme></ToggleTheme>
            </main>
        </div >
    );
}