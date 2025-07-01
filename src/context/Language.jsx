import { createContext, useEffect, useContext ,useState } from "react";
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
export function updateLang(lang){
    i18next.changeLanguage(lang);
    document.documentElement.lang = lang;
    document.body.dir = getDirection(lang)
}
export function getDirection(lang){
    return lang=="ar"? "rtl" : "ltr";
}
export function useTranslation(){
    return useContext(TranslationContext);
}
export function useLang(){
    return useContext(LangContext)
}
const TranslationContext = createContext()
const LangContext = createContext();
export default function Language({children}){
    const [lang, setLang] = useState(getUserLanguagePreference());
    const dir = getDirection(lang);
    
    useEffect(()=>{// to initialize app language
        updateLang(lang)
    },[]);
    
    return(
        <TranslationContext value={(args)=>i18next.t(args)}>
            <LangContext value={[lang, setLang]}>    
                {children}
            </LangContext>    
        </TranslationContext>
    );

}