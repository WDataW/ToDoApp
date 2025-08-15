import { createContext, useContext, useEffect, useState } from "react";
import { sortTasksByDate } from "../components/ui/Tasks/tasks";
import userData from "/src/assets/user.json";
const UserInfoContext = createContext();
const UserTasksContext = createContext();
const UserAchievementsContext = createContext();
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



export default function User({ children }) {
    const [infoState, setInfoState] = useState(userData.info);
    const [tasksState, setTasksState] = useState(sortTasksByDate(userData.tasks));
    const [inboxState, setInboxState] = useState(userData.inbox);
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