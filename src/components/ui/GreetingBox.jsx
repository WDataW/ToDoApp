import { ThemedRectButton } from "./buttons";
import { gradientColors, useTheme, hoverTextThemeColors } from "../../context/Theme";
import { useInfo } from "../../context/User";
import { useTranslation } from "../../context/Language";
export default function greetingBox({ className = "", children, ...props }) {
    const [theme] = useTheme();
    const hoverTextColor = hoverTextThemeColors[theme];
    const t = useTranslation();
    const [userInfo] = useInfo();
    return (
        <section className={`${className} text-white animate-radial bg-radial-[at_70%_100%] bg-size-[210%] ${gradientColors[theme]} flex items-end justify-start  p-[2rem]  rounded-[0.5rem] aspect-3/2  `} {...props}>
            <div className={`text-shadow-lg/5 `}>
                <h2 className="">{t("terms.welcomeBack")} {userInfo.name}</h2>
                <p className="mb-[2rem] text-[0.8rem]">{t("terms.letsMakeTodayProductive")}</p>
                <ThemedRectButton customTheme="transparent" className={`border-[0.1rem] bg-[rgba(0,0,0,0.10)] max-w-[10rem] transition duration-300 hover:bg-white ${hoverTextColor}`}>{t("titles.viewAllTasks")}</ThemedRectButton>
            </div>
        </section>
    );
}