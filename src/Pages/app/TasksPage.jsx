import { useTranslation } from "../../context/Language";
import AppPage from "./AppPage";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AppPageHeader, CategoriesSection, TasksSection, Main } from "../../components/ui";
export default function TasksPage({ className = "", children, ...props }) {
    const t = useTranslation();
    const [activeTags, setActiveTags] = useState([]);

    let lastTagIndex = activeTags.length - 1;
    if (activeTags.length == 0) lastTagIndex = 0;

    return (
        <AppPage title={"tasks"} className={`${className}`} {...props}>
            <AppPageHeader>{t("titles.tasks")}</AppPageHeader>
            <Main>
                <CategoriesSection activeTags={activeTags} setActiveTags={setActiveTags} className="mb-[1rem]"></CategoriesSection>
                <AnimatePresence mode="wait">
                    <TasksSection key={activeTags.length} heading={activeTags} filterKeys={activeTags}></TasksSection>
                </AnimatePresence>

            </Main>
            {children}
        </AppPage>
    );
}