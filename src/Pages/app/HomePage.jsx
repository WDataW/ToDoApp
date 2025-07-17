import AppPage from "./AppPage";
import { SettingsAnchor, Task, CheckTask, InboxAnchor, GreetingBox, AppPageHeader, TasksContainer, TasksSection } from "../../components/ui";
import { useInfo } from "../../context/User";
import { useTranslation } from "../../context/Language";
import { FloatingContainer } from "../../components/ui/containers";


export default function HomePage({ className = "", children, user, ...props }) {
    const [userInfo] = useInfo();
    const t = useTranslation();

    return (
        <AppPage id="homePage" className="relative">
            <AppPageHeader>{t("titles.home")}</AppPageHeader>

            <div className="px-[1rem] py-[0.2rem] sm:px-[2rem]">
                <main className="flex w-full flex-wrap ">
                    <GreetingBox className="min-w-full  md:odd:me-[1rem] mb-[1rem] flex-1 md:min-w-2/5 md:max-w-[calc(50%-0.5rem)]"></GreetingBox>
                    <TasksSection filterKey="today" className="min-w-full md:odd:me-[1rem] mb-[1rem] flex-1 md:min-w-2/5 md:max-w-[calc(50%-0.5rem)]" heading={t("titles.todaysFocus")}></TasksSection>
                    <TasksSection filterKey="tomorrow" className="min-w-full md:odd:me-[1rem] mb-[1rem] flex-1 md:min-w-2/5 md:max-w-[calc(50%-0.5rem)]" heading={t("titles.tomorrow")}></TasksSection>
                    <TasksSection filterKey="overdue" className="min-w-full md:odd:me-[1rem] mb-[1rem] flex-1 md:min-w-2/5 md:max-w-[calc(50%-0.5rem)]" heading={t("titles.overdue")}></TasksSection>

                </main>

            </div>
        </AppPage>
    );
} 