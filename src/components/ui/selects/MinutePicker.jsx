import { useTranslation } from "@/context/Language";
import Select from "./Select";
let minuteOptions = [];
for (let i = 0; i < 60; i++) {
    minuteOptions = [...minuteOptions, <option key={i}>{String(i).padStart(2, "0")}</option>];
}
export default function MinutePicker({ minute, setMinute, children, ...props }) {
    const t = useTranslation();
    return (
        <Select value={minute} onChange={(e) => { setMinute(e.target.value) }} label={t("fields.minute")} {...props}>
            {minuteOptions}
        </Select>
    );
}