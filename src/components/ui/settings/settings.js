import { useInfo } from "@/context/User";
import { useState } from "react";

export function getColorVar(variable) {
    const root = document.documentElement;
    const color = getComputedStyle(root).getPropertyValue(variable);
    return color;

}
function getColorVarSetter() {
    function colorSetter(variable, value) {
        document.documentElement.style.setProperty(variable, value);
    }
    return colorSetter;
}

export function useColor(variable) {
    const [color, setColor] = useState(getColorVar(variable));
    const colorSetter = getColorVarSetter();
    function colorUpdater(newColor) {
        colorSetter(variable, newColor);
        setColor(newColor);
    }
    return [color, colorUpdater]
}
export function useEditNotifications() {
    const [info, setInfo] = useInfo();
    function editNotifications(notificationsToEdit) {
        const newInfo = { ...info, settings: { ...info.settings, notifications: { ...info.settings.notifications, ...notificationsToEdit } } };
        setInfo(newInfo);
    }
    return editNotifications;
}

export const allNotificationsOff = {
    "all": false,
    "taskReminder": false,
    "overdueAlert": false,
    "announcements": false
}


export function isEqual(notifications1, notifications2) {
    for (let key in notifications1) {
        if (notifications1[key].toggled !== notifications2[key].toggled) return false;
    }
    return true;
}

export function getFinalHeight(el) {
    const rem = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("font-size").replace("px", ""));
    const elHeight = getComputedStyle(el).getPropertyValue("height").replace("px", "");
    const finalHeight = parseFloat(elHeight) + 5.5 * rem + "px";
    return finalHeight
}