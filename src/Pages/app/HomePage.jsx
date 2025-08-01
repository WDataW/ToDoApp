import AppPage from "./AppPage";
import { GreetingBox, AppPageHeader, TasksSection, Main } from "../../components/ui";
import { useTranslation } from "../../context/Language";

const tasksSectionStyles = "min-w-full md:odd:me-[1rem] mb-[1rem] flex-1 md:min-w-2/5 md:max-w-[calc(50%-0.5rem)]";
export default function HomePage({ className = "", children, user, ...props }) {
    const t = useTranslation();

    return (
        <AppPage title="home" id="homePage" className="relative">
            <AppPageHeader>{t("titles.home")}</AppPageHeader>
            <Main className=" flex w-full flex-wrap ">
                <GreetingBox className="min-w-full  md:odd:me-[1rem] mb-[1rem] flex-1 md:min-w-2/5 md:max-w-[calc(50%-0.5rem)]"></GreetingBox>
                <TasksSection tagsFilter={["today"]} className={tasksSectionStyles} heading={[t("titles.todaysFocus")]}></TasksSection>
                <TasksSection tagsFilter={["tomorrow"]} className={tasksSectionStyles} heading={[t("titles.tomorrow")]}></TasksSection>
                <TasksSection tagsFilter={["overdue"]} className={tasksSectionStyles} heading={[t("titles.overdue")]}></TasksSection>
            </Main>
        </AppPage>
    );
} 