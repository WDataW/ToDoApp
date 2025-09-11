import { useTheme } from "@/context/Theme";
import Nav from "./nav/Nav";
import ToggleLang from "@/components/other/ToggleLang";
import ToggleTheme from "@/components/other/ToggleTheme";
import HeroSection from "./HeroSection";
import FeaturesSection from "./features/FeaturesSection";
import { SelectButtons } from "@/components/ui";
import FooterSection from "./footer/FooterSection";
import AboutSection from "./about/AboutSection";
import ResetScroll from "../ResetScroll";

export const landingBgColors = {
    light: "bg-[#f7f6f5]",
    dark: "bg-[#08090a]"
}
export const paddingX = " px-[2rem] sm:px-[5rem] md:px-[7rem]";

export default function LandingPage({ className = "", children, ...props }) {
    const [theme] = useTheme();
    return (
        <div className={`page-target relative  ${landingBgColors[theme]} ${theme == "dark" ? "text-white" : "text-black"} min-h-screen ${className}`} {...props}>
            <ResetScroll></ResetScroll>
            <Nav></Nav>
            <main className={` overflow-hidden `}>
                <HeroSection></HeroSection>
                <AboutSection></AboutSection>
                <FeaturesSection></FeaturesSection>
                <FooterSection></FooterSection>
                <ToggleLang></ToggleLang>
                <ToggleTheme></ToggleTheme>
            </main>

        </div >
    );
}