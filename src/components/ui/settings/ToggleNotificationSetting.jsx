import { useEffect, useState } from "react";
import ToggleSomething from "../buttons/ToggleSomething";
import { allNotificationsOff, useEditNotifications } from "./settings";
import { useTranslation } from "@/context/Language";


export default function ToggleNotificationSetting({ notification, className = "", children, ...props }) {

    const editNotification = useEditNotifications();
    const [toggled, setToggled] = useState(notification.toggled);
    if (toggled !== notification.toggled) setToggled(notification.toggled);// didn't want to unmount the component to allow for transitions and animations to work properly. Instead I set the value of toggled which works fine.
    const t = useTranslation();
    function handleToggle() {
        setToggled(!toggled);
        if (notification.label == "all" && toggled) {
            editNotification({
                ...allNotificationsOff
            });
            return;
        }
        editNotification({ [notification.label]: !toggled });
    }
    return (
        <ToggleSomething label={t(`terms.${notification.label}`)} value={toggled} onClick={handleToggle} className={`border px-[1rem] py-[0.5rem] rounded-[0.4rem] ${className}`} {...props}>
            {children}
        </ToggleSomething >
    );
}