import { useTranslation } from "../../context/Language";
import AppPage from "./AppPage";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AppPageHeader, CategoriesSection, TasksSection, Main, SearchInput } from "../../components/ui";
export default function TasksPage({ className = "", children, ...props }) {
    const t = useTranslation();
    const [activeTags, setActiveTags] = useState([]);

    let lastTagIndex = activeTags.length - 1;
    if (activeTags.length == 0) lastTagIndex = 0;


    const [searchFilter, setSearchFilter] = useState("");
    return (
        <AppPage id="tasksPage" title={"tasks"} className={`${className}`} {...props}>
            <AppPageHeader>{t("titles.tasks")}</AppPageHeader>
            <Main>
                <CategoriesSection activeTags={activeTags} setActiveTags={setActiveTags} className="mb-[1rem]"></CategoriesSection>
                <AnimatePresence mode="wait">
                    <motion.div key={"k" + activeTags.length} exit={{ y: 25, opacity: 0 }} initial={{ y: 25, opacity: 0 }} animate={{ y: 0, opacity: 1 }} >
                        <SearchInput required={false} value={searchFilter} handleChange={(e) => { setSearchFilter(e.target.value) }} placeholder={t("fields.searchTask")} className="mb-[0.9rem] max-w-[20rem]"></SearchInput>
                        <TasksSection heading={activeTags} tagsFilter={activeTags} searchFilter={searchFilter} ></TasksSection>
                    </motion.div>
                </AnimatePresence>

            </Main>
            {children}
        </AppPage >
    );
}