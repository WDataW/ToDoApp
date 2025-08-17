import AppPage from "./AppPage";
import { GreetingBox, AppPageHeader, TasksSection, Main, EditTask } from "../../components/ui";
import { useTranslation } from "../../context/Language";
import { useHomePageTags, useTagInfo } from "@/components/ui/tasks/tasks";

const sectionStyles = "min-w-full md:odd:me-[1rem] mb-[1rem] flex-1 md:min-w-2/5 md:max-w-[calc(50%-0.5rem)]";
export default function HomePage({ className = "", children, user, ...props }) {
    const t = useTranslation();
    const homeTags = useHomePageTags();
    return (
        <AppPage title="home" id="homePage" className="relative">
            <AppPageHeader >{t("titles.home")}</AppPageHeader>
            <Main className=" flex w-full  flex-wrap">
                <GreetingBox className={sectionStyles}></GreetingBox>
                {homeTags.map((tag, i) => {
                    const [title, filterKey] = useTagInfo(tag, t)
                    return <TasksSection key={i} tagsFilter={[filterKey]} className={sectionStyles} heading={[title]}></TasksSection>
                })}
            </Main>
        </AppPage>
    );
} 