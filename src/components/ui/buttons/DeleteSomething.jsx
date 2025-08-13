import { useTranslation } from "@/context/Language";
import { YesNoPopUp } from ".";

export default function DeleteSomething({ title, something, className = "", children, ...props }) {
    const t = useTranslation();
    return (
        <YesNoPopUp yes={t("titles.delete")} no={t("terms.cancel")} className={`${className}`} {...props}>
            <h3 className="mb-[0.5rem]">{`${t("titles.delete")} ${title}`}</h3>
            {t("terms.deleting")} <span className="text-yellow-600">{something}</span>.
        </YesNoPopUp>
    );
}