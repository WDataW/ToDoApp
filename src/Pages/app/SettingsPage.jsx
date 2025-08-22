import AppPage from "./AppPage";
import { Main } from "../../components/ui";
import { useTranslation } from "../../context/Language";
import SettingsContainer from "@/components/ui/settings/SettingsContainer";
import { useInfo } from "@/context/User";

export default function SettingsPage({ className = "", children, user, ...props }) {
    const t = useTranslation();
    return (
        <AppPage title="settings" id="settingsPage" className="relative">
            <Main >
                <div className="w-full flex flex-col items-center ">
                    <SettingsContainer></SettingsContainer>
                </div>
            </Main>
        </AppPage>
    );
} 