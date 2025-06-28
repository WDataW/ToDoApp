import { createContext, useContext, useState } from "react";
import i18next from "i18next";
import en from "../locales/en.json";
import ar from "../locales/ar.json";

function getUserLanguagePreference(){
    return navigator.language.startsWith("ar")?"ar":"en";
}

i18next.init({
    lng:"en",
    fallbacklng:"en",
    resources:{
        en:{
            translation: en
        },
        ar:{
            translation: ar
        }
    }
    
});
export function useTranslation(){
    return useContext(TranslationContext);
}
const TranslationContext = createContext()
export default function Language({children}){
    const [lang, setLang] = useState(getUserLanguagePreference());
    lang=="ar"? i18next.changeLanguage("ar"):i18next.changeLanguage("en");
    lang=="ar"? document.body.dir="rtl": document.body.dir="ltr"; 
    return(
        <TranslationContext value={i18next.t}>
            {children}
        </TranslationContext>
    );

}