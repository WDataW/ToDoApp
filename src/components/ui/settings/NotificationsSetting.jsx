import { useInfo } from "@/context/User";
import { ToggleButton } from "../buttons";
import Setting from "./Setting";
import ToggleNotificationSetting from "./ToggleNotificationSetting";
import { useEffect, useRef, useState } from "react";
import { getFinalHeight } from "./settings";

export default function NotificationsSettings({ className = "", children, ...props }) {
    const setting = {
        title: "notifications",
        icon: "bell",
        type: "expand",

    }
    const [info] = useInfo()
    const notifications = info.settings.notifications;
    const notificationsArray = [
        {
            label: "all",
            toggled: notifications.all,
        },
        {
            label: "taskReminder",
            toggled: notifications.taskReminder,
        },
        {
            label: "overdueAlert",
            toggled: notifications.overdueAlert,
        },
        {
            label: "announcements",
            toggled: notifications.announcements,
        },

    ];
    const expandRef = useRef();

    return (
        <Setting setting={setting} expandHeight={() => getFinalHeight(expandRef.current)} className={`${className}`} {...props}>
            <ul ref={expandRef} className="sm:ms-[1.8rem] flex flex-col gap-[0.7rem] sm:me-[1.8rem]">
                {notificationsArray.map((n, i) => <li key={i}> <ToggleNotificationSetting notification={n} /></li>)}
            </ul>
        </Setting>
    );
}