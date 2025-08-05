"use client"

import { useState } from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/shadcn/button"
import { Calendar } from "@/components/ui/shadcn/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/shadcn/popover"
import { useTheme, textColors } from "@/context/Theme"
function formatDate(date) {
    const day = String(date.getDate());
    const month = String(date.getMonth() + 1);
    const year = String(date.getFullYear());
    return `${day}/${month}/${year}`
}
export default function DatePicker({ date, setDate, label, className }) {
    const [open, setOpen] = useState(false)
    const [theme] = useTheme();

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
