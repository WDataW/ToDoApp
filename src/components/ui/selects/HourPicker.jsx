import { useTranslation } from "@/context/Language";
import Select from "./Select";
let hourOptions = [];
for (let i = 0; i < 24; i++) {
    hourOptions = [...hourOptions, <option key={i}>{String(i).padStart(2, "0")}</option>];
}
export default function HourPicker({ hour, setHour, children, ...props }) {
    const t = useTranslation();

    return (
        <Select value={hour} onChange={(e) => { setHour(e.target.value) }} label={t("fields.hour")}  {...props}>
            {hourOptions}
        </Select>
    );
}