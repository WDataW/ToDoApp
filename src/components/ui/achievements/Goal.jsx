import { numToArabic, numToRoman } from "@/context/Language";
import { useLang } from "@/context/Language";
import { useTranslation } from "@/context/Language";
import ProgressBar from "./ProgressBar";
export default function Goal({ goal, className = "", children, ...props }) {
    const t = useTranslation();
    const [lang] = useLang();

    const image = `/images/achievements/${goal.titleKey}/${goal.theme}.png`
    return (
        <div className={`text-center min-w-[10rem] relative ${className} border p-[0.85rem] rounded-[0.6rem] flex flex-col items-center justify-between `} {...props}>
            <div className="flex flex-col items-center justify-center">
                <img className=" min-w-[5.5rem] h-[5.5rem] mb-[0.2rem]" src={image} alt="" />
                <p className="text-nowrap font-bold mb-[0.2rem] capitalize">{`${t("titles." + goal.titleKey)} ${lang == "ar" ? numToArabic(goal.level) : numToRoman(goal.level)}`}</p>
                <p className="opacity-80 text-[0.85rem] mb-[0.3rem]">{goal.description}</p>

            </div>
            <ProgressBar numerator={goal.currentCount} denominator={goal.goalCount} />
        </div>
    );
}