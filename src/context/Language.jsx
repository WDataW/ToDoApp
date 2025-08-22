import { createContext, useEffect, useContext, useState } from "react";
import i18next from "i18next";
import en from "../locales/en.json";
import ar from "../locales/ar.json";
function getBrowserLanguage() {
    return navigator.language.startsWith("ar") ? "ar" : "en";
}
import userData from "../../src/assets/user.json";
import { useInfo } from "./User";
function getInitLang() {
    let userLang;
    if (userData) userLang = userData?.info?.settings?.language;
    return userLang || getBrowserLanguage();
}

i18next.init({

    lng: getInitLang(),
    fallbackLng: "en",

    resources: {
        en: {
            translation: en
        },
        ar: {
            translation: ar
        }
    },


});
i18next.services.formatter.add("arabNum", (value) => numToArabic(value));
export function numToArabic(num) {
    const arabicNums = {
        0: "٠",
        1: "١",
        2: "٢",
        3: "٣",
        4: "٤",
        5: "٥",
        6: "٦",
        7: "٧",
        8: "٨",
        9: "٩",
    }
    num = String(num);
    const enNums = num.split("");
    const arNums = enNums.map((num) => arabicNums[num] || num);
    return arNums.join("");
}
const romanNums = {
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
    5: "V",
    6: "VI",
    7: "VII",
    8: "VIII",
    9: "IX",
    10: "X",
}
export function numToRoman(num) {// limit =10
    if (num > 10 || num == 0 || isNaN(parseFloat(num))) return num;
    return romanNums[num];
}

export function updateLang(lang) {
    i18next.changeLanguage(lang);
    document.documentElement.lang = lang;
    document.body.dir = getDirection(lang);

}

export function useUpdateUserLang() {
    const [userInfo, setUserInfo] = useInfo();
    return (lang) => {
        updateLang(lang);
        setUserInfo({ ...userInfo, settings: { ...userInfo["settings"], language: lang } });
    }
}
export function getDirection(lang) {
    return lang == "ar" ? "rtl" : "ltr";
}
export function useTranslation() {
    return useContext(TranslationContext);
}
export function useLang() {
    return useContext(LangContext)
}
const TranslationContext = createContext()
const LangContext = createContext();


export default function Language({ children }) {
    const [lang, setLang] = useState(getInitLang());



    const updateUserLang = useUpdateUserLang();
    useEffect(() => {// to initialize app language
        updateUserLang(lang);
    }, []);

    return (
        <TranslationContext value={(args, inter) => i18next.t(args, inter)}>
            <LangContext value={[lang, setLang]}>
                {children}
            </LangContext>
        </TranslationContext>
    );

}