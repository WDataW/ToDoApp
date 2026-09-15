import Page from "../../Page";
import { useTranslation } from "../../../context/Language";
import { commonStyles } from "../commonStyles";
import { ThemedRectButton } from "@/components/ui";
import { Link } from "react-router-dom";
import { useScreenWidth } from "@/context/ScreenSize";
import { useEffect } from "react";
import { preload } from "react-dom";
export default function SetNewPasswordPage() {
    const styles = commonStyles;
    const t = useTranslation();
    const w = useScreenWidth();
    useEffect(() => {
        if (w >= 768) preload("/images/desk.jpg", { as: "image" })
    }, []);
    return (
        <Page className={styles["page"]}>
            <div className={`frosted-glass p-[1.5rem] rounded-[0.5rem] md:text-white w-full  max-w-[23.5rem]`}>
                <h2 className="text-center mb-[1rem]">{t("titles.checkYourEmail")}</h2>
                <p className="text-center opacity-70 mb-[2rem]">{t("terms.sentYouALink")} </p>
                <Link to="/">
                    <ThemedRectButton>{t("terms.returnToHome")}</ThemedRectButton>
                </Link>
            </div>
        </Page>
    );

}