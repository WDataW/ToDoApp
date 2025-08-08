import { numToArabic, useLang, useTranslation } from "@/context/Language";
import Select from "./Select";
import { useInfo } from "@/context/User";
export default function YearPicker({ year, setYear, children, ...props }) {
    const t = useTranslation();
    const [lang] = useLang();
    const [info] = useInfo()
    let yearOptions = [];
    const startYear = new Date(info.createdAt).getFullYear();
    const endYear = new Date().getFullYear();
    for (let i = startYear; i <= endYear; i++) {
        const option = lang == "ar" ? <option value={i} key={i}>{numToArabic(String(i))}</option> : <option value={i} key={i}>{String(i)}</option>
        yearOptions = [...yearOptions, option];
    }
    return (
        <Select value={year} onChange={(e) => { setYear(e.target.value) }} label={t("fields.year")} {...props}>
            {yearOptions}
        </Select>
    );
}
