import { createContext, useContext, useEffect, useState } from "react";
import { sortTasksByDate } from "../components/ui/Tasks/tasks";
import userJSON from "/src/assets/user.json";
import { sortInbox } from "@/components/ui/inbox/mail";
const UserInfoContext = createContext();
const UserTasksContext = createContext();
const UserInboxContext = createContext();
const UserTagsContext = createContext();
export function useInfo() {
    return useContext(UserInfoContext);
}
export function useTasks() {
    return useContext(UserTasksContext);
}
export function useInbox() {
    return useContext(UserInboxContext);
}
export function useTags() {
    return useContext(UserTagsContext);
}


const userSkeleton = {
    info: {
        id: "",
        name: "guest",
        role: "guest",
        settings: {
            "language": "",
            "theme": "",
        }
    },
    tasks: [],
    tags: [
        {
            "id": "tag:d0597671-079f-4a33-9faa-90bd258280fd",
            "title": "All",
            "icon": "bg-[#878787]",
            "color": "#878787",
            "builtIn": true,
            "pinned": true,
            "home": false
        },
        {
            "id": "tag:4b4c8590-3d62-4db1-af3d-69ddb13db2c6",
            "title": "active",
            "icon": "bg-[#5a9afa]",
            "color": "#5a9afa",
            "builtIn": true,
            "pinned": true,
            "home": false
        },
        {
            "id": "tag:7ed073cc-827e-47d9-ac8e-524a0b04f1f8",
            "title": "today",
            "icon": "bg-[#8affb3]",
            "color": "#8affb3",
            "builtIn": true,
            "pinned": false,
            "home": false
        },
        {
            "id": "tag:2c6fbc39-a4b9-4583-ad70-b83867eaaf1c",
            "title": "tomorrow",
            "icon": "bg-[#ffe88d]",
            "color": "#ffe88d",
            "builtIn": true,
            "pinned": false,
            "home": false
        },
        {
            "id": "tag:123f282c-a5d5-4f3f-92f7-1b2d857fd9f5",
            "title": "overdue",
            "icon": "bg-[#fca5a5]",
            "color": "#fca5a5",
            "builtIn": true,
            "pinned": false,
            "home": false
        },
        {
            "id": "tag:95e7d01e-724a-4fc3-98c8-c82a8a371b32",
            "title": "High Priority",
            "icon": "bg-[#ef4444]",
            "color": "#ef4444",
            "builtIn": true,
            "pinned": false,
            "home": false
        },
        {
            "id": "tag:461c3a3c-88e4-4ac8-b01d-6b496afbd29b",
            "title": "Medium Priority",
            "icon": "bg-[#ffae00]",
            "color": "#ffae00",
            "builtIn": true,
            "pinned": false,
            "home": false
        },
        {
            "id": "tag:5e14c5cf-6cb5-418b-9cb7-1335ae980492",
            "title": "Low Priority",
            "icon": "bg-[#9ca3af]",
            "color": "#9ca3af",
            "builtIn": true,
            "pinned": false,
            "home": false
        },
        {
            "id": "tag:5e081a64-08c0-465a-9771-14317c07f714",
            "title": "completed",
            "icon": "bg-[#e12afb]",
            "color": "#e12afb",
            "builtIn": true,
            "pinned": false,
            "home": false
        },
        {
            "id": "tag:85212381-6d26-4799-8be5-fd78ce042c28",
            "title": "pinned",
            "icon": "bg-[#ff00c8]",
            "color": "#ff00c8",
            "builtIn": true,
            "pinned": true,
            "home": false
        },

    ],
    inbox: [

    ]
}
export default function User({ children }) {
    let userData = userSkeleton;
    if (userJSON) userData = userJSON;

    const [infoState, setInfoState] = useState(userData.info);
    const [tasksState, setTasksState] = useState(sortTasksByDate(userData.tasks));
    const [inboxState, setInboxState] = useState(sortInbox(userData.inbox));
    const [tagsState, setTagsState] = useState(userData.tags);
    return (
        <UserInfoContext value={[infoState, setInfoState]}>
            <UserTasksContext value={[tasksState, setTasksState]}>
                <UserInboxContext value={[inboxState, setInboxState]}>
                    <UserTagsContext value={[tagsState, setTagsState]}>
                        {children}
                    </UserTagsContext>
                </UserInboxContext>
            </UserTasksContext>
        </UserInfoContext>
    );
}