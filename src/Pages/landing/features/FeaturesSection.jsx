import { useTranslation } from "@/context/Language";
import { paddingX } from "../LandingPage";
import FeatureCard from "./FeatureCard";
const features = [
    { key: "create&edit", icon: "edit-contained" },
    { key: "tags&categories", icon: "tag" },
    { key: "achievements&rewards", icon: "star" },
    { key: "stats&charts", icon: "pie-chart", noOpacity: true },
    { key: "arabic&english", icon: "language" },
    { key: "dark&light", icon: "moon" },
    { key: "accentColors", icon: "theme" },
    { key: "notifications", icon: "bell" },
]


export default function FeaturesSection({ className = "", children, ...props }) {
    const t = useTranslation();
    return (
        <div className={`${paddingX} border-b py-[2rem] ${className}`} {...props}>
            <h1 className=" text-start text-[2rem] mb-[1rem] md:text-[2.5rem] w-full ">{t("titles.keyFeatures")}</h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-[1.5rem] auto-rows-auto">
                {features.map((feat, i) => <li key={i}> <FeatureCard feat={feat} /></li>)}
            </ul>
        </div>
    );
}