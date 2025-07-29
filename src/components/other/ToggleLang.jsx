import { useLang, useUpdateUserLang } from "../../context/Language";
export default function ToggleLang() {
    const [lang, setLang] = useLang();
    const updateUserLang = useUpdateUserLang();
    return (
        <input type="checkbox" checked={lang == "en"} className="fixed bottom-[5rem] h-10 w-10 mt-4" onChange={() => {
            const nextLang = lang == "en" ? "ar" : "en";
            updateUserLang(nextLang);
            setLang(nextLang);
        }} />
    );
}