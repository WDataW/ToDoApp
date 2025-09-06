import { paddingX } from "../LandingPage";
import AboutInnerSection from "./AboutInnerSection";
const innerSections = [
    "Control", "Plan", "Progress"
];
export default function AboutSection({ className = "", children, ...props }) {
    return (
        <div className={`${paddingX} border-b py-[5rem] md:py-[8rem] ${className}`} {...props}>
            <ul className="flex flex-col gap-[8rem]">
                {innerSections.map((key, i) => <AboutInnerSection invert={i % 2 == 1} titleKey={key} />)}
            </ul>
        </div>
    );
}