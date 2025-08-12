import { numToArabic, numToRoman, useLang, useTranslation } from "@/context/Language";
import { useTheme } from "@/context/Theme";

const icons = {
    dark: "bg-[url(/src/assets/icons/dark/tick.svg)]",
    light: "bg-[url(/src/assets/icons/light/tick.svg)]"
}

export default function Trophy({ trophy, className = "", children, ...props }) {
    const t = useTranslation();
    const [theme] = useTheme();
    const [lang] = useLang();

    const image = `/images/achievements/${trophy.titleKey}/${trophy.theme}.png`
    return (
        <div className={` min-h-[11.925rem] w-[9.5rem] relative ${className} border p-[0.9rem] rounded-[0.6rem] flex flex-col items-center justify-center `} {...props}>
            <img className=" min-w-[5.5rem] h-[5.5rem] mb-[0.2rem]" src={image} alt="" />
            <p className="text-nowrap font-bold capitalize mb-[0.2rem]">{`${t("titles." + trophy.titleKey)} ${lang == "ar" ? numToArabic(trophy.level) : numToRoman(trophy.level)}`}</p>
            <p className="text-center opacity-80 text-[0.85rem] mb-[0.3rem]">{trophy.description}</p>
            <div className={`${icons[theme]}  bg-no-repeat bg-center bg-cover absolute h-[1.4rem] w-[1.4rem] top-[0.3rem] end-[0.3rem] `}></div>
        </div>
    );
}