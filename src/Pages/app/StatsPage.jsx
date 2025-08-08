import { useTranslation } from "../../context/Language";
import AppPage from "./AppPage";
import { AppPageHeader, Main, TaskCompletionLines, AchievementsContainer, TasksProgress, SectionContainer } from "../../components/ui";

const chartSectionStyles = "min-w-full md:even:me-[1rem] mb-[1rem] flex-1 md:min-w-2/5 md:max-w-[calc(50%-0.5rem)]";
export default function TasksPage({ className = "", children, ...props }) {
    const t = useTranslation();

    return (
        <AppPage title={"stats"} className={`${className}`} {...props}>
            <AppPageHeader>{t("titles.stats")}</AppPageHeader>

            <Main className="flex w-full flex-wrap">
                <SectionContainer className="w-full mb-[1rem] ">
                    <AchievementsContainer></AchievementsContainer>
                </SectionContainer>
                <SectionContainer className={`pb-[2.3rem] ${chartSectionStyles}`}>
                    <TasksProgress></TasksProgress>
                </SectionContainer>

                <SectionContainer className="w-full flex justify-center ">
                    <TaskCompletionLines className="w-full sm:max-w-2/3"></TaskCompletionLines>
                </SectionContainer>
            </Main>
            {children}
        </AppPage >
    );
}