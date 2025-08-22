import { LanguageSetting, SignOutAction, AccountSettings, ThemeSetting, NotificationsSettings } from "../settings";
export default function SettingsContainer({ className = "", children, ...props }) {

    return (
        <ul className={`w-full max-w-[30rem] flex flex-col ${className}`} {...props}>
            <AccountSettings></AccountSettings>
            <NotificationsSettings></NotificationsSettings>
            <LanguageSetting></LanguageSetting>
            <ThemeSetting></ThemeSetting>
            <SignOutAction></SignOutAction>

            {children}
        </ul>
    );
}