import { useTranslation } from "@/context/Language";

export default function ColorPicker({ color, setColor, children, className, ...props }) {
    const t = useTranslation();

    return (
        <label className="flex flex-col w-full">
            <span className="ps-[0.3rem]">{t("fields.color")}</span>
            <input value={color} onChange={(e) => { setColor(e.target.value) }} className={`${className} h-[2.5rem]  w-full `} type="color" />
        </label>
    );
}