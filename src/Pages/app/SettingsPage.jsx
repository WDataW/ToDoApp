import AppPage from "./AppPage";
import { Main, PFPControl } from "../../components/ui";
import SettingsContainer from "@/components/ui/settings/SettingsContainer";

export default function SettingsPage({ className = "", children, user, ...props }) {
    return (
        <AppPage title="settings" id="settingsPage" className="relative">
            <Main >
                <div className="w-full flex flex-col items-center ">
                    <PFPControl />
                    <SettingsContainer></SettingsContainer>
                </div>
            </Main>
        </AppPage>
    );
} 