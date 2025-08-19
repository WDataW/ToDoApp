import { useTranslation } from "../../context/Language";
import AppPage from "./AppPage";
import { AppPageHeader, TasksDistribution, ActivityChart, Main, TaskCompletionLines, AchievementsContainer, TasksProgress, SectionContainer } from "../../components/ui";
const chartSectionStyles = "min-w-full md:even:me-[1rem] mb-[1rem] flex-1 md:min-w-2/5 md:max-w-[calc(50%-0.5rem)]";
export default function TasksPage({ className = "", children, ...props }) {
    const t = useTranslation();

    return (
        <AppPage title={"stats"} className={`${className}`} {...props}>
            <Main className="flex w-full flex-wrap">
                <SectionContainer className=" w-full mb-[1rem] ">
                    <AchievementsContainer></AchievementsContainer>
                </SectionContainer>
                <SectionContainer className={` pb-[2.3rem] md:pb-0 ${chartSectionStyles}`}>
                    <TasksProgress></TasksProgress>
                </SectionContainer>
                <SectionContainer className={` pb-[4rem] xs:pb-[1.5rem]    ${chartSectionStyles}`}>
                    <ActivityChart></ActivityChart>
                </SectionContainer>

                <SectionContainer className={`${chartSectionStyles} justify-center `}>
                    <TaskCompletionLines className="w-full"></TaskCompletionLines>
                </SectionContainer>
                <SectionContainer className={` pb-[2.3rem] sm:pb-[1.5rem]   ${chartSectionStyles}`}>
                    <TasksDistribution></TasksDistribution>
                </SectionContainer>
            </Main>
            {children}
        </AppPage >
    );
}