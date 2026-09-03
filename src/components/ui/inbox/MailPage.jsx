import { OverlayPage } from "@/Pages";
import { Main } from "..";
import { activeSurfaceBgColors, darkerBgThemeColors, useTheme } from "@/context/Theme";
import { useLang, useTranslation } from "@/context/Language";
import { useEffect } from "react";
import { useUpdateMail } from "./mail";
import { numericDateFormatters, timeFormatters } from "../../../scripts/dateTime";
import { readMessage } from "@/scripts/requests";


export default function MailPage({ mail, close, className = "", children, ...props }) {

    const [theme] = useTheme();
    const t = useTranslation();
    const [lang] = useLang();
    const recievedAtDate = numericDateFormatters[lang](new Date(mail.receivedAt));
    const recievedAtTime = timeFormatters[lang](new Date(mail.receivedAt));
    const updateMail = useUpdateMail();
    const updateRead = async () => {
        if (!mail.read) {
            const updatedMessage = await readMessage({ messageId: mail.id, from: mail.from });
            updateMail({ ...mail, read: updatedMessage.read });
        }
    }
    const from = mail.from == "system" ? t("terms.system") : mail.from;

    useEffect(() => {
        updateRead();
    }, []);
    return (
        <OverlayPage overAnOverlay={true} id="mailPage" close={close} className={` ${className}`} {...props}>
            <Main className="flex items-center flex-col ">
                <div className={` ${className} ${darkerBgThemeColors[theme]} text-start text-white p-[1rem]  ps-[1rem] w-full rounded-[0.4rem]  `} {...props}>
                    <div className="flex flex-wrap justify-between opacity-75 text-[0.8rem]">
                        <p className=" capitalize">{t("terms.from")} <span className="text-yellow-300">{from}</span></p>
                        <p>{recievedAtDate} {`${t("terms.atTime")} ${recievedAtTime}`}</p>
                    </div>
                    <h3 className="pb-[0.4rem] mt-[0.3rem]">{mail.title}</h3>
                    <div className={`min-h-[5rem] ${theme == "dark" ? "text-white" : "text-black"} rounded-[0.3rem] p-[0.8rem] ${activeSurfaceBgColors[theme]}`}>
                        {mail.content}
                    </div>
                </div>
            </Main>
        </OverlayPage>
    );
}