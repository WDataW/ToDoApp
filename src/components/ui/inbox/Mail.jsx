import { useTheme, darkerBgThemeColors } from "@/context/Theme";
import { useTranslation, useLang } from "@/context/Language";
import { numericDateFormatters, timeFormatters } from "../../../scripts/dateTime";
export default function Mail({ mail, className = "", children, ...props }) {
    const [theme] = useTheme();
    const t = useTranslation();
    const [lang] = useLang();
    const recievedAtDate = numericDateFormatters[lang](new Date(mail.receivedAt));
    const recievedAtTime = timeFormatters[lang](new Date(mail.receivedAt));


    return (
        <>
            <button className={`${mail.read && "opacity-60"} ${className} ${darkerBgThemeColors[theme]} text-start text-white p-[1rem]  ps-[1rem] w-full rounded-[0.4rem]  `} {...props}>
                <div className="flex flex-wrap justify-between opacity-75 text-[0.8rem] ">
                    <p className="capitalize">{t("terms.from")} <span className="text-yellow-300">{t(`terms.${mail.from}`)}</span></p>
                    <p>{recievedAtDate} {`${t("terms.atTime")} ${recievedAtTime}`}</p>
                </div>
                <h3 className="mt-[0.3rem]">{mail.title}</h3>

            </button>
        </>
    );
}