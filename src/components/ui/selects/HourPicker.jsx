import { numToArabic, useLang, useTranslation } from "@/context/Language";
import Select from "./Select";
export default function HourPicker({ hour, setHour, children, ...props }) {
    const t = useTranslation();
    const [lang] = useLang();
    let hourOptions = [];
    for (let i = 0; i < 24; i++) {
        const option = lang == "ar" ? <option value={i} key={i}>{numToArabic(String(i).padStart(2, "0"))}</option> : <option value={i} key={i}>{String(i).padStart(2, "0")}</option>;
        hourOptions = [...hourOptions, option];
    }

    return (
        <Select value={hour} onChange={(e) => { setHour(e.target.value) }} label={t("fields.hour")}  {...props}>
            {hourOptions}
        </Select>
    );
}