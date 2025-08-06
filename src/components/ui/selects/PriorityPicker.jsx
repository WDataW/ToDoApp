import Select from "./Select";
import { useTheme } from "@/context/Theme";
import { useTranslation } from "@/context/Language";
const bgColors = {
    light: "bg-[#F0F1F2] ",
    dark: "bg-[#1f1e1e] "
};
export default function PriorityPicker({ priority, setPriority, children, ...props }) {
    const t = useTranslation();
    const priorityObjects = [
        { value: "low", priority: t("terms.low"), color: "text-[var(--color-low-priority)]" },
        { value: "medium", priority: t("terms.medium"), color: "text-[var(--color-medium-priority)]" },
        { value: "high", priority: t("terms.high"), color: "text-[var(--color-high-priority)]" },
    ];
    const priorityOptions = priorityObjects.map((obj) => {
        return <option key={"k" + obj.priority} value={obj.value} className={obj.color}>
            {obj.priority}
        </option>
    })
    let [priorityColor] = priorityObjects.filter((obj) => obj.value == priority);
    priorityColor = priorityColor.color;
    const [theme] = useTheme();
    return (
        <Select value={priority} className={`${bgColors[theme]} ${priorityColor}`} onChange={(e) => { setPriority(e.target.value) }} label={t("fields.priority")}  {...props}>
            {priorityOptions}
        </Select>
    );
}