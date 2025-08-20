import { KeyboardInput, ThemedAnchor, ThemedRectButton } from "../../../components/ui";
import Page from "../../Page";
import { useTheme } from "../../../context/Theme";
import { commonStyles } from "../commonStyles";
import { useTranslation } from "../../../context/Language";
import { useState, useRef, useEffect } from "react";
import { useScreenWidth } from "@/context/ScreenSize";

const initialCode = {
    0: "",
    1: "",
    2: "",
    3: ""
}


export default function VerificationCodePage({ email = "you@example.com" }) {
    useEffect(() => {
        for (let i = 0; i < 4; i++) {
            getMap().get(i).addEventListener("keydown", handleBackspace);
        }
        getMap().get(0).focus();
        return () => {
            for (let i = 0; i < 4; i++) {
                if (getMap().get(i)) getMap().get(i).removeEventListener("keydown", handleBackspace);
            }
        }
    }, []);

    const [theme] = useTheme();


    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        if (currentIndex >= 0) {
            getMap().get(currentIndex).focus()
        } else if (currentIndex < 0) {
            setCurrentIndex(0);
        }
    }, [currentIndex])
    function handleBackspace(e) {
        if (e.key == "Backspace") {

            setCurrentIndex((c) => c - 1);


        }
    }
    const codeKeys = ["0", "1", "2", "3"];
    const [code, setCode] = useState(initialCode);
    function handleChange(e, i) {
        const inputValue = e.target.value;
        const newValue = inputValue.length > 1 ? inputValue.charAt(1) : inputValue.charAt(0);
        setCode({ ...code, [i]: newValue });

        const map = getMap()
        const nextInputIndex = i == 3 ? 0 : i + 1
        if (!map.get(i).value) return;// means the current input box has been cleared no need to move to the next

        setCurrentIndex(nextInputIndex);

        for (let i = 0; i < 4; i++) {
            if (!map.get(i).value) {
                return
            }
        }
        document.getElementById("verificationCodeForm").submit();

    }



    const inputElements = useRef(null);
    function getMap() {
        if (!inputElements.current) {
            inputElements.current = new Map();
        }
        return inputElements.current;
    }

    const t = useTranslation();
    const styles = commonStyles;
    const w = useScreenWidth();
    return (
        <Page className={styles["page"]}>
            <div className={`frosted-glass p-[1.5rem] rounded-[0.5rem] md:text-white w-full max-w-[23.5rem]`}>
                <h2 className="text-center ">{t("titles.resetPassword")}</h2>
                <p className="text-center opacity-70 mb-[2rem]">{t("terms.weSentACodeTo")} {email}</p>
                <form id={"verificationCodeForm"} action="">
                    <div className="flex gap-[0.4rem]" dir="ltr">
                        {
                            codeKeys.map((_, i) =>
                                <KeyboardInput
                                    customTheme={`auth${theme}`} customIcon={w >= 768 && "dark"}
                                    key={i}
                                    ref={(ref) => {
                                        const map = getMap();
                                        map.set(i, ref);
                                    }}
                                    value={code[i]}
                                    handleChange={(e) => { handleChange(e, i) }}
                                    type="number"
                                    required={true}
                                    customStyles={"w-full bg-transparent outline-none  border-b   placeholder-opacity-50"}
                                    className="border rounded-[0.3rem] mb-[0.65rem] aspect-1/1 text-center text-3xl  " />
                            )
                        }
                    </div>
                    <ThemedRectButton type="submit" disabled={!code["0"] || !code["1"] || !code["2"] || !code["3"]}>{t("titles.continue")}</ThemedRectButton>
                </form>
                <a href={null} className="text-[0.8rem] opacity-50 ">{t("titles.signIn")}</a>
                <p className="text-[0.8rem] opacity-70 text-center mt-[0.75rem]">{t("terms.didntRecieveAnEmail")} <ThemedAnchor href="">{t("terms.sendAgain")}</ThemedAnchor></p>
            </div>

        </Page>
    );
}