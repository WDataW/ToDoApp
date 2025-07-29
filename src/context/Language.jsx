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
    return userData["info"]["settings"]["language"] || getBrowserLanguage();
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
    }

});

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
    const dir = getDirection(lang);



    const updateUserLang = useUpdateUserLang();
    useEffect(() => {// to initialize app language
        updateUserLang(lang);
    }, []);

    return (
        <TranslationContext value={(args) => i18next.t(args)}>
            <LangContext value={[lang, setLang]}>
                {children}
            </LangContext>
        </TranslationContext>
    );

}