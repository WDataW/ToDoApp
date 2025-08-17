import { AnimatePresence, motion } from "motion/react";
import { taskSkeleton, useMonthlyDueTasksData } from "./tasks";
import { Day } from "../calendar";
import { useState } from "react";
import { YearPicker, TasksSection, MonthPicker, SectionContainer, SearchInput, CreateTaskButton } from "..";
import { numToArabic, useLang, useTranslation } from "@/context/Language";

export default function TasksCalendar({ className = "", children, ...props }) {
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [day, setDay] = useState(new Date().getDate());
    const [picked, setPicked] = useState(new Date(year, month - 1, day, 23, 59));
    const t = useTranslation();
    const [searchFilter, setSearchFilter] = useState("");
    const [lang] = useLang();
    const data = useMonthlyDueTasksData(year, month);
    return (
        <div className={`${className}`} {...props}>
            <SectionContainer className="border justify-center mb-[1rem]">
                <h3 className="capitalize border-b mb-[0.3rem] mx-[0.4rem]"><span className="h-[1rem] me-[0.3rem] bg-size-[1.2rem_1.2rem] w-[1rem] bg-[url(/src/assets/icons/dark/calendar.svg)] bg-cover bg-center bg-no-repeat inline-block"></span>{t("terms.calendar")}</h3>

                <div className="flex   gap-[0.5rem] p-[0.5rem]">
                    <YearPicker year={year} setYear={setYear}></YearPicker>
                    <MonthPicker month={month} setMonth={setMonth} ></MonthPicker>
                </div>
                <ol className="calendar gap-[0.3rem] md:gap-[0.5rem] justify-items-center m-[0.5rem] ">
                    {data.map((d, i) => { return <li key={i}><Day date={new Date(year, month - 1, i + 1)} picked={picked} onClick={() => { setPicked(new Date(year, month - 1, i + 1, 23, 59)); setDay(i + 1) }} day={d}></Day></li> })}
                </ol>
            </SectionContainer>
            <AnimatePresence mode="wait">
                <motion.div className="mb-[2rem]" key={day} exit={{ y: 25, opacity: 0 }} initial={{ y: 25, opacity: 0 }} animate={{ y: 0, opacity: 1 }} >
                    <div className="flex gap-[0.4rem] mb-[0.9rem]">
                        <SearchInput required={false} value={searchFilter} handleChange={(e) => { setSearchFilter(e.target.value) }} placeholder={t("fields.searchTask")} className="text-[0.9rem]  max-w-[20rem]"></SearchInput>
                        <CreateTaskButton taskToEdit={{ ...taskSkeleton, dueDate: picked.toISOString() }} className=" text-[0.9rem] h-[2.1rem] outline-none  px-[0.8rem]  rounded-[0.4rem] text-nowrap "></CreateTaskButton>
                    </div>
                    <TasksSection customHeading={picked.toLocaleString(lang == "ar" ? "ar-SA" : "en-US", { weekday: "long", calendar: "gregory" })} heading={lang == "ar" ? [numToArabic(`${picked.getDate()} / ${picked.getMonth() + 1} / ${picked.getFullYear()}`)] : [`${picked.getDate()} / ${picked.getMonth() + 1} / ${picked.getFullYear()}`]} dateFilter={picked} searchFilter={searchFilter} ></TasksSection>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}