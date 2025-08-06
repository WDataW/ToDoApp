import { useTranslation } from "@/context/Language";
import DatePicker from "./DatePicker";
import HourPicker from "./HourPicker";
import MinutePicker from "./MinutePicker";
import { useEffect, useState } from "react";
import { WarningMessage } from "../messages";
export default function DateTimePicker({ dateTime, setDateTime, className = "", children, ...props }) {
    const t = useTranslation();
    const [date, setDate] = useState(dateTime);
    const [hour, setHour] = useState(String(dateTime.getHours()).padStart(2, "0") || 23);
    const [minute, setMinute] = useState(String(dateTime.getMinutes()).padStart(2, "0") || 59);
    useEffect(() => {
        if (date) {
            const newDate = new Date(date);
            newDate.setHours(hour, minute, 0);
            setDateTime(newDate)
        }
    }, [date, hour, minute]);

    const selectedDate = new Date(dateTime);
    selectedDate.setHours(hour, minute, 0);

    const nowDate = new Date();
    nowDate.setSeconds(0);
    const pastDate = selectedDate.getTime() <= nowDate.getTime();
    return (
        <div className={`${className} `} {...props}>
            <div className="flex gap-[0.5rem]">
                <DatePicker date={date} setDate={setDate} label={t("fields.dueDate")} className="max-w-[10rem] text-[0.9rem] flex-2"></DatePicker>
                <HourPicker hour={hour} setHour={setHour} labelClassName="text-[0.9rem] flex-1 max-w-[10rem]"></HourPicker>
                <MinutePicker minute={minute} setMinute={setMinute} labelClassName="text-[0.9rem] flex-1 max-w-[10rem]"></MinutePicker>
            </div>
            {pastDate && <WarningMessage className={"ms-[0.2rem] mt-[0.3rem]"}>{t("terms.pastDate")}</WarningMessage>}
        </div>
    );
}