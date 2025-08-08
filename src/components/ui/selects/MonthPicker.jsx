import { useLang, useTranslation } from "@/context/Language";
import Select from "./Select";
export default function MonthPicker({ month, setMonth, children, ...props }) {
    const t = useTranslation();
    const [lang] = useLang();
    let monthOptions = [];
    for (let i = 1; i < 13; i++) {
        const month = new Date(Date.UTC(2025, i - 1, 1)).toLocaleString(lang == "ar" ? "ar-SA" : "en-US", { calendar: "gregory", month: "long" });
        const option = <option value={i} key={i}>{month}</option>
        monthOptions = [...monthOptions, option];
    }
    return (
        <Select value={month} onChange={(e) => { setMonth(e.target.value) }} label={t("fields.month")} {...props}>
            {monthOptions}
        </Select>
    );
}
