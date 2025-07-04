import AppPage from "./AppPage";
import { SettingsAnchor, InboxAnchor, GreetingBox, AppPageHeader } from "../../components/ui";
import { useInfo } from "../../context/User";

export default function HomePage({className="" , children, user,...props}){
    const [userInfo] = useInfo(); 

    return(
        <AppPage className="">
            <AppPageHeader>Home</AppPageHeader>
            <div className="px-[1rem] py-[0.2rem] sm:px-[2rem]">
                <main>
                    <GreetingBox className="w-[90%]"></GreetingBox>
                 
                </main>
            </div> 
        </AppPage>
    );
} 