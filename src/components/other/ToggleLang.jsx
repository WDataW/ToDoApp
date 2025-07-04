import { useLang, updateLang } from "../../context/Language";
export default function ToggleLang(){
    const [lang, setLang] = useLang();
    
    return(
        <input type="checkbox" checked={lang=="en"} className="fixed bottom-[5rem] h-10 w-10 mt-4" onChange={()=>{
            const nextLang = lang=="en"?"ar":"en";
            updateLang(nextLang);
            setLang(nextLang);
        }} />
    );
}