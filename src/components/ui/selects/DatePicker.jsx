"use client"
import { useState } from "react"
import { ChevronDownIcon } from "lucide-react"
import { ar } from "date-fns/locale";
import { Button } from "@/components/ui/shadcn/button"
import { Calendar } from "@/components/ui/shadcn/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/shadcn/popover"
import { useTheme, textColors } from "@/context/Theme"
import { numToArabic, useLang } from "@/context/Language"
function formatDate(date) {
    const [lang] = useLang();
    if (lang == "ar") {
        const day = numToArabic(date.getDate());
        const month = numToArabic(date.getMonth() + 1);
        const year = numToArabic(date.getFullYear());
        return `${year}/${month}/${day}`
    }

    const day = String(date.getDate());
    const month = String(date.getMonth() + 1);
    const year = String(date.getFullYear());
    return `${day}/${month}/${year}`
}
const formatters = {
    ar: {
        formatMonthDropdown: (date) =>
            date.toLocaleString("ar-SA", { calendar: "gregory", month: "long" }),
        formatYearDropdown: (year) =>
            year.toLocaleString("ar-SA", { calendar: "gregory", year: "numeric" }),
        formatDay: (day) => numToArabic(day.getDate()),
    },
    en: {
        formatMonthDropdown: (date) =>
            date.toLocaleString("en-SA", { calendar: "gregory", month: "long" }),

    }
}
const locales = {
    ar: ar,
}
export default function DatePicker({ date, setDate, label, className }) {
    const [open, setOpen] = useState(false)
    const [theme] = useTheme();
    const [lang] = useLang();

    return (
        <div className={className}>
            <label htmlFor="date-picker" className="ms-[0.2rem] block " >
                {label}
            </label>
            <Popover open={open} onOpenChange={setOpen} className="">
                <PopoverTrigger asChild>
                    <Button
                        id="date-picker"
                        className={`${textColors[theme]} py-[0.42rem] ps-[0.42rem] bg-transparent border w-full justify-between font-normal`}
                    >
                        {date ? formatDate(date) : "Date"}
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                        locale={locales[lang]}
                        formatters={formatters[lang]}
                        today={date}
                        selected={date}
                        mode="single"
                        fromYear={new Date().getFullYear()}
                        toYear={new Date().getFullYear() + 5}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                            setDate(date)
                            setOpen(false)
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
