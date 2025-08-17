import { useTranslation } from "../../context/Language";
import { useEffect, useState } from "react";
import AppPage from "./AppPage";
import { AnimatePresence, motion } from "motion/react";
import { AppPageHeader, CategoriesSection, CreateTaskButton, TasksSection, Main, SearchInput, TasksCalendar } from "../../components/ui";
import { isUUID, taskSkeleton } from "@/components/ui/tasks/tasks";
export default function TasksPage({ className = "", children, ...props }) {
    const t = useTranslation();
    const [activeTags, setActiveTags] = useState([t("terms.active")]);
    useEffect(() => {
        if (activeTags.length == 0) {
            const firstTag = document.querySelector(".tags-list li div button")
            if (firstTag) {
                const defaultActive = firstTag.id;
                setActiveTags([defaultActive]);
            }
        }
    }, [activeTags]);

    const [searchFilter, setSearchFilter] = useState("");
    return (
        <AppPage id="tasksPage" title={"tasks"} className={`${className}`} {...props}>
            <AppPageHeader >{t("titles.tasks")}</AppPageHeader>
            <Main >
                <TasksCalendar className="mb-[4rem]" />
                <CategoriesSection activeTags={activeTags} setActiveTags={setActiveTags} className="mb-[0.7rem]"></CategoriesSection>
                <AnimatePresence mode="wait">
                    <motion.div key={"k" + activeTags.length} exit={{ y: 25, opacity: 0 }} initial={{ y: 25, opacity: 0 }} animate={{ y: 0, opacity: 1 }} >
                        <div className="flex gap-[0.4rem] mb-[0.9rem]">
                            <SearchInput required={false} value={searchFilter} handleChange={(e) => { setSearchFilter(e.target.value) }} placeholder={t("fields.searchTask")} className="text-[0.9rem]  max-w-[20rem]"></SearchInput>
                            <CreateTaskButton taskToEdit={{ ...taskSkeleton, tags: activeTags.filter((tag) => isUUID(tag.slice(4))) }} className=" text-[0.9rem] h-[2.1rem] outline-none  px-[0.8rem]  rounded-[0.4rem] text-nowrap "></CreateTaskButton>
                        </div>
                        <TasksSection heading={activeTags} tagsFilter={activeTags} searchFilter={searchFilter} ></TasksSection>
                    </motion.div>
                </AnimatePresence>
            </Main>
            {children}
        </AppPage >
    );
}