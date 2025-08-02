import { useAchievements } from "@/context/User";
import Achievement from "./Achievement";
import { useTranslation } from "@/context/Language";
export default function AchivementsContainer({ className = "", children, ...props }) {
    const [ach] = useAchievements();
    const t = useTranslation();
    return (
        <div>
            <h3 className="border-b mb-[1rem] mx-[0.4rem]">{t("titles.achievements")}</h3>
            <ul className={`${className} mx-[0.4rem] pb-[0.4rem] flex justify-start gap-[2rem] overflow-x-auto`} {...props}>
                {ach.map((ach) => { return <Achievement achievement={ach} /> })}
                {ach.length == 0 && <h4>{t("terms.noAchsAvailable")}</h4>}
            </ul>
        </div>
    );
}