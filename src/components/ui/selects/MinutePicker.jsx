import { numToArabic, useLang, useTranslation } from "@/context/Language";
import Select from "./Select";
export default function MinutePicker({ minute, setMinute, children, ...props }) {
    const t = useTranslation();
    const [lang] = useLang();
    let minuteOptions = [];
    for (let i = 0; i < 60; i++) {
        const option = lang == "ar" ? <option value={i} key={i}>{numToArabic(String(i).padStart(2, "0"))}</option> : <option value={i} key={i}>{String(i).padStart(2, "0")}</option>
        minuteOptions = [...minuteOptions, option];
    }
    return (
        <Select value={minute} onChange={(e) => { setMinute(e.target.value) }} label={t("fields.minute")} {...props}>
            {minuteOptions}
        </Select>
    );
}