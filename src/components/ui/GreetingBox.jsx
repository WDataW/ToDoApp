import { ThemedRectButton } from "./buttons";
import { CreateTaskButton } from "./buttons";
import { gradientColors, useTheme, hoverTextThemeColors } from "../../context/Theme";
import { useInfo } from "../../context/User";
import { useTranslation } from "../../context/Language";
import { Link } from "react-router-dom";
export default function greetingBox({ className = "", children, ...props }) {
    const [theme] = useTheme();
    const hoverTextColor = hoverTextThemeColors[theme];
    const t = useTranslation();
    const [userInfo] = useInfo();
    return (
        <section className={`${className} text-white animate-radial bg-radial-[at_45%_50%]   bg-size-[100%] ${gradientColors[theme]} flex items-end justify-start  p-[1.5rem]  rounded-[0.5rem] aspect-3/2  `} {...props}>
            <div className={`text-shadow-lg/5 `}>
                <h2 className="">{t("terms.welcomeBack")} {userInfo.fullName}</h2>
                <p className="mb-[2rem] text-[0.8rem]">{t("terms.letsMakeTodayProductive")}</p>
                <div className="flex gap-[0.4rem] h-[3.5rem] ">
                    <Link to="/app/tasks#categories-section"><ThemedRectButton style={{ padding: "0.5rem" }} customTheme=" transparent" className={`border-[0.1rem] text-wrap h-full bg-[rgba(0,0,0,0.10)] max-w-[10rem] transition duration-300 hover:bg-white ${hoverTextColor}`}>{t("titles.viewAllTasks")}</ThemedRectButton></Link>
                    <CreateTaskButton customTheme="transparent" className={`text-wrap   p-[0.5rem] border-[0.1rem] bg-[rgba(0,0,0,0.10)]  max-w-[8.5rem] transition duration-300 hover:bg-white ${hoverTextColor}`} />
                </div>

            </div>
        </section >
    );
}