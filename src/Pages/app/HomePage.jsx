import AppPage from "./AppPage";
import { SettingsAnchor,Task,CheckTask, InboxAnchor, GreetingBox, AppPageHeader, TasksContainer, TasksSection } from "../../components/ui";
import { useInfo } from "../../context/User";

export default function HomePage({className="" , children, user,...props}){
    const [userInfo] = useInfo(); 

    return(
        <AppPage className="">
            <AppPageHeader>Home</AppPageHeader>
            <div className="px-[1rem] py-[0.2rem] sm:px-[2rem]">
                <main className="flex w-full flex-wrap ">
                    <GreetingBox className="min-w-full  md:odd:me-[1rem] mb-[1rem] flex-1 md:min-w-2/5 md:max-w-[calc(50%-0.5rem)]"></GreetingBox>
                    <TasksSection className="min-w-full md:odd:me-[1rem] mb-[1rem] flex-1 md:min-w-2/5 md:max-w-[calc(50%-0.5rem)]" heading="Today's focus"></TasksSection>
                    <TasksSection className="min-w-full md:odd:me-[1rem] mb-[1rem] flex-1 md:min-w-2/5 md:max-w-[calc(50%-0.5rem)]" heading="Upcoming"></TasksSection>
                    <TasksSection className="min-w-full md:odd:me-[1rem] mb-[1rem] flex-1 md:min-w-2/5 md:max-w-[calc(50%-0.5rem)]" heading="Urgent"></TasksSection>
                    
                </main>
            </div> 
        </AppPage>
    );
} 